<?php

error_reporting (-1);
ini_set ('display_errors', 'On');

require 'DbOperations.php';

$nameDB = $_POST['nameDB'];
$conn = connectToDB($nameDB);

$id = $_POST['id'];
$query = "DELETE FROM bemerkungenDiagramme where bemDiag_ID = $id";
$records = queryDB($conn, $query, "write");

echo json_encode($records, JSON_INVALID_UTF8_SUBSTITUTE);
