<?php
include('top-cache.php');
error_reporting (-1);
ini_set ('display_errors', 'On');

require 'DbOperations.php';

$conn = connectToDB("MemOptiTables");

$tblTemplate = "EnergyData";
$nameDB = $_POST['nameDB'];
$nameClient =  ucfirst(explode("_", $nameDB)[1]);

$tbl = $nameDB === "012_spiess" ?
       $tblTemplate."Spies" :
       $tblTemplate.$nameClient ;

$ins = $_POST['ins'];
$id = $_POST['id'];

$query = "SELECT * FROM ".$tbl." ";
$query .= "WHERE ".$ins."_ID = $id ";

$records = queryDB($conn, $query, "read");

echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
include('bottom-cache.php');
?>
