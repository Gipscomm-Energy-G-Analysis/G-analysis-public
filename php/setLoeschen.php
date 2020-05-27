<?php

include('top-cache.php');
error_reporting(-1);
ini_set ('display_errors', 'On');

require 'DbOperations.php';

$nameDB = $_POST['nameDB'];
$conn = connectToDB($nameDB);
$ins = $_POST['ins'];

switch ($ins) {
  case "org":
    $tbl = "organisationen";
    $idName = "org_ID";
    break;
  case "lieg":
    $tbl = "liegenschaften";
    $idName = "lieg_ID";
    break;
  case "ber":
    $tbl = "bereiche";
    $idName = "ber_ID";
    break;
  case "mst":
    $tbl = "messstellen";
    $idName = "mst_ID";
    break;
  case "extDl":
    $tbl = "externeDurchleitungen";
    $idName = "extDl_ID";
    break;
  case "std":
    $tbl = "standorte";
    $idName = "std_ID";
    break;
  case "stdDr":
    $tbl = "standorte";
    $idName = "stdDr_ID";
    break;
  case "anl":
    $tbl = "anlagen";
    $idName = "anl_ID";
    break;
  case "msm":
    $tbl = "messmittel";
    $idName = "msm_ID";
    break;
  case "eRng":
    $tbl = "externeRechnungen";
    $idName = "eRng_ID";
    break;
  case "zp":
    $tbl = "zaehlpunktnummern";
    $idName = "zp_ID";
    break;
  case "eAnl":
    $tbl = "erweiterungenAnlagen";
    $idName = "eAnl_ID";
    break;
  case "prd":
    $tbl = "produkte";
    $idName = "prd_ID";
    break;
}
$idValue = $_POST['idValue'];

$query = "UPDATE ".$tbl." SET deleted = 'true' ";
$query .= "WHERE ".$idName." = ".$idValue." ";

queryDB($conn, $query, "write");

echo $query;

include('bottom-cache.php');
?>
