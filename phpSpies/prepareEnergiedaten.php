<?php

set_time_limit(0) ;

include('top-cache.php') ;
// error_reporting (-1) ;
// ini_set ('display_errors', 'On') ;

require 'helpers.php' ;
require 'DbOperations.php' ;
require 'Matex.php' ;
require 'EMail_swift.php';

define("connect", connectToDB($_GET['nameDB'])) ;
define("mstID", $_GET['mstID']) ;
define("startDate", $_GET['startDate']) ;
define("endDate", $_GET['endDate']) ;

function getMstFormulaRecord() {
    $query = "SELECT * FROM MessstellenBerechnungsformeln " ;
    $query .= "WHERE mst_ID = ".mstID  ;
    return queryDB(connect, $query, "read") ;
}

function base64Decode($record) {
    return actionOn($record[0], "Formula", 'base64_decode') ;
}

function getFormula($record) {
    return $record["Value"] ;
}

function splitFormula($record) {
    return actionOn($record, "Formula", 'splitSpace') ;
}

function isMst($identifier) {
    return splitUnderscore($identifier)[0] === "mst" ;
}

function isKorFac($identifier) {
    return splitUnderscore($identifier)[0] === "eprdkfe" ;
}

function isMstOrKorFac($identifier) {
    return isMst($identifier) || isKorFac($identifier) ;
}

function getID($identifier) {
    return splitUnderscore($identifier)[1] ;
}

function getDataFormula($formulaRecord) {

    $mstsOrKorFacs = array_values(array_filter($formulaRecord["Formula"], 'isMstOrKorFac')) ;

    function getEnergyData($mstID) {
        $query = "SELECT * FROM MessstellenEnergiedaten " ;
        $query .= "WHERE mst_ID = ".$mstID." " ;
        $query .= "AND CONVERT(varchar(50), Time, 121 ) BETWEEN CONVERT(varchar(50), '".startDate."', 121) AND CONVERT(varchar(50), '".endDate."', 121) " ;
        $query .= "ORDER BY Time " ;

        return queryDB(connect, $query, "read") ;
    }

    function createKorFacArray($korFacRecord) {
        $to = endDate ;
        $date = startDate ;
        $korFacRecords = [] ;
        while ($date < endDate) {
            $date = add15min($date) ;
            $korFacRecord_ = [
                "eprdkfe_id"=>$korFacRecord["eprdkfe_id"]
                , "Name"=>$korFacRecord["Name"]
                , "Time"=>new DateTime($date)
                , "Value"=>$korFacRecord["Value"]
                , "ConvFactor"=>1
            ] ;
            array_push($korFacRecords, $korFacRecord_) ;
        }
        return $korFacRecords ;
    }

    function getKorFacData($korFacID) {
        $query = "SELECT ePrdKFE_id AS eprdkfe_id, name AS Name, wert AS Value FROM korrekturFaktorEinfugen " ;
        $query .= "WHERE ePrdKFE_id = ".$korFacID." " ;
        $query .= "AND deleted <> 'true' " ;

        return createKorFacArray(queryDB(connect, $query, "read")[0]) ;
    }

    function getDataArrays($mstsOrKorFacs_) {
        $data = [] ;
        foreach ($mstsOrKorFacs_ as $unit) {
            if (isMst($unit)) {
                array_push($data, getEnergyData(getID($unit))) ;
            }
            elseif (isKorFac($unit)) {
                array_push($data, getKorFacData(getID($unit))) ;
            }
        }
        return $data ;
    }

    return [$formulaRecord, getDataArrays($mstsOrKorFacs)] ;
}

