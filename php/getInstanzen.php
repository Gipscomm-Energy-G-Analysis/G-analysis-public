<?php

error_reporting(-1);
ini_set ('display_errors', 'On');

require 'DbOperations.php';

$nameDB = $_POST['nameDB'];
$conn = connectToDB($nameDB);

$bezug = $_POST['bezug'];
$orgID = $_POST['orgID'];

if($bezug === "mst") {
  $query1 = "SELECT * FROM messstellen ";
  $query1 .= "INNER JOIN bereiche ";
  $query1 .= "ON messstellen.ber_ID = bereiche.ber_ID ";
  $query1 .= "INNER JOIN liegenschaften ";
  $query1 .= "ON bereiche.lieg_ID = liegenschaften.lieg_ID ";
  $query1 .= "WHERE liegenschaften.org_ID = '$orgID' ";
  $query1 .= "AND messstellen.deleted <> 'true' ";

  $records1 = queryDB( $conn, $query1, "read" ) ;

	for ( $i = 0; $i < count( $records1 ); $i++ ) {

	  if ( $records1[ $i ][ "anl_ID" ] != 0 || $records1[ $i ][ "anl_ID" ] != null ) {

	    $query2 = "SELECT nummerAnl + ' ' + bezeichnungAnl AS anlage FROM anlagen " ;
	    $query2 .= "WHERE anl_ID = ".$records1[ $i ][ "anl_ID" ] ;
			$query2 .= "AND deleted <> 'true' " ;

	    $record = queryDB( $conn, $query2, "read" ) ;

	    $records1[ $i ][ "anlageMst" ] = $record[ 0 ][ "anlage" ] ;

	  }
	  else {
	    $records1[ $i ][ "anlageMst" ] = "" ;
	  }
	}
  echo json_encode( $records1 );
}
elseif ($bezug === "anl") {
  $query = "SELECT * FROM anlagen ";
  $query .= "INNER JOIN liegenschaften ";
  $query .= "ON anlagen.lieg_ID = liegenschaften.lieg_ID ";
  $query .= "WHERE org_ID = '$orgID' ";
  $query .= "AND anlagen.deleted <> 'true' ";

  $records = queryDB($conn, $query, "read");

  echo json_encode($records);
}
elseif ($bezug === "prd") {
  $query = "SELECT * FROM produkte ";
  $query .= "WHERE org_ID = '$orgID' ";
  $query .= "AND deleted <> 'true' ";

  $records = queryDB($conn, $query, "read");

  echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
}
