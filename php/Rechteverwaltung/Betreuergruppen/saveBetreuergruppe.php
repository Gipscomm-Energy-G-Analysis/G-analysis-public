<?php
error_reporting ( -1 ) ;
ini_set ( 'display_errors', 'On' ) ;

require '../DbOperations.php' ;

$conn = connectToDB("gipscomm") ;

$modus = $_POST['modus'] ;
$firma = $_POST['firma'] ;
$anzahlMitarbeiter = $_POST['anzahlMitarbeiter'] ;
$anschrift = $_POST['anschrift'] ;
$plz = $_POST['plz'] ;
$ort = $_POST['ort'] ;
$geschaeftsfuehrer = $_POST['geschaeftsfuehrer'] ;
$telefon = $_POST['telefon'] ;
$eMail = $_POST['eMail'] ;
$notiz = $_POST['notiz'] ;


if($modus === "new") {
   $query =  "INSERT INTO betreuerGruppen(firma, anzahlMitarbeiter, anschrift, plz, ort, geschaeftsfuehrer, telefon, eMail, notiz, deleted) " ;
   $query .= "VALUES('$firma', $anzahlMitarbeiter, '$anschrift', '$plz', '$ort', '$geschaeftsfuehrer', '$telefon', '$eMail', '$notiz', 0) " ;
}
else {
    $betrGrpID = $_POST['betrGrpID'] ;

    $query =  "UPDATE betreuerGruppen " ;
    $query .= "SET firma = '$firma', anzahlMitarbeiter = $anzahlMitarbeiter, anschrift = '$anschrift', plz = '$plz', ort = '$ort', geschaeftsfuehrer = '$geschaeftsfuehrer', telefon = '$telefon', eMail = '$eMail', notiz = '$notiz' " ;
    $query .= "WHERE betrGrp_ID = ".$betrGrpID." " ;
}

queryDB($conn, $query, "write") ;

echo json_encode(["query" => $query]) ;

?>
