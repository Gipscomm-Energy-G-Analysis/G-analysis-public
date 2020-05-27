<?php
error_reporting (-1);
ini_set ('display_errors', 'On');

require 'DbOperations.php';

$nameDB = $_POST['nameDB'];
$conn = connectToDB($nameDB);

$ins = $_POST['ins'];
$id = $_POST['id'];
$nRecords = $_POST['nRecords'];

$query = "";

if ($ins = "prd") {
    $preQuery = "SELECT * FROM produkte ";
    $preQuery .= "WHERE prd_ID = $id ";

    $preRecords = queryDB($conn, $preQuery, "read");
    if ($nRecords > 0) {
        $top = " Top(".$nRecords.") ";
        $srt = " DESC ";
    }
    else {
        $top = "";
        $srt = "";
    }

    $query = "SELECT * FROM (SELECT".$top." * FROM ProdData ";
    $query .= "WHERE LEFT(artikelnummer,4) = ".$preRecords[0]['artikelNrPrd']." ";
    $query .= "ORDER BY timeClose".$srt.") AS div1 ";
    $query .= "ORDER BY timeClose";
} else {
    $query = "SELECT * FROM ProdData ";
    $query .= "WHERE ".$ins."_ID = $id ";
    $query .= "ORDER BY timeClose";
}

$records = queryDB($conn, $query, "read");

echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
?>
