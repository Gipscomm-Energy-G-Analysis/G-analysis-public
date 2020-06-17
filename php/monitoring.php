<?php
error_reporting( -1 ) ;
ini_set ( 'display_errors', 'On' ) ;

require 'DbOperations.php';

$nameDB = "master" ;

$conn = connectToDB( $nameDB ) ;

$query = "SELECT * FROM kundenDBs"



?>
