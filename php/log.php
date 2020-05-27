<?php

error_reporting( -1 ) ;
ini_set ( 'display_errors', 'On' ) ;

$ins = $_POST[ 'ins' ] ;
$dataToLog = $_POST[ 'dataToLog' ] ;
$fp = fopen ( $ins.'.txt', 'a' ) ;
fwrite( $fp, $dataToLog ) ;
fclose( $fp ) ;

echo $ins ;

?>
