<?php

error_reporting(-1);
ini_set ('display_errors', 'On');

require 'DbOperations.php';

$nameDB = $_POST['nameDB'];
$conn = connectToDB($nameDB);

$betrGrpID = $_POST['betrGrpID'];

$query = "SELECT * FROM mandantenGruppen WHERE betrGrp_ID ='$betrGrpID'";

$records = queryDB($conn, $query, "read");

echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
