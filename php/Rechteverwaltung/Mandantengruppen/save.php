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
   $query =  "INSERT INTO mandantenGruppen(betrGrp_ID, name, kurz, notiz, mandantenIDs, deleted) " ;
   $query .= "VALUES($betrGrpID, '$name', '$kurz', '$notiz', '$mandantenIDs', 0) " ;
}
else {
    $manGrpID = $_POST['manGrpID'] ;

    $query =  "UPDATE mandantenGruppen " ;
    $query .= "SET name = '$name', kurz = '$kurz', notiz = '$notiz', mandantenIDs = '$mandantenIDs' " ;
    $query .= "WHERE manGrp_ID = ".$manGrpID." " ;
}

queryDB($conn, $query, "write") ;

echo json_encode(["query" => $query]) ;

?>