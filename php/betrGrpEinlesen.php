<?php

include('top-cache.php');

error_reporting ( -1 ) ;
ini_set ( 'display_errors', 'On' ) ;

require 'DbOperations.php' ;

$nameDB = $_POST[ 'nameDB' ] ;
$conn = connectToDB( $nameDB ) ;

$query  = "SELECT * FROM betreuerGruppen " ;

$records = queryDB( $conn, $query, "read" ) ;

closeDbConn ( $conn ) ;

echo json_encode($records, JSON_INVALID_UTF8_IGNORE);

include('bottom-cache.php');

?>
