<?php
error_reporting ( -1 ) ;
ini_set ( 'display_errors', 'On' ) ;

require '../../DbOperations.php' ;

$conn = connectToDB( $_POST['nameDB'] ) ;

$knzInsID = $_POST['knzInsID'] ;

$query  = "UPDATE kennzahlenInstanzen SET deleted = 1 ";
$query .= "WHERE knzIns_ID = ".$knzInsID." ";

$query .= "UPDATE kennzahlen SET deleted = 1 ";
$query .= "WHERE knzIns_ID = ".$knzInsID." ";

queryDB( $conn, $query, "write" ) ;

echo $query ;
?>
