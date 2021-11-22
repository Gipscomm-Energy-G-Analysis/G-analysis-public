<?php
include('top-cache.php');
session_start();

$_SESSION["login_state"] = "false";
$_SESSION['username'] = 'false';
include('bottom-cache.php');
?>
