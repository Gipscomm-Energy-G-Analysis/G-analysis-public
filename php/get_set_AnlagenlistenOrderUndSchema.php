<?php

error_reporting(-1);
ini_set ('display_errors', 'On');

require 'DbOperations.php';

$nameDB = $_POST['nameDB'];
$conn = connectToDB($nameDB);

$id = $_POST['id'];

if($id == "getAnlSpalten"){
	$query = "SELECT * FROM Anlagenlistenspaltenanordnung";
}
elseif($id == "getAnlSchema"){
	$query = "SELECT * FROM anlagenlistenschema";
}

$records = queryDB($conn, $query, "read");

echo json_encode($records, JSON_INVALID_UTF8_SUBSTITUTE);
