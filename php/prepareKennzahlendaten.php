<?php

set_time_limit(0) ;

include('top-cache.php') ;
error_reporting (-1) ;
ini_set ('display_errors', 'On') ;

require 'helpers.php' ;
require 'DbOperations.php' ;
require 'EMail_swift.php';

define("connect", connectToDB($_GET['nameDB'])) ;
define("artikelnummer", $_GET['artikelnummer']) ;

function flatten($arr) {
    return gettype($arr) === "array" ?
           array_reduce($arr, 'array_merge', []) :
           $arr ;
}

function queryProdData($artikelnummer) {
    $query = "SELECT * FROM ProdData_ " ;
    $query .= "WHERE artikelnummer = '".$artikelnummer."' " ;
    $query .= "AND auftrag <> '' " ;
    $query .= "AND (gutmenge + ausschuss) > 0 " ;
    $query .= "AND (auftrag = '000995340020' OR auftrag = '000995350020' OR auftrag = '000995370020' OR auftrag = '000995380020') " ;
    $query .= "ORDER BY auftrag, zeitstempel " ;

    return queryDB(connect, $query, "read") ;
}

function getOrders($records) {

    $GLOBALS['records'] = $records ;

    function extractOrderNr($record) {
        return $record["auftrag"] ;
    }

    function extractOrderNrs($records_) {
        return pipe(
            [ array_map('extractOrderNr', $records_)
            , 'array_unique'
            , 'array_values'
            ]
        )[2] ;
    }

    function matchAuftrag($orderNr, $auftrag) {
        return $orderNr === $auftrag ;
    }

    function getOrderRecords($orderNr) {
        $retArr = [] ;
        foreach ($GLOBALS['records'] as $record) {
            if (matchAuftrag($orderNr, $record["auftrag"])) {
                array_push($retArr, $record) ;
            }
        }

        return $retArr ;
    }

    function buildOrderArrays($orderNrs) {
        return array_map('getOrderRecords', $orderNrs) ;
    }

    return buildOrderArrays(extractOrderNrs($records)) ;

}

function prepareOrders($records) {

    function sumCycleTime($tot, $record) {
        return $tot + $record["zykluszeit"] ;
    }

    function getAverage($recordsOrder) {
        return array_reduce($recordsOrder, 'sumCycleTime') / count($recordsOrder) ;
    }

    function getAverageCycletimes($records_) {
        return array_map('getAverage', $records_) ;
    }

    function getStartDates($records_) {
        return array_map('head', $records_) ;
    }

    function zipStartEndDates($records_) {
        return array_map('startEndDates', getStartDates($records_), getEndDates($records_)) ;
    }

    function getEndDates($records_) {
        return array_map('last', $records_) ;
    }

    function startEndDates($date1, $date2) {
        return [$date1, $date2] ;
    }

    function getMstID($record) {
        return $record["mstID"] ;
    }

    function getMstsOrder($records_) {

        return pipe(
            [ array_map('getMstID', $records_)
            , 'array_unique'
            , 'array_values'
            ]
        )[2] ;
    }

    function extractMstsOrders($records_) {
        return array_map('getMstsOrder', $records_) ;
    }

    function createRecords($mstsOrders_, $startEndDates_, $averageCycletimes_) {
        $prepareRecords = [] ;
        $recordsOrders = [] ;
        for($i = 0; $i < count($mstsOrders_); $i++) {
            foreach ($mstsOrders_[$i] as $mst) {
                array_push($prepareRecords,
                    [ "mst_ID" => $mst
                    , "anl_ID" => $startEndDates_[$i][1]["anl_ID"]
                    , "nameMSt" => $startEndDates_[$i][1]["nameMSt"]
                    , "anlageMst" => $startEndDates_[$i][1]["anlageMst"]
                    , "maschinenID" => $startEndDates_[$i][1]["maschinenID"]
                    , "maschine" => $startEndDates_[$i][1]["maschine"]
                    , "maschinentyp" => $startEndDates_[$i][1]["maschinentyp"]
                    , "auftrag" => $startEndDates_[$i][1]["auftrag"]
                    , "artikelnummer" => $startEndDates_[$i][1]["artikelnummer"]
                    , "werkzeug" => $startEndDates_[$i][1]["werkzeug"]
                    , "sollmenge" => $startEndDates_[$i][1]["sollmenge"]
                    , "gesamtmenge" => $startEndDates_[$i][1]["gutmenge"] + $startEndDates_[$i][1]["ausschuss"]
                    , "gutmenge" => $startEndDates_[$i][1]["gutmenge"]
                    , "ausschuss" => $startEndDates_[$i][1]["ausschuss"]
                    , "nester" => $startEndDates_[$i][1]["nester"]
                    , "timeUnlock" => dateTimeToString($startEndDates_[$i][0]["zeitstempel"])
                    , "timeClose" =>dateTimeToString($startEndDates_[$i][1]["zeitstempel"])
                    , "zykluszeit" => $averageCycletimes_[$i]
                    , "auftrag" => $startEndDates_[$i][1]["auftrag"]
                    , "verbrauchAuftrag" => 0
                    ]
                ) ;
            }
            array_push($recordsOrders, $prepareRecords) ;
            $prepareRecords = [] ;
        }
        return $recordsOrders ;
    }

    $mstsOrders = extractMstsOrders($records) ;
    $startEndDates = zipStartEndDates($records) ;
    $averageCycletimes = getAverageCycletimes($records) ;

    return createRecords($mstsOrders, $startEndDates, $averageCycletimes) ;
}

