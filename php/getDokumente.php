<?php

error_reporting(-1) ;
ini_set ('display_errors', 'On') ;

require 'DbOperations.php' ;

$conn = connectToDB($_POST['nameDB']) ;

$verwaltung = $_POST['verwaltung'] ;
$id = $_POST['id'] ;
$selectFrom = "SELECT dok_ID, kategorieDok, nameDok, erweiterungDok FROM dokumente " ;
$notDeleted = "AND deleted = 0 " ;

switch ($verwaltung) {

    case "Anl" :

        $query = $selectFrom."WHERE anl_ID = $id ".$notDeleted ;
        break ;
        
    case "Msm" :

        $query = $selectFrom."WHERE msm_ID = $id ".$notDeleted ;
        break ;

    case "ERng" :
        
        $query = $selectFrom."WHERE eRng_ID = $id ".$notDeleted ;
        break ;
    
    default :

        throw new Exception("getDocumente.php -> There exists no verwaltung for this case ! ") ;
} ;

$records = queryDB($conn, $query, "read") ;

closeDbConn($conn) ;

echo json_encode($records, JSON_INVALID_UTF8_IGNORE) ;     // CHANGE: The DB data has to be echoed json encoded(before echo $records;) 27.05.2020

?>