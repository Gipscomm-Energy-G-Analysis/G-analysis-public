<?php

error_reporting(-1);
ini_set ('display_errors', 'On');

require 'DbOperations.php';

$nameDB = $_POST['nameDB'];
$conn = connectToDB($nameDB);

$id = $_POST['id'];
$liegID = $_POST['liegID'];

if ( $id == "msmSuchen" || $id == "msmSuchenMstE" || $id == "msmSuchenMstB" ) {
	$query1 = "SELECT * FROM messmittel ";
	$query1 .= "WHERE lieg_ID = '$liegID'";
	$query1 .= "AND deleted <> 'true' ";

	$records1 = queryDB( $conn, $query1, "read" ) ;
	if(count($records1) > 0 && !isset($records1['error'])){
		for ( $i = 0; $i < count( $records1 ); $i++ ) {


		  if ( $records1[ $i ][ "anl_ID" ] != 0 && $records1[ $i ][ "anl_ID" ] != null ) { // Replaced 'or' by 'and' (We don't want neither 0 nor null) 01.03.2020

		    $query2 = "SELECT nummerAnl + ' ' + bezeichnungAnl AS anlage FROM anlagen " ;
		    $query2 .= "WHERE anl_ID = ".$records1[ $i ][ "anl_ID" ]." " ;
				$query2 .= "AND deleted <> 'true' " ;

		    $record = queryDB( $conn, $query2, "read" ) ;

		    $records1[ $i ][ "anlageMsm" ] = $record[ 0 ][ "anlage" ] ;

		  }
		  else {
		    $records1[ $i ][ "anlageMsm" ] = "" ;
		  }
		  if ( $records1[ $i ][ "mst_ID" ] != 0 && $records1[ $i ][ "mst_ID" ] != null && $records1[ $i ][ "anl_ID" ] != 0 && $records1[ $i ][ "anl_ID" ] != null) { // Replaced 'or' by 'and' (We don't want neither 0 nor null) 01.03.2020

		    $query2 = "SELECT nameMSt FROM messstellen " ;
		    $query2 .= "WHERE mst_ID = ".$records1[ $i ][ "mst_ID" ]." " ; // A missing space caused an error in the sql query 01.03.2020
		    $query2 .= "AND deleted <> 'true' " ;

		    $record = queryDB( $conn, $query2, "read" ) ;

		    $records1[ $i ][ "messstelleMsm" ] = count($record) > 0 ? !empty($record[ 0 ][ "nameMSt" ]) : "" ; // If the query2 doesn't return a record, an empty string is returned 01.03.2020

		  }
		  else {
		    $records1[ $i ][ "messstelleMsm" ] = "" ;
		  }
		}
	}
}

 echo json_encode($records1, JSON_INVALID_UTF8_IGNORE);
