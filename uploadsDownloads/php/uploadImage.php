<?php
$nameDB = $_POST['nameDB'];

$fileName = $_POST['fileName'];
$fileType = $_FILES['file']['type'];
$fileSize = $_FILES['file']['size'];
$fileError = $_FILES['file']['error'];
$fileExtention = pathinfo($fileName, PATHINFO_EXTENSION);

//Test if directory allready exists otherwise create it
$dirPath = "../images/".$nameDB;
if(is_dir($dirPath)){
  // Directory exists
}
else{
  // Directory has to be created
  mkdir($dirPath);
  // NoImg image has to be copied into the new folder
  copy("../images/noImg.png", $dirPath."/noImg.png");
}
$file = $dirPath."/".$fileName;
move_uploaded_file($_FILES["file"]["tmp_name"], $file);

echo $fileName;
?>
