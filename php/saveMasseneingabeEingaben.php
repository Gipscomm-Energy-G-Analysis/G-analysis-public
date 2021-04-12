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

/*new-mm-start 05-04-2021*/
if($modus == "savePrdkt"){
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
			$queryCheckEnabled="SELECT * FROM masseneingabeSuchePrdIMw WHERE prd_anl_ID = '$mstIDEnabled' AND on_date = '$dateEnabled' AND type = '$type' AND on_week = '$dateWk1'";
		    $recordsCheckEnabled = queryDB($conn, $queryCheckEnabled, "read");
		    if(count($recordsCheckEnabled) > 0){
		    	 $queryEnabledUpdate = "UPDATE masseneingabeSuchePrdIMw SET
			      on_date = '$dateEnabled',on_week = '$dateWk1',val = '$textValEnabled' ";
			      $queryEnabledUpdate .= "WHERE prd_anl_ID = '$mstIDEnabled' ";
			      $queryEnabledUpdate .= "AND on_date = '$dateEnabled' ";
			      $queryEnabledUpdate .= "AND on_week = '$dateWk1' ";
			      $queryEnabledUpdate .= "AND type = '$type'";
			      queryDB($conn, $queryEnabledUpdate, "write");
		    }else{
				$queryEnabledSave = "INSERT INTO masseneingabeSuchePrdIMw( prd_anl_ID,on_date,on_week,val,type,deleted) ";
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
			$queryCheckDisabled="SELECT * FROM masseneingabeSucheBetriebsPrdIMw WHERE prd_anl_ID = '$mstIDDisabled' AND on_date = '$dateDisabled' AND type = '$type' AND on_week = '$dateWk2'";
		    $recordsCheckDisabled = queryDB($conn, $queryCheckDisabled, "read");
		    if(count($recordsCheckDisabled) > 0){
		    	 $queryDisabledUpdate = "UPDATE masseneingabeSucheBetriebsPrdIMw SET
			      on_date = '$dateDisabled',on_week = '$dateWk2',val = '$textValDisabled' ";
			      $queryDisabledUpdate .= "WHERE prd_anl_ID = '$mstIDDisabled' ";
			      $queryDisabledUpdate .= "AND on_date = '$dateDisabled' ";
			      $queryDisabledUpdate .= "AND on_week = '$dateWk2' ";
			      $queryDisabledUpdate .= "AND type = '$type'";
			      queryDB($conn, $queryDisabledUpdate, "write");
		    }else{
				$queryDisabled = "INSERT INTO masseneingabeSucheBetriebsPrdIMw( prd_anl_ID,on_date,on_week,val,type,deleted) ";
				$queryDisabled .= "VALUES ('$mstIDDisabled','$dateDisabled','$dateWk2','$textValDisabled','$type','false') ";
				queryDB($conn, $queryDisabled, "write");
			}
		    //json_encode($recordsDisabled, JSON_INVALID_UTF8_IGNORE);
		}
	}
	echo json_encode('Saved Successfully!', JSON_INVALID_UTF8_IGNORE);
}
/*new-mm-end 05-04-2021*/

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

