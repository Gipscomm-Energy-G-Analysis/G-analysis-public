<?php

error_reporting(-1);
ini_set('display_errors', 'On');

require 'DbOperations.php';

$query = "SELECT * FROM erweiterungenProdukte ";

$records = (array)queryDB(connectToDB($_POST['nameDB']), $query, "read");

echo json_encode($records, JSON_INVALID_UTF8_SUBSTITUTE);
