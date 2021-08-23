<?php
error_reporting ( -1 ) ;
ini_set ( 'display_errors', 'On' ) ;

require '../../DbOperations.php' ;

$conn = connectToDB( "gipscomm" ) ;

$query  = "SELECT ben_ID, manGrp_ID, man_ID, name, vorname, username, titel, eMail, telefon, fax, mobiltelefon, position FROM benutzer " ;
$query .= "WHERE deleted = 0 " ;

$result = queryDB( $conn, $query, "read" ) ;

echo json_encode(["benutzer" => $result] , JSON_INVALID_UTF8_IGNORE) ;
?>
