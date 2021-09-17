<?php
error_reporting ( -1 ) ;
ini_set ( 'display_errors', 'On' ) ;

require '../../DbOperations.php' ;

$conn = connectToDB("gipscomm") ;

$modus = $_POST['modus'] ;
$manID = $_POST['manID'] ;
$manGrpID = $_POST['manGrpID'] ;
$betrGrpID = $_POST['betrGrpID'] ;
$titel = $_POST['titel'] ;
$name = $_POST['name'] ;
$vorname = $_POST['vorname'] ;
$email = $_POST['email'] ;
$telefon = $_POST['telefon'] ;
$fax = $_POST['fax'] ;
$mobiltelefon = $_POST['mobiltelefon'] ;
$username = $_POST['username'] ;
$passHash = $_POST['passHash'] ;
$rechteTreeView = $_POST['rechteTreeView'] ;
$rechteMenu     = $_POST['rechteMenu'] ;
$betrGrpID      = $_POST['betrGrpID'] ;

if($modus === "new") {
    if($manGrpID !== "0") {
        $query =  "INSERT INTO benutzer(manGrp_ID, man_ID, betrGrp_ID, titel, name, vorname, email, telefon, fax, mobiltelefon, username, passHash, position, rechteTreeView, rechteMenu, deleted) " ;
        $query .= "VALUES($manGrpID, 1, $betrGrpID, '$titel', '$name', '$vorname', '$email', '$telefon', '$fax', '$mobiltelefon', '$username', '$passHash', 'ben', '$rechteTreeView', '$rechteMenu', 0) " ;
    }
    else {
        $query =  "INSERT INTO benutzer(man_ID, betrGrp_ID, titel, name, vorname, email, telefon, fax, mobiltelefon, username, passHash, position, rechteTreeView, rechteMenu, deleted) " ;
        $query .= "VALUES($manID, $betrGrpID, '$titel', '$name', '$vorname', '$email', '$telefon', '$fax', '$mobiltelefon', '$username', '$passHash', 'ben', '$rechteTreeView', '$rechteMenu', 0) " ; 
    }
}
else {
    $benID = $_POST['benID'] ;

    if($passHash === "") {
        $query =  "UPDATE benutzer " ;
        $query .= "SET name = '$name', vorname = '$vorname', " ;
        $query .= "username = '$username', titel = '$titel', " ;
        $query .= "eMail = '$email', telefon = '$telefon', " ;
        $query .= "fax = '$fax', rechteTreeView = '$rechteTreeView', rechteMenu = '$rechteMenu' " ;
        $query .= "WHERE ben_ID = ".$benID." " ;
    }
    else {
        $query =  "UPDATE benutzer " ;
        $query .= "SET name = '$name', vorname = '$vorname', " ;
        $query .= "username = '$username', titel = '$titel', " ;
        $query .= "eMail = '$email', telefon = '$telefon', " ;
        $query .= "fax = '$fax', passHash = '$passHash', rechteTreeView = '$rechteTreeView', rechteMenu = '$rechteMenu' " ;
        $query .= "WHERE ben_ID = ".$benID." " ;
    }
}

queryDB($conn, $query, "write") ;

echo json_encode(["query" => $query]) ;

?>