<?php

include('top-cache.php');
error_reporting(-1);
ini_set ('display_errors', 'On');

require 'DbOperations.php';

$nameDB = $_POST['nameDB'];
$conn = connectToDB($nameDB);



$liegID = $_POST['liegID'];


$tsql = "INSERT INTO dokumente(anl_ID,kategorieDok,nameDok,typDok,groeßeDok,inhalt) VALUES ('6','TestKat','TestName','type','1223','sdgfdyfghfghfx')";


queryDB($conn, $tsql, "write");

echo $tsql;

include('bottom-cache.php');
?>
