<?php

error_reporting(-1);
ini_set ('display_errors', 'On');

require 'DbOperations.php';

$nameDB = $_POST['nameDB'];
$conn = connectToDB($nameDB);

$channel = $_POST['channel'];
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

echo json_encode($data, JSON_INVALID_UTF8_IGNORE);
