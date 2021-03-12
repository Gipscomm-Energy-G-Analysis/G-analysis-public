<?php
include('top-cache.php');
error_reporting ( -1 ) ;
ini_set ( 'display_errors', 'On' ) ;

require 'DbOperations.php' ;

$nameDB = $_POST[ 'nameDB' ] ;
$conn = connectToDB( $nameDB ) ;

$liegID = $_POST[ 'liegID' ] ;

$query = "SELECT (SELECT nameMSt FROM messstellen WHERE mst_ID = [externeRechnungen].[mst_ID]) AS mst, * " ;
$query .= "FROM [dbo].[externeRechnungen] " ;
$query .= "WHERE lieg_ID = $liegID " ;
$query .= "AND deleted <> 'true' " ;

$records = queryDB( $conn, $query, "read" ) ;

echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
include('bottom-cache.php');
?>
