<?php
error_reporting ( -1 ) ;
ini_set ( 'display_errors', 'On' ) ;

require '../DbOperations.php' ;

$nameDB = $_POST[ 'nameDB' ] ;
$conn = connectToDB( $nameDB ) ;
$schtMdlID = $_POST['schtMdlID'] ;

$query  = "UPDATE schichtModelle SET deleted = 1 ";
$query .= "WHERE schtMdl_ID = ".$schtMdlID." ";

queryDB( $conn, $query, "write" ) ;

$query2  = "UPDATE schichten SET deleted = 1 ";
$query2 .= "WHERE schtMdl_ID = ".$schtMdlID." ";

queryDB( $conn, $query2, "write" ) ;

echo $query." ".$query2 ;
?>
