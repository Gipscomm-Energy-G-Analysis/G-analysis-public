<?php
error_reporting ( -1 ) ;
ini_set ( 'display_errors', 'On' ) ;

require '../../DbOperations.php' ;

$conn = connectToDB( "gipscomm" ) ;

$query  = "SELECT adm_ID, manGrp_ID, man_ID, betrGrp_ID, titel, name, vorname, email, telefon, fax, mobiltelefon, username, position, rechteTreeView, rechteMenu FROM admins " ;
$query .= "WHERE deleted = 0 " ;

$result = queryDB( $conn, $query, "read" ) ;

echo json_encode(["admins" => $result] , JSON_INVALID_UTF8_IGNORE) ;
?>
