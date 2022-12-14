<?php

error_reporting(-1);
ini_set('display_errors', 'On');

require 'DbOperations.php';

$query  = "SELECT * FROM erweiterungenAnlagen ";
$query .= "INNER JOIN grp.groupOptions ";
$query .= "ON erweiterungenAnlagen.eAnl_ID = grp.groupOptions.eAnl_ID ";
$query .= "WHERE erweiterungenAnlagen.eAnl_ID = " . (string)$_POST['eAnl_ID'] . " AND erweiterungenAnlagen.deleted = 0 ";

$records = (array)queryDB(connectToDB((string)$_POST['nameDB']), (string)$query, "read");

echo json_encode($records, JSON_INVALID_UTF8_SUBSTITUTE);
