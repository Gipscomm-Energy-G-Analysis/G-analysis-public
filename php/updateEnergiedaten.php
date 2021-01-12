<?php

set_time_limit(0) ;

include('top-cache.php') ;
// error_reporting (-1) ;
// ini_set ('display_errors', 'On') ;

require 'helpers.php' ;
require 'DbOperations.php' ;

function prepareEnergiedatenArguments($db) {

    function lastDateCalcMst($db) {
        $query = "SELECT TOP(1) Time FROM berechneteEnergiedaten " ;
        $query += "ORDER BY Time DESC " ;
        return queryDB(connectToDB($db), $query, "read")["Time"] ;
    }

    function lastDateEnergyData($db) {
        $query = "SELECT TOP(1) Time FROM MessstellenEnergiedaten " ;
        $query += "ORDER BY Time DESC " ;
        return queryDB(connectToDB($db), $query, "read")["time_de"] ;
    }

    function getBerechneteMsts($db) {
        $query = "SELECT * FROM MessstellenBerechnungsformeln " ;
        return queryDB(connectToDB($db), $query, "read") ;
    }

}
