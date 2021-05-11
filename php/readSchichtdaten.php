<?php
include('top-cache.php');
error_reporting ( -1 ) ;
ini_set ( 'display_errors', 'On' ) ;

require 'DbOperations.php' ;

$nameDB = $_POST[ 'nameDB' ] ;
$conn = connectToDB( $nameDB ) ;

$query = "SELECT * FROM schichtModelle " ;

$schichtModelle = queryDB( $conn, $query, "read" ) ;

$query2 = "SELECT * FROM schichten " ;

$schichten = queryDB( $conn, $query2, "read" ) ;


echo json_encode(
    [ "schichtModelle" => $schichtModelle
    , "schichten" => $schichten
    ] , JSON_INVALID_UTF8_IGNORE) ;
include('bottom-cache.php') ;
?>
