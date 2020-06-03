
<?php
error_reporting( -1 ) ;
ini_set ( 'display_errors', 'On' ) ;

require 'DbOperations.php';

$nameDB = $_POST[ 'nameDB' ] ;

$conn = connectToDB( $nameDB ) ;

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
	$query = "INSERT INTO dokumente(anl_ID,kategorieDok,nameDok,typDok,erweiterungDok,groesseDok,inhalt,deleted) ";
	$query .= "VALUES('$id','$kategorie','$fileName','$fileType','$fileExtention','$fileSize','$fileContentEnc','false') ";
}
 if($verwaltung == "Msm"){
	$query = "INSERT INTO dokumente(msm_ID,kategorieDok,nameDok,typDok,erweiterungDok,groesseDok,inhalt,deleted) ";
	$query .= "VALUES('$id','$kategorie','$fileName','$fileType','$fileExtention','$fileSize','$fileContentEnc','false') ";
}
if($verwaltung == "ERng"){
    $query = "UPDATE dokumente SET deleted = 'true' WHERE eRng_ID = '$id' ";
	$query = "INSERT INTO dokumente(eRng_ID,kategorieDok,nameDok,typDok,erweiterungDok,groesseDok,inhalt,deleted) ";
	$query .= "VALUES('$id','$kategorie','$fileName','$fileType','$fileExtention','$fileSize','$fileContentEnc','false') ";
}

$records = queryDB( $conn, $query, "write" ) ;

echo json_encode([$id, $fileName, $fileType, "kategorie"], JSON_INVALID_UTF8_IGNORE);

?>
