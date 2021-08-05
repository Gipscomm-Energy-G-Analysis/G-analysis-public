<?php
error_reporting ( -1 ) ;
ini_set ( 'display_errors', 'On' ) ;

require '../../DbOperations.php' ;

$conn = connectToDB( "gipscomm" ) ;

$manGrpID = $_POST['manGrpID'] ;

$query  = "UPDATE mandantenGruppen SET deleted = 1 ";
$query .= "WHERE manGrp_ID = ".$manGrpID." ";

queryDB( $conn, $query, "write" ) ;

echo $query ;
?>
