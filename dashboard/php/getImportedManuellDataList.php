<?php

error_reporting (-1);
ini_set ('display_errors', 'On');

require '..\..\/php/DbOperations.php';

$nameDB = $_POST['nameDB'];
$conn = connectToDB($nameDB);
$typ = $_POST['typ'];
$tableName='';
if($typ=='day'){
    $tableName='data_value_manual_imp_daily';
}else if($typ=='hour'){
    $tableName='data_value_manual_imp_hourly';
}else if($typ=='month'){
    $tableName='data_value_manual_imp_monthly';
}else if($typ=='year'){
    $tableName='data_value_manual_imp_yearly';
}

$query = "SELECT $tableName.*, messstellen.nameMSt as mst_name, channel.name as channel_name FROM $tableName INNER JOIN messstellen ON $tableName.mst_ID = messstellen.mst_ID INNER JOIN channel ON $tableName.channel_id = channel.channel_id ";
$records = queryDB($conn, $query, "read");

echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
