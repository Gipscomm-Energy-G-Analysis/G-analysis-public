<?php

error_reporting (-1);
ini_set ('display_errors', 'On');

require 'DbOperations.php';

$conn = connectToDB($_POST['nameDB']);

$query = "SELECT * FROM config.betriebsparameter " ;
$query .= "WHERE bPar_ID = 1 " ;

echo json_encode(queryDB($conn, $query, "read"), JSON_INVALID_UTF8_IGNORE);

?>
