
<?php
include('top-cache.php');
error_reporting(-1);
ini_set ('display_errors', 'On');

require 'DbOperations.php';

$nameDB = $_POST['nameDB'];
$conn = connectToDB($nameDB);

$fileName = $_FILES['file']['name'];
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

if($verwaltung == "anl"){
	$query = "INSERT INTO dokumente(anl_ID,kategorieDok,nameDok,typDok,erweiterungDok,groesseDok,inhalt)";
	$query .= "VALUES('$id','$kategorie','$fileName','$fileType','$fileExtention','$fileSize','$fileContentEnc')";
}

 if($verwaltung == "msm"){
	$query = "INSERT INTO dokumente(msm_ID,kategorieDok,nameDok,typDok,erweiterungDok,groesseDok,inhalt)";
	$query .= "VALUES('$id','$kategorie','$fileName','$fileType','$fileExtention','$fileSize','$fileContentEnc')";
}

if($verwaltung == "eRng"){
	$query = "INSERT INTO dokumente(eRng_ID,kategorieDok,nameDok,typDok,erweiterungDok,groesseDok,inhalt)";
	$query .= "VALUES('$id','$kategorie','$fileName','$fileType','$fileExtention','$fileSize','$fileContentEnc')";
}

queryDB($conn, $query, "write");

echo $query;

include('bottom-cache.php');
?>
