<?php
error_reporting ( -1 ) ;
ini_set ( 'display_errors', 'On' ) ;

require '../DbOperations.php' ;

abstract class POSITION
    { const GipscommAdmin = "gipsAdm" ;
      const SuperAdmin    = "sAdm" ;
      const Admin         = "adm" ;
      const Benutzer      = "ben" ;
    }

define('conn', connectToDB( "gipscomm" )) ;

$gipscommAdmins   = "" ;
$betreuerGruppen  = "" ;
$superAdmins      = "" ;
$mandantenGruppen = "" ;
$admins           = "" ;
$benutzer         = "" ;

switch ($_POST["position"]) {

    case POSITION::GipscommAdmin:

        $gipscommAdmins    = "SELECT gipsAdm_ID, username, betrGrp_ID, position, manGrp_ID, man_ID FROM gipscommAdmins " ;
        $gipscommAdmins   .= "WHERE deleted = 0 " ;

        $betreuerGruppen   = "SELECT betrGrp_ID, firma, anzahlMitarbeiter, anschrift, plz, ort, geschaeftsfuehrer, telefon, eMail, notiz, mandantenIDs FROM betreuerGruppen " ;
        $betreuerGruppen  .= "WHERE deleted = 0 " ;

        $superAdmins       = "SELECT sAdm_ID, betrGrp_ID, manGrp_ID, man_ID, titelSAdm, nameSAdm, vornameSAdm, emailSAdm, telefonSAdm, faxSAdm, mobiltelefonSAdm, username, rechteTreeView, rechteMenu FROM superAdmins " ;
        $superAdmins      .= "WHERE deleted = 0 " ;

        $mandantenGruppen  = "SELECT manGrp_ID, betrGrp_ID, name, kurz, notiz, mandantenIDs FROM mandantenGruppen " ;
        $mandantenGruppen .= "WHERE deleted = 0 " ;

        $admins            = "SELECT adm_ID, manGrp_ID, man_ID, titel, name, vorname, email, telefon, fax, mobiltelefon, username, position, rechteTreeView, rechteMenu FROM admins " ;
        $admins           .= "WHERE deleted = 0 " ;

        $benutzer          = "SELECT ben_ID, manGrp_ID, man_ID, name, vorname, username, titel, eMail, telefon, fax, mobiltelefon, position, rechteTreeView, rechteMenu FROM benutzer " ;
        $benutzer         .= "WHERE deleted = 0 " ;

        break;

    case POSITION::SuperAdmin:

        $betrGrpID = $_POST["betrGrpID"] ;

        $betreuerGruppen   = "SELECT betrGrp_ID, firma, anzahlMitarbeiter, anschrift, plz, ort, geschaeftsfuehrer, telefon, eMail, notiz, mandantenIDs FROM betreuerGruppen " ;
        $betreuerGruppen  .= "WHERE deleted = 0 AND betrGrp_ID = ".$betrGrpID ;

        $mandantenGruppen  = "SELECT manGrp_ID, betrGrp_ID, name, kurz, notiz, mandantenIDs FROM mandantenGruppen " ;
        $mandantenGruppen .= "WHERE deleted = 0 AND betrGrp_ID = ".$betrGrpID ;

        $admins            = "SELECT adm_ID, manGrp_ID, man_ID, titel, name, vorname, email, telefon, fax, mobiltelefon, username, position, rechteTreeView, rechteMenu FROM admins " ;
        $admins           .= "WHERE deleted = 0 AND betrGrp_ID = ".$betrGrpID ;

        $benutzer          = "SELECT ben_ID, manGrp_ID, man_ID, name, vorname, username, titel, eMail, telefon, fax, mobiltelefon, position, rechteTreeView, rechteMenu FROM benutzer " ;
        $benutzer         .= "WHERE deleted = 0 AND betrGrp_ID = ".$betrGrpID ;
        
        break;

    case POSITION::Admin:
    case POSITION::Benutzer:

        $betrGrpID   = $_POST["betrGrpID"] ;
        $manGrpID    = $_POST["manGrpID"] ;
        $manID       = $_POST["manID"] ;
        $manOrManGrp = "" ;

        $betreuerGruppen  = "SELECT betrGrp_ID, firma, anzahlMitarbeiter, anschrift, plz, ort, geschaeftsfuehrer, telefon, eMail, notiz, mandantenIDs FROM betreuerGruppen " ;
        $betreuerGruppen .= "WHERE deleted = 0 AND betrGrp_ID = ".$betrGrpID ;

        if (empty($manGrpID)) {

            $manOrManGrp = "AND man_ID = ".$manID ;
        }
        else {

            $manOrManGrp = "AND manGrp_ID = ".$manGrpID ;
        }

        $admins    = "SELECT adm_ID, manGrp_ID, man_ID, titel, name, vorname, email, telefon, fax, mobiltelefon, username, position, rechteTreeView, rechteMenu FROM admins " ;
        $admins   .= "WHERE deleted = 0 ".$manOrManGrp ;

        $benutzer  = "SELECT ben_ID, manGrp_ID, man_ID, name, vorname, username, titel, eMail, telefon, fax, mobiltelefon, position, rechteTreeView, rechteMenu FROM benutzer " ;
        $benutzer .= "WHERE deleted = 0 ".$manOrManGrp ;

        break;
}

function runQuery($query) {

    return queryDB( conn, $query, "read" ) ;
}

$queries =
    [ $gipscommAdmins
    , $betreuerGruppen
    , $superAdmins
    , $mandantenGruppen
    , $admins
    , $benutzer
    ] ;

$results = array_map('runQuery', $queries) ;

echo json_encode(
    [ "gipscommAdmins"   => $results[0]
    , "betreuerGruppen"  => $results[1]
    , "superAdmins"      => $results[2]
    , "mandantenGruppen" => $results[3]
    , "admins"           => $results[4]
    , "benutzer"         => $results[5]
    ] , JSON_INVALID_UTF8_IGNORE) ;
?>