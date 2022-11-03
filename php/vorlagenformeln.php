<?php

error_reporting( -1 );
ini_set ( 'display_errors', 'On' );

require 'DbOperations.php';

$nameDB = $_POST[ 'nameDB' ];
$conn = connectToDB( $nameDB );

$query = "SELECT * FROM vorlagenFormeln ";

$records = queryDB( $conn, $query, "read" );

echo json_encode($records, JSON_INVALID_UTF8_SUBSTITUTE);
