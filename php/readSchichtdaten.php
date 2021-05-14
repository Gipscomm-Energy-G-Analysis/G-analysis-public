<?php
include('top-cache.php');
error_reporting ( -1 ) ;
ini_set ( 'display_errors', 'On' ) ;

require 'DbOperations.php' ;

$nameDB = $_POST[ 'nameDB' ] ;
$conn = connectToDB( $nameDB ) ;

$query  = "SELECT schtMdl_ID, lieg_ID, modellBez, anzahl, LEFT(gueltigVon, 10) AS gueltigVon, LEFT(gueltigBis, 10) AS gueltigBis, bisEndeOffen, notiz FROM schichtModelle " ;
$query .= "WHERE deleted = 0 " ;

$schichtModelle = queryDB( $conn, $query, "read" ) ;

$query2  = "SELECT schtDat_ID, schtMdl_ID, datum, nr, bezeichnung, LEFT(uhrzeitVon, 5) AS uhrzeitVon, LEFT(uhrzeitBis, 5) AS uhrzeitBis, tagVon, tagBis FROM schichten " ;
$query2 .= "WHERE deleted = 0 " ;

$schichten = queryDB( $conn, $query2, "read" ) ;

echo json_encode(
    [ "schichtModelle" => $schichtModelle
    , "schichten" => $schichten
    ] , JSON_INVALID_UTF8_IGNORE) ;
include('bottom-cache.php') ;
?>
