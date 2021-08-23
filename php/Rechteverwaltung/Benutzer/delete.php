<?php
error_reporting ( -1 ) ;
ini_set ( 'display_errors', 'On' ) ;

require '../../DbOperations.php' ;

$conn = connectToDB( "gipscomm" ) ;

$benID = $_POST['benID'] ;

$query  = "UPDATE benutzer SET deleted = 1 ";
$query .= "WHERE ben_ID = ".$benID." ";

queryDB( $conn, $query, "write" ) ;

echo $query ;
?>
