<?php
include('top-cache.php');
error_reporting (-1);
ini_set ('display_errors', 'On');

require 'DbOperations.php';

$nameDB = $_POST['nameDB'];
$conn = connectToDB($nameDB);
$fileName = $_POST['fileName'];
$typ = $_POST['typ'];
$jsonData = $_POST['jsonData'];
$jsonData = base64_encode($jsonData);
$query = "INSERT INTO spreadsheets (dateiname, typ, inhalt) ";
$query .= "VALUES ('$fileName', '$typ', '$jsonData') ";
$response = queryDB($conn, $query, "write");

echo $response;

include('bottom-cache.php');
?>
