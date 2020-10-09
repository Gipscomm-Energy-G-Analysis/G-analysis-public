<?php

include('top-cache.php') ;
error_reporting (-1) ;
ini_set ('display_errors', 'On') ;

require 'DbOperations.php' ;
require 'Matex.php' ;

// SET DB
// ------
const nameDB = "012_spiess" ;

// CONNECT TO DB
$GLOBALS["connect"] = connectToDB(nameDB) ;

// SET VIRTUAL MEASUREMENT POINT
// -----------------------------
const mstID = 110 ;

// SET START AND END DATE FOR CALCULATION
// ------------------------------
const startDate = "2019-02-15 11:15:00.000" ;
const endDate =  "2019-05-15 11:15:00.000" ;

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

// -----------------------------
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
    $element = splitUnderline($identifier)[0] ;

    return $element !== "("
    && $element !== ")"
    && $element !== "+"
    && $element !== "-"
    && $element !== "*"
    && $element !== "/" ;
}

function isIndexedMst($element) {
    return isMst($element[1]) ;
}

function isNotMst($ident) {
    return !isMst($ident) ;
}

function isNotIndexedMst($element) {
    return !isIndexedMst($element) ;
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
        array_push($dataMsts, queryDB($GLOBALS["connect"], $query, "read")) ;
    }

    return [$formulaRecord, $dataMsts] ;
}

// Calculates Level-1 Formulas
function prepareForCalculation($records) {

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

    function equalLength($formulaRecords, $energyRecords) {
        return count($formulaRecords) === count($energyRecords) ;
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

        $energyRecords = multiplyConvFactorsAllRecords($energyRecords) ;
        $transposedEnergyRecords = flipDiagonally($energyRecords) ;
        return [$formulaRecords, $transposedEnergyRecords] ;
    }

    return fillDateGapsAllEnergyData($formulaRecord, $formulaEnergyRecords) ;
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

    function replaceFormula($formulaRecord, $energyRecord) {

        $formulaArray = getFormula($formulaRecord) ;

        // separate formula parts
        $mstsFormula = array_filter($formulaArray, "isMst") ;

        // replace msts with values
        $mstsValues = array_map("assignToValue", $mstsFormula, $energyRecord) ;

        // re-assign Value property
        $formulaRecord["Value"] = array_flatten($mstsValues) ;
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

    function dateTimeToString($dateObject) {
        return $dateObject->format('Y-m-d H:i:s.u') ;
    }

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

    return queryDB($GLOBALS["connect"], buildQuery($records), "write") ;
}

$start = hrtime(true) ;

writeToDB(calculateFormulas(prepareForCalculation(getEnergyDataFormula(splitFormula(base64Decode(getMstFormulaRecord())))))) ;

closeDbConn($GLOBALS["connect"]) ;

unset($GLOBALS["connect"]) ;

$end = hrtime(true) ;

echo "    Execution Time : ".(($end - $start) / 1000000000) ;

?>
