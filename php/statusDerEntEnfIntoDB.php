<?php

include('top-cache.php');
$nameDB = $_POST['nameDB'];

$id = $_POST['id'];

$serverName = "13.81.253.199"; //serverName\instanceName

// Since UID and PWD are not specified in the $connectionInfo array,
// The connection will be attempted using Windows Authentication.
$connectionInfo = array( "Database"=>$nameDB, "UID"=>"gipscomm", "PWD"=>"Gc$2017!");
$conn = sqlsrv_connect( $serverName, $connectionInfo);

$statusArr = $_POST['statusArr'];


if($id == "ent"){
	for($i=0;$i < count($statusArr);$i++){
		$entID = $i + 1;
		$tsql = "UPDATE energietraeger SET aktivEnt = '$statusArr[$i]' WHERE ent_ID ='$entID'"; 
		$doQuery = sqlsrv_query($conn, $tsql);
		echo json_encode($tsql);
	}
}
else{
	for($i=0;$i < count($statusArr);$i++){
		$enfID = $i + 1;
		$tsql = "UPDATE energieformen SET aktivEnf = '$statusArr[$i]' WHERE enf_ID ='$enfID'"; 
		$doQuery = sqlsrv_query($conn, $tsql);
		echo json_encode($tsql);
	}
}


	

echo json_encode($tsql);

include('top-cache.php');
?>