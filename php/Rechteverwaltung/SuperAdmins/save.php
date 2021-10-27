<?php
error_reporting ( -1 ) ;
ini_set ( 'display_errors', 'On' ) ;

require '../../DbOperations.php' ;

$conn = connectToDB("gipscomm") ;

$modus = $_POST['modus'] ;
$betrGrpID = $_POST['betrGrpID'] ;
$titelSAdm = $_POST['titelSAdm'] ;
$nameSAdm = $_POST['nameSAdm'] ;
$vornameSAdm = $_POST['vornameSAdm'] ;
$emailSAdm = $_POST['emailSAdm'] ;
$telefonSAdm = $_POST['telefonSAdm'] ;
$faxSAdm = $_POST['faxSAdm'] ;
$mobiltelefonSAdm = $_POST['mobiltelefonSAdm'] ;
$username = $_POST['username'] ;
$passHash = $_POST['passHash'] ;
$rechteTreeView = $_POST['rechteTreeView'] ;
$rechteMenu = $_POST['rechteMenu'] ;

if($modus === "new") {
   $query =  "INSERT INTO superAdmins(betrGrp_ID, man_ID, titelSAdm, nameSAdm, vornameSAdm, emailSAdm, telefonSAdm, faxSAdm, mobiltelefonSAdm, username, passHash, position, rechteTreeView, rechteMenu, deleted) " ;
   $query .= "VALUES($betrGrpID, 1, '$titelSAdm', '$nameSAdm', '$vornameSAdm', '$emailSAdm', '$telefonSAdm', '$faxSAdm', '$mobiltelefonSAdm', '$username', '$passHash','sAdm', '$rechteTreeView', '$rechteMenu', 0) " ;
}
else {
    $sAdmID = $_POST['sAdmID'] ;

    if($passHash === "") {
        $query =  "UPDATE superAdmins " ;
        $query .= "SET titelSAdm = '$titelSAdm', nameSAdm = '$nameSAdm', vornameSAdm = '$vornameSAdm', emailSAdm = '$emailSAdm', telefonSAdm = '$telefonSAdm', faxSAdm = '$faxSAdm', mobiltelefonSAdm = '$mobiltelefonSAdm', username = '$username', rechteTreeView = '$rechteTreeView', rechteMenu = '$rechteMenu ' " ;
        $query .= "WHERE sAdm_ID = ".$sAdmID." " ;
    }
    else {
        $query =  "UPDATE superAdmins " ;
        $query .= "SET titelSAdm = '$titelSAdm', nameSAdm = '$nameSAdm', vornameSAdm = '$vornameSAdm', emailSAdm = '$emailSAdm', telefonSAdm = '$telefonSAdm', faxSAdm = '$faxSAdm', mobiltelefonSAdm = '$mobiltelefonSAdm', username = '$username', passHash = '$passHash', rechteTreeView = '$rechteTreeView', rechteMenu = '$rechteMenu' " ;
        $query .= "WHERE sAdm_ID = ".$sAdmID." " ;
    }
}

queryDB($conn, $query, "write") ;

echo json_encode(["query" => $query]) ;

?>