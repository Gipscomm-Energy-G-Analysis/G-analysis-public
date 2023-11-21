<?php

error_reporting (-1);
ini_set ('display_errors', 'On');

require 'DbOperations.php';

$nameDB = $_POST['nameDB'];
$conn = connectToDB($nameDB);

$mstID = $_POST['mstID'];
$type = $_POST['type'];

if(isset($_POST['lineIndex'])){
	$identyear = $_POST['identyear'];
	//$lineIndex = $_POST['lineIndex'];
	$lineIndex = '';
} else{
	$identyear = '';
	$lineIndex = '';
}
/*if($identyear=='0'){
	$query = "SELECT * FROM bemerkungenDiagramme ";
	$query .= "WHERE mst_ID = $mstID and type = '$type' and ident Like '%$identyear%'";
	$query .= " ORDER BY ident ";
}else if($identyear=='1'){
	$query = "SELECT * FROM bemerkungenDiagramme ";
	$query .= "WHERE mst_ID = $mstID and type = '$type' and ident Like '%$identyear%'";
	$query .= " ORDER BY ident ";
}else if($identyear=='2'){
	$query = "SELECT * FROM bemerkungenDiagramme ";
	$query .= "WHERE mst_ID = $mstID and type = '$type' and ident Like '%$identyear%'";
	$query .= " ORDER BY ident ";
}*/
if(($type=='week') && !empty($identyear)){
	$identyear=explode(',',$identyear);
	$fristYear=explode('-',$identyear[0]);
	$lastYear=explode('-',$identyear[1]);

	$startYear=$fristYear[1];
	$endYear=$lastYear[1];
	$startWeek=(string)((int)($fristYear[0]));
	$endWeek=(string)((int)($lastYear[0]));

	$queryWeek = "SELECT * FROM bemerkungenDiagramme WHERE mst_ID = $mstID and type = '$type' ORDER BY ident ";
	$weekrecords = queryDB($conn, $queryWeek, "read");

    $filterWeekYear=[];
	for ($startYear = $startYear; $startYear <= $endYear; $startYear++) {
  		for ($startWeek = $startWeek; $startWeek <= $endWeek; $startWeek++) {
            $arrayValue= $startWeek.'-'.$startYear;
			array_push($filterWeekYear,$arrayValue);
		}
	}

	$dataArray=[];
	foreach ($weekrecords as $key => $value) {
		$yearValue= explode('-', $value['ident']);
		$newYearValue = $yearValue[2];
		$newWeekValue = $yearValue[1];
		$tableIdentValue= $newWeekValue.'-'.$newYearValue;
		if(in_array($tableIdentValue,$filterWeekYear)){
			    array_push($dataArray,$value);
		}
	}
	if(count($dataArray) > 0){
 		echo json_encode($dataArray, JSON_INVALID_UTF8_SUBSTITUTE);
 		return false;
	}
}else if($identyear){	
	$query = "SELECT * FROM bemerkungenDiagramme ";
	$query .= "WHERE mst_ID = $mstID and type = '$type' and ident Like '%$identyear%'";
	$query .= "ORDER BY ident ";
}else{
	$query = "SELECT * FROM bemerkungenDiagramme ";
	$query .= "WHERE mst_ID = $mstID and type = '$type' ";
	$query .= "ORDER BY ident ";
}

$records = queryDB($conn, $query, "read");
echo json_encode($records, JSON_INVALID_UTF8_SUBSTITUTE);
