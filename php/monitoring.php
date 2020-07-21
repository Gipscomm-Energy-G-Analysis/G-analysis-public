<?php
error_reporting( -1 ) ;
ini_set ( 'display_errors', 'On' ) ;

require 'DbOperations.php';

$nameDB = "master" ;

$conn1 = connectToDB( $nameDB ) ;

$queryDBs = "SELECT * FROM kundenDBs " ;
$queryDBs .= "WHERE active = 'true' " ;

$recordsDB = queryDB($conn1, $queryDBs, "read") ;

function lastData($db) {
    $conn2 = connectToDB( "master" ) ;

    $queryDate = "SELECT TOP(1) time_de FROM [".$db['name']."].[dbo].[data_value_15m] " ;
    $queryDate .= "ORDER BY time_de DESC " ;

    $recordsTimes = queryDB($conn2, $queryDate, "read") ;

    return $recordsTimes ;
}

function outputState($dbs) {
    print_r (array_map('lastData', $dbs)) ;
}

outputState($recordsDB) ;

?>
