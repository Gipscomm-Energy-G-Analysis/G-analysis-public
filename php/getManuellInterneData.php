<?php

error_reporting(-1);
ini_set ('display_errors', 'On');

require 'DbOperations.php';

$nameDB = $_POST['nameDB'];
$conn = connectToDB($nameDB);

$id = $_POST['id'];

if($id == 'DblClick'){
	$anl_ID = $_POST['anl_ID'];
	$query = "SELECT * FROM anlagen ";
	$query .= "WHERE zeitintervallAnl  <> 0 ";
	$query .= "AND anl_ID = $anl_ID ";
	$query .= "AND deleted <> 1 ";
}
elseif($id == 'displayData'){
	$mstID = $_POST['mstID'];
	$query = "SELECT * FROM interneMesswerteConfig ";
	$query .= "WHERE mst_ID  = '$mstID' ";
}
elseif($id == 'intBdeIMw'){
	if(isset($_POST['key']) && !empty($_POST['key']) && $_POST['key'] == 'intBdeIMwNextMst'){
		$query = "SELECT TOP 1 * FROM MessstellenAnlagen As T1 ";
		  $query .= "LEFT JOIN interneMesswerteConfig AS T2 ";
		  $query .= "ON T1.mst_ID = T2.mst_ID ";
		  $query .= "WHERE T1.messartMst = 'manuell' ";
		  $query .= "AND T1.deleted <> 'true' ";
		  $query .= "AND T1.mst_ID >".$_POST['mst_ID']." ";
		  $query .= "ORDER BY T1.mst_ID ASC";

	}else if(isset($_POST['key']) && !empty($_POST['key']) && $_POST['key'] == 'intBdeIMwPreviousMst'){
		$query = "SELECT TOP 1 * FROM MessstellenAnlagen As T1 ";
		  $query .= "LEFT JOIN interneMesswerteConfig AS T2 ";
		  $query .= "ON T1.mst_ID = T2.mst_ID ";
		  $query .= "WHERE T1.messartMst = 'manuell' ";
		  $query .= "AND T1.deleted <> 'true' ";
		  $query .= "AND T1.mst_ID <".$_POST['mst_ID']." ";
		  $query .= "ORDER BY T1.mst_ID DESC";


	}else if(isset($_POST['key']) && !empty($_POST['key']) && $_POST['key'] == 'intBdeIMwLastMst'){
		$query = "SELECT TOP 1 * FROM MessstellenAnlagen As T1 ";
		  $query .= "LEFT JOIN interneMesswerteConfig AS T2 ";
		  $query .= "ON T1.mst_ID = T2.mst_ID ";
		  $query .= "WHERE T1.messartMst = 'manuell' ";
		  $query .= "AND T1.deleted <> 'true' ";
		  $query .= "ORDER BY T1.mst_ID DESC";

	}else if(isset($_POST['key']) && !empty($_POST['key']) && $_POST['key'] == 'intBdeIMwFirstMst'){
		  $query = "SELECT TOP 1 * FROM MessstellenAnlagen As T1 ";
		  $query .= "LEFT JOIN interneMesswerteConfig AS T2 ";
		  $query .= "ON T1.mst_ID = T2.mst_ID ";
		  $query .= "WHERE T1.messartMst = 'manuell' ";
		  $query .= "AND T1.deleted <> 'true' ";
		  $query .= "ORDER BY T1.mst_ID ASC";

	}
}elseif($id == 'KeinZeitintervallTbl'){
	   $query = "SELECT * FROM MessstellenAnlagen AS T1 ";
	   $query .= "LEFT JOIN interneMesswerteConfig AS T2 ";
	   $query .= "ON T1.mst_ID = T2.mst_ID ";
	   $query .= "LEFT JOIN iMwUnits AS T3 ";
	   $query .= "ON T3.unt_ID = T2.unt_ID ";
	   $query .= "LEFT JOIN intervalType AS T4 ";
	   $query .= "ON T4.intTp_ID = T2.intTp_ID ";
	   $query .= "WHERE T1.deleted <> 'true' ";
	   $query .= "AND T1.messartMst = 'manuell' ";
}elseif($id == 'masseneingabeSearch'){
	   $zeitintervallAnl = $_POST['zeitintervallAnl'];
		if($zeitintervallAnl==1){
		      $sDate = $_POST['startDate'];
		      $eDate = $_POST['endDate']; 

		      $fromDate =explode(".", $sDate);      
		      $arrStart[] = $fromDate[2];
		      $arrStart[] = $fromDate[1];      
		      $arrStart[] = $fromDate[0]; 

		      $toDate = explode(".", $eDate);
		      $arrEnd[] =  $toDate[2]; 
		      $arrEnd[] =  $toDate[1]; 
		      $arrEnd[] =  $toDate[0]; 

		      $startDate = implode("-",$arrStart);
		      $endDate = implode("-",$arrEnd);
		      $startWeek ='';
		      $endWeek ='';

	    }else if($zeitintervallAnl==2){
		      $sDate = $_POST['startDate'];
		      $eDate = $_POST['endDate']; 
		      $fromDate =explode("-", $sDate);
		      $startWeek = $fromDate[0]; //first week selected value
		      $startDate = $fromDate[1]; //first year input text value

		      $toDate = explode("-", $eDate);
		      $endWeek =  $toDate[0]; //second week selected value
		      $endDate =  $toDate[1]; //second year input text value

	    }else if($zeitintervallAnl==3){
		      $sDate = $_POST['startDate'];
		      $eDate = $_POST['endDate']; 

		      $fromDate =explode(".", $sDate);
		      $arrStart[] = $fromDate[1]; //first year input text value      
		      $arrStart[] = $fromDate[0]; //first week selected value


		      $toDate = explode(".", $eDate);
		      $arrEnd[] =  $toDate[1]; //second year input text value
		      $arrEnd[] =  $toDate[0]; //second week selected value

		      $startDate = implode("-",$arrStart);
		      $endDate = implode("-",$arrEnd);
		      $startWeek ='';
		      $endWeek ='';

	    }else{
		      $startDate =$_POST['startDate'];
		      $endDate =$_POST['endDate']; 
		      $startWeek ='';
		      $endWeek ='';
	    }
			$query1 = "SELECT * FROM MessstellenAnlagen As T1 ";
			$query1 .= "LEFT JOIN interneMesswerteConfig AS T2 ";
			$query1 .= "ON T1.mst_ID = T2.mst_ID ";
			$query1 .= "WHERE T1.messartMst = 'manuell' ";
			$query1 .= "AND T1.deleted <> 'true' ";
			$query1 .= "AND ((T2.startDate >= '$startDate' AND T2.startDate <= '$endDate') OR (T2.endDate >= '$startDate' AND T2.endDate <= '$endDate') OR (T2.startDate <= '$startDate' AND T2.endDate >= '$endDate') OR (T2.startDate <= '$startDate' AND T2.endDate =''))";
			$query1 .= "AND T2.intTp_ID = '$zeitintervallAnl' ";
			$query1 .= "ORDER BY T1.mst_ID ASC";

			$query2 = "SELECT * FROM masseneingabeSucheIMw ";
			$query2 .= "WHERE type = '$zeitintervallAnl' ";

			$query3 = "SELECT * FROM masseneingabeSucheErgebnisIMw ";
			$query3 .= "WHERE type = '$zeitintervallAnl' ";
		
}

//echo $query2;die;
if($id == 'masseneingabeSearch'){

$records['query1'] = queryDB($conn, $query1, "read");
$records['query2'] = queryDB($conn, $query2, "read");
$records['query3'] = queryDB($conn, $query3, "read");
echo json_encode($records, JSON_INVALID_UTF8_IGNORE);	
}else{
$records= queryDB($conn, $query, "read");
echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
}
//$records['query1'] = queryDB($conn, $query1, "read");
/*$arr = [];
$query2Records = queryDB($conn, $query2, "read");
$query3Records= queryDB($conn, $query3, "read");
foreach ($query3Records as $query3Record) {
	
	$key = array_search($query3Record['on_date'], array_column($query2Records, 'on_date'));
	//echo '<pre>';print_r($query2Records);echo '</pre>';
	$arr[$key]['on_date']=$query3Record['on_date'];
	$arr[$key]['result']=$query3Record['result'];
	$arr[$key]['val']=$query2Records[$key]['val'];
	$arr[$key]['on_week']=$query3Record['on_week'];
	$arr[$key]['mst_ID']=$query3Record['mst_ID'];
}
echo '<pre>';print_r($arr);echo '</pre>';*/




?>