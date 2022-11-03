<?php

error_reporting (-1);
ini_set ('display_errors', 'On');

require 'DbOperations.php';

$nameDB = $_POST['nameDB'];
$conn = connectToDB($nameDB);
$ins = $_POST['ins'];

if($ins == "frm"){
  $query = "SELECT TOP(1) frm_ID FROM formeln ";
  $query .= "ORDER BY frm_ID DESC ";
}

$records = queryDB($conn, $query, "read");

echo json_encode($records, JSON_INVALID_UTF8_SUBSTITUTE);
