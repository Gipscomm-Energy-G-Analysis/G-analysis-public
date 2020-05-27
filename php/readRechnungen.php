<?php
include('top-cache.php');
error_reporting ( -1 ) ;
ini_set ( 'display_errors', 'On' ) ;

require 'DbOperations.php' ;

$nameDB = $_POST[ 'nameDB' ] ;
$conn = connectToDB( $nameDB ) ;

$liegID = $_POST[ 'liegID' ] ;

$query1  = "SELECT * FROM externeRechnungen " ;
$query1 .= "WHERE lieg_ID = $liegID " ;
$query1 .= "AND deleted <> 'true' " ;

$records1 = queryDB( $conn, $query1, "read" ) ;

for ( $i = 0; $i < count( $records1 ); $i++ ) {


  if ( $records1[ $i ][ "mst_ID" ] != 0 || $records1[ $i ][ "mst_ID" ] != null ) {

    $query2 = "SELECT nameMSt FROM messstellen " ;
    $query2 .= "WHERE mst_ID = ".$records1[ $i ][ "mst_ID" ] ;

    $record1 = queryDB( $conn, $query2, "read" ) ;

    $records1[ $i ][ "mst" ] = $record1[ 0 ][ "nameMSt" ] ;

  }
  else {
    $records1[ $i ][ "mst" ] = "" ;
  }

}

echo json_encode($records1, JSON_INVALID_UTF8_IGNORE);
include('bottom-cache.php');
?>