function getEnergyDataOrders($records) {
    function getEnergyData($record) {

        $query = "SELECT mst_ID, Name, SUM(Value / 4 * ConvFactor) AS Value " ;
        $query .= "FROM MessstellenEnergiedaten " ;
        $query .= "WHERE mst_ID = ".$record["mst_ID"]." " ;
        $query .= "AND CONVERT(varchar(50), Time, 121) BETWEEN '".$record["timeUnlock"]."' AND '".$record["timeClose"]."' " ;
        $query .= "GROUP BY mst_ID, Name " ;

        return queryDB(connect, $query, "read") ;
    }

    function getEnergyDatas($records) {
        return flatten(array_map('getEnergyData', $records)) ;
    }

    function getEnergyDatasOrders($records) {
        return array_map('getEnergyDatas', $records) ;
    }

    function sumEnergyData($tot, $record) {
        return $tot + $record["Value"] ;
    }

    function getSumEnergyDataOrders($records) {

        return gettype($records) === "array" ?
               array_reduce($records, 'sumEnergyData') :
               $records["Value"] ;
    }

    function createOrderRecord($recordEnergy, $recordOrder) {
        $recordOrder[0]["verbrauchAuftrag"] = $recordEnergy ;
        return $recordOrder[0] ;
    }

    function createEnergyDataOrderRecords($records) {
        $sumsEnergyData = array_map('getSumEnergyDataOrders', getEnergyDatasOrders($records)) ;

        return array_map('createOrderRecord', $sumsEnergyData, $records) ;
    }

    return createEnergyDataOrderRecords($records) ;
}

function writeToDB($records) {
    function buildValueString($last, $record) {
        $verbrauchAuftrag =
            $record["verbrauchAuftrag"] === "" || $record["verbrauchAuftrag"] == null ?
            0 : $record["verbrauchAuftrag"] ;

        return $last.", ("
        .$record["anl_ID"].", '"
        .$record["anlageMst"]."', '"
        .$record["maschinenID"]."', '"
        .$record["maschine"]."', '"
        .$record["maschinentyp"]."', '"
        .$record["auftrag"]."', '"
        .$record["artikelnummer"]."', '"
        .$record["werkzeug"]."', "
        .$record["sollmenge"].", "
        .$record["gesamtmenge"].", "
        .$record["gutmenge"].", "
        .$record["ausschuss"].", "
        .$record["nester"].", '"
        .$record["timeUnlock"]."', '"
        .$record["timeClose"]."', "
        .$record["zykluszeit"].", "
        .$verbrauchAuftrag.")" ;
    }

    function buildValuesString($records_) {
        return substr(array_reduce($records_, 'buildValueString'), 1) ;
    }

    function buildQuery($records_) {
            $query = "INSERT INTO ProdData (anl_ID, anlageMst, maschinenID, maschine, maschinentyp, auftrag, artikelnummer, werkzeug, sollmenge, gesamtmenge, gutmenge, ausschuss, nester, timeUnlock, timeClose, zykluszeit, verbrauchAuftrag) " ;
            $query .= "VALUES ".buildValuesString($records_)." "  ;

            return $query ;
    }

    queryDB(connect, buildQuery($records), "write") ;

    return $records ;
}

function testIfDataInDB($records) {

    $initialRecords = $records ;

    function queryData() {
        $query = "SELECT * FROM ProdData " ;
        $query .= "WHERE mst_ID = ".mstID." " ;
        $query .= "AND CONVERT(varchar(50), Time, 121 ) BETWEEN CONVERT(varchar(50), '".add15min(startDate)."', 121) AND CONVERT(varchar(50), '".add15min(endDate)."', 121) " ;
        $query .= "ORDER BY Time " ;

        return queryDB(connect, $query, "read") ;
    }

    function deleteInsertedData() {
        $query = "DELETE FROM berechneteEnergiedaten " ;
        $query .= "WHERE mst_ID = ".mstID." " ;
        $query .= "AND CONVERT(varchar(50), Time, 121 ) BETWEEN CONVERT(varchar(50), '".add15min(startDate)."', 121) AND CONVERT(varchar(50), '".add15min(endDate)."', 121) " ;

        queryDB(connect, $query, "read") ;
    }

    function setExecuted($bool) {

        $conn = connectToDB("gipscomm") ;

        $query = "UPDATE phpScriptsToExecute " ;
        $query .= "SET dateExec = '".dateNow()."', executed = '".$bool."' " ;
        $query .= "WHERE pathScript= '".getURL()."'" ;

        queryDB($conn, $query, "write") ;

        closeDbConn($conn) ;
    }

    function sendAlertEmail() {

        $empfaenger = "sdm@energie-gipscomm.de" ;

        $betreff = "Berechnete Energiedaten Konnten nicht in DB geschrieben werden. (G-Analysis)" ;

        $emailText = "Letzter Datensatz : <br><br>" ;
        $emailText .= getURL() ;

        eMail($empfaenger, $betreff, $emailText) ;
    }

    function alertIfNeccessary($sameLength) {
        if (!$sameLength) {
            setExecuted("false") ;
            deleteInsertedData() ;
            sendAlertEmail() ;
            print_r(" FALSE ") ;
        }
        else {
            setExecuted("true") ;
            print_r(" TRUE ") ;
        }
        return !$sameLength ;
    }

    return alertIfNeccessary(equalLength($initialRecords, queryData())) ;
}

$start = hrtime(true) ;

// Test if data in DB has to be still implemented
pipe(
    [ queryProdData(artikelnummer)
    , 'getOrders'
    , 'prepareOrders'
    , 'getEnergyDataOrders'
    , 'writeToDB'
    ]
) ;

closeDbConn(connect) ;

$end = hrtime(true) ;

echo "    Execution Time : ".(($end - $start) / 1000000000) ;

// https://g-analysis.com/testwebsite3/php/prepareKennzahlendaten.php?nameDB=002_badber&artikelnummer=100899404



?>
