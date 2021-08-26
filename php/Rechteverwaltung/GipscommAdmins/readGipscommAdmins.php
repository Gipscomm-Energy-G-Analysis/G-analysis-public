<?php
error_reporting ( -1 ) ;
ini_set ( 'display_errors', 'On' ) ;

require '../../DbOperations.php' ;

$conn = connectToDB( "gipscomm" ) ;

$query  = "SELECT gipsAdm_ID, username, betrGrp_ID, position, manGrp_ID, man_ID FROM gipscommAdmins " ;
$query .= "WHERE deleted = 0 " ;

$result = queryDB( $conn, $query, "read" ) ;

echo json_encode(["gipscommAdmins" => $result] , JSON_INVALID_UTF8_IGNORE) ;
?>
