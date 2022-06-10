<?php
error_reporting( -1 ) ;
ini_set ( 'display_errors', 'On' ) ;
set_error_handler("warning_handler", E_WARNING);

require 'DbOperations.php';
require 'EMail_PHPMailer.php';
require 'helpers.php';

function warning_handler($errno, $errstr) { 
    throw new Exception("ErrorNr : ".$errno.", ErrorDescr : ".$errstr) ;
}

define("connGipscomm", connectToDB("gipscomm")) ;

function mstsInvalidDate($db) {

    $query  = "SELECT '$db' AS db " ;
    $query .= "  , div1.mst_ID " ;
    $query .= "  , nameMSt AS Name " ;
    $query .= "  , kanal1Msm AS Channel1 " ;
    $query .= "  , kanal2Msm AS Channel2 " ;
    $query .= "  , kanal3Msm AS Channel3 FROM " ;
    $query .= "     (SELECT messstellen.mst_ID, nameMSt, kanal1Msm, kanal2Msm, kanal3Msm FROM messstellen " ;
    $query .= "	    INNER JOIN messmittel " ;
    $query .= "	    ON messstellen.mst_ID = messmittel.mst_ID " ;
    $query .= "     WHERE messartMst = 'automatisch' AND messstellen.deleted = 0 AND messmittel.deleted = 0 AND messstellen.aktivMst = 1) AS div1 " ;
    $query .= "LEFT JOIN " ;
    $query .= "	    (SELECT mst_ID, Name FROM " ;
    $query .= "		   (SELECT TOP (5000) mst_ID, Name " ;
    $query .= "		   FROM MessstellenEnergiedaten " ;
    $query .= "		   WHERE CONVERT(varchar(10),Time,21) = CONVERT(varchar(10), getdate(), 21) " ;
    $query .= "		   ) AS div2 " ;
    $query .= "	    GROUP BY mst_ID, Name) As div3 " ;
    $query .= "ON div1.mst_ID = div3.mst_ID " ;
    $query .= "WHERE Name IS NULL " ;
    $query .= "ORDER BY div1.nameMSt " ;

    $records = queryDB(connectToDB($db) , $query, "read") ;

    return indexAssocArray(gettype($records) === "string" ? [] : $records) ;
}

function mstsDbsWithInvalidDate($dbs) {
    return array_map('mstsInvalidDate', $dbs) ;
}

function sendAlertEmails($mstsWithoutData) {

    function buildStringMst($acc, $mst) {
        return $acc.
            "<tr>
                <td>".$mst["index"]."</td>
                <td>".$mst["db"]."</td>
                <td>".$mst["mst_ID"]."</td>
                <td>".$mst["Name"]."</td>
                <td>".$mst["Channel1"]."</td>
                <td>".$mst["Channel2"]."</td>
                <td>".$mst["Channel3"]."</td>
            </tr>" ;
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

    function sendMails($tblData) {

        $subject = "Daten kommen nicht mehr an (G-Analysis)" ;

        define("subject", $subject) ; 

        $emailText  = "<h3>Bei folgenden Messstellen kommen keine aktuellen Daten mehr an : </h3><br>" ;
        $emailText .= " <style>
                            table, td, th {
                                border: 1px solid black;
                                text-align: left;
                            }
                            table {
                                border-collapse: collapse;
                            }
                            td, th {
                                padding: 5px 10px;
                            }
                        </style>
                        <table style='border:2px solid black;'>
                            <thead>
                                <tr>
                                    <th>Zeile</th>
                                    <th>Kunde</th>
                                    <th>mst_ID</th>
                                    <th>Name</th>
                                    <th>Channel 1</th>
                                    <th>Channel 2</th>
                                    <th>Channel 3</th>
                                </tr>
                            </thead>
                            <tbody>".$tblData."</tbody>
                        </table><br><br>" ;

        define("emailText", $emailText) ;

        echo emailText ;
       
        $gUsers = 
            [ "sdm"
            , "info"
            , "cmu"
            , "rpi"
            , "hts"
            ] ;

        define("gUsers", $gUsers) ;
  
        $extEMailAdresses = [ "alfred.tekniepe@managee.de" ] ;
            
        define("extEMailAdresses", $extEMailAdresses) ;

        function gDomain ($username) {
            return $username."@energie-gipscomm.de" ;
        }

        function recipients () {
            $gEMailAdresses = array_map('gDomain', gUsers) ;
            
            return array_merge ($gEMailAdresses, extEMailAdresses) ;
        }

        function sendMail ($address) {
            eMail($address, subject, emailText) ;
        }

        return array_map( 'sendMail', recipients() ) ;
    }

    $rowsString = buildStringMstsDBs($mstsWithoutData) ;

    if ($rowsString === "") {
        echo "All data up to date !!" ;
    }
    else {
        sendMails($rowsString) ;
    }

}

// $start = hrtime(true) ;

// Sends alert emails to listed addresses if data not up-to-date.
// --------------------------------------------------------------
//
pipe(
    [ getActiveCustomerDBs()
    , 'mstsDbsWithInvalidDate'
    , 'sendAlertEmails'
    ]
) ;
//
// --------------------------------------------------------------

// $end = hrtime(true) ;

// echo "    Execution Time : ".(($end - $start) / 1000000000) ;

?>
