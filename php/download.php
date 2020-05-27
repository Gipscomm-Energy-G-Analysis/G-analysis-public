<?php
error_reporting(-1);
ini_set ('display_errors', 'On');

require 'DbOperations.php';

$nameDB = $_POST['nameDB'];
$conn = connectToDB($nameDB);

$fileName = $_POST['dateiName'];
$verwaltung = $_POST['verwaltung'];
$id = $_POST['id'];

$query = "SELECT * FROM dokumente WHERE dok_ID = '$id'";

$records = queryDB($conn, $query, "read");

$encoded = $records[0]['inhalt'];
$decoded = base64_decode($encoded);
$file = "../temp/".$fileName;

file_put_contents($file, $decoded);

echo $query;

?>
