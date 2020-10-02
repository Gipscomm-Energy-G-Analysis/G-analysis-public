<?php

include('top-cache.php');
error_reporting (-1);
ini_set ('display_errors', 'On');

require 'DbOperations.php';

// SET DB
// ------
const nameDB = "012_spiess" ;

// SET VIRTUAL MEASUREMENT POINT
// -----------------------------
const mstID = 110 ;

// SET START AND END DATE FOR CALCULATION
// ------------------------------
const startDate = "2018-07-15 02:00:00.000" ;
const endDate = "2018-07-25 02:00:00.000" ;

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

// -----------------------------
// Query mst formula data
function getMstFormulaRecord() {
    $query = "SELECT * FROM MessstellenBerechnungsformeln " ;
    $query .= "WHERE mst_ID = ".mstID  ;
    return queryDB(connectToDB(nameDB), $query, "read") ;
}

function base64Decode($record) {
    return actionOn($record[0], "Formula", 'base64_decode') ;
}

function splitFormula($record) {
    return actionOn($record, "Formula", 'splitSpace') ;
}

function isMst($identifier) {
    return splitUnderline($identifier)[0] === "mst" ;
}
function isKorFac($identifier) {
    return splitUnderline($identifier)[0] === "ePrdKFE" ;
}
function getID($identifier) {
    return splitUnderline($identifier)[1] ;
}

// Queries all the data for every formula
function getEnergyDataFormula($formulaRecord) {

// Query mst energy data of a formula
    $msts = array_values(array_filter($formulaRecord["Formula"], 'isMst')) ;
    $mstsIDs = array_map('getID', $msts) ;

    $dataMsts = [] ;

    foreach ($mstsIDs as $id) {
        $query = "SELECT * FROM MessstellenEnergiedaten " ;
        $query .= "WHERE mst_ID = ".$id." " ;
        $query .= "AND Time BETWEEN '".startDate."' AND '".endDate."' " ;
        $query .= "ORDER BY Time" ;
        array_push($dataMsts, queryDB(connectToDB(nameDB), $query, "read")) ;
    }

    return [$formulaRecord, $dataMsts] ;
}


// Calculates Level-1 Formulas
function calculateFormulas($records) {

    // Assigned vars for array of mstFormulas records and energy records
    $formulaRecord = $records[0] ;
    $formulaEnergyRecords = $records[1] ;

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

    function add15min($date) {
        $dateTime = new DateTime($date);
        $dateTime->modify('+15 minutes');
        return $dateTime->format('Y-m-d H:i:s.000000'); ;
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

    function equalLength($formulaRecords, $energyRecords) {
        return count($formulaRecords) === count($energyRecords) ;
    }

    function noDuplicates($energyRecords) {
        return count(unique_multidim_array($energyRecords, "Time")) === count($energyRecords) ;
    }

    function isConsistent($formulaRecords, $energyRecords) {
        return equalStartDate($energyRecords)
        && equalEndDate($energyRecords)
        && equalLength($formulaRecords, $energyRecords)
        && noDuplicates($energyRecords) ;
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

    function fillDateGapsAllEnergyData($formulaRecord_, $formulaEnergyRecords_) {
        $formulaRecords = createFormulaArray($formulaRecord_) ;
        $energyRecords = [] ;
        foreach ($formulaEnergyRecords_ as $energyData) {
            array_push($energyRecords, fillDateGapsEnergyData($formulaRecords, $energyData)) ;
        }
        return [$formulaRecords, $energyRecords] ;
    }

    // -------------------------------------------


    // INDEX THE FORMULA ELEMENTS FOR LATER SORTING
    // --------------------------------------------
    function indexed($arr) {
        for($i = 0; $i < count($arr); $i++) {
            $arr[$i] = [$i, $arr[$i]] ;
        }
        return $arr ;
    }

    function indexedFormulaArray($formulaRecord) {
        return actionOn($formulaRecord, "Value", 'indexed') ;
    }

    function indexedFormulaArrays($formulaArrays) {
        return array_map('indexedFormulaArray', $formulaArrays) ;
    }
    // --------------------------------------------
    return indexedFormulaArrays(fillDateGapsAllEnergyData($formulaRecord, $formulaEnergyRecords)[0]) ;


    
}

print_r(json_encode(calculateFormulas(getEnergyDataFormula(splitFormula(base64Decode(getMstFormulaRecord())))))) ;

?>