function prepareForCalculation($records) {

    // Assigned vars for array of mstFormulas records and energy records
    $formulaRecord = $records[0] ;
    $formulaDataRecords = $records[1] ;

    // CREATE FORMULA ARRAYS FROM DATE X TO DATE Y
    // -------------------------------------------
    function prependZero($n) {
        return (int)$n < 10 ? "0".$n : (int)$n ;
    }

    function createFormulaArray($formulaRecord_) {
        $to = endDate ;
        $date = startDate ;
        $formulaRecords = [] ;
        while ($date < endDate) {
            $date = add15min($date) ;
            $formulaRecord__ = [
                "mst_ID"=>$formulaRecord_["mst_ID"]
                , "Name"=>$formulaRecord_["Name"]
                , "Time"=>new DateTime($date)
                , "Value"=>$formulaRecord_["Formula"]
                , "Formula"=>$formulaRecord_["Formula"]
                , "ConvFactor"=>1
            ] ;
            array_push($formulaRecords, $formulaRecord__) ;
        }
        return $formulaRecords ;
    }

    function equalStartDate($energyRecords) {
        return $energyRecords[0]["Time"] == new DateTime(startDate) ;
    }

    function equalEndDate($energyRecords) {
        return $energyRecords[count($energyRecords) - 1] == new DateTime(endDate) ;
    }

    function noDuplicates($energyRecords) {
        return count(unique_multidim_array($energyRecords, "Time")) === count($energyRecords) ;
    }

    function isConsistent($formulaRecords, $energyRecords) {
        return equalLength($formulaRecords, $energyRecords) ?
        equalStartDate($energyRecords)
        && equalEndDate($energyRecords)
        && noDuplicates($energyRecords) :
        false ;
    }

    function search($arr, $key, $value) {
        $result = [] ;
        foreach ($arr as $record) {
            if ($record[$key] == $value) {
                array_push($result, $record) ;
            }
        }
        return count($result) === 1 ? $result[0] : false ;
    }

    // Retrieve energy record referenced by date
    function findRecordWithDate($formulaRecord, $energyData) {
        $date = $formulaRecord["Time"] ;
        $record = search($energyData, "Time", $date) ;

        $isBool = gettype($record) === "boolean" ;

        return $isBool && array_key_exists(0, $energyData) ?
        ["mst_ID" => head($energyData)["mst_ID"], "Name" => head($energyData)["Name"], "Time" => $date, "Value" => 0, "ConvFactor" => head($energyData)["ConvFactor"]] :
        $isBool ?
        ["mst_ID" => "", "Name" => "", "Time" => $date, "Value" => 0, "ConvFactor" => 1] :
        $record ;
    }

    // Fills date gaps in energy records of one mst
    function fillDateGapsEnergyData($formulaRecords, $energyRecords) {
        if ( isConsistent($formulaRecords, $energyRecords) ) {
            return $energyRecords ;
        }
        else {
            $noGapsEnergyRecords = [] ;
            foreach ($formulaRecords as $record) {
                array_push($noGapsEnergyRecords, findRecordWithDate($record, $energyRecords)) ;
            }
            return $noGapsEnergyRecords ;
        }
    }

    function multiplyConvFactor($record) {
        $record["Value"] *= $record["ConvFactor"] ;
        return $record ;
    }

    function multiplyConvFactorRecords($records) {
        return array_map('multiplyConvFactor', $records) ;
    }

    function multiplyConvFactorsAllRecords($records) {
        return array_map('multiplyConvFactorRecords', $records) ;
    }

    function fillDateGapsAllEnergyData($formulaRecord_, $formulaEnergyRecords_) {
        $formulaRecords = createFormulaArray($formulaRecord_) ;
        $energyRecords = [] ;
        foreach ($formulaEnergyRecords_ as $energyData) {
            array_push($energyRecords, fillDateGapsEnergyData($formulaRecords, $energyData)) ;
        }
        $energyRecordsConvFactor = multiplyConvFactorsAllRecords($energyRecords) ;
        $transposedEnergyRecords = flipDiagonally($energyRecordsConvFactor) ;
        return [$formulaRecords, $transposedEnergyRecords] ;
    }

    return fillDateGapsAllEnergyData($formulaRecord, $formulaDataRecords) ;
}

function calculateFormulas($records) {

    $mstFormulaArray = head($records) ;
    $formulaEnergyRecords = $records[1] ;

    // REPLACE FORMULAS WITH VALUES

    function assignToValue($mst, $value) {
        $keyValuePair[$mst] = $value["Value"] ;
        return $keyValuePair ;
    }

    function replaceFormula($formulaRecord, $dataRecord) {

        $formulaArray = getFormula($formulaRecord) ;

        // separate formula parts
        $mstsOrKorFacsFormula = array_filter($formulaArray, "isMstOrKorFac") ;

        // replace units with values
        $mstsOrKorFacsValues = array_map("assignToValue", $mstsOrKorFacsFormula, $dataRecord) ;

        // re-assign Value property
        $formulaRecord["Value"] = array_flatten($mstsOrKorFacsValues) ;
        $formulaRecord["Formula"] = implode(' ', $formulaArray) ;

        return $formulaRecord ;
    }

    function replaceFormulas($formulaRecords, $energyData) {
        $newFormulaRecords = [] ;

        for ($i=0; $i < count($formulaRecords); $i++) {
            array_push($newFormulaRecords, replaceFormula($formulaRecords[$i], $energyData[$i])) ;
        }

        return $newFormulaRecords ;
    }

    // calculate formula string as term
    function calculate($record)  {

        $vars = $record["Value"] ;
        $formulaString = $record["Formula"] ;

        $evaluator = new \Matex\Evaluator() ;

        $evaluator->variables = $vars ;

        $record["Value"] = $evaluator->execute($formulaString) ;

        return $record ;
    }

    return array_map('calculate', replaceFormulas($mstFormulaArray, $formulaEnergyRecords)) ;
}

