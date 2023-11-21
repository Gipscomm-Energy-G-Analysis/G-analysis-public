<?php

error_reporting(-1);
ini_set('display_errors', 'On');

require 'DbOperations.php';
$userid = $_POST['userid'];
$queryData  = "SELECT menu_permission_id FROM user_menu_permissions WHERE user_id = " . (string)$userid . " ";
$records = (array)queryDB(connectToDB((string)$_POST['nameDB']), (string)$queryData, "read");

if(count($records) > 1 && !isset($records['error'])){
    $idsarray=[];
    foreach($records as $value){
        $idsarray[]=$value['menu_permission_id'];
    }
    $idsList = implode(',', $idsarray);
    $query  = "SELECT menu_id FROM gipscomm_menu WHERE menu_id !='' AND id NOT IN ($idsList)";
    $records = (array)queryDB(connectToDB((string)$_POST['nameDB']), (string)$query, "read");
    
}else{
    $query  = "SELECT menu_id FROM gipscomm_menu";
    $records = (array)queryDB(connectToDB((string)$_POST['nameDB']), (string)$query, "read");
}
    echo json_encode($records, JSON_INVALID_UTF8_SUBSTITUTE);
