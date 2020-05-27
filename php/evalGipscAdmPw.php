<?php
include('top-cache.php');
ini_set ('display_errors', 'On');

require 'DbOperations.php';

$nameDB = $_POST['nameDB'];
$conn = connectToDB($nameDB);
$query = "SELECT  * FROM gipscPw";
$records = queryDB($conn, $query, "read");

echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
include('bottom-cache.php');

?>