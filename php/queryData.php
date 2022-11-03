<?php
error_reporting(-1);
ini_set('display_errors', 'On');

require 'DbOperations.php';

$nameDB = $_POST['nameDB'];
$mode = $_POST['mode'];
$conn = connectToDB($nameDB);
$query = $_POST['query'];
$records = queryDB($conn, $query, $mode);

echo json_encode($records, JSON_INVALID_UTF8_SUBSTITUTE);
