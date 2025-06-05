<?php

error_reporting (-1);
ini_set ('display_errors', 'On');

require '..\..\/php/DbOperations.php';

$nameDB = $_POST['nameDB'];
$conn = connectToDB($nameDB);
$typ = $_POST['typ'];
$username = $_POST['username'];
if($typ=='messstellenvergleich'){
  $query = "SELECT * FROM gespeicherteGraphDiagramme WHERE typ IN ('year','month','month15min','day','day15min','week','custom') AND username = '$username' AND (deleted <> 1 OR deleted IS NULL) ";
}
if($typ=='zeitvergleich'){
  $query = "SELECT * FROM gespeicherteGraphDiagramme WHERE typ IN ('year2','month2','month15min2','day2','day15min2','week2','custom2') AND username = '$username' AND (deleted <> 1 OR deleted IS NULL) ";
}
if($typ=='Kennzahlendarstellung'){
  $query = "SELECT * FROM gespeicherteGraphDiagramme WHERE typ='knz' AND username = '$username' AND (deleted <> 1 OR deleted IS NULL) ";
}

$records = queryDB($conn, $query, "read");

echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
