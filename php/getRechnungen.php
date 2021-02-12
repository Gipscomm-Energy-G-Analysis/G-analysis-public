<?php
error_reporting (-1);
ini_set ('display_errors', 'On');

require 'DbOperations.php';

$nameDB = $_POST['nameDB'];
$conn = connectToDB($nameDB);
$id = $_POST['id'];

if($id == "extRechngSuchen"){
		$liegID = $_POST['liegID'];

		$query = "SELECT * FROM externeRechnungen ";
		$query .= "WHERE deleted <> 'true' ";
		$query .= "AND lieg_ID = '$liegID' ";
}
else{
		$mstID = $_POST['mstID'];

		$query = "SELECT TOP(5) * FROM externeRechnungen ";
		$query .= "WHERE mst_ID = '$mstID' ";
		$query .= "AND deleted <> 'true' ";
		$query .= "ORDER BY RIGHT(bisERng,4) DESC,LEFT(RIGHT(bisERng,7),2) DESC, LEFT(bisERng,2) DESC ";
}

$records = queryDB($conn, $query, "read");

echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
?>
