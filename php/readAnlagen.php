<?php
include('top-cache.php');
error_reporting ( -1 ) ;
ini_set ( 'display_errors', 'On' ) ;

require 'DbOperations.php' ;

$nameDB = $_POST[ 'nameDB' ] ;
$conn = connectToDB( $nameDB ) ;

$liegID = $_POST[ 'liegID' ] ;

$query = "SELECT (SELECT nameMSt FROM messstellen WHERE mst_ID = [anlagen].[messstelle1IDAnl]) AS messstelle1Anl " ;
$query .= ",(SELECT nameMSt FROM messstellen WHERE mst_ID = [anlagen].[messstelle2IDAnl]) AS messstelle2Anl " ;
$query .= ",(SELECT nameMSt FROM messstellen WHERE mst_ID = [anlagen].[messstelle3IDAnl]) AS messstelle3Anl " ;
$query .= ",(SELECT nameMSt FROM messstellen WHERE mst_ID = [anlagen].[messstelle4IDAnl]) AS messstelle4Anl " ;
$query .= ",* " ;
$query .= "FROM [dbo].[anlagen] " ;
$query .= "WHERE lieg_ID = $liegID " ;
$query .= "AND deleted <> 'true' " ;
$query .= "AND archiviertAnl <> 'true' " ;

$records = queryDB( $conn, $query, "read" ) ;

$counts = "" ;

$nMst = 4 ;
$nZugVerbr = 6 ;

for ( $i = 0; $i < count( $records ); $i++ ) {
  for ($j=1; $j < $nZugVerbr + 1; $j++) {

      $zugVerbrID = "zugeordneterVerbraucherID".$j ;
      $zugVerbrName = "zugeordneterVerbraucher".$j ;

      if ( $records[ $i ][ $zugVerbrID ] != 0 && $records[ $i ][ $zugVerbrID ] != null) {

          foreach ($records as $anl) {

                  if ($records[ $i ][ $zugVerbrID ] === $anl["anl_ID"]) {

                      $records[ $i ][ $zugVerbrName ] = $anl[ "nummerAnl" ]." ".$anl[ "bezeichnungAnl" ] ;
                  }
          }
      }
      else {
        $records[ $i ][ $zugVerbrName ] = "" ;
      }
  }
}

closeDbConn ( $conn ) ;

echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
include('bottom-cache.php');
?>
