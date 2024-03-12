<?php
$nameDB = $_POST['nameDB'];

$fileName = $_FILES['file']['name'];
$fileType = $_FILES['file']['type'];
$fileSize = $_FILES['file']['size'];
$fileError = $_FILES['file']['error'];
$fileExtention = pathinfo($fileName, PATHINFO_EXTENSION);

#$fileHandle = fopen($_FILES['file']['tmp_name'], "r");

#$fileContent = fread($fileHandle, $fileSize);

//file_put_contents($fileName, $fileContent);
move_uploaded_file($_FILES["file"]["tmp_name"], "../images/".$nameDB."/".$fileName);

echo $fileName;

?>
