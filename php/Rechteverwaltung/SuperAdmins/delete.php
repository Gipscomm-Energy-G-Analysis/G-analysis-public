<?php
error_reporting ( -1 ) ;
ini_set ( 'display_errors', 'On' ) ;

require '../../DbOperations.php' ;

$conn = connectToDB( "gipscomm" ) ;
$sAdmID = $_POST['sAdmID'] ;

$query  = "UPDATE superAdmins SET deleted = 1 ";
$query .= "WHERE sAdm_ID = ".$sAdmID." ";

queryDB( $conn, $query, "write" ) ;

echo $query ;
?>
