<?php

error_reporting (-1);
ini_set ('display_errors', 'On');

require 'DbOperations.php';

$nameDB = $_POST['nameDB'];
$conn = connectToDB($nameDB);

$ins = $_POST['ins'];
$ident = $_POST['ident'];
$mstID = $_POST['mstID'];
$bemerkung = $_POST['bemerkung'];
if(isset($_POST['line_index'])){
    $lineIndex = $_POST['line_index'];
} else{
    $lineIndex = '';
}
$type = $_POST['type'];

$checkNoteQuery = "SELECT * FROM bemerkungenDiagramme WHERE mst_ID = '$mstID' and ident = '$ident' and type = '$type' ";
$noteRecords = queryDB($conn, $checkNoteQuery, "read");

if (isset($noteRecords['error'])){

    $type = $_POST['type'];

    $query = "INSERT INTO bemerkungenDiagramme (gespeichertAm, type, mst_ID, ident, bemerkung, line_index) " ;
    $query .= "VALUES (getdate(), '$type', $mstID, '$ident', '$bemerkung', '$lineIndex') " ;
}
else {

    $query = "UPDATE bemerkungenDiagramme " ;
    $query .= "SET gespeichertAm = getdate(), bemerkung = '$bemerkung', line_index = '$lineIndex' " ;
    $query .= "WHERE mst_ID = $mstID AND ident = '$ident' " ;
}

$records = queryDB($conn, $query, "write");

echo json_encode($records, JSON_INVALID_UTF8_SUBSTITUTE);
