<?php
include('top-cache.php');
error_reporting (-1);
ini_set ('display_errors', 'On');

require 'DbOperations.php';

$nameDB = $_POST['nameDB'];
$conn = connectToDB($nameDB);
$id = $_POST['id'];
$messstelle = $_POST['nameMst'];

$liegID = $_POST['liegID'];

$query1 = "SELECT * FROM RechnungenEnergietraeger ";
$query1 .= "WHERE deleted <> 'true' ";
$query1 .= "AND lieg_ID = '$liegID' ";

$records1 = queryDB($conn, $query1, "read");

for ( $i = 0; $i < count( $records1 ); $i++ ) {


  if ( $records1[ $i ][ "mst_ID" ] != 0 || $records1[ $i ][ "mst_ID" ] != null ) {

    $query2 = "SELECT nameMSt FROM messstellen " ;
    $query2 .= "WHERE mst_ID = ".$records1[ $i ][ "mst_ID" ] ;

    $record1 = queryDB( $conn, $query2, "read" ) ;

    $records1[ $i ][ "mstERng" ] = $record1[ 0 ][ "nameMSt" ] ;

  }
  else {
    $records1[ $i ][ "mstERng" ] = "" ;
  }

}

echo json_encode($records1, JSON_INVALID_UTF8_IGNORE);
include('bottom-cache.php');
?>
