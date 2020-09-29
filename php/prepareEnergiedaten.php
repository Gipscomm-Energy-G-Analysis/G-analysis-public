<?php

include('top-cache.php');
error_reporting (-1);
ini_set ('display_errors', 'On');

require 'DbOperations.php';

// REQUIREMENTS
// ------------
// 1. Calculated Msts formulas should be evaluated
// 2. Evaluated Msts should be written back into the database

// DESIGN
// -----------------
// 0. Helpers
//    0.1 Higher level function that applies some fn on a field of a record
//        and returns that record with the new field value
//    0.2 Function that splits a string at spaces
//    0.3 Function that splits a string at underlines
// 1. Query data of the calculated Msts from the DB view "MessstellenBerechnungsformeln"
//    1.1 Create function getMstFormulaRecords(nameDB)
//        1.1.1 Connect to db
//        1.1.2 Set query
//        1.1.3 Return query result
// 2. Base64 decode each formula
//    2.1 Create function base64DecodeFormulas(records)
//        2.1.1 Map over records and apply function actionOn(record, "Value", 'base64_decode')
// 3. Map over the records and split the formulas into their components (identifiers + operators)
//    3.1 Create function splitSpace(string)
//    3.1 Create function splitFormulas(records)
//        3.1.1 Map over records with actionOn(record, "Formula", 'splitSpace')

// 4. Map over the records and retrieve energy data from the view "MessstellenEnergiedaten"
//    for every identifier in a formula
//    4.3 Create function getEnergyData(nameDB, mstID)
//        4.3.1 Connect to db
//        4.3.2 Set query with where clause referencing mstID
//        4.3.3 Return query result
// 5. For every formula record, create a formula array with consecutive dates from some date x
//    to today
//    5.1 Create function createArray(fromDate, toDate)
// 6. For every created formula array take the energy data and adjust it to the specifications
//    of the formula array (consecutive dates -> resulting in same length)
//    6.1 Create function adjustEnergyArrays
// 7. For every created formula array replace the formula identifiers with the associated
//    energy values
//    7.1 Create function identifiersToValues
// 8. For every created formula array, evaluate the formula by using Matex
//    8.1 Create function calculateFormulas
// 9. For each formula array, write all records into the table "BerechneteEnergiedaten"
//    9.1 Create table "BerechneteEnergiedaten" with columns
//        "mstID, Name, Time, Value, ConvFactor"
//    9.2 Create function calculatedDataIntoDB

// SET DB
// ------
const nameDB = "012_spiess" ;

// SET START AND END DATE FOR CALCULATION
// ------------------------------
const startDate = "2018-07-15 02:00:00.000000" ;
const endDate = "2018-07-25 02:00:00.000000" ;

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

// -----------------------------
// Query mst formula data
function getMstFormulaRecords() {
    $query = "SELECT * FROM MessstellenBerechnungsformeln " ;
    return queryDB(connectToDB(nameDB), $query, "read") ;
}

// Function that base64 decodes all formulas
function base64DecodeFormulas($records) {
    function base64Decode($record) {
        return actionOn($record, "Formula", 'base64_decode') ;
    }
    return array_map('base64Decode', $records) ;
}

// Function that splits the formulas into their sub-parts
function splitFormulas($records) {
    function splitFormula($record) {
        return actionOn($record, "Formula", 'splitSpace') ;
    }
    return array_map('splitFormula', $records) ;
}

// Queries all the data for every formula
function getEnergyDataFormulas($records) {

    // Helpers
    function isMst($identifier) {
        return splitUnderline($identifier)[0] === "mst" ;
    }
    function isKorFac($identifier) {
        return splitUnderline($identifier)[0] === "ePrdKFE" ;
    }
    function getID($identifier) {
        return splitUnderline($identifier)[1] ;
    }

    // Query mst energy data of a formula
    function getEnergyDataFormula($formulaArray) {
        $msts = array_values(array_filter($formulaArray, 'isMst')) ;
        $mstsIDs = array_map('getID', $msts) ;

        $dataMsts = [] ;
        for ($i=0; $i < count($mstsIDs) ; $i++) {
            $query = "SELECT TOP(1) * FROM MessstellenEnergiedaten " ;
            $query .= "WHERE mst_ID = ".$mstsIDs[$i] ;
            array_push($dataMsts, queryDB(connectToDB(nameDB), $query, "read")) ;
        }
        return $dataMsts ;
    }

    // retrieves energy data of a record
    function dataRecord($record) {
        return actionOn($record, "Formula", 'getEnergyDataFormula') ;
    }

    $formulasEnergyRecords = array_map('dataRecord', $records) ;

    return [$records, $formulasEnergyRecords] ;
}

// Calculates Level-1 Formulas
function calculateFormulas($records) {

    // Assigned vars for array of mstFormulas records and energy records
    $mstFormulaRecords = $records[0] ;
    $formulaEnergyRecords = $records[1] ;

    // Helper
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

    // Returns a dateTime string from a DateTime Object
    function accessDate($date) {
        return $date->format('Y-m-d H:i:s.u') ;
    }

    // Converts the DateTime Object to a date string
    function formatDate($record) {
        return actionOn($record, "Time", 'accessDate') ;
    }


    // 2. Create formula arrays from date x to current dateTime
    function createFormulaArray($data) {
        $record = $data[0] ;
        $from = $data[1] ;
        $to = $data[2] ;
        $date = $from ;
        $formulaRecords = [] ;
        while ($date < $to) {
            $date = add15min($date) ;
            $record["Time"] = $date ;
            array_push($formulaRecords, $record) ;
        }
        return $formulaRecords ;
    }

    // 3. Prepare energy data dates
    function formatDatesEnergyData($energyData) {
        return array_map('formatDate', $energyData) ;
    }

    // 4. Replace the formula identifiers with the associated values
    function replaceFormulaIdentifiers($formulaRecord, $energyData) {
        $formulaArray = createFormulaArray([$formulaRecord, startDate, endDate]) ;

        function findRecordWithDate($formulaRecord, $energyData) {
            $date = $formulaRecord["Time"] ;
            $idx = array_search($date, array_column(formatDatesEnergyData($energyData), 'Time')) ;

            return gettype($idx) === "boolean" ?
            ["mst_ID" => $energyData[0]["mst_ID"], "Name" => $energyData[0]["Name"], "Time" => $date, "Value" => 0, "ConvFactor" => $energyData[0]["ConvFactor"]] :
            $energyData[$idx] ;
        }

        // Map over formula array and replace identifiers with time associated values

        // Change EnergyData View to
        // SELECT TOP(10000) mst_ID, Name, Time, sum(Value) AS Value, ConvFactor FROM MessstellenEnergiedaten
        // GROUP BY Time, mst_ID, Name, ConvFactor
        // ORDER BY Time, mst_ID
    }
}

getEnergyDataFormulas(splitFormulas(base64DecodeFormulas(getMstFormulaRecords()))) ;

?>
