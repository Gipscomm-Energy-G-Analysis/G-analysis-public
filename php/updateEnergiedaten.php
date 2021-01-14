<?php

set_time_limit(0) ;

include('top-cache.php') ;
// error_reporting (-1) ;
// ini_set ('display_errors', 'On') ;

require 'helpers.php' ;
require 'DbOperations.php' ;

function prepareEnergiedatenArguments() {

    function lastDate($db, $tbl) {
        $query = "SELECT TOP(1) Time FROM ".$tbl." " ;
        $query .= "ORDER BY Time DESC " ;
        $result = queryDB(connectToDB($db), $query, "read") ;
        $retVal = "" ;

        if (count($result) === 0) {
           $retVal = $retVal ;
        } elseif (gettype($result[0]["Time"]) === "string") {
           $retVal = $result[0]["Time"] ;
        } else {
           $retVal = dateTimeToString($result[0]["Time"]) ;
        }
        return $retVal ;
    }

    function lastDateCalcMst($db) {
        return lastDate($db, "berechneteEnergiedaten") ;
    }

    function lastDateEnergyData($db) {
        return lastDate($db, "MessstellenEnergiedaten") ;
    }

    function getID($record) {
        return $record["mst_ID"] ;
    }

    function getBerechneteMstIDs($db) {
        $query = "SELECT * FROM MessstellenBerechnungsformeln " ;
        return array_map('getID', queryDB(connectToDB($db), $query, "read")) ;
    }

    function extractTimeInterval($db) {
        return [ lastDateCalcMst($db), lastDateEnergyData($db) ] ;
    }

    $dbs = getActiveCustomerDBs() ;

    $timeIntervals = array_map('extractTimeInterval', $dbs) ;

    $msts = array_map('getBerechneteMstIDs', $dbs) ;

    return $msts ;

}

$start = hrtime(true) ;

print_r(json_encode(prepareEnergiedatenArguments())) ;

$end = hrtime(true) ;

echo "    Execution Time : ".(($end - $start) / 1000000000) ;
