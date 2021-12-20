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
$rechteEdit     = $_POST['rechteEdit'] ;
$betrGrpID      = $_POST['betrGrpID'] ;

if($modus === "new") {
    if($manGrpID !== "0") {
        $query =  "INSERT INTO admins(manGrp_ID, man_ID, betrGrp_ID, titel, name, vorname, email, telefon, fax, mobiltelefon, username, passHash, position, rechteTreeView, rechteMenu, rechteEdit, deleted) " ;
        $query .= "VALUES($manGrpID, 1, $betrGrpID, '$titel', '$name', '$vorname', '$email', '$telefon', '$fax', '$mobiltelefon', '$username', '$passHash', 'adm', '$rechteTreeView', '$rechteMenu', '$rechteEdit', 0) " ;
    }
    else {
        $query =  "INSERT INTO admins(man_ID, betrGrp_ID, titel, name, vorname, email, telefon, fax, mobiltelefon, username, passHash, position, rechteTreeView, rechteMenu, rechteEdit, deleted) " ;
        $query .= "VALUES($manID, $betrGrpID, '$titel', '$name', '$vorname', '$email', '$telefon', '$fax', '$mobiltelefon', '$username', '$passHash', 'adm', '$rechteTreeView', '$rechteMenu', '$rechteEdit', 0) " ; 
    }
}
else {
    $admID = $_POST['admID'] ;

    if(trim($passHash) === "") {
        $query =  "UPDATE admins " ;
        $query .= "SET titel = '$titel', name = '$name', vorname = '$vorname', email = '$email', telefon = '$telefon', fax = '$fax', mobiltelefon = '$mobiltelefon', username = '$username', rechteTreeView = '$rechteTreeView', rechteMenu = '$rechteMenu', rechteEdit = '$rechteEdit' " ;
        $query .= "WHERE adm_ID = ".$admID." " ;
    }
    else {
        $query =  "UPDATE admins " ;
        $query .= "SET titel = '$titel', name = '$name', vorname = '$vorname', email = '$email', telefon = '$telefon', fax = '$fax', mobiltelefon = '$mobiltelefon', username = '$username', rechteTreeView = '$rechteTreeView', rechteMenu = '$rechteMenu', rechteEdit = '$rechteEdit', passHash = '$passHash' " ;
        $query .= "WHERE adm_ID = ".$admID." " ;
    }
}

queryDB($conn, $query, "write") ;

echo json_encode(["query" => $query]) ;

?>