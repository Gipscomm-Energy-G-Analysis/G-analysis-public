<?php

require 'DbOperations.php';

function readInSpaEfVTbl1Data($nameDB, ){
  $dbConnection = connectToDB($nameDB);

  $query = "SELECT * FROM spreadsheets";

  $records = queryDB($dbConnection, $query, "read");

  return $records;
}
