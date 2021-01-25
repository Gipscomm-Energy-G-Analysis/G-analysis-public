<?php
error_reporting( -1 ) ;
ini_set ( 'display_errors', 'On' ) ;

require 'DbOperations.php';
require 'EMail_swift.php';

$nameDB = "gipscomm" ;

$conn1 = connectToDB( $nameDB ) ;

$queryDBs = "SELECT * FROM kundenDBs " ;
$queryDBs .= "WHERE active = 'true' " ;

$recordsDB = queryDB($conn1, $queryDBs, "read") ;

function replaceCurlyBraces($string) {
    $opening = str_replace( "{", "",  $string) ;
    $closing = str_replace( "}", "",  $opening) ;

    return $closing ;
}

function below10Prepend0($strNum) {
    return (int)$strNum < 10 ? "0".$strNum : $strNum ;
}

function lastData($db) {
    $conn2 = connectToDB( "master" ) ;

    $queryDate = "SELECT TOP(1) time_de FROM [".$db['name']."].[dbo].[data_value_15m] " ;
    $queryDate .= "WHERE power IS NOT NULL " ;
    $queryDate .= "ORDER BY time_de DESC " ;

    $recordsTime = queryDB($conn2, $queryDate, "read") ;

    return [$db['name'], $recordsTime] ;
}

function outputState($dbs) {
    $noNewData = [] ;

    for($i = 0; $i < count($dbs); $i++) {
        $data = lastData($dbs[$i]) ;

        $clientName = $data[0] ;
        $timeObj = replaceCurlyBraces(json_encode($data[1][0]['time_de'])) ;
        $splittedTimeObj = explode(",", $timeObj) ;
        $datePart = explode('"date":', $splittedTimeObj[0])[1] ;
        $dateWithoutTime = substr(explode(" ", $datePart)[0], 1) ;

        $dateData = getdate() ;

        $today = $dateData['year']."-".below10Prepend0($dateData['mon'])."-".below10Prepend0($dateData['mday']) ;

        $today !== $dateWithoutTime ? array_push($noNewData, [$clientName, $dateWithoutTime]) : true ;
    }

    return $noNewData ;
}

function sendAlertEmails($haveOldData) {

    $empfaenger = [ "sdm@energie-gipscomm.de"
                  , "info@energie-gipscomm.de"
                  , "tmm@energie-gipscomm.de"
                  , "cmu@energie-gipscomm.de"
                  ] ;

    $betreff = "Daten kommen nicht mehr an (G-Analysis)" ;

    $emailText = "Bei folgenden Kunden kommen keine Daten mehr an : <br><br>" ;

    for($j = 0; $j < count($haveOldData); $j++) {
        $emailText .= "Kunde: ".$haveOldData[$j][0]." - Datum des letzten Datensatzes: ".$haveOldData[$j][1]."<br>" ;
    }

    eMail($empfaenger[0], $betreff, $emailText) ;
    eMail($empfaenger[1], $betreff, $emailText) ;
    eMail($empfaenger[2], $betreff, $emailText) ;
    eMail($empfaenger[3], $betreff, $emailText) ;
}

$output = outputState($recordsDB) ;

if(count($output) > 0) {
    sendAlertEmails($output) ;
}
else {
    echo "All data is up-to-date !" ;
}

?>
