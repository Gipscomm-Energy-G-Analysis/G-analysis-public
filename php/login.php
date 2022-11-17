<?php

session_start();

if (ini_get('register_globals')) {
    foreach ($_SESSION as $key => $value) {
        if (isset($GLOBALS[$key]))
            unset($GLOBALS[$key]);
    }
}

error_reporting(E_ALL);
ini_set('display_errors', 1);

require 'DbOperations.php';

$conn = connectToDB("gipscomm");

$query  = 'SELECT * FROM Users ';
$query .= 'WHERE username = ' . "'" . $_POST['username'] . "'" . ' ';
$query .= 'AND deleted = 0 ';

$executedQuery = queryDB($conn, $query, 'read');

$records = count($executedQuery) === 1 ? $executedQuery : ['username' => json_encode(false)];

// $_SESSION['login_state'] = json_encode(count($records) === 1);
// $_SESSION['username'] = $records[0]['username'];

$login =
    count($records) !== 1 ?
    ['error' => 'The records count was < or > than 1 !! \nThis can mean that there exist duplicates or the login data is wrong.\nreturned array : ' . $records] :
    $records;

echo json_encode($login);

closeDbConn($conn);
