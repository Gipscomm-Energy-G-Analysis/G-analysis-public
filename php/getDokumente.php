<?php
error_reporting(-1);
ini_set ('display_errors', 'On');

require 'DbOperations.php';

$nameDB = $_POST['nameDB'];
$conn = connectToDB($nameDB);

$verwaltung = $_POST['verwaltung'];
$id = $_POST['id'];

if($verwaltung == "Anl"){
    $query = "SELECT dok_ID, kategorieDok, nameDok, erweiterungDok FROM dokumente WHERE anl_ID = '$id' ";
    $query .= "AND deleted = 'false' ";
}

 if($verwaltung == "Msm"){
     $query = "SELECT dok_ID, kategorieDok, nameDok, erweiterungDok FROM dokumente WHERE msm_ID = '$id' ";
     $query .= "AND deleted = 'false' ";
}
if($verwaltung == "ERng"){
    $query = "SELECT dok_ID, kategorieDok, nameDok, erweiterungDok FROM dokumente WHERE eRng_ID = '$id' ";
    $query .= "AND deleted = 'false' ";
}

$records = queryDB($conn, $query, "read");

echo json_encode($records);     // CHANGE: The DB data has to be echoed json encoded(before echo $records;) 27.05.2020

?>
