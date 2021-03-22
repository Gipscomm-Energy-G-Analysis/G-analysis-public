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
   $query .= "LEFT JOIN intervalType AS T3 ";
   $query .= "ON T1.zeitintervallAnl = T3.intTp_ID ";
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
elseif ($modus == "intBdePrdktIMwGetHistSingle") {
  $prd_ID = $_POST['prd_id'];
  $prdktHist_ID = $_POST['prdktHist_ID'];
  $query = "SELECT * FROM produktionsAnlagenHistorie ";
  // $query .= "WHERE archiviert = 'true'";
  $query .= "WHERE prdktHist_ID = '$prdktHist_ID' ";
  $query .= "AND prd_id = '$prd_ID' ";
  //echo $query;die;
}
elseif ($modus == "intBdeMesssetelleIMwGetHistSingle") {
 // $mst_ID = $_POST['mst_ID'];
  $prdktHist_ID = $_POST['prdktHist_ID'];
  $query = "SELECT * FROM produktionsAnlagenHistorie ";
   // $query .= "WHERE archiviert = 'true'";
  $query .= "WHERE prdktHist_ID = '$prdktHist_ID' ";
 // $query .= "AND mst_ID = '$mst_ID' ";
  //echo $query;die;
}
elseif ($modus == "intBdePdktIMwGetHistReset") {
  // $mst_ID = $_POST['mst_ID'];
  $prdktHist_ID = $_POST['prdktHist_ID'];
  $query = "SELECT * FROM produktionsAnlagenHistorie ";
   // $query .= "WHERE archiviert = 'true'";
  $query .= "WHERE prdktHist_ID = '$prdktHist_ID' ";
  // $query .= "AND mst_ID = '$mst_ID' ";
  //echo $query;die;
}
//echo $query;die;

$records = queryDB($conn, $query, "read");
echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
include('bottom-cache.php');
?>
