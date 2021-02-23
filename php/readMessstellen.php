<?php
include('top-cache.php');
error_reporting ( -1 ) ;
ini_set ( 'display_errors', 'On' ) ;

require 'DbOperations.php' ;

$nameDB = $_POST[ 'nameDB' ] ;
$conn = connectToDB( $nameDB ) ;

$berID = $_POST[ 'berID' ] ;
$type = $_POST[ 'type' ] ;

$query1  = "SELECT * FROM messstellen " ;
$query1 .= "WHERE ber_ID = $berID " ;
$query1 .= "AND typ = '$type' " ;
$query1 .= "AND deleted <> 'true' " ;

$records1 = queryDB( $conn, $query1, "read" ) ;

for ( $i = 0; $i < count( $records1 ); $i++ ) {


  if ( $records1[ $i ][ "anl_ID" ] != 0 || $records1[ $i ][ "anl_ID" ] != null ) {

    $query2 = "SELECT nummerAnl + ' ' + bezeichnungAnl AS anlage FROM anlagen " ;
    $query2 .= "WHERE anl_ID = ".$records1[ $i ][ "anl_ID" ] ;

    $record1 = queryDB( $conn, $query2, "read" ) ;

    $records1[ $i ][ "anl" ] = $record1[ 0 ][ "anlage" ] ;

  }
  else {
    $records1[ $i ][ "anl" ] = "" ;
  }

  if ( $records1[ $i ][ "msm_ID" ] != 0 || $records1[ $i ][ "msm_ID" ] != null ) {

    $query3 = "SELECT nrMsm AS messmittel FROM messmittel " ;
    $query3 .= "WHERE msm_ID = ".$records1[ $i ][ "msm_ID" ] ;

    $record2 = queryDB( $conn, $query3, "read" ) ;

    $records1[ $i ][ "msm" ] = $record2[ 0 ][ "messmittel" ] ;

  }
  else {
    $records1[ $i ][ "msm" ] = "" ;
  }
}

echo json_encode($records1, JSON_INVALID_UTF8_IGNORE);

include('bottom-cache.php');

?>
