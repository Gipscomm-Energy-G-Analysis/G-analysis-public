<?php
error_reporting ( -1 ) ;
ini_set ( 'display_errors', 'On' ) ;

require '../DbOperations.php' ;

$conn = connectToDB( "gipscomm" ) ;

$query  = "SELECT man_ID, betrGrp_ID, nameMan, dbName FROM mandanten " ;

$result = queryDB( $conn, $query, "read" ) ;

echo json_encode(["mandanten" => $result] , JSON_INVALID_UTF8_IGNORE) ;
?>
