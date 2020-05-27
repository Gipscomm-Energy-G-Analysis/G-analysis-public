<?php

include('top-cache.php');
error_reporting (-1);
ini_set ('display_errors', 'On');

require 'DbOperations.php';

$nameDB = $_POST['nameDB'];
$conn = connectToDB($nameDB);
$modus = $_POST['modus'];
$version = $_POST['version'];

$sixYearsAgo = "";
if($modus == "gesamt"){
  $query = "SELECT * FROM SpaEfvTbl1Gesamt ";
  $query .= "WHERE ";
}
elseif ($modus == "organisation") {
  $orgID = $_POST['orgID'];
  $query = "SELECT * FROM SpaEfvTbl1Organisation ";
  $query .= "WHERE org_ID = '$orgID' AND ";
}
elseif ($modus == "liegenschaft"){
  $liegID = $_POST['liegID'];
  $query = "SELECT * FROM SpaEfvTbl1Liegenschaft ";
  $query .= "WHERE lieg_ID = '$liegID' AND ";
}

if($version == "basis"){
  $query .= "Jahr > RIGHT(CONVERT(varchar(20), getdate(), 104), 4) - 5 ";
}
elseif($version == "benutzerdefiniert"){
  $jahreSqlString = $_POST['jahreSqlString'];
  $query .= $jahreSqlString;
}
$query .= "ORDER BY Energietraeger, Jahr ";
$records = queryDB($conn, $query, "read");

echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
include('bottom-cache.php');
?>
