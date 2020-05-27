<?php
error_reporting (-1);
ini_set ('display_errors', 'On');

require 'DbOperations.php';

$nameDB = $_POST['nameDB'];
$conn = connectToDB($nameDB);
$id = $_POST['id'];
$query = "SELECT * FROM dokumente WHERE dok_ID = '$id' ";
$query .= "AND deleted = 'false' ";
$records = queryDB($conn, $query, "read");
$fileName = $records[0]['nameDok'];
$encoded = $records[0]['inhalt'];
$decoded = base64_decode($encoded);

//Test if directory allready exists otherwise create it
$dirPath = "../docs/".$nameDB;
if(is_dir($dirPath)){
  // Directory exists
}
else{
  // Directory doesnt exists and has to be created
  mkdir($dirPath);
}
$file = $dirPath."/".$fileName;

file_put_contents($file, $decoded);

echo $fileName;
?>
