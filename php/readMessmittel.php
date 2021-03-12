<?php

include('top-cache.php');
error_reporting ( -1 ) ;

ini_set ( 'display_errors', 'On' ) ;

require 'DbOperations.php' ;

$nameDB = $_POST[ 'nameDB' ] ;

$conn = connectToDB( $nameDB ) ;

$liegID = $_POST[ 'liegID' ] ;

$query  = "SELECT (SELECT nummerAnl + ' ' + bezeichnungAnl FROM anlagen WHERE anl_ID = [messmittel].[anl_id]) AS anl " ;
$query .= ",(SELECT nameMSt FROM messstellen WHERE mst_ID = [messmittel].[mst_ID]) AS mst " ;
$query .= ", * " ;
$query .= "FROM [dbo].[messmittel] " ;
$query .= "WHERE lieg_ID = $liegID " ;
$query .= "AND deleted <> 'true' " ;

$records = queryDB( $conn, $query, "read" ) ;

closeDbConn ( $conn ) ;

echo json_encode($records, JSON_INVALID_UTF8_IGNORE) ;
include('bottom-cache.php') ;

?>
