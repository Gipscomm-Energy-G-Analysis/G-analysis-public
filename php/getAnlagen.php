<?php

include('top-cache.php');
error_reporting (-1);
ini_set ('display_errors', 'On');

require 'DbOperations.php';

$nameDB = $_POST['nameDB'];
$conn = connectToDB($nameDB);
$ins = $_POST['ins'];

if ($ins == "anlVorlFrm") {
  $orgID = $_POST['orgID'];

  $query = "SELECT * FROM anlagen ";
  $query .= "INNER JOIN liegenschaften ";
  $query .= "ON anlagen.lieg_ID = liegenschaften.lieg_ID ";
  $query .= "WHERE org_ID = '$orgID' ";
  $query .= "AND anlagen.deleted <> 'true' ";
  $query .= "AND archiviertAnl <> 'true' ";
}
else {
  $liegID = $_POST['liegID'];

  $query = "SELECT * FROM AnlagenLiegenschaften ";
  $query .= "WHERE lieg_ID = '$liegID' ";
  $query .= "AND deleted <> 'true' ";
  $query .= "AND archiviertAnl <> 'true' ";
}


$records = queryDB($conn, $query, "read");

echo json_encode($records, JSON_INVALID_UTF8_IGNORE);

include('bottom-cache.php');
?>
