<?php
error_reporting ( -1 ) ;
ini_set ( 'display_errors', 'On' ) ;

require '../../DbOperations.php' ;

$conn = connectToDB( "gipscomm" ) ;

$query  = "SELECT manGrp_ID, betrGrp_ID, name, kurz, notiz, mandantenIDs FROM mandantenGruppen " ;
$query .= "WHERE deleted = 0 " ;

$result = queryDB( $conn, $query, "read" ) ;

echo json_encode(["mandantenGruppen" => $result] , JSON_INVALID_UTF8_IGNORE) ;
?>
