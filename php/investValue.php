<?php
include('top-cache.php');
error_reporting(-1);
ini_set ('display_errors', 'On');

require ('DbOperations.php');

$nameDB = $_POST['nameDB'];
$conn = connectToDB($nameDB);

$id = $_POST['id'];
if($id=='getInvestValues'){
    $mstID = $_POST['mstID'];
    $queryDB = "select distinct top 1 * from interneBetriebsdatenHistorie where mstID = '$mstID' AND archiviert = 'true'";
    $result = queryDB($conn, $queryDB, "read");
    echo json_encode($result);
}
else if($id=='saveInvestValues'){
    $mstID = $_POST['mstID'];
    $min = $_POST['min'];
    $max = $_POST['max'];
    $queryDB = "update interneBetriebsdatenHistorie set invest_max = '$max' , invest_min = '$min' where mstID = '$mstID' AND archiviert = 'true'";
    $result = queryDB($conn, $queryDB, "write");
    echo json_encode($result);
}
else if($id == 'redirectInvestValues'){
    $mstID = $_POST['mstID'];
    $queryDB = "select distinct top 1 * from interneBetriebsdatenHistorie where mstID = '$mstID' AND archiviert = 'true'";
    $result = queryDB($conn, $queryDB, "read");
    echo json_encode($result);
}
else if($id == 'preFillIMinMaxField'){
    $mstID = $_POST['mstID'];
    $queryDB = "select distinct top 1 * from interneBetriebsdatenHistorie where mstID = '$mstID' AND archiviert = 'true'";
    $result = queryDB($conn, $queryDB, "read");
    echo json_encode($result);
}
else if($id == 'redirectInvestValuesProduct'){ //Product Checks
    $table_config_id = $_POST['table_config_id'];
    $queryDB = "select distinct top 1 * from produktionsAnlagenConfig where iBdePrdktConf_ID = '$table_config_id'";
    $result = queryDB($conn, $queryDB, "read");
    echo json_encode($result);
}
else if($id == 'saveInvestValuesProduct'){ //Product Checks
    $table_config_id = $_POST['table_config_id'];
    $min = $_POST['min'];
    $max = $_POST['max'];
    $queryDB = "update produktionsAnlagenConfig set max_val = '$max' , min_val = '$min' where iBdePrdktConf_ID = '$table_config_id'";
    $result = queryDB($conn, $queryDB, "write");
    echo json_encode($result);
}
?>