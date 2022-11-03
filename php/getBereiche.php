<?php
error_reporting (-1);
ini_set ('display_errors', 'On');

require 'DbOperations.php';

$nameDB = $_POST['nameDB'];
$conn = connectToDB($nameDB);

$id = $_POST['id'];

if($id == "berAuswahl"){

	$liegID = $_POST['liegID'];

	$query = "SELECT * FROM bereiche ";
	$query .= "WHERE lieg_ID = '$liegID' ";
	$query .= "AND deleted <> 'true' ";
}
elseif($id == "berMstListe"){

	$query = "SELECT * FROM BerMstListe ";
	$query .= "WHERE deleted <> 'true' ";
}
elseif($id == "berSuchen"){

	$liegID = $_POST['liegID'];

	$query = "SELECT * FROM bereiche ";
	$query .= "WHERE lieg_ID = '$liegID' ";
	$query .= "AND deleted <> 'true' ";
}
elseif($id == "dynamicFaktorBereiche"){

	$query = "SELECT * FROM bereiche";
}

$records = queryDB($conn, $query, "read");

echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
