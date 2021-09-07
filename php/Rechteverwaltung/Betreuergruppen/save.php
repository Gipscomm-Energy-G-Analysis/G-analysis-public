<?php
error_reporting ( -1 ) ;
ini_set ( 'display_errors', 'On' ) ;

require '../../DbOperations.php' ;

abstract class TYPE_ID
{ const Last  = 0 ;
  const Given = 1 ;
}

define('conn', connectToDB("gipscomm")) ;

$modus = $_POST['modus'] ;
$mandantenIDs = $_POST['mandantenIDs'] ;

function insertBetrGrp() {
    $firma = $_POST['firma'] ;
    $anzahlMitarbeiter = $_POST['anzahlMitarbeiter'] ;
    $anschrift = $_POST['anschrift'] ;
    $plz = $_POST['plz'] ;
    $ort = $_POST['ort'] ;
    $geschaeftsfuehrer = $_POST['geschaeftsfuehrer'] ;
    $telefon = $_POST['telefon'] ;
    $eMail = $_POST['eMail'] ;
    $notiz = $_POST['notiz'] ;
    $mandantenIDs = $_POST['mandantenIDs'] ;

    $queryInsertBetrGrp  = "INSERT INTO betreuerGruppen(firma, anzahlMitarbeiter, anschrift, plz, ort, geschaeftsfuehrer, telefon, eMail, notiz, mandantenIDs, deleted) " ;
    $queryInsertBetrGrp .= "VALUES('$firma', $anzahlMitarbeiter, '$anschrift', '$plz', '$ort', '$geschaeftsfuehrer', '$telefon', '$eMail', '$notiz', '$mandantenIDs', 0) " ;

    return $queryInsertBetrGrp ;
}

function updateBetrGrp($id) {
    $firma = $_POST['firma'] ;
    $anzahlMitarbeiter = $_POST['anzahlMitarbeiter'] ;
    $anschrift = $_POST['anschrift'] ;
    $plz = $_POST['plz'] ;
    $ort = $_POST['ort'] ;
    $geschaeftsfuehrer = $_POST['geschaeftsfuehrer'] ;
    $telefon = $_POST['telefon'] ;
    $eMail = $_POST['eMail'] ;
    $notiz = $_POST['notiz'] ;
    $mandantenIDs = $_POST['mandantenIDs'] ;

    $queryUpdateBetrGrp  =  "UPDATE betreuerGruppen " ;
    $queryUpdateBetrGrp .= "SET firma = '$firma', anzahlMitarbeiter = $anzahlMitarbeiter, anschrift = '$anschrift', plz = '$plz', ort = '$ort', geschaeftsfuehrer = '$geschaeftsfuehrer', telefon = '$telefon', eMail = '$eMail', notiz = '$notiz', mandantenIDs = '$mandantenIDs' " ;
    $queryUpdateBetrGrp .= "WHERE betrGrp_ID = ".$id." " ;

    return $queryUpdateBetrGrp ;
}

function idBetrGrp($type, $id = 0) {
    switch ($type) {
        case TYPE_ID::Last:
            $query = "(SELECT MAX(betrGrp_ID) FROM betreuerGruppen) " ;

            return queryDB(conn, $query, "write") ;
            break;

        case TYPE_ID::Given:
            return $id ;
            break;
    }
}

function updateMandant($last, $manID, $type = TYPE_ID::Last, $id = 0) {
    $queryUpdateMan  = $last."UPDATE mandanten SET betrGrp_ID = ".idBetrGrp($type, $id) ;
    $queryUpdateMan .= "WHERE man_ID = ".$manID." " ;

    return $queryUpdateMan ;
}

function updateMandantenLastID($manIDs) {
    return array_reduce($manIDs, 'updateMandant') ;
}

function updateMandantenGivenID($manIDs) {
    $queryUpdateMandant = "" ;
    for ($i=0; $i < count($manIDs); $i++) { 
        $queryUpdateMandant .= updateMandant($queryUpdateMandant, $manIDs[$i], TYPE_ID::Given, $_POST['betrGrpID']) ;
    }
    return $queryUpdateMandant ;
}

if($modus === "new") {
    queryDB($conn, insertBetrGrp(), "write") ;

    $query = updateMandantenLastID(explode(",", $mandantenIDs)) ;

}
else {
    $query  = updateBetrGrp($_POST['betrGrpID']) ;
    $query .= updateMandantenGivenID(explode(",", $mandantenIDs)) ;
    
}

queryDB(conn, $query, "write") ;

echo json_encode(["query" => $query]) ;

?>
