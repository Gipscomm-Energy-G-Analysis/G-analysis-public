<?php
error_reporting ( -1 ) ;
ini_set ( 'display_errors', 'On' ) ;

require '../../DbOperations.php' ;

$conn = connectToDB( $_POST["nameDB"] ) ;

$notYetAssigned = $_POST["notYetAssigned"] ;

if($notYetAssigned == "false") {
    $query  = "SELECT prd_ID, namePrd, artikelNrPrd, deleted, custom1, custom2, custom3, custom4, custom5, custom6, datum, archiviert, aenderungsBemerkung, aenderungsInfo, gueltigVonPrd, gueltigBisPrd, gueltigVon1, gueltigBis1, gueltigVon2, gueltigBis2, gueltigVon3, gueltigBis3, gueltigVon4, gueltigBis4, gueltigVon5, gueltigBis5, gueltigVon6, gueltigBis6, gueltigVon7, gueltigBis7, gueltigVon8, gueltigBis8, gueltigVon9, gueltigBis9, gruppenID, org_ID, anl01_ID, anl02_ID, anl03_ID, anl04_ID, anl05_ID, anl06_ID, anl07_ID, anl08_ID, anl09_ID FROM produkte " ;
    $query .= "WHERE deleted = 0 " ;
}
else {
    $query = "SELECT artikelnummer FROM ProdData " ;
    $query .= "GROUP BY artikelnummer " ;
    $query .= "ORDER BY artikelnummer " ;
}

$result = queryDB( $conn, $query, "read" ) ;

echo json_encode(["benutzer" => $result] , JSON_INVALID_UTF8_IGNORE) ;
?>
