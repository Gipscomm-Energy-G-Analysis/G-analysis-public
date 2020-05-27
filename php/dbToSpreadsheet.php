<?php
include('top-cache.php');
error_reporting (-1);
ini_set ('display_errors', 'On');

require 'DbOperations.php';

$nameDB = $_POST['nameDB'];
$conn = connectToDB($nameDB);
$fileName = $_POST['fileName'];
$query = "SELECT * FROM spreadsheets ";
$query .= "WHERE sp_ID = 1 ";
$records = queryDB($conn, $query, "read");
$records = base64_decode($records[0]["inhalt"]);

echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
include('bottom-cache.php');
?>
