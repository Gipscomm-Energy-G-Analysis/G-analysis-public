<?php
include('top-cache.php');
error_reporting ( -1 ) ;
ini_set ( 'display_errors', 'On' ) ;

require 'DbOperations.php' ;

$nameDB = $_POST[ 'nameDB' ] ;
$conn = connectToDB( $nameDB ) ;

$berID = $_POST[ 'berID' ] ;
$type = $_POST[ 'type' ] ;

$query1  = "SELECT (SELECT nummerAnl + ' ' + bezeichnungAnl FROM anlagen WHERE anl_ID = [messstellen].[anl_id]) AS anl " ;
$query1  .= ",(SELECT nrMsm FROM messmittel WHERE msm_ID = [messstellen].[msm_ID]) AS msm " ;
$query1  .= ",(SELECT nameExtDl FROM externeDurchleitungen WHERE extDl_ID = [messstellen].[extDl_ID]) AS extDl " ;
$query1  .= ", * " ;
$query1  .= "FROM [dbo].[messstellen]" ;
$query1  .= "WHERE ber_ID = $berID " ;
$query1  .= "AND typ = '$type' " ;
$query1  .= "AND deleted <> 'true' " ;

$records1 = queryDB( $conn, $query1, "read" ) ;

for ( $i = 0; $i < count( $records1 ); $i++ ) {

    if ( $records1[ $i ][ "vorgelMst_ID" ] != 0 && $records1[ $i ][ "vorgelMst_ID" ] != null ) {

        foreach ($records1 as $mst) {

                if ($records1[ $i ][ "vorgelMst_ID" ] === $mst["mst_ID"]) {

                    $records1[ $i ][ "vorgelMst" ] = $mst[ "nameMSt" ] ;
                }
        }
    }
    else {
        $records1[ $i ][ "vorgelMst" ] = "" ;
    }
}

echo json_encode($records1, JSON_INVALID_UTF8_IGNORE);

include('bottom-cache.php');

?>
