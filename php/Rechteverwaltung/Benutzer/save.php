<?php
error_reporting ( -1 ) ;
ini_set ( 'display_errors', 'On' ) ;

require '../../DbOperations.php' ;

$conn = connectToDB("gipscomm") ;

$modus          = $_POST['modus'] ;
$manID          = $_POST['manID'] ;
$manGrpID       = $_POST['manGrpID'] ;
$titel          = $_POST['titel'] ;
$name           = $_POST['name'] ;
$vorname        = $_POST['vorname'] ;
$email          = $_POST['email'] ;
$telefon        = $_POST['telefon'] ;
$fax            = $_POST['fax'] ;
$mobiltelefon   = $_POST['mobiltelefon'] ;
$username       = $_POST['username'] ;
$passHash       = $_POST['passHash'] ;
$rechteTreeView = $_POST['rechteTreeView'] ;
$rechteMenu     = $_POST['rechteMenu'] ;
$betrGrpID      = $_POST['betrGrpID'] ;

if($modus === "new") {
       $query  =  "INSERT INTO benutzer(manGrp_ID, betrGrp_ID, man_ID, name, vorname, username, titel, eMail, telefon, fax, mobiltelefon, passHash, position, rechteTreeView, rechteMenu, deleted) " ;
       $query .= "VALUES($manGrpID, $betrGrpID, '$manID', '$name', '$vorname', '$username', '$titel', '$email', '$telefon', '$fax', '$mobiltelefon', '$passHash', 'adm', '$rechteTreeView', '$rechteMenu', 0) " ;
}
else {
    $benID = $_POST['benID'] ;

    if($passHash === "") {
        $query  =  "UPDATE benutzer " ;
        $query .= "SET manGrp_ID = '$manGrpID', man_ID = '$manID', " ;
        $query .= "name = '$name', vorname = '$vorname', " ;
        $query .= "username = '$username', titel = '$titel', " ;
        $query .= "eMail = '$email', telefon = '$telefon', " ;
        $query .= "fax = '$fax', rechteTreeView = '$rechteTreeView', rechteMenu = '$rechteMenu' " ;
        $query .= "WHERE ben_ID = ".$benID." " ;
    }
    else {
        $query  =  "UPDATE benutzer " ;
        $query .= "SET manGrp_ID = '$manGrpID', man_ID = '$manID', " ;
        $query .= "name = '$name', vorname = '$vorname', " ;
        $query .= "username = '$username', titel = '$titel', " ;
        $query .= "eMail = '$email', telefon = '$telefon', " ;
        $query .= "fax = '$fax', passHash = '$passHash', rechteTreeView = '$rechteTreeView', rechteMenu = '$rechteMenu' " ;
        $query .= "WHERE ben_ID = ".$benID." " ;
    }
}

queryDB($conn, $query, "write") ;

echo json_encode(["query" => $query]) ;

?>