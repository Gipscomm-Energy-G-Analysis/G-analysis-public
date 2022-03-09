<?php
error_reporting ( -1 ) ;
ini_set ( 'display_errors', 'On' ) ;

require '../../DbOperations.php' ;

$conn = connectToDB( "gipscomm" ) ;

$prdID = $_POST['prdID'] ;

$query  = "UPDATE produkte SET deleted = 1 ";
$query .= "WHERE prd_ID = ".$prdID." ";

queryDB( $conn, $query, "write" ) ;

echo $query ;
?>
