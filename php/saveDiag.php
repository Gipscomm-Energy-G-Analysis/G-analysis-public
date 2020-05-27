<?php
include('top-cache.php');
error_reporting (-1);
ini_set ('display_errors', 'On');

require 'DbOperations.php';

$nameDB = $_POST['nameDB'];
$conn = connectToDB($nameDB);

$name = $_POST['name'];
$beschreibung = $_POST['beschreibung'];
$bemerkung = $_POST['bemerkung'];
$typ = $_POST['typ'];
$jsonDiag = $_POST['jsonDiag'];

$query = "INSERT INTO gespeicherteDiagramme (gespeichertAm, name, beschreibung, typ, bemerkung, jsonDiag) " ;
$query .= "VALUES (getdate(), '$name', '$beschreibung', '$typ', '$bemerkung', '$jsonDiag') " ;

$records = queryDB($conn, $query, "write");

echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
include('bottom-cache.php');
?>
