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
   $query = "SELECT * FROM interneBetriebsdatenHistorie ";
   $query .= "WHERE archiviert = 'true'";
}
elseif ($modus == "intBdeIMwGetHistSingle") {
	$anlID = $_POST['anlID'];
	$histID = $_POST['histID'];
   $query = "SELECT * FROM interneBetriebsdatenHistorie ";
   $query .= "WHERE archiviert = 'true'";
   $query .= "AND histID = '$histID' ";
   $query .= "AND anl_ID = '$anlID' ";
}

$records = queryDB($conn, $query, "read");
echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
include('bottom-cache.php');
?>
