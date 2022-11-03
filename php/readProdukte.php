<?php

error_reporting ( -1 ) ;
ini_set ( 'display_errors', 'On' ) ;

require 'DbOperations.php' ;

$nameDB = $_POST[ 'nameDB' ] ;
$conn = connectToDB( $nameDB ) ;

$orgID = $_POST[ 'orgID' ] ;
$nAnl = 9 ;

$query1  = "SELECT * FROM produkte " ;
$query1 .= "WHERE org_ID = $orgID " ;
$query1 .= "AND deleted <> 'true' " ;

$records1 = queryDB( $conn, $query1, "read" ) ;

$counts = "" ;

for ( $i = 0; $i < count( $records1 ); $i++ ) {
  for ( $j = 1; $j < $nAnl + 1; $j++ ) {

    $anlID = "anl0".$j."_ID" ;
    $anl = "anl0".$j ;

    if ( $records1[ $i ][ $anlID ] != 0 || $records1[ $i ][ $anlID ] != null ) {

      $query2  = "SELECT nummerAnl + ' ' + bezeichnungAnl AS ".$anl." " ;
      $query2 .= "FROM anlagen " ;
      $query2 .= "WHERE anl_ID = ".$records1[ $i ][ $anlID ] ;

      $recordAnl = queryDB( $conn, $query2, "read" ) ;

      $records1[ $i ][ $anl ] = $recordAnl[ 0 ][ $anl ] ;

    }
    else {
      $records1[ $i ][ $anl ] = "" ;
    }
  }
}

echo json_encode($records1, JSON_INVALID_UTF8_SUBSTITUTE);
