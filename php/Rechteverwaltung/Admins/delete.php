<?php
error_reporting ( -1 ) ;
ini_set ( 'display_errors', 'On' ) ;

require '../../DbOperations.php' ;

$conn = connectToDB( "gipscomm" ) ;

$admID = $_POST['admID'] ;

$query  = "UPDATE admins SET deleted = 1 ";
$query .= "WHERE adm_ID = ".$admID." ";

queryDB( $conn, $query, "write" ) ;

echo $query ;
?>
