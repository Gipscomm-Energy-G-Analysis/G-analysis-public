<?php

error_reporting(-1);
ini_set('display_errors', 'On');

require 'DbOperations.php';
$userid = $_POST['userid'];
$query  = "SELECT count('user_id') as count FROM user_menu_permissions WHERE user_id = " . (string)$userid . " ";
$records = (array)queryDB(connectToDB((string)$_POST['nameDB']), (string)$query, "read");
    echo json_encode($records, JSON_INVALID_UTF8_SUBSTITUTE);
