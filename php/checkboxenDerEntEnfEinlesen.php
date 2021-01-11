<?php

include('top-cache.php') ;
error_reporting(-1) ;
ini_set ('display_errors', 'On') ;

require 'DbOperations.php' ;

$nameDB = $_POST[ 'nameDB' ] ;
$conn = connectToDB($nameDB) ;

$id = $_POST["id"] ;

if(isset($id)) {
if($id == "ent") {
	$query = "SELECT * FROM EnergietraegerStatus" ;
}
if($id == "enf") {
	$query = "SELECT * FROM EnergieformenStatus" ;
}
if($id == "entLieg") {
	$query = "SELECT * FROM energietraeger" ;
}
if($id == "enfLieg") {
	$query = "SELECT * FROM energieformen" ;
}

$records = queryDB($conn, $query, "read") ;

echo json_encode($records, JSON_INVALID_UTF8_IGNORE) ;
}

include('bottom-cache.php');


?>
