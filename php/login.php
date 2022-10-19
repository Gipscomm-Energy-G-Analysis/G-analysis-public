<?php

session_start();
error_reporting(E_ALL);
ini_set("display_errors", 1);

require "DbOperations.php";

$conn = connectToDB("gipscomm");

$query  = "SELECT * FROM Users ";
$query .= "WHERE username = '" . $_POST["user"] . "' ";
$query .= "AND deleted = 0 ";

$executedQuery = queryDB($conn, $query, "read");

$records = count($executedQuery) === 1 ? $executedQuery : ["username" => json_encode(false)];

$_SESSION["login_state"] = json_encode(count($records) === 1);
$_SESSION["username"] = $records[0]["username"];

$login = count($records) === 1 ? $records : "error";

echo json_encode(["query"=>"test"], JSON_INVALID_UTF8_IGNORE);

closeDbConn($conn);
