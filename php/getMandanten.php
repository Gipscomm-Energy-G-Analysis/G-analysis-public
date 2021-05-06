<?php
include('top-cache.php');
error_reporting(-1);
ini_set ('display_errors', 'On');

require 'DbOperations.php';

$nameDB = $_POST['nameDB'];
$conn = connectToDB($nameDB);

$betrGrpID = $_POST['betrGrpID'];
$manSuper = '';

$query = "SELECT * FROM mandanten WHERE betrGrp_ID = '$betrGrpID'";

if(!empty($_POST['id'])){
    if($_POST['id'] == "manSuper") {
        $query = "SELECT * FROM mandanten";
    }
} 

$records = queryDB($conn, $query, "read");

echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
include('bottom-cache.php');
?>
