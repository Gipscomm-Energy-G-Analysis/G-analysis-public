<?php

include('top-cache.php') ;
error_reporting (-1) ;
ini_set ('display_errors', 'On') ;

require 'DbOperations.php' ;
require 'Matex.php' ;
require 'EMail_swift.php';

// SET DB
// ------
const nameDB = "012_spiess" ;

// CONNECT TO DB
$GLOBALS["connect"] = connectToDB(nameDB) ;

// SET VIRTUAL MEASUREMENT POINT
// -----------------------------
const mstID = 69 ;

// Formula
// mstID = 69
// [M-Verbraucher-Trafo-8] = [M613] * ( ( [M601] + [M603] ) / [test] + [M608] ) * [test]
// mst_159 * ( ( mst_133 + mst_131 ) / eprdkfe_1 + mst_161 ) * eprdkfe_7

// SET START AND END DATE FOR CALCULATION
// ------------------------------
const startDate = "2018-10-10 12:30:00.000" ;
const endDate =  "2018-11-22 23:15:00.000" ;

// first 2019-05-22 05:45:00.000
// last 2020-10-08 03:00:00.000

// HELPERS
// -------
// Higher level function which applies a passed function on a specified field
// of a record and returns the modified record
function actionOn($record, $field, $fn) {
    $record[$field] = $fn($record[$field]) ;

    return $record ;
}

// Function which as the name suggests, splits a string at spaces
function splitSpace($string) {
    return explode(" ", $string) ;
}

// Function that splits a string at underlines
function splitUnderline($string) {
    return explode("_", $string) ;
}

// Remove duplicates in multidim array
function unique_multidim_array($array, $key) {
    $temp_array = array();
    $i = 0;
    $key_array = array();

    foreach($array as $val) {
        if (!in_array($val[$key], $key_array)) {
            $key_array[$i] = $val[$key];
            $temp_array[$i] = $val;
        }
        $i++;
    }
    return $temp_array;
}

function array_flatten($array) {
  if (!is_array($array)) {
    return false;
  }
  $result = array();
  foreach ($array as $key => $value) {
    if (is_array($value)) {
      $result = array_merge($result, array_flatten($value));
    } else {
      $result = array_merge($result, array($key => $value));
    }
  }
  return $result;
}

function flipDiagonally($arr) {
    $out = array();
    foreach ($arr as $key => $subarr) {
        foreach ($subarr as $subkey => $subvalue) {
            $out[$subkey][$key] = $subvalue;
        }
    }
    return $out;
}

function equalLength($arr1, $arr2) {
    return count($arr1) === count($arr2) ;
}

function noMatchRecord($record1, $record2) {
    return $record1 !== $record2 ;
}

function id($a){
    return $a ;
}

function roundTo($val, $toDigits) {
    return round($val * 10 ** $toDigits) / 10 ** $toDigits ;
}

// Query mst formula data
function getMstFormulaRecord() {
    $query = "SELECT * FROM MessstellenBerechnungsformeln " ;
    $query .= "WHERE mst_ID = ".mstID  ;
    return queryDB($GLOBALS["connect"], $query, "read") ;
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
    return splitUnderline($identifier)[0] === "mst" ;
}

function isKorFac($identifier) {
    return splitUnderline($identifier)[0] === "eprdkfe" ;
}

function isMstOrKorFac($identifier) {
    return isMst($identifier) || isKorFac($identifier) ;
}

function getID($identifier) {
    return splitUnderline($identifier)[1] ;
}

function dateTimeToString($dateObject) {
    return $dateObject->format('Y-m-d H:i:s.u') ;
}

function add15min($date) {
    $dateTime = new DateTime($date);
    $dateTime->modify('+15 minutes');
    return $dateTime->format('Y-m-d H:i:s.000000'); ;
}

