<?php
include('top-cache.php');
error_reporting(-1);

ini_set('display_errors', 'On');

require 'DbOperations.php';

$nameDB = $_POST[ 'nameDB' ] ;
$conn = connectToDB($nameDB);

$tbl = $_POST[ 'tbl' ] ;

$query = "SELECT COLUMN_NAME AS spaltenname " ;
$query .= "FROM INFORMATION_SCHEMA.COLUMNS " ;
$query .= "WHERE TABLE_NAME = '$tbl' " ;

$records = queryDB($conn, $query, "read");

closeDbConn($conn);

echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
include('bottom-cache.php');
?>
