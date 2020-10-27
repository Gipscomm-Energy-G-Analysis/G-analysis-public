<?php

error_reporting(-1);
ini_set ('display_errors', 'On');

require 'DbOperations.php';

$nameDB = $_POST['nameDB'];
$conn = connectToDB($nameDB);

$id = $_POST['id'];

/*if ($id == "Suchen") {
  $query = "SELECT * FROM anlagen ";
  $query .= "WHERE zeitintervallAnl  <> 0 ";
  $query .= "AND deleted <> 1 ";
}else*/
if($id == 'DblClick'){
	$anl_ID = $_POST['anl_ID'];
	$query = "SELECT * FROM anlagen ";
	$query .= "WHERE zeitintervallAnl  <> 0 ";
	$query .= "AND anl_ID = $anl_ID ";
	$query .= "AND deleted <> 1 ";
}
elseif($id == 'displayData'){
	$mstID = $_POST['mstID'];
	$query = "SELECT * FROM interneMesswerteConfig ";
	$query .= "WHERE mst_ID  = '$mstID' ";
}
//echo $query;die;
$records = queryDB($conn, $query, "read");

echo json_encode($records, JSON_INVALID_UTF8_IGNORE);

?>