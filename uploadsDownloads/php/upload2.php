
<?php
$nameDB = $_POST['nameDB'];

$serverName = "sql_gc.managee.de";//"51.4.196.243"; //"13.81.253.199"; //serverName\instanceName

$connectionInfo = array( "Database"=>$nameDB, "UID"=>"gipscomm", "PWD"=>"Gc$2017!");

// Connect to MsSQL Azure
$link = sqlsrv_connect( $serverName, $connectionInfo);
if ( !$link ) {
  die( 'Could not connect: ' . sqlsrv_errors() );
}

$fileName = $_POST['fileName'];
$fileType = $_FILES['file']['type'];
$fileSize = $_FILES['file']['size'];
$fileError = $_FILES['file']['error'];
$fileExtention = pathinfo($fileName, PATHINFO_EXTENSION);

$verwaltung = $_POST['verwaltung'];
$id = $_POST['id'];
$kategorie = $_POST['kategorie'];

$fileHandle = fopen($_FILES['file']['tmp_name'], "r");

$fileContent = fread($fileHandle, $fileSize);

$fileContentEnc = base64_encode($fileContent);

if($verwaltung == "Anl"){
	$tsql = "INSERT INTO dokumente(anl_ID,kategorieDok,nameDok,typDok,erweiterungDok,groesseDok,inhalt,deleted) ";
	$tsql .= "VALUES('$id','$kategorie','$fileName','$fileType','$fileExtention','$fileSize','$fileContentEnc','false') ";
}
 if($verwaltung == "Msm"){
	$tsql = "INSERT INTO dokumente(msm_ID,kategorieDok,nameDok,typDok,erweiterungDok,groesseDok,inhalt,deleted) ";
	$tsql .= "VALUES('$id','$kategorie','$fileName','$fileType','$fileExtention','$fileSize','$fileContentEnc','false') ";
}
if($verwaltung == "ERng"){
  $tsql = "UPDATE dokumente SET deleted = 'true' WHERE eRng_ID = '$id' ";
	$tsql = "INSERT INTO dokumente(eRng_ID,kategorieDok,nameDok,typDok,erweiterungDok,groesseDok,inhalt,deleted) ";
	$tsql .= "VALUES('$id','$kategorie','$fileName','$fileType','$fileExtention','$fileSize','$fileContentEnc','false') ";
}

$result = sqlsrv_query($link, $tsql);

echo $tsql;
?>
