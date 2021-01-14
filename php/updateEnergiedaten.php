<?php

set_time_limit(0) ;

include('top-cache.php') ;
// error_reporting (-1) ;
// ini_set ('display_errors', 'On') ;

require 'helpers.php' ;
require 'DbOperations.php' ;

function prepareEnergiedatenArguments($db) {

    function lastDate($db, $tbl) {
        $query = "SELECT TOP(1) Time FROM ".$tbl." " ;
        $query += "ORDER BY Time DESC " ;
        $retVal = queryDB(connectToDB($db), $query, "read")
        return count($retVal) === 0 ? false : $retVal["Time"] ;
    }

    function lastDateCalcMst($db) {
        return lastDate($db, "berechneteEnergiedaten") ;
    }

    function lastDateEnergyData($db) {
        return lastDate($db, "MessstellenEnergiedaten") ;
    }

    function getBerechneteMsts($db) {
        $query = "SELECT * FROM MessstellenBerechnungsformeln " ;
        return queryDB(connectToDB($db), $query, "read") ;
    }

    function extractTimeInterval($db) {
        return [ lastDateCalcMst($db), lastDateEnergyData($db) ] ;
    }

    $dbs = getActiveCustomerDBs() ;

    $timeIntervals = array_map('extractTimeInterval', $dbs) ;

}
