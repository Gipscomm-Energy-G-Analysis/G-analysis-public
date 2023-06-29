<?php

error_reporting(-1);
ini_set('display_errors', 'On');

require 'DbOperations.php';
$username = $_POST['username'];
$position = $_POST['position'];
$nameDB = $_POST['nameDB'];
if($position==="gipsAdm"){
   $query  = "SELECT gipsAdm_ID as id FROM gipscommAdmins Where username='".$username."' AND position='".$position."'";
}
if($position==="adm"){
    $query  = "SELECT adm_ID as id FROM admins Where username='".$username."' AND position='".$position."'";
}
if($position==="sAdm"){
    $query  = "SELECT sAdm_ID as id FROM superAdmins Where username='".$username."' AND position='".$position."'";
}
if($position==="ben"){
    $query  = "SELECT ben_ID as id FROM benutzer Where username='".$username."' AND position='".$position."'";
}

$records = (array)queryDB(connectToDB((string)$_POST['nameDB']), (string)$query, "read");

echo json_encode($records, JSON_INVALID_UTF8_SUBSTITUTE);

