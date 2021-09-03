<?php
error_reporting ( -1 ) ;
ini_set ( 'display_errors', 'On' ) ;

require '../../DbOperations.php' ;

$conn = connectToDB( "gipscomm" ) ;
$betrGrpID = $_POST['betrGrpID'] ;

$query  = "UPDATE betreuerGruppen SET deleted = 1 ";
$query .= "WHERE betrGrp_ID = ".$betrGrpID." ";

queryDB( $conn, $query, "write" ) ;

echo $query ;
?>
