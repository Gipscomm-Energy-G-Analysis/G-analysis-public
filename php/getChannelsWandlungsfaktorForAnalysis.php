<?php

error_reporting(-1);
ini_set ('display_errors', 'On');

require 'DbOperations.php';

$nameDB = $_POST['nameDB'];
$conn = connectToDB($nameDB);

$messstelle = $_POST['messstelle'];

$tsql = "SELECT kanal1Msm,kanal2Msm,kanal3Msm,wandlungsfaktorMsm FROM messmittel WHERE messstelleMsm = '$messstelle'";

$records = queryDB($conn, $query, "read");

echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
