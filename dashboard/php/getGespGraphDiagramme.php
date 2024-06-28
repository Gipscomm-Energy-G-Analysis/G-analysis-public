<?php

error_reporting (-1);
ini_set ('display_errors', 'On');

require '../../php/DbOperations.php';

$nameDB = $_POST['nameDB'];
$conn = connectToDB($nameDB);

  $query = "SELECT * FROM gespeicherteGraphDiagramme ";

$records = queryDB($conn, $query, "read");

echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
