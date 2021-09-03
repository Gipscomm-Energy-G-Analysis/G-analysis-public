<?php

session_start () ;
include('top-cache.php');
error_reporting(-1);
ini_set ('display_errors', 'On');

require 'DbOperations.php';

$nameDB = "gipscomm";
$conn = connectToDB ( $nameDB );

$userLogin = $_POST['user'];

$query = "SELECT * FROM Users ";
$query .= "WHERE username = '$userLogin' ";
$query .= "AND deleted = 0 ";

$records = queryDB($conn, $query, "read");

$rCount = count($records);

if ($rCount == 1) {
    $_SESSION["login_state"] = "true";
    echo json_encode($records);
}
else {
$login = "error";
echo json_encode ( $login, JSON_INVALID_UTF8_IGNORE ) ;

include('bottom-cache.php');
}

closeDbConn ( $conn ) ;

?>
