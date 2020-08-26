<?php
include('top-cache.php');
error_reporting (-1);
ini_set ('display_errors', 'On');

require 'DbOperations.php';

$nameDB = $_POST['nameDB'];
$conn = connectToDB($nameDB);


$ins = $_POST['ins'];
$ident = $_POST['ident'];
$mstID = $_POST['mstID'];
$bemerkung = $_POST['bemerkung'];

if ($ins === "new"){

    $type = $_POST['type'];

    $query = "INSERT INTO bemerkungenDiagramme (gespeichertAm, type, mst_ID, ident, bemerkung) " ;
    $query .= "VALUES (getdate(), '$type', $mstID, '$ident', '$bemerkung') " ;
}
else {

    $query = "UPDATE bemerkungenDiagramme " ;
    $query .= "SET gespeichertAm = getdate(), bemerkung = '$bemerkung' " ;
    $query .= "WHERE mst_ID = $mstID AND ident = '$ident' " ;
}

$records = queryDB($conn, $query, "write");

echo json_encode($records, JSON_INVALID_UTF8_IGNORE);


include('bottom-cache.php');
?>
