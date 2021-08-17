<?php
error_reporting ( -1 ) ;
ini_set ( 'display_errors', 'On' ) ;

require '../../DbOperations.php' ;

$conn = connectToDB("gipscomm") ;

$modus = $_POST['modus'] ;
$betrGrpID = $_POST['betrGrpID'] ;
$name = $_POST['name'] ;
$kurz = $_POST['kurz'] ;
$notiz = $_POST['notiz'] ;
$mandantenIDs = $_POST['mandantenIDs'] ;

if($modus === "new") {
   $query =  "INSERT INTO admins(betrGrp_ID, name, kurz, notiz, mandantenIDs, deleted) " ;
   $query .= "VALUES($betrGrpID, '$name', '$kurz', '$notiz', '$mandantenIDs', 0) " ;
}
else {
    $admID = $_POST['admID'] ;

    $query =  "UPDATE admins " ;
    $query .= "SET name = '$name', kurz = '$kurz', notiz = '$notiz' " ;
    $query .= "WHERE adm_ID = ".$admID." " ;
}

queryDB($conn, $query, "write") ;

echo json_encode(["query" => $query]) ;

?>