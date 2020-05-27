<?php
include('top-cache.php');
error_reporting (-1);
ini_set ('display_errors', 'On');

require 'DbOperations.php';

$nameDB = $_POST['nameDB'];
$conn = connectToDB($nameDB);

$gDiaID = $_POST['gDiaID'];

$query = "SELECT * FROM gespeicherteDiagramme " ;
$query .= "WHERE  gDia_ID = $gDiaID " ;

$records = queryDB($conn, $query, "read");

echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
include('bottom-cache.php');
?>
