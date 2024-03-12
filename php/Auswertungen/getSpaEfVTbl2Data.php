<?php
error_reporting (-1);
ini_set ('display_errors', 'On');

require '../DbOperations.php';

$teil = $_POST['teil'];
$nameDB = $_POST['nameDB'];
$conn = connectToDB($nameDB);
$modus = $_POST['modus'];
$version = $_POST['version'];
//$verdichtung = $_POST['verdichtung'];
$jahr = $_POST['jahr'];

if($teil == "verbrauch"){
  if($modus == "gesamt"){
    $query = "SELECT * FROM SpaEfvTbl1GesamtEntsZusammengefasst ";
    $query .= "WHERE Jahr = '$jahr' ";
  }
  elseif ($modus == "organisation") {
    $orgID = $_POST['orgID'];
    $query = "SELECT * FROM SpaEfvTbl1OrganisationEntsZusammengefasst ";
    $query .= "WHERE org_ID = '$orgID' AND Jahr = '$jahr' ";
  }
  elseif ($modus == "liegenschaft"){
    $liegID = $_POST['liegID'];
    $query = "SELECT * FROM SpaEfvTbl1LiegenschaftEntsZusammengefasst ";
    $query .= "WHERE lieg_ID = '$liegID' AND Jahr = '$jahr' ";
  }
  $query .= "ORDER BY Energietraeger, Jahr ";
}
elseif ($teil == "anlagen") {
  if($modus == "gesamt"){
    $activeEngine = $_POST['activeEngine'];
    if($activeEngine !='all'){
      $query = "SELECT * FROM SpaEfvTbl2Anlagen ";
      $query .= "WHERE deleted <> 'true' ";
      $query .= "AND Zustand = '$activeEngine' ";
      $query .= "AND archiviertAnl <> 'true' ";
    }else{
      $query = "SELECT * FROM SpaEfvTbl2Anlagen ";
      $query .= "WHERE deleted <> 'true' ";
      $query .= "AND archiviertAnl <> 'true' "; 
    }
  }
  elseif ($modus == "organisation") {
    $orgID = $_POST['orgID'];
    $query = "SELECT * FROM SpaEfvTbl2Anlagen ";
    $query .= "WHERE org_ID = '$orgID' ";
    $query .= "AND deleted <> 'true' ";
    $query .= "AND archiviertAnl <> 'true' ";
  }
  elseif ($modus == "liegenschaft"){
    $liegID = $_POST['liegID'];
    $query = "SELECT * FROM SpaEfvTbl2Anlagen ";
    $query .= "WHERE lieg_ID = '$liegID' ";
    $query .= "AND deleted <> 'true' ";
    $query .= "AND archiviertAnl <> 'true' ";
  }
  $query .= "ORDER BY AnlNr ";
}
elseif ($teil == "messstellen") {
  if($modus == "gesamt"){
    $query = "SELECT * FROM SpaEfvTbl2Messstellen ";
  }
  elseif ($modus == "organisation") {
    $orgID = $_POST['orgID'];
    $query = "SELECT * FROM SpaEfvTbl2Messstellen ";
    $query .= "WHERE org_ID = '$orgID' ";
  }
  elseif ($modus == "liegenschaft"){
    $liegID = $_POST['liegID'];
    $query = "SELECT * FROM SpaEfvTbl2Messstellen ";
    $query .= "WHERE lieg_ID = '$liegID' ";
  }
}
else{
  echo("An error occured! Variable <teil> has no valid value! :getSpaEfVTbl2Data.php");
}

$records = queryDB($conn, $query, "read");

echo json_encode($records);
?>
