<?php

ini_set ('display_errors', 'On') ;

require '../../DbOperations.php' ;

$conn = connectToDB("gipscomm") ;
$query = "SELECT  * FROM gipscPw" ;
$records = queryDB($conn, $query, "read") ;

echo json_encode($records, JSON_INVALID_UTF8_SUBSTITUTE) ;
