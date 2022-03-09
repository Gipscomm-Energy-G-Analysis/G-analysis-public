<?php
error_reporting ( -1 ) ;
ini_set ( 'display_errors', 'On' ) ;

require '../../DbOperations.php' ;

$conn = connectToDB("gipscomm") ;

$modus = $_POST['modus'];
$orgID = $_POST['orgID'];
$bezeichnung = $_POST['bezeichnung'];
$artikelnummer = $_POST['artikelnummer'];
$grpID = $_POST['gruppenID'];
$custom1 = $_POST['custom1'];
$custom2 = $_POST['custom2'];
$custom3 = $_POST['custom3'];
$custom4 = $_POST['custom4'];
$custom5 = $_POST['custom5'];
$custom6 = $_POST['custom6'];
$anl01ID = $_POST['anl01ID'];
$anl02ID = $_POST['anl02ID'];
$anl03ID = $_POST['anl03ID'];
$anl04ID = $_POST['anl04ID'];
$anl05ID = $_POST['anl05ID'];
$anl06ID = $_POST['anl06ID'];
$anl07ID = $_POST['anl07ID'];
$anl08ID = $_POST['anl08ID'];
$anl09ID = $_POST['anl09ID'];

if($modus === "new") {
    $query =  "INSERT INTO produkte(datum, org_ID, namePrd, artikelNrPrd, custom1, custom2, custom3, custom4, custom5, custom6, anl01_ID, anl02_ID, anl03_ID, anl04_ID, anl05_ID, anl06_ID, anl07_ID, anl08_ID, anl09_ID, gruppenID, deleted, archiviert) " ;
    $query .= "VALUES (getdate(), '$orgID', '$bezeichnung', '$artikelnummer', '$custom1', '$custom2', '$custom3', '$custom4', '$custom5', '$custom6', '$anl01ID', '$anl02ID', '$anl03ID', '$anl04ID', '$anl05ID', '$anl06ID', '$anl07ID', '$anl08ID', '$anl09ID', '$grpID','false','false') " ;
}
else {
    $archiviert = $_POST['archiviert'];
    $prdID = $_POST['prdID'];

    if ($achiviert == "true") {
        $bemerkung = $_POST['bemerkung'];
        $info = $_POST['info'];
        $gueltigVon = $_POST['gueltigVon'];
        $gueltigBis = $_POST['gueltigBis'];

        $tsql = "UPDATE produkte SET archiviert = 'true', ";
        $tsql .= "aenderungsBemerkung = '$bemerkung', aenderungsInfo = '$info', ";
        $tsql .= "gueltigVonPrd = '$gueltigVon', gueltigBisPrd = '$gueltigBis' ";
        $tsql .= "WHERE prd_ID = '$prdID' ";
    }

    $query =  "UPDATE produkte " ;
    $query .= "SET datum = getdate(), namePrd = '$bezeichnung', artikelNrPrd = '$artikelnummer', " ;
    $query .= "custom1 = '$custom1', custom2 = '$custom2', custom3 = '$custom3', custom4 = '$custom4', custom5 = '$custom5', custom6 = '$custom6', " ;
    $query .= "anl01_ID = '$anl01ID', anl02_ID = '$anl02ID', anl03_ID = '$anl03ID', anl04_ID = '$anl04ID', anl05_ID = '$anl05ID', anl06_ID = '$anl06ID', anl07_ID = '$anl07ID', anl08_ID = '$anl08ID', anl09_ID = '$anl09ID' " ;
    $query .= "WHERE prd_ID = ".$prdID." " ;
}

queryDB($conn, $query, "write") ;

echo json_encode(["query" => $query]) ;

?>