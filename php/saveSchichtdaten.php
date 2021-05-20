<?php
include('top-cache.php');
error_reporting ( -1 ) ;
ini_set ( 'display_errors', 'On' ) ;

require 'DbOperations.php' ;

$conn = connectToDB($_POST['nameDB']) ;

$modus = $_POST['modus'];
$liegID = $_POST['liegID'];

$modellBezSchtDat = $_POST["modellBezSchtDat"] ;
$anzahlSchtDat = $_POST["anzahlSchtDat"] ;
$gueltigVonSchtDat = $_POST["gueltigVonSchtDat"] ;
$gueltigBisSchtDat = $_POST["gueltigBisSchtDat"] ;
$bisEndeOffenSchtDat = $_POST["bisEndeOffenSchtDat"] ;
$notizSchtDat = $_POST["notizSchtDat"] ;
$schichten = $_POST["schichten"] ;

function valueString($last, $record) {
    return $last.
    "(".schtMdlID.", "
    .$record[0].", '"
    .$record[1]."', '"
    .$record[2]."', '"
    .$record[3]."', '"
    .$record[4]."', '"
    .$record[5]."')," ;
}

function buildValuesString($records) {
    return substr(array_reduce($records, 'valueString'), 0, -1) ;
}

if($modus === "new") {

    $tsqlInsertSchichtmodell =  "INSERT INTO schichtModelle(lieg_ID,modellBez,anzahl,gueltigVon,gueltigBis,bisEndeOffen, notiz) " ;
    $tsqlInsertSchichtmodell .= "VALUES ('$liegID','$modellBezSchtDat', $anzahlSchtDat,'$gueltigVonSchtDat','$gueltigBisSchtDat','$bisEndeOffenSchtDat', '$notizSchtDat')";

    queryDB($conn, $tsqlInsertSchichtmodell, "write") ;

    $tsqlSelectLastID = "SELECT IDENT_CURRENT('schichtModelle') AS last_ID " ;

    define("schtMdlID", queryDB($conn, $tsqlSelectLastID, "read")[0]["last_ID"]) ;

    $tsql =  "INSERT INTO schichten(schtMdl_ID, nr, bezeichnung, uhrzeitVon, uhrzeitBis, tagVon, tagBis) " ;
    $tsql .= "VALUES ".buildValuesString($schichten) ;

}
else {

    define("schtMdlID", $_POST['schtMdlID']) ;

    $tsqlUpdateSchichtmodell = "UPDATE schichtModelle SET datum = getdate(), modellBez = '$modellBezSchtDat', anzahl = $anzahlSchtDat, " ;
    $tsqlUpdateSchichtmodell .= "gueltigVon = '$gueltigVonSchtDat', gueltigBis = '$gueltigBisSchtDat', bisEndeOffen = '$bisEndeOffenSchtDat', " ;
    $tsqlUpdateSchichtmodell .= "notiz = '$notizSchtDat' " ;
    $tsqlUpdateSchichtmodell .= "WHERE schtMdl_ID = ".schtMdlID." " ;

    queryDB($conn, $tsqlUpdateSchichtmodell, "write") ;

    $tsql =  "UPDATE schicht " ;
    $tsql .= "SET bezeichnung = val.bezeichnung " ;
    $tsql .= ", uhrzeitVon = val.uhrzeitVon " ;
    $tsql .= ", uhrzeitBis = val.uhrzeitBis " ;
    $tsql .= ", tagVon = val.tagVon " ;
    $tsql .= ", tagBis = val.tagBis " ;
    $tsql .= "FROM schichten AS schicht " ;
    $tsql .= "JOIN( " ;
    $tsql .= "  VALUES ".buildValuesString($schichten) ;
    $tsql .= ") AS val (schtMdl_ID, nr, bezeichnung, uhrzeitVon, uhrzeitBis, tagVon, tagBis) " ;
    $tsql .= "ON val.schtMdl_ID = schicht.schtMdl_ID AND val.nr = schicht.nr " ;
}

queryDB($conn, $tsql, "write") ;

echo json_encode(["query" => $tsql]) ;

include('bottom-cache.php') ;
?>
