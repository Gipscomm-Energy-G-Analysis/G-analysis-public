<?php
include('top-cache.php');
error_reporting (-1);
ini_set ('display_errors', 'On');

require 'DbOperations.php';

$nameDB = $_POST['nameDB'];
$conn = connectToDB($nameDB);


$ident = $_POST['ident'];
$mstID = $_POST['mstID'];
$ins = $_POST['ins'];
$mode = "";

if ($ins === "test"){
    $query = "SELECT * FROM bemerkungenDiagrammme ";
    $query .= "WHERE mst_ID = '$mstID' AND ident = '$ident' ";

    $mode = "read";
}
else if ($ins === "new"){
    $type = $_POST['type'];
    $bemerkung = $_POST['bemerkung'];

    $query = "INSERT INTO bemerkungenDiagrammme (gespeichertAm, type, mst_ID, ident, bemerkung)" ;
    $query .= "VALUES (getdate(), '$type', $mstID, '$ident', '$bemerkung')" ;

    $mode = "write";
}
else {
    $bemerkung = $_POST['bemerkung'];

    $query = "UPDATE bemerkungenDiagrammme " ;
    $query .= "SET gespeichertAm = getdate(), bemerkung = '$bemerkung' " ;
    $query .= "WHERE mst_ID = $mstID AND ident = '$ident' " ;
}

$records = queryDB($conn, $query, $mode);
echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
include('bottom-cache.php');
?>