/*new-mm-start 05-04-2021*/
if($modus == "saveCurrentRowPrdkt"){
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
			$queryCheckEnabled="SELECT * FROM masseneingabeSuchePrdIMw WHERE prd_anl_ID = '$mstIDEnabled' AND on_date = '$dateEnabled' AND type = '$type' AND on_week = '$dateWk1'";
		    $recordsCheckEnabled = queryDB($conn, $queryCheckEnabled, "read");
		    if(count($recordsCheckEnabled) > 0){
		    	 $queryEnabledUpdate = "UPDATE masseneingabeSuchePrdIMw SET
			      on_date = '$dateEnabled',on_week = '$dateWk1',val = '$textValEnabled' ";
			      $queryEnabledUpdate .= "WHERE prd_anl_ID = '$mstIDEnabled' ";
			      $queryEnabledUpdate .= "AND on_date = '$dateEnabled' ";
			      $queryEnabledUpdate .= "AND on_week = '$dateWk1' ";
			      $queryEnabledUpdate .= "AND type = '$type'";
			      queryDB($conn, $queryEnabledUpdate, "write");
		    }else{
				$queryEnabledSave = "INSERT INTO masseneingabeSuchePrdIMw( prd_anl_ID,on_date,on_week,val,type,deleted) ";
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
			$queryCheckDisabled="SELECT * FROM masseneingabeSucheBetriebsPrdIMw WHERE prd_anl_ID = '$mstIDDisabled' AND on_date = '$dateDisabled' AND type = '$type' AND on_week = '$dateWk2'";
		    $recordsCheckDisabled = queryDB($conn, $queryCheckDisabled, "read");
		    if(count($recordsCheckDisabled) > 0){
		    	 $queryDisabledUpdate = "UPDATE masseneingabeSucheBetriebsPrdIMw SET
			      on_date = '$dateDisabled',on_week = '$dateWk2',val = '$textValDisabled' ";
			      $queryDisabledUpdate .= "WHERE prd_anl_ID = '$mstIDDisabled' ";
			      $queryDisabledUpdate .= "AND on_date = '$dateDisabled' ";
			      $queryDisabledUpdate .= "AND on_week = '$dateWk2' ";
			      $queryDisabledUpdate .= "AND type = '$type'";
			      queryDB($conn, $queryDisabledUpdate, "write");
		    }else{
				$queryDisabled = "INSERT INTO masseneingabeSucheBetriebsPrdIMw( prd_anl_ID,on_date,on_week,val,type,deleted) ";
				$queryDisabled .= "VALUES ('$mstIDDisabled','$dateDisabled','$dateWk2','$textValDisabled','$type','false') ";
				queryDB($conn, $queryDisabled, "write");
			}
		    //json_encode($recordsDisabled, JSON_INVALID_UTF8_IGNORE);
		}
	}
	//echo json_encode('Saved Successfully!', JSON_INVALID_UTF8_IGNORE);
}
/*new-mm-end 05-04-2021*/
if($modus == "deleteCurrentInput"){
	//echo '<pre>';print_r($_POST);echo '</pre>';die;
	if($modus == "deleteCurrentInput"){
   //print_r($_POST['ePrdKFE_id']);die;
	  $mstID = $_POST['mstID'];
	  //$type = $_POST['type'];
	  $currentDate = $_POST['currentDate'];
		  if($type==2){
		    $expDate =explode("-", $currentDate);
		    $on_week = $expDate[0];   
		    $on_date = $expDate[1];
		    $query1 = "DELETE FROM masseneingabeSucheIMw";
			$query1 .= " WHERE type = '$type'";
			$query1 .= " AND mst_ID = '$mstID'";
			$query1 .= " AND on_date = '$on_date' ";
			$query1 .= " AND on_week = '$on_week'";
			queryDB($conn, $query1, "write");

			$query2 = "DELETE FROM masseneingabeSucheErgebnisIMw";
			$query2 .= " WHERE type = '$type'";
			$query2 .= " AND mst_ID = '$mstID'";
			$query2 .= " AND on_date = '$on_date' ";
			$query2 .= " AND on_week = '$on_week'";
			queryDB($conn, $query2, "write");

		    $currentDateJustNext ="SELECT TOP 1 * FROM masseneingabeSucheIMw WHERE mst_ID = '$mstID' AND on_date >= '$on_date' AND on_week > '$on_week' AND type = '$type' ORDER BY on_week ASC";
		    $currentDateJustPrev ="SELECT TOP 1 * FROM masseneingabeSucheIMw WHERE mst_ID = '$mstID' AND on_date <= '$on_date'  AND on_week < '$on_week' AND type = '$type' ORDER BY on_week DESC";
			$r1 = queryDB($conn, $currentDateJustNext, "read");
			$r2 = queryDB($conn, $currentDateJustPrev, "read");
			//echo '<pre>';print_r($r1);echo '<pre>';print_r($r2);die;
			if((isset($r1) && !empty($r1)) && (isset($r2) && !empty($r2))){
				$resultNxtVal = $r1[0]['val']-$r2[0]['val'];
				$onDateNext = $r1[0]['on_date'];
				$onWeekNext = $r1[0]['on_week'];
				$queryNxtValUpdate = "UPDATE masseneingabeSucheErgebnisIMw SET val = '$resultNxtVal' ";
				$queryNxtValUpdate .= "WHERE mst_ID = '$mstID' ";
				$queryNxtValUpdate .= "AND on_date = '$onDateNext' ";
				$queryNxtValUpdate .= "AND on_week = '$onWeekNext' ";
				$queryNxtValUpdate .= "AND type = '$type'";
				//echo $queryNxtValUpdate;die;
				queryDB($conn, $queryNxtValUpdate, "write");
		    }
	   }else{
			$query1 = "DELETE FROM masseneingabeSucheIMw";
			$query1 .= " WHERE type = '$type'";
			$query1 .= " AND mst_ID = '$mstID'";
			$query1 .= " AND on_date = '$currentDate'";
			queryDB($conn, $query1, "write");

			$query2 = "DELETE FROM masseneingabeSucheErgebnisIMw";
			$query2 .= " WHERE type = '$type'";
			$query2 .= " AND mst_ID = '$mstID'";
			$query2 .= " AND on_date = '$currentDate'";
			queryDB($conn, $query2, "write");

			$currentDateJustNext ="SELECT TOP 1 * FROM masseneingabeSucheIMw WHERE mst_ID = '$mstID' AND on_date > '$currentDate' AND type = '$type' ORDER BY on_date ASC";
			$currentDateJustPrev ="SELECT TOP 1 * FROM masseneingabeSucheIMw WHERE mst_ID = '$mstID' AND on_date < '$currentDate' AND type = '$type' ORDER BY on_date DESC";
			$r1 = queryDB($conn, $currentDateJustNext, "read");
			$r2 = queryDB($conn, $currentDateJustPrev, "read");
			if((isset($r1) && !empty($r1)) && (isset($r2) && !empty($r2))){
				$resultNxtVal = $r1[0]['val']-$r2[0]['val'];
				$onDateNext = $r1[0]['on_date'];
				$queryNxtValUpdate = "UPDATE masseneingabeSucheErgebnisIMw SET val = '$resultNxtVal' ";
				$queryNxtValUpdate .= "WHERE mst_ID = '$mstID' ";
				$queryNxtValUpdate .= "AND on_date = '$onDateNext' ";
				$queryNxtValUpdate .= "AND type = '$type'";
				queryDB($conn, $queryNxtValUpdate, "write");
			}
	    }
	    echo 1;
	}

}
/*new-mm-start 05-04,06-04-2021*/
if($modus == "deleteCurrentInputPrdkt"){
	//echo '<pre>';print_r($_POST);echo '</pre>';die;
	if($modus == "deleteCurrentInputPrdkt"){
   //print_r($_POST['ePrdKFE_id']);die;
	  $mstID = $_POST['mstID'];
	  //$type = $_POST['type'];
	  $currentDate = $_POST['currentDate'];
		  if($type==2){
		    $expDate =explode("-", $currentDate);
		    $on_week = $expDate[0];   
		    $on_date = $expDate[1];
		    $query1 = "DELETE FROM masseneingabeSuchePrdIMw";
			$query1 .= " WHERE type = '$type'";
			$query1 .= " AND prd_anl_ID = '$mstID'";
			$query1 .= " AND on_date = '$on_date' ";
			$query1 .= " AND on_week = '$on_week'";
			queryDB($conn, $query1, "write");

			$query2 = "DELETE FROM masseneingabeSucheBetriebsPrdIMw";
			$query2 .= " WHERE type = '$type'";
			$query2 .= " AND prd_anl_ID = '$mstID'";
			$query2 .= " AND on_date = '$on_date' ";
			$query2 .= " AND on_week = '$on_week'";
			queryDB($conn, $query2, "write");

		    $currentDateJustNext ="SELECT TOP 1 * FROM masseneingabeSuchePrdIMw WHERE prd_anl_ID = '$mstID' AND on_date >= '$on_date' AND on_week > '$on_week' AND type = '$type' ORDER BY on_week ASC";
		    $currentDateJustPrev ="SELECT TOP 1 * FROM masseneingabeSuchePrdIMw WHERE prd_anl_ID = '$mstID' AND on_date <= '$on_date'  AND on_week < '$on_week' AND type = '$type' ORDER BY on_week DESC";
			$r1 = queryDB($conn, $currentDateJustNext, "read");
			$r2 = queryDB($conn, $currentDateJustPrev, "read");
			//echo '<pre>';print_r($r1);echo '<pre>';print_r($r2);die;
			if((isset($r1) && !empty($r1)) && (isset($r2) && !empty($r2))){
				$resultNxtVal = $r1[0]['val']-$r2[0]['val'];
				$onDateNext = $r1[0]['on_date'];
				$onWeekNext = $r1[0]['on_week'];
				$queryNxtValUpdate = "UPDATE masseneingabeSucheBetriebsPrdIMw SET val = '$resultNxtVal' ";
				$queryNxtValUpdate .= "WHERE prd_anl_ID = '$mstID' ";
				$queryNxtValUpdate .= "AND on_date = '$onDateNext' ";
				$queryNxtValUpdate .= "AND on_week = '$onWeekNext' ";
				$queryNxtValUpdate .= "AND type = '$type'";
				//echo $queryNxtValUpdate;die;
				queryDB($conn, $queryNxtValUpdate, "write");
		    }
	   }else{
			$query1 = "DELETE FROM masseneingabeSuchePrdIMw";
			$query1 .= " WHERE type = '$type'";
			$query1 .= " AND prd_anl_ID = '$mstID'";
			$query1 .= " AND on_date = '$currentDate'";
			queryDB($conn, $query1, "write");

			$query2 = "DELETE FROM masseneingabeSucheBetriebsPrdIMw";
			$query2 .= " WHERE type = '$type'";
			$query2 .= " AND prd_anl_ID = '$mstID'";
			$query2 .= " AND on_date = '$currentDate'";
			queryDB($conn, $query2, "write");

			$currentDateJustNext ="SELECT TOP 1 * FROM masseneingabeSuchePrdIMw WHERE prd_anl_ID = '$mstID' AND on_date > '$currentDate' AND type = '$type' ORDER BY on_date ASC";
			$currentDateJustPrev ="SELECT TOP 1 * FROM masseneingabeSuchePrdIMw WHERE prd_anl_ID = '$mstID' AND on_date < '$currentDate' AND type = '$type' ORDER BY on_date DESC";
			$r1 = queryDB($conn, $currentDateJustNext, "read");
			$r2 = queryDB($conn, $currentDateJustPrev, "read");
			if((isset($r1) && !empty($r1)) && (isset($r2) && !empty($r2))){
				$resultNxtVal = $r1[0]['val']-$r2[0]['val'];
				$onDateNext = $r1[0]['on_date'];
				$queryNxtValUpdate = "UPDATE masseneingabeSucheBetriebsPrdIMw SET val = '$resultNxtVal' ";
				$queryNxtValUpdate .= "WHERE prd_anl_ID = '$mstID' ";
				$queryNxtValUpdate .= "AND on_date = '$onDateNext' ";
				$queryNxtValUpdate .= "AND type = '$type'";
				queryDB($conn, $queryNxtValUpdate, "write");
			}
	    }
	    echo 1;
	}

}
/*new-mm-end 05-04,06-04-2021*/



?>