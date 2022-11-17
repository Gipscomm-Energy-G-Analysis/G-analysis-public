<?php

error_reporting(-1);
ini_set('display_errors', 'On');

require 'DbOperations.php';

$nameDB = $_POST[ 'nameDB' ] ;
$conn = connectToDB($nameDB);

$knzID = $_POST[ 'knzID' ] ;

$query = "SELECT * FROM KennzahlenFormeln " ;
$query .= "WHERE knz_ID = $knzID " ;

$records = queryDB($conn, $query, "read");

$referenceIns = $records [ 0 ] [ "bezug" ] ;
$referenceInsID = $records [ 0 ] [ $referenceIns."_ID" ] ;
$newIDString = $referenceIns."_".$referenceInsID." ".$records [ 0 ] [ "idString" ] ;

$records [ 0 ] [ "idString" ] = $newIDString ;

echo json_encode($records, JSON_INVALID_UTF8_SUBSTITUTE);
