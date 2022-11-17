<?php

error_reporting(-1);
ini_set('display_errors', 'On');

require 'DbOperations.php';

$nameDB = $_POST['nameDB'];
$conn = connectToDB($nameDB);
$id = $_POST['id'];

if ($id == "versEinh" || $id == "einERng" || $id == "mengeERng") {
    $energietraeger = $_POST['energietraeger'];
    $query = "SELECT * FROM EnergietraegerVersorger ";
    $query .= "WHERE nameEnt = '$energietraeger' ";
} else {
    $liegID = $_POST['liegID'];
    $query = "SELECT * FROM EnergietraegerVersorger ";
    $query .= "WHERE lieg_ID = '$liegID' ";
}

$records = queryDB($conn, $query, "read");

echo json_encode($records, JSON_INVALID_UTF8_SUBSTITUTE);
