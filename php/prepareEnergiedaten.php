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
//    4.1 Create function isIdentifier(element)
//    4.2 Create function getIdentifiers(formulaArray)
//        4.2.1 Return filter over formula with isIdentifier
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
function getMstFormulaRecords($nameDB) {
    $query = "SELECT * FROM MessstellenBerechnungsformeln " ;
    return queryDB(connectToDB($nameDB), $query, "read") ;
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

// SOME SUPER FUNCTION

// Retrieves identifiers of formula array
// USE actionOn and return full records !
function getIdentifiers($formulaArray) {
    function isIdentifier($element) {
        return count(splitUnderline($element)) === 2 ;
    }
    return array_filter($formulaArray, 'isIdentifier') ;
}

// Query mst energy data
function getEnergyData($nameDB, $mstID) {
    $query = "SELECT * FROM MessstellenEnergiedaten " ;
    $query .= "WHERE mst_ID = ".$mstID ;
    return queryDB(connectToDB($nameDB), $query, "read") ;
}

// END SUPER FUNCTION

print_r(splitFormulas(base64DecodeFormulas(getMstFormulaRecords("012_spiess")))) ;

?>
