<?php
error_reporting ( -1 ) ;
ini_set ( 'display_errors', 'On' ) ;

require '../../DbOperations.php' ;

$conn = connectToDB( "gipscomm" ) ;

$query  = "SELECT betrGrp_ID, firma, anzahlMitarbeiter, anschrift, plz, ort, geschaeftsfuehrer, telefon, eMail, notiz, mandantenIDs FROM betreuerGruppen " ;
$query .= "WHERE deleted = 0 " ;

$result = queryDB( $conn, $query, "read" ) ;

echo json_encode(["betreuerGruppen" => $result] , JSON_INVALID_UTF8_IGNORE) ;
?>
