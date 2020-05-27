<?php
include('top-cache.php');
error_reporting ( -1 ) ;
ini_set ( 'display_errors', 'On' ) ;

require 'DbOperations.php' ;

$nameDB = $_POST[ 'nameDB' ] ;
$conn = connectToDB( $nameDB ) ;

$liegID = $_POST[ 'liegID' ] ;

$query1  = "SELECT * FROM anlagen " ;
$query1 .= "WHERE lieg_ID = $liegID " ;
$query1 .= "AND deleted <> 'true' " ;
$query1 .= "AND archiviertAnl <> 'true' ";

$records1 = queryDB( $conn, $query1, "read" ) ;
//
$counts = "" ;
//
$nMst = 4 ;
$nZugVerbr = 6 ;

for ( $i = 0; $i < count( $records1 ); $i++ ) {
  for ( $j = 1; $j < $nMst + 1; $j++ ) {

    $mstID = "messstelle".$j."IDAnl" ;
    $mstName = "messstelle".$j."Anl" ;

    if ( $records1[ $i ][ $mstID ] != 0 || $records1[ $i ][ $mstID ] != null) {

      $query2  = "SELECT nameMSt " ;
      $query2 .= "FROM messstellen " ;
      $query2 .= "WHERE mst_ID = ".$records1[ $i ][ $mstID ] ;

      $record = queryDB( $conn, $query2, "read" ) ;

      $records1[ $i ][ $mstName ] = $record[ 0 ][ "nameMSt" ] ;

    }
    else {
      $records1[ $i ][ $mstName ] = "" ;
    }
}
  for ($k=1; $k < $nZugVerbr + 1; $k++) {

      $zugVerbrID = "zugeordneterVerbraucherID".$k ;
      $zugVerbrName = "zugeordneterVerbraucher".$k ;

      if ( $records1[ $i ][ $zugVerbrID ] != 0 || $records1[ $i ][ $zugVerbrID ] != null) {

        $query3  = "SELECT nummerAnl + '_' + bezeichnungAnl AS nameAnl " ;
        $query3 .= "FROM anlagen " ;
        $query3 .= "WHERE anl_ID = ".$records1[ $i ][ $zugVerbrID ] ;

        $record2 = queryDB( $conn, $query3, "read" ) ;

        $records1[ $i ][ $zugVerbrName ] = $record2[ 0 ][ "nameAnl" ] ;

      }
      else {
        $records1[ $i ][ $zugVerbrName ] = "" ;
      }
  }
}

closeDbConn ( $conn ) ;

echo json_encode($records1, JSON_INVALID_UTF8_IGNORE);
include('bottom-cache.php');
?>
