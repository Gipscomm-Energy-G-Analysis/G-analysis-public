<?php

error_reporting (-1);
ini_set ('display_errors', 'On');

require 'DbOperations.php';

$nameDB = $_POST['nameDB'];
$conn = connectToDB($nameDB);
$typ = $_POST['typ'];
if($typ=='messstellenvergleich'){
  $query = "SELECT * FROM gespeicherteGraphDiagramme WHERE typ IN ('year','month','month15min','day','day15min','week','custom')";
}
if($typ=='zeitvergleich'){
  $query = "SELECT * FROM gespeicherteGraphDiagramme WHERE typ IN ('year2','month2','month15min2','day2','day15min2','week2','custom2')";
}
if($typ=='Kennzahlendarstellung'){
  $query = "SELECT * FROM gespeicherteGraphDiagramme WHERE typ='knz'";
}

$records = queryDB($conn, $query, "read");

echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
