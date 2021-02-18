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
}elseif($id == 'SearchKeinZeitintervallTbl'){
	   /*new-mm-start*/
	   $checkboxSearch = $_POST['checkboxSearch'];
	   if($checkboxSearch == 1){
		   $query = "SELECT * FROM MessstellenAnlagen AS T1 ";
		   $query .= "LEFT JOIN interneMesswerteConfig AS T2 ";
		   $query .= "ON T1.mst_ID = T2.mst_ID ";
		   $query .= "LEFT JOIN iMwUnits AS T3 ";
		   $query .= "ON T3.unt_ID = T2.unt_ID ";
		   $query .= "LEFT JOIN intervalType AS T4 ";
		   $query .= "ON T4.intTp_ID = T2.intTp_ID ";
		   $query .= "WHERE T1.deleted <> 'true' ";
		   $query .= "AND T1.messartMst = 'manuell' ";
		}
		elseif($checkboxSearch == 2){
		   $query = "SELECT * FROM MessstellenAnlagen AS T1 ";
		   $query .= "LEFT JOIN interneMesswerteConfig AS T2 ";
		   $query .= "ON T1.mst_ID = T2.mst_ID ";
		   $query .= "LEFT JOIN iMwUnits AS T3 ";
		   $query .= "ON T3.unt_ID = T2.unt_ID ";
		   $query .= "LEFT JOIN intervalType AS T4 ";
		   $query .= "ON T4.intTp_ID = T2.intTp_ID ";
		   $query .= "WHERE T1.deleted <> 'true' ";
		   $query .= "AND T1.messartMst = 'manuell' ";
		   $query .= "AND NULLIF(T2.startDate,'') IS NOT NULL ";
		   /*WHERE
		    NULLIF(x,'') IS NOT NULL
		AND NULLIF(y,'') IS NOT NULL
		AND NULLIF(z,'') IS NOT NULL*/		
		}
		elseif($checkboxSearch == 3){
		   $query = "SELECT * FROM MessstellenAnlagen AS T1 ";
		   $query .= "LEFT JOIN interneMesswerteConfig AS T2 ";
		   $query .= "ON T1.mst_ID = T2.mst_ID ";
		   $query .= "LEFT JOIN iMwUnits AS T3 ";
		   $query .= "ON T3.unt_ID = T2.unt_ID ";
		   $query .= "LEFT JOIN intervalType AS T4 ";
		   $query .= "ON T4.intTp_ID = T2.intTp_ID ";
		   $query .= "WHERE T1.deleted <> 'true' ";
		   $query .= "AND T1.messartMst = 'manuell' ";
		   $query .= "AND NULLIF(T2.startDate,'') IS NULL ";

           
		   /*WHERE NULLIF(x,'') IS NULL
		Or NULLIF(y,'') IS NULL
		Or NULLIF(z,'') IS NULL*/
		}
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

			//$query4 = "SELECT COUNT(id) AS inputCountVal FROM masseneingabeSucheErgebnisIMw ";
			//$query4 .= "WHERE type = '$zeitintervallAnl' ";
		
}elseif($id == 'masseneingabeAlertRangeMinMax'){
	$type = $_POST['zeitintervallAnl'];
	$mstID = $_POST['mstID'];
	$date = $_POST['date'];
		
	if($type==2){
	    $expDate =explode("-", $date);
	    $on_week = $expDate[0]; //week val   
	    $on_date = $expDate[1]; //year val

	    $query1 = "SELECT TOP 5 val From masseneingabeSucheErgebnisIMw ";
		$query1 .= "WHERE type = '$type' ";
		$query1 .= "AND mst_ID = '$mstID' ";
		$query1 .= "AND on_date <= '$on_date' ";
		$query1 .= "AND on_week <= '$on_week' ";
		$query1 .= "Order by on_date,on_week DESC";

		$query2 = "SELECT TOP 5 on_date FROM masseneingabeSucheIMw ";
		$query2 .= "WHERE type = '$type' ";
		$query2 .= "AND mst_ID = '$mstID' ";
		$query2 .= "AND on_date <= '$on_date' ";
		$query2 .= "AND on_week <= '$on_week' ";
		$query2 .= "Order by on_date,on_week DESC";
    }else{
		$query1 = "SELECT TOP 5 val From masseneingabeSucheErgebnisIMw ";
		$query1 .= "WHERE type = '$type' ";
		$query1 .= "AND mst_ID = '$mstID' ";
		$query1 .= "AND on_date <= '$date' ";
		$query1 .= "Order by on_date DESC";

		$query2 = "SELECT TOP 5 on_date FROM masseneingabeSucheIMw ";
		$query2 .= "WHERE type = '$type' ";
		$query2 .= "AND mst_ID = '$mstID' ";
		$query2 .= "AND on_date <= '$date' ";
		$query2 .= "Order by on_date DESC";
    }
	
}elseif($id == 'masseneingabeAlertRangeLastInptValue'){
	$type = $_POST['zeitintervallAnl'];
	$mstID = $_POST['mstID'];
	$date = $_POST['date'];
	if($type==2){
	    $expDate =explode("-", $date);
	    $on_week = $expDate[0]; //week val   
	    $on_date = $expDate[1]; //year val
	    $query1 = "SELECT Top 1 val FROM masseneingabeSucheIMw ";
		$query1 .= "WHERE type = '$type' ";
		$query1 .= "AND mst_ID = '$mstID' ";
		$query1 .= "AND on_date <= '$on_date' ";
		$query1 .= "AND on_week <= '$on_week' ";
		$query1 .= "Order by on_date,on_week DESC";
		
		$query2 = "SELECT Top 1 val FROM masseneingabeSucheErgebnisIMw ";
		$query2 .= "WHERE type = '$type' ";
		$query2 .= "AND mst_ID = '$mstID' ";
		$query2 .= "AND on_date <= '$on_date' ";
		$query2 .= "AND on_week <= '$on_week' ";	
		$query2 .= "Order by on_date,on_week DESC";
    }else{
	    $query1 = "SELECT Top 1 val FROM masseneingabeSucheIMw ";
		$query1 .= "WHERE type = '$type' ";
		$query1 .= "AND mst_ID = '$mstID' ";
		$query1 .= "AND on_date < '$date' ";
		$query1 .= "Order by on_date DESC";
		
		$query2 = "SELECT Top 1 val FROM masseneingabeSucheErgebnisIMw ";
		$query2 .= "WHERE type = '$type' ";
		$query2 .= "AND mst_ID = '$mstID' ";
		$query2 .= "AND on_date < '$date' ";
		$query2 .= "Order by on_date DESC";
    }
	
}else if($id == 'startDateRangeCheckValidation'){
  $type = $_POST['type'];
  $mstID = $_POST['mstID'];
 
  if($type==1){
  	  $postDate = $_POST['date'];
	  $dateExplode =explode(".", $postDate);      
	  $arrStart[] = $dateExplode[2];
	  $arrStart[] = $dateExplode[1];      
	  $arrStart[] = $dateExplode[0]; 
	  $date = implode("-",$arrStart);
	  $week ='';
    }else if($type==2){
	      $postDate = $_POST['date'];
	      $dateExplode =explode("-", $postDate);
	      $week = $dateExplode[0]; 
	      $date = $dateExplode[1]; 
    }else if($type==3){
	      $postDate = $_POST['date'];
	      $dateExplode =explode(".", $postDate);
	      $arrStart[] = $dateExplode[1];     
	      $arrStart[] = $dateExplode[0];
	      $date = implode("-",$arrStart);
	      $week ='';
    }else{
	      $date =$_POST['date'];
	      $week ='';
    }
	$query = "SELECT * FROM masseneingabeSucheIMw ";
	$query .= "WHERE type = '$type' ";
	$query .= "AND mst_ID = '$mstID' ";
	$query .= "AND on_date = '$date' ";
	$query .= "AND on_week = '$week'";

}else if($id == 'startEndDateEinheitTypeCheckValidation'){
	//print_r($_POST);die;
	$type = $_POST['type'];
	if($type==1){
	  if(isset($_POST['startDate']) && !empty($_POST['startDate'])){
	  	  $sDate = $_POST['startDate'];
		  $fromDate =explode(".", $sDate);      
		  $arrStart[] = $fromDate[2];
		  $arrStart[] = $fromDate[1];      
		  $arrStart[] = $fromDate[0]; 
	  }else{
	  	$startDate = '';
	  }
	  if(isset($_POST['endDate']) && !empty($_POST['endDate'])){
		  $eDate = $_POST['endDate']; 
		  $toDate = explode(".", $eDate);
		  $arrEnd[] =  $toDate[2]; 
		  $arrEnd[] =  $toDate[1]; 
		  $arrEnd[] =  $toDate[0]; 
		  $endDate = implode("-",$arrEnd);
	   }else{
	   	$endDate ='';
	   }
	  $startDate = implode("-",$arrStart);
		$startWeek ='';
		$endWeek ='';	
	}else if($type==2){
		 if(isset($_POST['startDate']) && !empty($_POST['startDate'])){
		      $sDate = $_POST['startDate'];
		      $fromDate =explode("-", $sDate);
		      $startWeek = $fromDate[0];
		      $startDate = $fromDate[1]; 
		  }
		  if(isset($_POST['endDate']) && !empty($_POST['endDate'])){
		      $eDate = $_POST['endDate']; 
		      $toDate = explode("-", $eDate);
		      $endWeek =  $toDate[0]; 
		      $endDate =  $toDate[1]; 
		  }
	    }else if($type==3){
	    	 if(isset($_POST['startDate']) && !empty($_POST['startDate'])){
		      $sDate = $_POST['startDate'];
		      $fromDate =explode(".", $sDate);
		      $arrStart[] = $fromDate[1];      
		      $arrStart[] = $fromDate[0];
		      $startDate = implode("-",$arrStart);
		  	 }else{
		  	 	$startDate = '';
		  	 }
		  	 if(isset($_POST['endDate']) && !empty($_POST['endDate'])){
			      $eDate = $_POST['endDate'];
			      $toDate = explode(".", $eDate);
			      $arrEnd[] =  $toDate[1]; //second year input text value
			      $arrEnd[] =  $toDate[0]; //second week selected value
			      $endDate = implode("-",$arrEnd);
		  	  }
		      $startWeek ='';
		      $endWeek ='';
	    }else{
	    	if(isset($_POST['startDate']) && !empty($_POST['startDate'])){
		      $startDate =$_POST['startDate'];
		    }else{
		      $startDate ='';
		    }
		    if(isset($_POST['endDate']) && !empty($_POST['endDate'])){
		      $endDate =$_POST['endDate']; 
		    }else{
		      $endDate ='';
		    }
		    $startWeek ='';
		    $endWeek ='';
	    }
	  //$startDate = implode("-",$arrStart);	 
	  $mstID = $_POST['mstID'];
	  $einheitVal = $_POST['einheitVal'];
      $query = "SELECT * FROM masseneingabeSucheIMw AS T1 ";
	  $query .= "LEFT JOIN interneMesswerteConfig AS T2 ";
	  $query .= "ON T1.mst_ID = T2.mst_ID ";
	  $query .= "WHERE T1.type = '$type' ";
	  $query .= "AND T2.unt_ID != '$einheitVal' ";
	  $query .= "AND T1.mst_ID = '$mstID' ";
	  $query .= "AND T1.on_date >= '$startDate' ";
	  $query .= "AND T1.on_week >= '$startWeek' ";
	  if(!empty($endDate)){
      $query .= "AND T1.on_week <= '$endWeek' ";
	  $query .= "AND T1.on_date <= '$endDate' ";
	  }
  
}else if($id == 'startEndDatecontrolSysTypeCheckValidation'){
	//print_r($_POST);die;

	$mstID = $_POST['mstID'];
	$controlSystem = $_POST['controlSystem'];
	$type = $_POST['type'];
	if($type==1){
	  if(isset($_POST['startDate']) && !empty($_POST['startDate'])){
	  	  $sDate = $_POST['startDate'];
		  $fromDate =explode(".", $sDate);      
		  $arrStart[] = $fromDate[2];
		  $arrStart[] = $fromDate[1];      
		  $arrStart[] = $fromDate[0]; 
	  }else{
	  	$startDate = '';
	  }
	  if(isset($_POST['endDate']) && !empty($_POST['endDate'])){
		  $eDate = $_POST['endDate']; 
		  $toDate = explode(".", $eDate);
		  $arrEnd[] =  $toDate[2]; 
		  $arrEnd[] =  $toDate[1]; 
		  $arrEnd[] =  $toDate[0]; 
		  $endDate = implode("-",$arrEnd);
	   }else{
	   	$endDate ='';
	   }
	  $startDate = implode("-",$arrStart);
		$startWeek ='';
		$endWeek ='';	
	}else if($type==2){
		 if(isset($_POST['startDate']) && !empty($_POST['startDate'])){
		      $sDate = $_POST['startDate'];
		      $fromDate =explode("-", $sDate);
		      $startWeek = $fromDate[0];
		      $startDate = $fromDate[1]; 
		  }
		  if(isset($_POST['endDate']) && !empty($_POST['endDate'])){
		      $eDate = $_POST['endDate']; 
		      $toDate = explode("-", $eDate);
		      $endWeek =  $toDate[0]; 
		      $endDate =  $toDate[1]; 
		  }
	    }else if($type==3){
	    	 if(isset($_POST['startDate']) && !empty($_POST['startDate'])){
		      $sDate = $_POST['startDate'];
		      $fromDate =explode(".", $sDate);
		      $arrStart[] = $fromDate[1];      
		      $arrStart[] = $fromDate[0];
		      $startDate = implode("-",$arrStart);
		  	 }else{
		  	 	$startDate = '';
		  	 }
		  	 if(isset($_POST['endDate']) && !empty($_POST['endDate'])){
			      $eDate = $_POST['endDate'];
			      $toDate = explode(".", $eDate);
			      $arrEnd[] =  $toDate[1]; //second year input text value
			      $arrEnd[] =  $toDate[0]; //second week selected value
			      $endDate = implode("-",$arrEnd);
		  	  }
		      $startWeek ='';
		      $endWeek ='';
	    }else{
	    	if(isset($_POST['startDate']) && !empty($_POST['startDate'])){
		      $startDate =$_POST['startDate'];
		    }else{
		      $startDate ='';
		    }
		    if(isset($_POST['endDate']) && !empty($_POST['endDate'])){
		      $endDate =$_POST['endDate']; 
		    }else{
		      $endDate ='';
		    }
		    $startWeek ='';
		    $endWeek ='';
	    }
	$query = "SELECT * FROM masseneingabeSucheIMw AS T1 ";
	$query .= "LEFT JOIN interneMesswerteConfig AS T2 ";
	$query .= "ON T1.mst_ID = T2.mst_ID ";
	$query .= "WHERE T1.type = '$type' ";
	$query .= "AND T2.einheitControlSys != '$controlSystem' ";
	$query .= "AND T1.mst_ID = '$mstID' ";
	$query .= "AND T1.on_date >= '$startDate' ";
	$query .= "AND T1.on_week >= '$startWeek' ";
	if(!empty($endDate)){
    $query .= "AND T1.on_week <= '$endWeek' ";
	$query .= "AND T1.on_date <= '$endDate' ";
	}
}
if($id == 'masseneingabeSearch'){
	$records['query1'] = queryDB($conn, $query1, "read");
	$records['query2'] = queryDB($conn, $query2, "read");
	$records['query3'] = queryDB($conn, $query3, "read");
	//$records['query4'] = queryDB($conn, $query4, "read");
	echo json_encode($records, JSON_INVALID_UTF8_IGNORE);	
}else if($id == 'masseneingabeAlertRangeMinMax'){
    //echo $query1;echo $query2;die;
	$records['values'] = queryDB($conn, $query1, "read");
	//$records['max'] = queryDB($conn, $query2, "read");
	$records['lastDBDates'] = queryDB($conn, $query2, "read");
	echo json_encode($records, JSON_INVALID_UTF8_IGNORE);	
}else if($id == 'masseneingabeAlertRangeLastInptValue'){
	/*echo  $query1;echo  $query2;die;*/
	$records['top'] = queryDB($conn, $query1, "read");
	$records['bottom'] = queryDB($conn, $query2, "read");
	echo json_encode($records, JSON_INVALID_UTF8_IGNORE);	
}else if($id == 'startDateRangeCheckValidation'){
  $records = queryDB($conn, $query, "read");
  echo json_encode($records, JSON_INVALID_UTF8_IGNORE); 
}else if($id == 'startEndDateEinheitTypeCheckValidation'){
  $records = queryDB($conn, $query, "read");
  echo json_encode($records, JSON_INVALID_UTF8_IGNORE); 
}else if($id == 'startEndDatecontrolSysTypeCheckValidation'){
	//echo $query;die;
  $records = queryDB($conn, $query, "read");
  echo json_encode($records, JSON_INVALID_UTF8_IGNORE); 
}else{
	$records= queryDB($conn, $query, "read");
	echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
}
?>