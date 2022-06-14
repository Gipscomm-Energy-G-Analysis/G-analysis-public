<?php

include('top-cache.php') ;
error_reporting (-1) ;
ini_set ('display_errors', 'On') ;

require 'DbOperations.php' ;

$nameDB = $_POST['nameDB'] ;
$conn = connectToDB($nameDB) ;
$eAnl_ID = $_POST['eAnl_ID'] ;

$query = "SELECT * FROM erweiterungenAnlagen " ;
$query .= "INNER JOIN subGroupOptions " ;
$query .= "WHERE eAnl_ID = ".$eAnl_ID." AND deleted = 0 " ;

$records = queryDB($conn, $query, "read") ;

echo json_encode($records, JSON_INVALID_UTF8_IGNORE) ;
include('bottom-cache.php') ;

?>
