<?php

include('top-cache.php') ;
error_reporting (-1) ;
ini_set ('display_errors', 'On') ;

require 'helpers.php' ;
require 'DbOperations.php' ;
require 'EMail_swift.php';

const nameDB = $_POST['nameDB'] ;
$GLOBALS["connMandant"] = connectToDB(nameDB) ;
const formula = $_POST['formula'] ;
const mstID = $_POST['mstID'] ;

function isMst($identifier) {
    return splitUnderscore($identifier)[0] === "mst" ;
}

function getID($identifier) {
    return splitUnderscore($identifier)[1] ;
}

function splitFormula($formula) {
    return splitSpace($formula) ;
}

function getMstIDArray($formula) {
    return array_map('getID', array_filter(splitFormula($formula), 'isMst')) ;
}

function queryHead($mstID) {
    $query = "SELECT TOP(1) Time FROM MessstellenEnergiedaten " ;
    $query .= "WHERE mst_ID = ".$mstID." " ;

    return $query ;
}

function getFirstDate($mstID) {
    $query = queryHead($mstID)." ORDER BY Time " ;
    return queryDB($GLOBALS["connMandant"], $query, "read")["Time"] ;
}

function getLastDate($mstID) {
    $query = queryHead($mstID)." ORDER BY Time DESC " ;
    return queryDB($GLOBALS["connMandant"], $query, "read")["Time"] ;
}

function getFirstDates($formula) {
    return array_map('getFirstDate', getMstIDArray($formula)) ;
}

function getLastDates($formula) {
    return array_map('getLastDate', getMstIDArray($formula)) ;
}

function getStartDate($formula) {
    return sortDates(getFirstDates($formula))[0] ;
}

function getEndDate($formula) {
    $dates = getLastDates($formula) ;
    $lastIdx = count($dates) - 1 ;

    return sortDates($dates)[$lastIdx] ;
}

function setGetProperties($startDate, $endDate) {
    $string = "?nameDB=".nameDB ;
    $string = "&mstID=".mstID ;
    $string .= "&startDate=".$startDate ;
    $string .= "&endDate=".$endDate ;

    return $string ;
}

function setScriptPath($startDate, $endDate) {
    $path = "php/prepareEnergiedaten.php" ;
    $path .= setGetProperties($startDate, $endDate) ;

    return $path ;
}

function prepareScriptPaths($formula) {
    $from = getStartDate($formula) ;
    $to = getEndDate($formula) ;
    $date = $from ;
    $records = [] ;
    while (addTwoMonth($date) < $to) {
        $startDate = $date ;
        $endDate = addTwoMonth($startDate) ;
        $date = $endDate ;

        array_push($records, setScriptPath($startDate, $endDate)) ;
    }
    $allRecords = array_push($records, setScriptPath($date, $to)) ;

    return $allRecords ;
}

function buildValueString($last, $current) {
    return $last.", ('".$current."')" ;
}

function writeToDB($records) {

    $query = "INSERT INTO phpScriptsToExecute (pathScript) " ;
    $query .="VALUES ".substr(array_reduce($records, 'buildValueString'), 1) ;

    queryDB(connectToDB("gipscomm"), $query, "write") ;

    return $records ;
}

function buildWhereString($last, $current) {
    return $last."OR pathScript = '".$currentm."' " ;
}

function testIfDataInDB($records) {

    $initialRecords = $records ;

    function queryData($records_) {
        $query = "SELECT * FROM phpScriptsToExecute " ;
        $query .= "WHERE ".substr(array_reduce($records_, 'buildWhereString'), 1) ;

        return queryDB(connectToDB("gipscomm"), $query, "read") ;
    }

    function sendAlertEmail() {

        $empfaenger = "sdm@energie-gipscomm.de" ;

        $betreff = "Berechnete Messstellen Warteschlange konnte nicht geschrieben werden. (G-Analysis)" ;

        $emailText = "Dies betrifft die mst_ID = ".mstID." <br><br>" ;
        $emailText .= "Zeitbereich = ".$records[0]." - ".$records[count($records) - 1]." <br><br>" ;

        eMail($empfaenger, $betreff, $emailText) ;
    }

    function alertIfNeccessary($sameLength) {
        if (!$sameLength) {
            print_r("FALSE") ;
            sendAlertEmail() ;
        }
        else {
            print_r("TRUE") ;
        }
        return !$sameLength ;
    }

    return alertIfNeccessary(equalLength($initialRecords, queryData())) ;
}

pipe(
    [ prepareScriptPaths(formula)
    , 'writeToDB'
    , 'testIfDataInDB'
    ]
) ;

?>
