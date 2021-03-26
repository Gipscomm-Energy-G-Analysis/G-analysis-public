<?php
error_reporting( -1 ) ;
ini_set ( 'display_errors', 'On' ) ;

require 'DbOperations.php';
require 'EMail_swift.php';
require 'helpers.php';

define("connGipscomm", connectToDB("gipscomm")) ;

function mstsInvalidDate($db) {

    $query  = "SELECT '$db' AS db, div1.mst_ID, nameMSt AS Name FROM " ;
    $query .= "	    (SELECT mst_ID, nameMSt FROM messstellen " ;
    $query .= "	    WHERE messartMst = 'automatisch') AS div1 " ;
    $query .= "LEFT JOIN " ;
    $query .= "	    (SELECT mst_ID, Name FROM " ;
    $query .= "		   (SELECT TOP (5000) mst_ID, Name " ;
    $query .= "		   FROM MessstellenEnergiedaten " ;
    $query .= "		   WHERE CONVERT(varchar(10),Time,21) = CONVERT(varchar(10), getdate(), 21) " ;
    $query .= "		   ) AS div2 " ;
    $query .= "	    GROUP BY mst_ID, Name) As div3 " ;
    $query .= "ON div1.mst_ID = div3.mst_ID " ;
    $query .= "WHERE Name IS NULL " ;
    $query .= "ORDER BY div1.mst_ID " ;

    return queryDB(connectToDB($db) , $query, "read") ;

}

function mstsDbsWithInvalidDate($dbs) {
    return array_map('mstsInvalidDate', $dbs) ;
}

function sendAlertEmails($mstWithoutData) {

    function buildStringMst($acc, $mst) {
        return $acc."DB Kunde: ".$mst["db"].", mst_ID: ".$mst["mst_ID"].", Name: ".$mst["Name"]."<br><br>" ;
    }

    function buildStringMstsDB($msts) {
        return array_reduce($msts, 'buildStringMst') ;
    }

    function buildStringDBs($acc, $mstsDbs) {
        return $acc.buildStringMstsDB($mstsDbs) ;
    }

    function buildStringMstsDBs($mstsDbs) {
        return array_reduce($mstsDbs, 'buildStringDBs') ;
    }

    print_r (buildStringMstsDBs($mstWithoutData)) ;

    // $empfaenger = [ "sdm@energie-gipscomm.de"
    //               , "info@energie-gipscomm.de"
    //               , "tmm@energie-gipscomm.de"
    //               , "cmu@energie-gipscomm.de"
    //               ] ;
    //
    // $betreff = "Daten kommen nicht mehr an (G-Analysis)" ;
    //
    // $emailText = "Bei folgenden Kunden kommen keine Daten mehr an : <br><br>" ;
    //
    // for($j = 0; $j < count($haveOldData); $j++) {
    //     $emailText .= "Kunde: ".$haveOldData[$j][0]." - Datum des letzten Datensatzes: ".$haveOldData[$j][1]."<br>" ;
    // }
    //
    // eMail($empfaenger[0], $betreff, $emailText) ;
    // eMail($empfaenger[1], $betreff, $emailText) ;
    // eMail($empfaenger[2], $betreff, $emailText) ;
    // eMail($empfaenger[3], $betreff, $emailText) ;
}

// $output = outputState($recordsDB) ;
//
// if(count($output) > 0) {
//     sendAlertEmails($output) ;
// }
// else {
//     echo "All data is up-to-date !" ;
// }

//
$start = hrtime(true) ;

pipe(
    [ getActiveCustomerDBs()
    , 'mstsDbsWithInvalidDate'
    , 'sendAlertEmails'
    ]
) ;

$end = hrtime(true) ;

echo "    Execution Time : ".(($end - $start) / 1000000000) ;

?>
