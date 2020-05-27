<?php
include('top-cache.php');
error_reporting(-1);
ini_set ('display_errors', 'On');

require 'DbOperations.php';

$nameDB = $_POST['nameDB'];
$conn = connectToDB($nameDB);

$orgID = $_POST['orgID'];

$query = "SELECT * FROM produkte ";
$query .= "WHERE org_ID = ".$orgID." ";
$query .= "AND archiviert <> 'true' ";
$query .= "AND deleted <> 'true' ";

$records = queryDB($conn, $query, "read");

echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
include('top-cache.php');
?>
