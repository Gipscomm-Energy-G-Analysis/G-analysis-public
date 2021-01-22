<?php

include('top-cache.php') ;
error_reporting (-1) ;
ini_set ('display_errors', 'On') ;

require 'helpers.php' ;
require 'DbOperations.php' ;
require 'EMail_swift.php';

define("connGipscomm", connectToDB("gipscomm")) ;

function writeUpdateStartingPointPath() {

    define("nameDB", $_POST['nameDB']) ;
    define("mstID", $_POST['mstID']) ;

    function nextDates() {
        $date = getdate() ;

        $year = $date["year"] ;
        $month = prependZero($date["mon"]) ;
        $day = prependZero($date["mday"]) ;
        $hours = prependZero($date["hours"] - 2) ;
        $hoursAdjusted = "" ;
        $minutes = prependZero($date["minutes"]) ;
        $minutesAdjusted = "" ;

        if ((int)$minutes > 45) {
            $hoursAdjusted = prependZero($date["hours"] + 1) ;
            $minutesAdjusted = "00" ;
        }
        elseif ((int)$minutes > 30) {
            $hoursAdjusted = $hours ;
            $minutesAdjusted = "45" ;
        }
        elseif ((int)$minutes > 15) {
            $hoursAdjusted = $hours ;
            $minutesAdjusted = "30" ;
        }
        else {
            $hoursAdjusted = $hours ;
            $minutesAdjusted = "15" ;
        }


        $current = $year."-".$month."-".$day." ".$hoursAdjusted.":".$minutesAdjusted.":00.000000" ;
        $nextDate = add15min($current) ;

        return [$current, $nextDate] ;
    }

    function setGetProperties($startDate, $endDate) {
        $string = "?nameDB=".nameDB ;
        $string .= "&mstID=".mstID ;
        $string .= "&startDate=".$startDate ;
        $string .= "&endDate=".$endDate ;

        return $string ;
    }

    function setScriptPath($dates) {
        return [ prepareEnergiedatenPath().setGetProperties(head($dates), last($dates))."', 'startupdate" ] ;
    }
    // Version for main page
    //
    // see prepareEnergiedatenPath() in helpers.php

    return pipe(
              [ nextDates()
              , 'setScriptPath'
              , 'writePathsToDB'
              ]
          )[2] ;
}

function writeHistoryPaths() {

    define("nameDB", $_POST['nameDB']) ;
    define("connMandant", connectToDB(nameDB)) ;
    define("mstID", $_POST['mstID']) ;
    define("formula", $_POST['formula']) ;

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
        return queryDB(connMandant, $query, "read")[0]["Time"] ;
    }

    function getLastDate($mstID) {
        $query = queryHead($mstID)." ORDER BY Time DESC " ;
        return queryDB(connMandant, $query, "read")[0]["Time"] ;
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
        $string .= "&mstID=".mstID ;
        $string .= "&startDate=".$startDate ;
        $string .= "&endDate=".$endDate ;

        return $string ;
    }

    function setScriptPath($startDate, $endDate) {
        return prepareEnergiedatenPath().setGetProperties($startDate, $endDate)."', 'history" ;
    }
    // Version for main page
    //
    // see prepareEnergiedatenPath() in helpers.php

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
        array_push($records, setScriptPath($date, $to)) ;

        return $records ;
    }

    return pipe(
              [ prepareScriptPaths(formula)
              , 'writePathsToDB'
              ]
          )[1] ;

    closeDbConn(connMandant) ;
}

