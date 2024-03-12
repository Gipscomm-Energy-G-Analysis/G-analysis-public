<?php
error_reporting (-1);
ini_set ('display_errors', 'On');

require 'DbOperations.php';
$nameDB = $_POST['nameDB'];
$conn = connectToDB($nameDB);
$deleteMode = $_POST['deleteMode'];

if($deleteMode == 0){
  $files = glob("../docs/".$nameDB."/*"); // get all file names
  foreach($files as $file){ // iterate files
    if(is_file($file))
      unlink($file); // delete file
  }
  echo "All files removed from temp folder!";
}
else{
  $fileID = $_POST['fileID'];

  /*$serverName = "sql_gc.managee.de";//"51.4.196.243"; //"13.81.253.199"; //serverName\instanceName

  $connectionInfo = array( "Database"=>$nameDB, "UID"=>"gipscomm", "PWD"=>"Gc$2017!");

  // Connect to MsSQL Azure
  $link = sqlsrv_connect( $serverName, $connectionInfo);
  if ( !$link ) {
    die( 'Could not connect: ' . sqlsrv_errors() );
  }
*/
  $query = "UPDATE dokumente SET deleted = 'true' ";
  $query .= "WHERE dok_ID = '$fileID' ";

  $records = queryDB($conn, $query, "write");

 echo json_encode($records, JSON_INVALID_UTF8_SUBSTITUTE);
}
?>
