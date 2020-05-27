<?php
include('top-cache.php');
error_reporting(-1);
ini_set ('display_errors', 'On');

require 'DbOperations.php';

$nameDB = $_POST['nameDB'];
$conn = connectToDB($nameDB);
$id = $_POST['id'];

if($id == "man"){
  $query = "SELECT * FROM mandanten";
}

elseif($id == "org"){
  $query = "SELECT * FROM organisationen";
}

elseif($id == "lieg"){

  $orgID = $_POST['orgID'];

  $query = "SELECT * FROM liegenschaften WHERE org_ID = '$orgID'";
}

elseif($id == "ber"){

  $liegID = $_POST['liegID'];

  $query = "SELECT * FROM bereiche WHERE lieg_ID = '$liegID'";
}

$records = queryDB($conn, $query, "read");

echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
include('bottom-cache.php');
?>
