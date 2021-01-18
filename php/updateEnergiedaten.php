<?php

set_time_limit(0) ;

include('top-cache.php') ;
// error_reporting (-1) ;
// ini_set ('display_errors', 'On') ;

require 'helpers.php' ;
require 'DbOperations.php' ;

function prepareEnergiedatenArguments() {

    function lastDate($conn, $tbl) {
        $query = "SELECT TOP(1) Time FROM ".$tbl." " ;
        $query .= "ORDER BY Time DESC " ;

        $result = queryDB($conn, $query, "read") ;
        $time = head($result)["Time"] ;
        $retVal = "" ;

        if (empty($result)) {
           $retVal = $retVal ;
        } elseif (gettype($time) === "string") {
           $retVal = $time ;
        } else {
           $retVal = dateTimeToString($time) ;
        }
        return $retVal ;
    }

    function lastDateCalcMst($conn) {
        return lastDate($conn, "berechneteEnergiedaten") ;
    }

    function lastDateEnergyData($conn) {
        return lastDate($conn, "MessstellenEnergiedaten") ;
    }

    function getID($record) {
        return $record["mst_ID"] ;
    }

    function getMstIDs($conn) {
        $query = "SELECT * FROM MessstellenBerechnungsformeln " ;
        return array_map('getID', queryDB($conn, $query, "read")) ;
    }

    function extractTimeInterval($conn) {
        return [ lastDateCalcMst($conn), lastDateEnergyData($conn) ] ;
    }

    function assembleArgument($nameDB, $mstID, $startDate, $endDate) {
        return [ "nameDB" => $nameDB
               , "mstID" => $mstID
               , "startDate" => $startDate
               , "endDate" => $endDate
               ] ;
    }

    function getArguments($nameDB) {
        $conn = connectToDB($nameDB) ;

        $mstIDs = getMstIDs($conn) ;
        $arguments = [] ;

        if (empty($mstIDs)) {
            $arguments = $arguments ;
        } else {
            $timeInterval = extractTimeInterval($conn) ;
            foreach ($mstIDs as $mstID) {
                array_push($arguments,
                    assembleArgument($nameDB, $mstID, head($timeInterval), last($timeInterval))) ;
            }
        }

        closeDbConn($conn) ;

        return $arguments ;

    }

    return array_filter(array_map('getArguments', getActiveCustomerDBs()), 'notEmpty') ;

}

function writeToDB($arguments) {
    
}

$start = hrtime(true) ;

print_r(json_encode(prepareEnergiedatenArguments())) ;

$end = hrtime(true) ;

echo "    Execution Time : ".(($end - $start) / 1000000000) ;
