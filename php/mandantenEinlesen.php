<?php
include('top-cache.php') ;
error_reporting (-1) ;
ini_set ('display_errors', 'On') ;

require 'DbOperations.php' ;

$nameDB = "gipscomm" ;
$conn = connectToDB ( $nameDB ) ;

$betrGrpID = $_POST [ 'betrGrpID' ] ;
$ins = $_POST [ 'ins' ] ;
$manOderManGrpID = $_POST [ 'manOderManGrpID' ] ;

if( $betrGrpID == "alle" ) {
    $query = "SELECT * FROM mandanten " ;
    $query .= "ORDER BY nameMan " ;
}
else {
  if( $ins == null && $manOderManGrpID == null ) {
    $query = "SELECT * FROM mandanten " ;
    $query .= "WHERE betrGrp_ID = '$betrGrpID' " ;
  }
  elseif( $ins == "man_ID" ) {
    $query = "SELECT * FROM mandanten " ;
    $query .= "WHERE man_ID = '$manOderManGrpID' " ;
  }
  elseif ( $ins == "manGrp_ID" ) {
    $query1 = "SELECT mandantenIDs FROM mandantenGruppen " ;
    $query1 .= "WHERE manGrp_ID = '$manOderManGrpID' " ;

    $result1 = sqlsrv_query ( $conn, $query1 ) ;
    $data1 = array() ;

    while( $row1 = sqlsrv_fetch_array ( $result1, SQLSRV_FETCH_ASSOC ) ) {
    	$data1[] = $row1 ;
    }

    $manIDs = explode ( ",", $data1 [ 0 ] [ "mandantenIDs" ] ) ;

    $query = "SELECT * FROM mandanten " ;
    $query .= "WHERE man_ID = '$manIDs[0]' " ;

    for($n = 1; $n < count ( $manIDs ); $n++) {
      $query .= "OR man_ID = '$manIDs[$n]' " ;
    }
  }
}

$records = queryDB ( $conn, $query, "read") ;

echo json_encode($records, JSON_INVALID_UTF8_IGNORE) ;
include('bottom-cache.php') ;
?>
