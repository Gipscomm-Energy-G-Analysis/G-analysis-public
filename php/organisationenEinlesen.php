<?php

error_reporting (-1);
ini_set ('display_errors', 'On');

require 'DbOperations.php';

$nameDB = $_POST['nameDB'];
$conn = connectToDB($nameDB);

$query = "SELECT * FROM organisationen ";
$query .= "WHERE deleted <> 'true' ";   //<> not equal

$records = queryDB($conn, $query, "read");

echo json_encode($records, JSON_INVALID_UTF8_SUBSTITUTE);
