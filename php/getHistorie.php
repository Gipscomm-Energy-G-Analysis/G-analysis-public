<?php
include('top-cache.php');
error_reporting(-1);
ini_set ('display_errors', 'On');

require 'DbOperations.php';

$nameDB = $_POST['nameDB'];
$conn = connectToDB($nameDB);
$modus = $_POST['modus'];

if($modus == "anl"){
  $anlagenNr = $_POST['anlagenNr'];
  $query = "SELECT * FROM AnlagenHistorie ";
  $query .= "WHERE AnlagenNr = '$anlagenNr' ";

}
elseif ($modus == "prd") {
  $gruppenID = $_POST['gruppenID'];
  $query = "SELECT * FROM ProdukteHistorie ";
  $query .= "WHERE gruppenID = $gruppenID ";
}
elseif ($modus == "intBdeIMwGetHist") {
	 $anlagenNr = $_POST['anlagenNr'];
   $mstID = $_POST['mstID'];
   $query = "SELECT * FROM interneBetriebsdatenHistorie AS T1 ";
   $query .= "LEFT JOIN iMwUnits AS T2 ";
   $query .= "ON T1.einheitAnl = T2.unt_ID ";
   $query .= "WHERE archiviert = 'true' ";
   $query .= "AND mstID = '$mstID' ";
}
elseif ($modus == "intBdeIMwGetHistSingle") {
	$mstID = $_POST['mstID'];
	$histID = $_POST['histID'];
   $query = "SELECT * FROM interneBetriebsdatenHistorie ";
   $query .= "WHERE archiviert = 'true'";
   $query .= "AND histID = '$histID' ";
   $query .= "AND mstID = '$mstID' ";
}
//echo $query;die;

$records = queryDB($conn, $query, "read");
echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
include('bottom-cache.php');
?>
