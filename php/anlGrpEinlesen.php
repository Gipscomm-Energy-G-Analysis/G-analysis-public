<?php

$nameDB = $_POST['nameDB'];
$conn = connectToDB ( $nameDB );
$query = "SELECT * FROM merkmale";
$records = queryDB ( $conn, $query);

echo json_encode($records, JSON_INVALID_UTF8_IGNORE);

?>
