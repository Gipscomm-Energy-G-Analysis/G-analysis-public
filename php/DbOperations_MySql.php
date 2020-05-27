<?php
error_reporting (-1) ;
ini_set ('display_errors', 'On') ;

function connectToDB( $nameDB ){
  $conn = mysqli_connect( "gipscom-test.meine-neue-website.com ", "c1mueller", "QfgyYR@32", $nameDB ) ;
  if ( !$conn ) {
    die( 'Could not connect: ' . mysql_error() );
  }
  return $conn ;
}

function queryDB( $conn, $query, $mode ){
  if( $mode == "read" ){
    $result = mysqli_query( $conn, $query ) ;
    $data = array() ;
    while( $row = mysqli_fetch_array( $result, MYSQLI_BOTH ) ){
    	$data[] = $row ;
    }
    return $data ;
  }
  else{
    $result = mysqli_query( $conn, $query ) ;
    return $query ;
  }
}
?>
