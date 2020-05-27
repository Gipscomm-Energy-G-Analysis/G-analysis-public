<?php
include('top-cache.php');
// we need this so that PHP does not complain about deprectaed functions
error_reporting( 0 );

$serverName = "13.81.253.199"; 
$connectionInfo = array( "Database"=>"003_tauchzor", "UID"=>"gipscomm", "PWD"=>"Gc$2017!");

// Connect to MsSQL Azure
$link = sqlsrv_connect( $serverName, $connectionInfo);

if ( !$link ) {

  die( 'Could not connect: ' . sqlsrv_errors() );

}
$messstellen = $_POST['messstellen'];
$messstellenCount = count($messstellen);

$queryChannel = array();
$resultChannel = array();

for($j = 0;$j < $messstellenCount;$j++){
	$queryChannel[] = "SELECT kanal1Msm,kanal2Msm,kanal3Msm FROM messmittel WHERE messstelleMsm = $messstellen[$j]";
	$resultChannel[] = sqlsrv_query($link, $queryChannel[$j]);
}

$channel = array(9,12,13,14,15,16,17);
$channelCount = count($channel);

// Fetch the data
$query = array();
$result = array();

For($i = 0;$i < $channelCount;$i++){ 
	$query[] = "
		SELECT time_server,dateN, dateS, differenceOfValues".$i." FROM(
			SELECT dateN,time_server, dateS,(value/10) - LAG(value/10,1) OVER (ORDER BY time_server) AS differenceOfValues".$i." FROM(
				SELECT time_server, value, CONVERT(varchar(20),time_server,120) AS dateS,CONVERT(varchar(5),DATEADD(hour,2,time_server),108) AS dateN 
				FROM data_value_15m
				WHERE CONVERT(varchar(20),time_server,120)> CONVERT(varchar(20),getdate()-1,120)
					AND channel_id = $channel[$i]
					AND value > 0
				) AS diffVal
		WHERE right(dateS,5) = '00:00'	                                
		) As diffVal2
		ORDER BY dateS		
	";
	$result[] = sqlsrv_query($link, $query[$i]);
}


// Set proper HTTP response headers
header( 'Content-Type: application/json' );

$data = array();

while ($rowString = sqlsrv_fetch_array($result[0], SQLSRV_FETCH_ASSOC))
{ 	
	for ($u = 1;$u < $channelCount;$u++)
	{
		$rowString += sqlsrv_fetch_array($result[$u], SQLSRV_FETCH_ASSOC);
	}
	$data[] = $rowString;
}

echo json_encode($data);
include('bottom-cache.php');
?>	