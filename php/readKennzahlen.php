<?php
error_reporting(-1);
ini_set('display_errors', 'On');

require 'DbOperations.php';

$nameDB = $_POST['nameDB'];
$conn = connectToDB($nameDB);

$ins = $_POST['ins'];

switch ($ins) {
case "knzIns":
    $orgID = $_POST['orgID'];

    $query1  = "SELECT * FROM kennzahlenInstanzen ";
    $query1 .= "WHERE org_ID = $orgID ";
    $query1 .= "AND deleted <> 'true' ";

    $records1 = queryDB($conn, $query1, "read");

    for ( $i = 0; $i < count($records1); $i++ ) {
        switch ($records1[$i]["bezug"]) {
        case "anl":
            $id = $records1[$i]['anl_ID'];
            $query2 = "SELECT nummerAnl + '_' + bezeichnungAnl AS instanz ";
            $query2 .= "FROM anlagen ";
            $query2 .= "WHERE anl_ID = ".$records1[$i]['anl_ID']." ";
            break;
        case "mst":
            $id = $records1[$i]['mst_ID'];
            $query2 = "SELECT nameMSt AS instanz ";
            $query2 .= "FROM messstellen ";
            $query2 .= "WHERE mst_ID = ".$records1[$i]['mst_ID']." ";
            break;
        case "prd":
            $id = $records1[$i]['prd_ID'];
            $query2 = "SELECT artikelNrPrd + '_' + namePrd AS instanz ";
            $query2 .= "FROM produkte ";
            $query2 .= "WHERE prd_ID = ".$records1[$i]['prd_ID']." ";
            break;
        default:
            echo "error";
            break;
        }
        $instanz = queryDB($conn, $query2, "read");
        $records1[$i]["instanz"] = $instanz[0]["instanz"];
        $records1[$i]["id"] = $id;
    }
    echo json_encode($records1, JSON_INVALID_UTF8_SUBSTITUTE);
    break;
case "knz":
    $knzInsID = $_POST['knzInsID'];

    $query = "SELECT * FROM KennzahlenFormeln ";
    $query .= "WHERE knzIns_ID = $knzInsID ";
    $query .= "ORDER BY knzIns_ID ";
    $records = queryDB($conn, $query, "read");
    echo json_encode($records, JSON_INVALID_UTF8_SUBSTITUTE);
    break;
case "spzKnz":
    $query = "SELECT * FROM KennzahlenFormeln ";
    $query .= "ORDER BY knzIns_ID ";
    $records = queryDB($conn, $query, "read");
    echo json_encode($records, JSON_INVALID_UTF8_SUBSTITUTE);
    break;
default:
    echo "error";
    break;
case "kpiRec":
    $knzID = $_POST [ "knzID" ] ;

    $query = "SELECT * FROM KpiRecord ";
    $query .= "WHERE knz_ID = '$knzID' ";
    $records = queryDB($conn, $query, "read");
    echo json_encode($records, JSON_INVALID_UTF8_SUBSTITUTE);
    break;
}
