<?php
error_reporting(-1);
ini_set ('display_errors', 'On');

require 'DbOperations.php';

$nameDB = $_POST['nameDB'];
$conn = connectToDB($nameDB);

$query = "SELECT mst_ID, nameMSt, messmittelBerechnungslogikMst, berLogikIdString FROM messstellen ";
$query .= "WHERE messartMst = 'berechnet' ";
$query .= "AND deleted <> 'true' ";

$records = queryDB($conn, $query, "read");

echo json_encode($records, JSON_INVALID_UTF8_IGNORE);

?>