function getDataFormula($formulaRecord) {

    $mstsOrKorFacs = array_values(array_filter($formulaRecord["Formula"], 'isMstOrKorFac')) ;

    function getEnergyData($mstID) {
        $query = "SELECT * FROM MessstellenEnergiedaten " ;
        $query .= "WHERE mst_ID = ".$mstID." " ;
        $query .= "AND CONVERT(varchar(50), Time, 121 ) BETWEEN CONVERT(varchar(50), '".startDate."', 121) AND CONVERT(varchar(50), '".endDate."', 121) " ;
        $query .= "ORDER BY Time " ;

        return queryDB($GLOBALS["connect"], $query, "read") ;
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

        return createKorFacArray(queryDB($GLOBALS["connect"], $query, "read")[0]) ;
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

// Calculates Level-1 Formulas
function prepareForCalculation($records) {

    // Assigned vars for array of mstFormulas records and energy records
    $formulaRecord = $records[0] ;
    $formulaDataRecords = $records[1] ;

    // CREATE FORMULA ARRAYS FROM DATE X TO DATE Y
    // -------------------------------------------
    function prependZero($n) {
        return (int)$n < 10 ? "0".$n : (int)$n ;
    }

    // Returns the current formatted date
    function dateNow() {
        $date = getdate() ;

        $year = $date["year"] ;
        $month = prependZero($date["mon"]) ;
        $day = prependZero($date["mday"]) ;
        $hours = prependZero($date["hours"]) ;
        $minutes = prependZero($date["minutes"]) ;
        $seconds = prependZero($date["seconds"]) ;

        return $year."-".$month."-".$day." ".$hours.":".$minutes.":".$seconds.".000000" ;
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

        return gettype($record) === "boolean" ?
        ["mst_ID" => $energyData[0]["mst_ID"], "Name" => $energyData[0]["Name"], "Time" => $date, "Value" => 0, "ConvFactor" => $energyData[0]["ConvFactor"]] :
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
// -------------------------------------------

function calculateFormulas($records) {

    $mstFormulaArray = $records[0] ;
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

    function splitArray($size, $records) {
        return array_chunk($records, $size) ;
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

    queryDB($GLOBALS["connect"], buildQuery($records), "write") ;

    return $records ;
}

// Only checks if the the record count is the same !
function testIfDataInDB($records) {

    $initialRecords = $records ;

    function queryData() {
        $query = "SELECT mst_ID, Name, Time, Value, ConvFactor FROM berechneteEnergiedaten " ;
        $query .= "WHERE mst_ID = ".mstID." " ;
        $query .= "AND CONVERT(varchar(50), Time, 121 ) BETWEEN CONVERT(varchar(50), '".add15min(startDate)."', 121) AND CONVERT(varchar(50), '".add15min(endDate)."', 121) " ;
        $query .= "ORDER BY Time " ;

        return queryDB($GLOBALS["connect"], $query, "read") ;
    }

    function sendAlertEmail() {

        $empfaenger = "sdm@energie-gipscomm.de" ;

        $betreff = "Berechnete Energiedaten Konnten nicht in DB geschrieben werden. (G-Analysis)" ;

        $emailText = "Dies betrifft die mst_ID = ".mstID." <br><br>" ;
        $emailText .= "Zeitbereich = ".startDate." - ".endDate." <br><br>" ;

        eMail($empfaenger, $betreff, $emailText) ;
    }

    function alertIfNeccessary($sameLength) {
        if (!$sameLength) {
            sendAlertEmail() ;
        }
        return !$sameLength ;
    }

    return alertIfNeccessary(equalLength($initialRecords, queryData())) ;
}

$start = hrtime(true) ;

testIfDataInDB(writeToDB(calculateFormulas(prepareForCalculation(getDataFormula(splitFormula(base64Decode(getMstFormulaRecord()))))))) ;

closeDbConn($GLOBALS["connect"]) ;

unset($GLOBALS["connect"]) ;

$end = hrtime(true) ;

echo "    Execution Time : ".(($end - $start) / 1000000000) ;

?>
