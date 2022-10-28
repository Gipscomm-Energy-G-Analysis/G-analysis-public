<?php

error_reporting(-1);
ini_set('display_errors', 'On');

require 'DbOperations.php';

$conn = connectToDB($_POST['nameDB']);

$query = (string)"SELECT * FROM erweiterungenProdukte ";

$records = queryDB($conn, $query, "read");

closeDbConn($conn);

echo json_encode($records, JSON_INVALID_UTF8_SUBSTITUTE);
