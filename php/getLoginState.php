<?php
include('top-cache.php');
session_start();

echo $_SESSION["login_state"];

include('bottom-cache.php');
?>
