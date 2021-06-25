<?php
error_reporting ( -1 ) ;
ini_set ( 'display_errors', 'On' ) ;

require '../../DbOperations.php' ;

$conn = connectToDB("gipscomm") ;

$modus = $_POST['modus'] ;
$username = $_POST['username'] ;
$pwHash = $_POST['pwHash'] ;

if($modus === "new") {
   $query =  "INSERT INTO gipscommAdmins(username, passHash, position, man_ID, deleted) " ;
   $query .= "VALUES('$username', '$pwHash', 'gipsAdm', 1, 0) " ;
}
else {
    $gipscAdmID = $_POST['gipscAdmID'] ;

    $query =  "UPDATE gipscommAdmins " ;
    $query .= "SET username = '$username', passHash = '$pwHash' " ;
    $query .= "WHERE gipsAdm_ID = ".$gipscAdmID." " ;
}

queryDB($conn, $query, "write") ;

echo json_encode(["query" => $query]) ;

?>
