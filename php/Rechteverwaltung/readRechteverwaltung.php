<?php
error_reporting ( -1 ) ;
ini_set ( 'display_errors', 'On' ) ;

require '../DbOperations.php' ;

$conn = connectToDB( "gipscomm" ) ;

$query  = "SELECT gipsAdm_ID, username, betrGrp_ID, position, manGrp_ID, man_ID FROM gipscommAdmins " ;
$query .= "WHERE deleted = 0 " ;

$gipscommAdmins = queryDB( $conn, $query, "read" ) ;

$query2  = "SELECT betrGrp_ID, firma, anzahlMitarbeiter, anschrift, plz, ort, geschaeftsfuehrer, telefon, eMail, notiz FROM betreuerGruppen " ;
$query2 .= "WHERE deleted = 0 " ;

$betreuerGruppen = queryDB( $conn, $query2, "read" ) ;

$query3  = "SELECT sAdm_ID, betrGrp_ID, manGrp_ID, man_ID, titelSAdm, nameSAdm, vornameSAdm, emailSAdm, telefonSAdm, faxSAdm, mobiltelefonSAdm, username FROM superAdmins " ;

$superAdmins = queryDB( $conn, $query3, "read" ) ;

$query4  = "SELECT manGrp_ID, betrGrp_ID, name, kurz, notiz, mandantenIDs FROM mandantenGruppen " ;

$mandantenGruppen = queryDB( $conn, $query4, "read" ) ;

$query5  = "SELECT adm_ID, manGrp_ID, man_ID, titel, name, vorname, email, telefon, fax, mobiltelefon, username, position FROM admins " ;

$admins = queryDB( $conn, $query5, "read" ) ;

$query6  = "SELECT ben_ID, manGrp_ID, man_ID, name, vorname, username, titel, eMail, telefon, fax, mobiltelefon, position FROM benutzer " ;

$benutzer = queryDB( $conn, $query6, "read" ) ;

echo json_encode(
    [ "gipscommAdmins" => $gipscommAdmins
    , "betreuerGruppen" => $betreuerGruppen
    , "superAdmins" => $superAdmins
    , "mandantenGruppen" => $mandantenGruppen
    , "admins" => $admins
    , "benutzer" => $benutzer
    ] , JSON_INVALID_UTF8_IGNORE) ;
?>
