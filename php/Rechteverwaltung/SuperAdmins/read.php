<?php
error_reporting ( -1 ) ;
ini_set ( 'display_errors', 'On' ) ;

require '../../DbOperations.php' ;

$conn = connectToDB( "gipscomm" ) ;

$query  = "SELECT sAdm_ID, betrGrp_ID, manGrp_ID, man_ID, titelSAdm, nameSAdm, vornameSAdm, emailSAdm, telefonSAdm, faxSAdm, mobiltelefonSAdm, username, rechteTreeView, rechteMenu, rechteEdit FROM superAdmins " ;
$query .= "WHERE deleted = 0 " ;

$result = queryDB( $conn, $query, "read" ) ;

echo json_encode(["superAdmins" => $result] , JSON_INVALID_UTF8_IGNORE) ;
?>
