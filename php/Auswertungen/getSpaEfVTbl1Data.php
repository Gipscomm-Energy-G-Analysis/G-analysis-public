<?php
error_reporting (-1);
ini_set ('display_errors', 'On');

require '../DbOperations.php';

$nameDB = $_POST['nameDB'];
$conn = connectToDB($nameDB);
$modus = $_POST['modus'];
$version = $_POST['version'];
$verdichtung = $_POST['verdichtung'];
$jahreSqlString = $_POST['jahreSqlString'];

if($verdichtung == "verdichtet"){
  $viewPostfix = "EntsZusammengefasst";
}
else{
  $viewPostfix = "";
}

if($modus == "gesamt"){
  $query = "SELECT * FROM SpaEfvTbl1Gesamt".$viewPostfix." " ;
  $query .= "WHERE 1 = 1 ";
}
elseif ($modus == "organisation") {
  $orgID = $_POST['orgID'];
  $query = "SELECT * FROM SpaEfvTbl1Organisation".$viewPostfix." ";
  $query .= "WHERE org_ID = '$orgID'";
}
elseif ($modus == "liegenschaft"){
  $liegID = $_POST['liegID'];
  $query = "SELECT * FROM SpaEfvTbl1Liegenschaft".$viewPostfix." ";
  $query .= "WHERE lieg_ID = '$liegID'";
}
if(!empty($jahreSqlString)){
  $query .= " AND ( ".$jahreSqlString.") ";
}
$query .= "ORDER BY Energietraeger, Jahr ";
$records = queryDB($conn, $query, "read");

echo json_encode($records);
?>
