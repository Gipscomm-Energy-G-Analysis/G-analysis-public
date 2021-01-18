<?php

include('top-cache.php') ;
error_reporting (-1) ;
ini_set ('display_errors', 'On') ;

require 'helpers.php' ;
require 'DbOperations.php' ;
require 'EMail_swift.php';

define("connGipscomm", connectToDB("gipscomm")) ;

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
        return prepareEnergiedatenPath().setGetProperties($startDate, $endDate) ;
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

    function buildWhereString($last, $current) {
        return $last."OR pathScript = '".$current."' " ;
    }

    function buildWheresString($records) {
        return substr(array_reduce($records, 'buildWhereString'), 2) ;
    }

    function testIfDataInDB($records) {

        define('records', $records) ;

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

        function sendAlertEmail() {

            $empfaenger = "sdm@energie-gipscomm.de" ;

            $betreff = "Berechnete Messstellen Warteschlange konnte nicht geschrieben werden. (G-Analysis)" ;

            $emailText = "Dies betrifft die mst_ID = ".mstID." <br><br>" ;
            $emailText .= "Start Skript = ".records[0]." <br><br> " ;
            $emailText .= "End Skript = ".records[count(records) - 1]." <br><br>" ;

            eMail($empfaenger, $betreff, $emailText) ;
        }

        function alertIfNeccessary($sameLength) {
            if (!$sameLength) {
                print_r("FALSE") ;
                deleteInsertedData() ;
                sendAlertEmail() ;
            }
            else {
                print_r("TRUE") ;
            }
            return !$sameLength ;
        }

        return alertIfNeccessary(equalLength(records, queryData())) ;
    }

    pipe(
        [ prepareScriptPaths(formula)
        , 'writePathsToDB'
        , 'testIfDataInDB'
        ]
    ) ;

    closeDbConn(connMandant) ;
}

function writeUpdatePaths() {

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
            return prepareEnergiedatenPath().setGetProperties($args) ;
        }
        // Version for main page
        //
        // see prepareEnergiedatenPath() in helpers.php

        return array_map('setScriptPath', $arguments) ;
    }

    pipe(
        [ prepareEnergiedatenArguments()
        , 'assembleScriptPaths'
        , 'writePathsToDB'
        ]
    ) ;
}

if ($_GET["mode"] === "history") {
    writeHistoryPaths() ;
}
else {
    writeUpdatePaths() ;
}

closeDbConn(connGipscomm) ;

?>
