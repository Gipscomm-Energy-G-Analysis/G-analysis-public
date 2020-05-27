<?php
error_reporting (-1);
ini_set ('display_errors', 'On');

require '../DbOperations.php';

$nameDB = $_POST['nameDB'];
$conn = connectToDB($nameDB);
$year = $_POST['jahr'];
$unit = $_POST['einheit'];

$parsArr = [$conn, $year, $unit];

function getMassInpValues($pars){
  $query1 = "SELECT * FROM BetriebsdatenSummeTage ";
  $query1 .= "WHERE year =  '$pars[1]' ";
  $query1 .= "AND einheit =  '$pars[2]' ";

  $records1 = queryDB($pars[0], $query1, "read");

  $query2 = "SELECT * FROM BetriebsdatenSummeWochen ";
  $query2 .= "WHERE year =  '$pars[1]' ";
  $query2 .= "AND einheit =  '$pars[2]' ";

  $records2 = queryDB($pars[0], $query2, "read");

  $query3 = "SELECT * FROM BetriebsdatenSummeMonate ";
  $query3 .= "WHERE year =  '$pars[1]' ";
  $query3 .= "AND einheit =  '$pars[2]' ";

  $records3 = queryDB($pars[0], $query3, "read");

  $query4 = "SELECT j_".$pars[1]." AS Wert, anl_ID, einheit FROM masseneingabeJahre ";
  $query4 .= "WHERE einheit =  '$pars[2]' ";

  $records4 = queryDB($pars[0], $query4, "read");

  if(count($records1) > 0){
    return $records1;
  }
  elseif (count($records2) > 0) {
    return $records2;
  }
  elseif (count($records3) > 0) {
    return $records3;
  }
  elseif (count($records4) > 0) {
    return $records4;
  }
  else {
    return false;
  }
}

echo json_encode(getMassInpValues($parsArr));
?>
