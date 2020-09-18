<?php

error_reporting(-1);
ini_set ('display_errors', 'On');

require 'DbOperations.php';

$nameDB = $_POST['nameDB'];
$conn = connectToDB($nameDB);

$id = $_POST['id'];

if ($id == "Suchen") {
  $query = "SELECT * FROM anlagen ";
  $query .= "WHERE zeitintervallAnl  <> 0 ";
  $query .= "AND deleted <> 1 ";
}
//echo $query;die;
$records = queryDB($conn, $query, "read");

echo json_encode($records, JSON_INVALID_UTF8_IGNORE);

?>