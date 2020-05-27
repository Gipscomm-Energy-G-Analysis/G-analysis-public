<?php
include('top-cache.php');
error_reporting (-1);
ini_set ('display_errors', 'On');

require 'DbOperations.php';

$nameDB = $_POST['nameDB'];
$conn = connectToDB($nameDB);

$modus = $_POST['modus'];
if($modus == "gesamt"){
  $view = "RechnungsjahreGesamt";
  $whereClause = "";
}
elseif ($modus == "organisation") {
  $orgID = $_POST['orgID'];
  $view = "RechnungsjahreOrganisation";
  $whereClause = "WHERE org_ID = '$orgID'";
}
elseif ($modus == "liegenschaft") {
  $liegID = $_POST['liegID'];
  $view = "RechnungsjahreLiegenschaft";
  $whereClause = "WHERE lieg_ID = '$liegID'";
}
$query = "SELECT * FROM ".$view." ";
$query .= $whereClause;

$records = queryDB($conn, $query, "read");

echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
include('bottom-cache.php');
?>