function writeUpdatePaths() {

    function prepareEnergiedatenArguments() {

        function lastDate($conn, $tbl, $mstID) {
            $query = "SELECT TOP(1) Time FROM ".$tbl." " ;
            $query .= "WHERE mst_ID = ".$mstID." " ;
            $query .= "ORDER BY Time DESC " ;

            $result = queryDB($conn, $query, "read") ;
            $retVal = "" ;

            if (empty($result)) {
               $retVal = $retVal ;
            } elseif (gettype(head($result)["Time"]) === "string") {
               $retVal = head($result)["Time"] ;
            } else {
               $retVal = dateTimeToString(head($result)["Time"]) ;
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

        function extractTimeIntervals($conn, $mstIDs) {
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
                if (head($timeInterval) === "" || last($timeInterval) === ""
                    || head($timeInterval) === last($timeInterval)) {
                    $arguments = $arguments ;
                }
                else {
                    foreach ($mstIDs as $mstID) {
                      array_push($arguments,
                      assembleArgument($nameDB, $mstID, head($timeInterval), last($timeInterval))) ;
                    }
                }
            }

            closeDbConn($conn) ;

            return $arguments ;

        }

        function mapGetArguments($dbs) {
            return array_map('getArguments', $dbs) ;
        }

        function filterNotEmpty($arguments) {
            return array_filter($arguments, 'notEmpty') ;
        }

        function flattenArguments($args) {
            return call_user_func_array('array_merge', $args) ;
        }

        return pipe(
            [ getActiveCustomerDBs()
            , 'mapGetArguments'
            , 'filterNotEmpty'
            , 'flattenArguments'
            ]
        )[3] ;
    }

    function assembleScriptPaths($arguments) {

        function setGetProperties($args) {
            $string = "?nameDB=".$args["nameDB"] ;
            $string .= "&mstID=".$args["mstID"] ;
            $string .= "&startDate=".$args["startDate"] ;
            $string .= "&endDate=".$args["endDate"] ;

            return $string ;
        }

        function setScriptPath($args) {
            return prepareEnergiedatenPath().setGetProperties($args)."', 'update" ;
        }
        // Version for main page
        //
        // see prepareEnergiedatenPath() in helpers.php

        return empty($arguments) ? $arguments : array_map('setScriptPath', $arguments) ;
    }

    return pipe(
              [ prepareEnergiedatenArguments()
              , 'assembleScriptPaths'
              , 'writePathsToDB'
              ]
          )[2] ;
}

function testIfDataInDB($mode, $records) {

    define('records', $records) ;

    function buildWhereString($last, $current) {
        return $last."OR pathScript = '".$current."' " ;
    }

    function buildWheresString($records) {
        return substr(array_reduce($records, 'buildWhereString'), 2) ;
    }

    function queryData() {
        $query = "SELECT * FROM phpScriptsToExecute " ;
        $query .= "WHERE ".buildWheresString(records) ;

        return queryDB(connGipscomm, $query, "read") ;
    }

    function deleteInsertedData() {
        $query = "DELETE FROM phpScriptsToExecute " ;
        $query .= "WHERE ".buildWheresString(records) ;

        queryDB(connGipscomm, $query, "read") ;
    }

    function sendAlertEmail($mode_) {

        $empfaenger = "sdm@energie-gipscomm.de" ;
        $betreff = "Berechnete Messstellen Warteschlange konnte nicht geschrieben werden. (G-Analysis)" ;
        $emailText = "" ;

        if ($mode_ === "history") {
            $emailText = "Dies betrifft die mst_ID = ".mstID." <br><br>" ;
        }
        else {
            $emailText = "Dies betrifft die Pfade...<br><br>" ;
        }

        $emailText .= "Start Skript = ".records[0]." <br><br> " ;
        $emailText .= "End Skript = ".records[count(records) - 1]." <br><br>" ;

        eMail($empfaenger, $betreff, $emailText) ;
    }

    function alertIfNeccessary($mode_, $sameLength) {
        if (!$sameLength) {
            print_r("FALSE") ;
            deleteInsertedData() ;
            sendAlertEmail($mode_) ;
        }
        else {
            print_r("TRUE") ;
        }
        return !$sameLength ;
    }

    $retVal = true ;

    if (empty(records)) {
        print_r("TRUE") ;
        $retVal = $retVal ;
    }
    else {
        $retVal = alertIfNeccessary($mode, equalLength(records, queryData())) ;
    }
    return $retVal ;
}

if ($_GET["mode"] === "history") {
    testIfDataInDB("history", writeHistoryPaths()) ;
}
elseif ($_GET["mode"] === "startupdate") {
    testIfDataInDB("history", writeUpdateStartingPointPath()) ;
}
else {
    testIfDataInDB("update", writeUpdatePaths()) ;
}

closeDbConn(connGipscomm) ;

?>
