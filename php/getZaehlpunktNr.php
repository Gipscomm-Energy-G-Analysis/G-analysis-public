<?php

error_reporting (-1);
ini_set ('display_errors', 'On');

require 'DbOperations.php';

$nameDB = $_POST['nameDB'];
$conn = connectToDB($nameDB);
$ins = $_POST['ins'];
if($ins == "zaehlpunkt"){
	$messstelle = $_POST['nameMst'];

	$query = "SELECT * FROM zaehlpunktnummern WHERE mstZp = '$messstelle'";
}
$records = queryDB($conn, $query, "read");

echo json_encode($records, JSON_INVALID_UTF8_SUBSTITUTE);
