<?php

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

if($_POST['id'] == 'mandantenBetrGruppen') {

    $betrGrpID = $_POST['betrGrpID'];
  
    $mandantenBetr = "SELECT * FROM mandantenBetrGruppen WHERE betrGrp_ID = '$betrGrpID'";
    $data = queryDB($conn, $mandantenBetr, "read");
    
    $IDs = explode(',', $data[0]['mandantenIDs']);
  
    $manIDs = "'" . implode ( "', '", $IDs ) . "'";
  
    $query = "SELECT * FROM mandanten WHERE man_ID IN  (".$manIDs.")";
    //$mandantenIds = queryDB($conn, $mandantenBetrGruppen, "read");
  
}

$records = queryDB($conn, $query, "read");

echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
