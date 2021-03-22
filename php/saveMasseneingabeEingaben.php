<?php

error_reporting(-1);
ini_set ('display_errors', 'On');

require 'DbOperations.php';

$nameDB = $_POST['nameDB'];
$conn = connectToDB($nameDB);
$type = $_POST['key'];
$modus = $_POST['modus'];

if($modus == "save"){
	$postEnabledDatas= json_decode($_POST['postDataEnabled'], JSON_INVALID_UTF8_IGNORE);
	foreach($postEnabledDatas as $postEnabledData) {
		if((isset($postEnabledData['textValEnabled']) && !empty($postEnabledData['textValEnabled'])) && (isset($postEnabledData['mstIDEnabled']) && !empty($postEnabledData['mstIDEnabled'])) && (isset($postEnabledData['dateEnabled']) && !empty($postEnabledData['dateEnabled'])) ){
			$textValEnabled = $postEnabledData['textValEnabled'];
			$mstIDEnabled = $postEnabledData['mstIDEnabled'];
			$date1 = $postEnabledData['dateEnabled'];
			if($type==2){
				$dateExp1 =explode("-", $date1);      
		        $dateWk1= $dateExp1[0];
		        $dateEnabled= $dateExp1[1];
			}else{
				$dateEnabled = $postEnabledData['dateEnabled'];
				$dateWk1=0;
			}
			$queryCheckEnabled="SELECT * FROM masseneingabeSucheIMw WHERE mst_ID = '$mstIDEnabled' AND on_date = '$dateEnabled' AND type = '$type' AND on_week = '$dateWk1'";
		    $recordsCheckEnabled = queryDB($conn, $queryCheckEnabled, "read");
		    if(count($recordsCheckEnabled) > 0){
		    	 $queryEnabledUpdate = "UPDATE masseneingabeSucheIMw SET
			      on_date = '$dateEnabled',on_week = '$dateWk1',val = '$textValEnabled' ";
			      $queryEnabledUpdate .= "WHERE mst_ID = '$mstIDEnabled' ";
			      $queryEnabledUpdate .= "AND on_date = '$dateEnabled' ";
			      $queryEnabledUpdate .= "AND on_week = '$dateWk1' ";
			      $queryEnabledUpdate .= "AND type = '$type'";
			      queryDB($conn, $queryEnabledUpdate, "write");
		    }else{
				$queryEnabledSave = "INSERT INTO masseneingabeSucheIMw( mst_ID,on_date,on_week,val,type,deleted) ";
				$queryEnabledSave .= "VALUES ('$mstIDEnabled','$dateEnabled','$dateWk1','$textValEnabled','$type','false') ";
				queryDB($conn, $queryEnabledSave, "write");
			}
		}
	}
	$postDisabledDatas= json_decode($_POST['postDataDisabled'], JSON_INVALID_UTF8_IGNORE);
	foreach($postDisabledDatas as $postDisabledData) {
		if((isset($postDisabledData['textValDisabled']) && !empty($postDisabledData['textValDisabled'])) && (isset($postDisabledData['mstIDDisabled']) && !empty($postDisabledData['mstIDDisabled'])) && (isset($postDisabledData['dateDisabled']) && !empty($postDisabledData['dateDisabled'])) ){
			$textValDisabled = $postDisabledData['textValDisabled'];
			$mstIDDisabled = $postDisabledData['mstIDDisabled'];
			$date2= $postDisabledData['dateDisabled'];
			if($type==2){
				$dateExp2 =explode("-", $date2);      
		        $dateWk2= $dateExp2[0];
		        $dateDisabled= $dateExp2[1];
			}else{
				$dateDisabled = $postDisabledData['dateDisabled'];
				$dateWk2=0;
			}
			$queryCheckDisabled="SELECT * FROM masseneingabeSucheErgebnisIMw WHERE mst_ID = '$mstIDDisabled' AND on_date = '$dateDisabled' AND type = '$type' AND on_week = '$dateWk2'";
		    $recordsCheckDisabled = queryDB($conn, $queryCheckDisabled, "read");
		    if(count($recordsCheckDisabled) > 0){
		    	 $queryDisabledUpdate = "UPDATE masseneingabeSucheErgebnisIMw SET
			      on_date = '$dateDisabled',on_week = '$dateWk2',val = '$textValDisabled' ";
			      $queryDisabledUpdate .= "WHERE mst_ID = '$mstIDDisabled' ";
			      $queryDisabledUpdate .= "AND on_date = '$dateDisabled' ";
			      $queryDisabledUpdate .= "AND on_week = '$dateWk2' ";
			      $queryDisabledUpdate .= "AND type = '$type'";
			      queryDB($conn, $queryDisabledUpdate, "write");
		    }else{
				$queryDisabled = "INSERT INTO masseneingabeSucheErgebnisIMw( mst_ID,on_date,on_week,val,type,deleted) ";
				$queryDisabled .= "VALUES ('$mstIDDisabled','$dateDisabled','$dateWk2','$textValDisabled','$type','false') ";
				queryDB($conn, $queryDisabled, "write");
			}
		    //json_encode($recordsDisabled, JSON_INVALID_UTF8_IGNORE);
		}
	}
	echo json_encode('Saved Successfully!', JSON_INVALID_UTF8_IGNORE);
}
if($modus == "saveCurrentRow"){
	//echo '<pre>';print_r($_POST);echo '</pre>';die;
	$postEnabledDatas= json_decode($_POST['postDataEnabled'], JSON_INVALID_UTF8_IGNORE);
	foreach($postEnabledDatas as $postEnabledData) {
		if((isset($postEnabledData['textValEnabled']) && !empty($postEnabledData['textValEnabled'])) && (isset($postEnabledData['mstIDEnabled']) && !empty($postEnabledData['mstIDEnabled'])) && (isset($postEnabledData['dateEnabled']) && !empty($postEnabledData['dateEnabled'])) ){
			$textValEnabled = $postEnabledData['textValEnabled'];
			$mstIDEnabled = $postEnabledData['mstIDEnabled'];
			$date1 = $postEnabledData['dateEnabled'];
			if($type==2){
				$dateExp1 =explode("-", $date1);      
		        $dateWk1= $dateExp1[0];
		        $dateEnabled= $dateExp1[1];
			}else{
				$dateEnabled = $postEnabledData['dateEnabled'];
				$dateWk1=0;
			}
			$queryCheckEnabled="SELECT * FROM masseneingabeSucheIMw WHERE mst_ID = '$mstIDEnabled' AND on_date = '$dateEnabled' AND type = '$type' AND on_week = '$dateWk1'";
		    $recordsCheckEnabled = queryDB($conn, $queryCheckEnabled, "read");
		    if(count($recordsCheckEnabled) > 0){
		    	 $queryEnabledUpdate = "UPDATE masseneingabeSucheIMw SET
			      on_date = '$dateEnabled',on_week = '$dateWk1',val = '$textValEnabled' ";
			      $queryEnabledUpdate .= "WHERE mst_ID = '$mstIDEnabled' ";
			      $queryEnabledUpdate .= "AND on_date = '$dateEnabled' ";
			      $queryEnabledUpdate .= "AND on_week = '$dateWk1' ";
			      $queryEnabledUpdate .= "AND type = '$type'";
			      queryDB($conn, $queryEnabledUpdate, "write");
		    }else{
				$queryEnabledSave = "INSERT INTO masseneingabeSucheIMw( mst_ID,on_date,on_week,val,type,deleted) ";
				$queryEnabledSave .= "VALUES ('$mstIDEnabled','$dateEnabled','$dateWk1','$textValEnabled','$type','false') ";
				queryDB($conn, $queryEnabledSave, "write");
			}
		}
	}
	$postDisabledDatas= json_decode($_POST['postDataDisabled'], JSON_INVALID_UTF8_IGNORE);
	foreach($postDisabledDatas as $postDisabledData) {
		if((isset($postDisabledData['textValDisabled']) && !empty($postDisabledData['textValDisabled'])) && (isset($postDisabledData['mstIDDisabled']) && !empty($postDisabledData['mstIDDisabled'])) && (isset($postDisabledData['dateDisabled']) && !empty($postDisabledData['dateDisabled'])) ){
			$textValDisabled = $postDisabledData['textValDisabled'];
			$mstIDDisabled = $postDisabledData['mstIDDisabled'];
			$date2= $postDisabledData['dateDisabled'];
			if($type==2){
				$dateExp2 =explode("-", $date2);      
		        $dateWk2= $dateExp2[0];
		        $dateDisabled= $dateExp2[1];
			}else{
				$dateDisabled = $postDisabledData['dateDisabled'];
				$dateWk2=0;
			}
			$queryCheckDisabled="SELECT * FROM masseneingabeSucheErgebnisIMw WHERE mst_ID = '$mstIDDisabled' AND on_date = '$dateDisabled' AND type = '$type' AND on_week = '$dateWk2'";
		    $recordsCheckDisabled = queryDB($conn, $queryCheckDisabled, "read");
		    if(count($recordsCheckDisabled) > 0){
		    	 $queryDisabledUpdate = "UPDATE masseneingabeSucheErgebnisIMw SET
			      on_date = '$dateDisabled',on_week = '$dateWk2',val = '$textValDisabled' ";
			      $queryDisabledUpdate .= "WHERE mst_ID = '$mstIDDisabled' ";
			      $queryDisabledUpdate .= "AND on_date = '$dateDisabled' ";
			      $queryDisabledUpdate .= "AND on_week = '$dateWk2' ";
			      $queryDisabledUpdate .= "AND type = '$type'";
			      queryDB($conn, $queryDisabledUpdate, "write");
		    }else{
				$queryDisabled = "INSERT INTO masseneingabeSucheErgebnisIMw( mst_ID,on_date,on_week,val,type,deleted) ";
				$queryDisabled .= "VALUES ('$mstIDDisabled','$dateDisabled','$dateWk2','$textValDisabled','$type','false') ";
				queryDB($conn, $queryDisabled, "write");
			}
		    //json_encode($recordsDisabled, JSON_INVALID_UTF8_IGNORE);
		}
	}
	//echo json_encode('Saved Successfully!', JSON_INVALID_UTF8_IGNORE);
}
?>