function writeToDB($records) {

    function buildValueString($last, $record) {
        return $last.", ("
        .$record["mst_ID"].", '"
        .$record["Name"]."', '"
        .dateTimeToString($record["Time"])."', "
        .$record["Value"].", "
        .$record["ConvFactor"].")" ;
    }

    function buildValuesString($records) {
        return substr(array_reduce($records, 'buildValueString'), 1) ;
    }

    function buildQuery($records) {
        $recordArrays = splitArray(1000, $records) ;
        $query = "" ;

        function buildInsertInto($last, $records_) {
            $query = $last ;
            $query .= "INSERT INTO berechneteEnergiedaten (mst_ID, Name, Time, Value, ConvFactor) " ;
            $query .= "VALUES ".buildValuesString($records_)." "  ;

            return $query ;
        }

        return array_reduce($recordArrays, 'buildInsertInto') ;
    }

    queryDB(connect, buildQuery($records), "write") ;

    return $records ;
}

function testIfDataInDB($records) {

    $initialRecords = $records ;

    function queryData() {
        $query = "SELECT mst_ID, Name, Time, Value, ConvFactor FROM berechneteEnergiedaten " ;
        $query .= "WHERE mst_ID = ".mstID." " ;
        $query .= "AND CONVERT(varchar(50), Time, 121 ) BETWEEN CONVERT(varchar(50), '".add15min(startDate)."', 121) AND CONVERT(varchar(50), '".add15min(endDate)."', 121) " ;
        $query .= "ORDER BY Time " ;

        return queryDB(connect, $query, "read") ;
    }

    function deleteInsertedData() {
        $query = "DELETE FROM berechneteEnergiedaten " ;
        $query .= "WHERE mst_ID = ".mstID." " ;
        $query .= "AND CONVERT(varchar(50), Time, 121 ) BETWEEN CONVERT(varchar(50), '".add15min(startDate)."', 121) AND CONVERT(varchar(50), '".add15min(endDate)."', 121) " ;

        queryDB(connect, $query, "read") ;
    }

    function setExecuted($bool) {

        $conn = connectToDB("gipscomm") ;

        $query = "UPDATE phpScriptsToExecute " ;
        $query .= "SET dateExec = CONVERT(datetime, '".dateNow()."', 121), executed = '".$bool."' " ;
        $query .= "WHERE pathScript= '".getURL()."'" ;

        queryDB($conn, $query, "write") ;

        closeDbConn($conn) ;
    }

    function sendAlertEmail() {

        $empfaenger = "sdm@energie-gipscomm.de" ;

        $betreff = "Berechnete Energiedaten Konnten nicht in DB geschrieben werden. (G-Analysis)" ;

        $emailText = "Letzter Datensatz : <br><br>" ;
        $emailText .= getURL() ;

        eMail($empfaenger, $betreff, $emailText) ;
    }

    function alertIfNeccessary($sameLength) {
        if (!$sameLength) {
            setExecuted("false") ;
            deleteInsertedData() ;
            sendAlertEmail() ;
            print_r(" FALSE ") ;
        }
        else {
            setExecuted("true") ;
            print_r(" TRUE ") ;
        }
        return !$sameLength ;
    }

    return alertIfNeccessary(equalLength($initialRecords, queryData())) ;
}

// $start = hrtime(true) ;

pipe(
    [ getMstFormulaRecord()
    , 'base64Decode'
    , 'splitFormula'
    , 'getDataFormula'
    , 'prepareForCalculation'
    , 'calculateFormulas'
    , 'writeToDB'
    , 'testIfDataInDB'
    ]
) ;

closeDbConn(connect) ;

// $end = hrtime(true) ;

// echo "    Execution Time : ".(($end - $start) / 1000000000) ;

?>
