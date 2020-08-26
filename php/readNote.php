<?php
include('top-cache.php');
error_reporting (-1);
ini_set ('display_errors', 'On');

require 'DbOperations.php';

$nameDB = $_POST['nameDB'];
$conn = connectToDB($nameDB);

$mstID = $_POST['mstID'];
$type = $_POST['type'];

$query = "SELECT * FROM bemerkungenDiagramme ";
$query .= "WHERE mst_ID = $mstID and type = '$type' ";
$query .= "ORDER BY ident ";

$records = queryDB($conn, $query, "read");

echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
include('bottom-cache.php');
?>
