<?php

error_reporting(-1);
ini_set('display_errors', 'On');

require 'DbOperations.php';

$conn = connectToDB($_POST['nameDB']);

$query = "SELECT * FROM config.betriebsparameter ";

$records = queryDB($conn, $query, "read");

echo json_encode($records, JSON_INVALID_UTF8_SUBSTITUTE);
