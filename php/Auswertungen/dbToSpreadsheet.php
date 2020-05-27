<?php

error_reporting (-1);
ini_set ('display_errors', 'On');

require '../DbOperations.php';

$nameDB = $_POST['nameDB'];
$conn = connectToDB($nameDB);
$berichtstyp = $_POST['berichtstyp'];
if($berichtstyp == "spaEfvTbl1"){
  $spID = 1;
}
elseif ($berichtstyp == "spaEfvTbl2") {
  $spID = 2;
}
$fileName = $_POST['fileName'];
$query = "SELECT * FROM spreadsheets ";
$query .= "WHERE sp_ID = '$spID' ";
$records = queryDB($conn, $query, "read");
$records = base64_decode($records[0]["inhalt"]);

echo json_encode($records);

?>
