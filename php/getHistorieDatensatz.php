<?php

error_reporting (-1);
ini_set ('display_errors', 'On');

require 'DbOperations.php';

$nameDB = $_POST['nameDB'];
$conn = connectToDB($nameDB);
$anlID = $_POST['anlID'];
$query = "SELECT * FROM anlagen ";
$query .= "WHERE anl_ID = '$anlID' ";
$records = queryDB($conn, $query, "read");

echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
