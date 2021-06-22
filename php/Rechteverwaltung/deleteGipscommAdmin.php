<?php
error_reporting ( -1 ) ;
ini_set ( 'display_errors', 'On' ) ;

require '../DbOperations.php' ;

$conn = connectToDB( "gipscomm" ) ;
$gipscAdmID = $_POST['gipscAdmID'] ;

$query  = "UPDATE gipscommAdmins SET deleted = 1 ";
$query .= "WHERE gipsAdm_ID = ".$gipscAdmID." ";

queryDB( $conn, $query, "write" ) ;

echo $query ;
?>
