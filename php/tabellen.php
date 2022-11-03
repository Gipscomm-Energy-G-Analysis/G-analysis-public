<?php

error_reporting(-1);
ini_set('display_errors', 'On');

require 'DbOperations.php';

$ins = $_POST['ins'];
$nameDB = $_POST['nameDB'];
$conn = connectToDB($nameDB);

switch ( $ins ) {
case "tabellenLst" :
    $query = "SELECT * FROM TablesViews " ;
    $query.= "ORDER BY name " ;
    break;
case "tabelle" :
    $tabelle = $_POST['tabelle'];
    $query = "SELECT * FROM ".$tabelle." ";
    break;
default:
    echo "error";
    break;
}

$records = queryDB($conn, $query, "read");

echo json_encode($records, JSON_INVALID_UTF8_SUBSTITUTE);
