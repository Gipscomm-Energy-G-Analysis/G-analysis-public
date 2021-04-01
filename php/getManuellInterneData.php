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
		/*new-mm-start 26-03-2021*/
		$query = "SELECT TOP 1 T1.mst_ID AS T1_mst_ID,* FROM MessstellenAnlagen As T1 ";
		/*new-mm-end 26-03-2021*/
		$query .= "LEFT JOIN interneMesswerteConfig AS T2 ";
		$query .= "ON T1.mst_ID = T2.mst_ID ";
		$query .= "WHERE T1.messartMst = 'manuell' ";
		$query .= "AND T1.deleted <> 'true' ";
		$query .= "AND T1.mst_ID >".$_POST['mst_ID']." ";
		/*new-mm-start 26-03-2021*/
		$query .= "AND T1.typ = 'energiedaten' ";
		/*new-mm-end 26-03-2021*/
		$query .= "ORDER BY T1.mst_ID ASC";

	}else if(isset($_POST['key']) && !empty($_POST['key']) && $_POST['key'] == 'intBdeIMwPreviousMst'){
		/*new-mm-start 26-03-2021*/
		$query = "SELECT TOP 1 T1.mst_ID AS T1_mst_ID,* FROM MessstellenAnlagen As T1 ";
		/*new-mm-end 26-03-2021*/
		$query .= "LEFT JOIN interneMesswerteConfig AS T2 ";
		$query .= "ON T1.mst_ID = T2.mst_ID ";
		$query .= "WHERE T1.messartMst = 'manuell' ";
		$query .= "AND T1.deleted <> 'true' ";
		$query .= "AND T1.mst_ID <".$_POST['mst_ID']." ";
		/*new-mm-start 26-03-2021*/
		$query .= "AND T1.typ = 'energiedaten' ";
		/*new-mm-end 26-03-2021*/
		$query .= "ORDER BY T1.mst_ID DESC";

	}else if(isset($_POST['key']) && !empty($_POST['key']) && $_POST['key'] == 'intBdeIMwLastMst'){
		/*new-mm-start 26-03-2021*/
		$query = "SELECT TOP 1 T1.mst_ID AS T1_mst_ID,* FROM MessstellenAnlagen As T1 ";
		/*new-mm-end 26-03-2021*/
		$query .= "LEFT JOIN interneMesswerteConfig AS T2 ";
		$query .= "ON T1.mst_ID = T2.mst_ID ";
		$query .= "WHERE T1.messartMst = 'manuell' ";
		$query .= "AND T1.deleted <> 'true' ";
		/*new-mm-start 26-03-2021*/
		$query .= "AND T1.typ = 'energiedaten' ";
		/*new-mm-end 26-03-2021*/
		$query .= "ORDER BY T1.mst_ID DESC";

	}else if(isset($_POST['key']) && !empty($_POST['key']) && $_POST['key'] == 'intBdeIMwFirstMst'){
		/*new-mm-start 26-03-2021*/
		$query = "SELECT TOP 1 T1.mst_ID AS T1_mst_ID,* FROM MessstellenAnlagen As T1 ";
		/*new-mm-end 26-03-2021*/
		$query .= "LEFT JOIN interneMesswerteConfig AS T2 ";
		$query .= "ON T1.mst_ID = T2.mst_ID ";
		$query .= "WHERE T1.messartMst = 'manuell' ";
		$query .= "AND T1.deleted <> 'true' ";
		/*new-mm-start 26-03-2021*/
		$query .= "AND T1.typ = 'energiedaten' ";
		/*new-mm-end 26-03-2021*/
		$query .= "ORDER BY T1.mst_ID ASC";

	}
}
/*17-03-2021*/
/*new-mm-start 24-03-2021*/
elseif($id == 'intBdePrdktIMw'){
	if(isset($_POST['key']) && !empty($_POST['key']) && $_POST['key'] == 'intBdePrdktIMwNextMst'){

	    $query  = " SELECT TOP 1 * ";
	    $query .= " FROM produktionsAnlagenMoreOpt AS T1 ";
	    $query .= " LEFT JOIN produkte AS T2 ";
		$query .= " ON T1.prd_ID = T2.prd_ID ";
		$query .= " LEFT JOIN anlagen AS T3 ";
	    $query .= " ON T1.anl_id =  T3.anl_ID";
	    $query .= " LEFT JOIN produktionsAnlagenConfig AS T4 ";
		$query .= " ON T1.prd_ID = T4.prd_ID ";
		$query .= " AND T1.anl_id = T4.anl_id";
		$query .= " AND T1.anl_col = T4.anl_col";
		$query .= " WHERE T1.Type = '2' ";
		$query .= " AND T1.id > ".$_POST['iBdePrdktConf_ID']." ";
        $query .= "ORDER BY T1.id ASC";
	    //echo $query;die();

	}else if(isset($_POST['key']) && !empty($_POST['key']) && $_POST['key'] == 'intBdePrdktIMwPreviousMst'){

	    $query  = " SELECT TOP 1 * ";
	    $query .= " FROM produktionsAnlagenMoreOpt AS T1 ";
	    $query .= " LEFT JOIN produkte AS T2 ";
		$query .= " ON T1.prd_ID = T2.prd_ID ";
		$query .= " LEFT JOIN anlagen AS T3 ";
	    $query .= " ON T1.anl_id =  T3.anl_ID";
	    $query .= " LEFT JOIN produktionsAnlagenConfig AS T4 ";
		$query .= " ON T1.prd_ID = T4.prd_ID ";
		$query .= " AND T1.anl_id = T4.anl_id";
		$query .= " AND T1.anl_col = T4.anl_col";
		$query .= " WHERE T1.Type = '2' ";
		$query .= " AND T1.id < ".$_POST['iBdePrdktConf_ID']." ";
        $query .= "ORDER BY T1.id DESC";
	   // echo $query;die();

	}else if(isset($_POST['key']) && !empty($_POST['key']) && $_POST['key'] == 'intBdePrdktIMwLastMst'){

		$query  = " SELECT TOP 1 * ";
	    $query .= " FROM produktionsAnlagenMoreOpt AS T1 ";
	    $query .= " LEFT JOIN produkte AS T2 ";
		$query .= " ON T1.prd_ID = T2.prd_ID ";
		$query .= " LEFT JOIN anlagen AS T3 ";
	    $query .= " ON T1.anl_id =  T3.anl_ID";
	    $query .= " LEFT JOIN produktionsAnlagenConfig AS T4 ";
		$query .= " ON T1.prd_ID = T4.prd_ID ";
		$query .= " AND T1.anl_id = T4.anl_id";
		$query .= " AND T1.anl_col = T4.anl_col";
		$query .= " WHERE T1.Type = '2' ";
        $query .= " ORDER BY T1.id DESC";
	    //echo $query;die();

	}else if(isset($_POST['key']) && !empty($_POST['key']) && $_POST['key'] == 'intBdePrdktIMwFirstMst'){

	    $query  = " SELECT TOP 1 * ";
	    $query .= " FROM produktionsAnlagenMoreOpt AS T1 ";
	    $query .= " LEFT JOIN produkte AS T2 ";
		$query .= " ON T1.prd_ID = T2.prd_ID ";
		$query .= " LEFT JOIN anlagen AS T3 ";
	    $query .= " ON T1.anl_id =  T3.anl_ID";
	    $query .= " LEFT JOIN produktionsAnlagenConfig AS T4 ";
		$query .= " ON T1.prd_ID = T4.prd_ID ";
		$query .= " AND T1.anl_id = T4.anl_id ";
		$query .= " AND T1.anl_col = T4.anl_col ";
		$query .= " WHERE T1.Type = '2' ";
        $query .= " ORDER BY T1.id ASC";

       

        //echo $query;die();


	}
}
elseif($id == 'intBdeMesssetelleIMw'){
	if(isset($_POST['key']) && !empty($_POST['key']) && $_POST['key'] == 'intBdePrdktIMwNextMst'){

        $query  = " SELECT TOP 1 T1.mst_ID AS T1_mst_ID,* ";
	    $query .= " FROM MessstellenAnlagen AS T1 ";
	    $query .= " LEFT JOIN produktionsAnlagenConfig AS T2 ";
		$query .= " ON T1.mst_ID = T2.mst_ID ";
		$query .= " LEFT JOIN intervalType AS T3 ";
		$query .= " ON T2.intTp_ID = T3.intTp_ID ";
		$query .= " WHERE T1.typ = 'betriebsdaten' ";
	    $query .= " AND T1.deleted <> 'true' ";
		$query .= " AND T1.messartMst = 'manuell' ";
		$query .= " AND T1.mst_ID >".$_POST['iBdePrdktConf_ID']." ";
        $query .= " ORDER BY T1.mst_ID ASC";

	    //echo $query;die();

	}else if(isset($_POST['key']) && !empty($_POST['key']) && $_POST['key'] == 'intBdePrdktIMwPreviousMst'){


        $query  = " SELECT TOP 1 T1.mst_ID AS T1_mst_ID,* ";
	    $query .= " FROM MessstellenAnlagen AS T1 ";
	    $query .= " LEFT JOIN produktionsAnlagenConfig AS T2 ";
		$query .= " ON T1.mst_ID = T2.mst_ID ";
		$query .= " LEFT JOIN intervalType AS T3 ";
		$query .= " ON T2.intTp_ID = T3.intTp_ID ";
		$query .= " WHERE T1.typ = 'betriebsdaten' ";
	    $query .= " AND T1.deleted <> 'true' ";
		$query .= " AND T1.messartMst = 'manuell' ";
		$query .= " AND T1.mst_ID <".$_POST['iBdePrdktConf_ID']." ";
        $query .= " ORDER BY T1.mst_ID DESC";
	    //echo $query;die();

	}else if(isset($_POST['key']) && !empty($_POST['key']) && $_POST['key'] == 'intBdePrdktIMwLastMst'){

	    $query  = " SELECT TOP 1 T1.mst_ID AS T1_mst_ID,* ";
	    $query .= " FROM MessstellenAnlagen AS T1 ";
	    $query .= " LEFT JOIN produktionsAnlagenConfig AS T2 ";
		$query .= " ON T1.mst_ID = T2.mst_ID ";
		$query .= " LEFT JOIN intervalType AS T3 ";
		$query .= " ON T2.intTp_ID = T3.intTp_ID ";
		$query .= " WHERE T1.typ = 'betriebsdaten' ";
	    $query .= " AND T1.deleted <> 'true' ";
		$query .= " AND T1.messartMst = 'manuell' ";
        $query .= " ORDER BY T1.mst_ID DESC";
	    //echo $query;die();

	}else if(isset($_POST['key']) && !empty($_POST['key']) && $_POST['key'] == 'intBdePrdktIMwFirstMst'){


	    $query  = " SELECT TOP 1 T1.mst_ID AS T1_mst_ID,* ";
	    $query .= " FROM MessstellenAnlagen AS T1 ";
	    $query .= " LEFT JOIN produktionsAnlagenConfig AS T2 ";
		$query .= " ON T1.mst_ID = T2.mst_ID ";
		$query .= " LEFT JOIN intervalType AS T3 ";
		$query .= " ON T2.intTp_ID = T3.intTp_ID ";
		$query .= " WHERE T1.typ = 'betriebsdaten' ";
	    $query .= " AND T1.deleted <> 'true' ";
		$query .= " AND T1.messartMst = 'manuell' ";
        $query .= " ORDER BY T1.mst_ID ASC";


        //echo $query;die();

	}
}
/*new-mm-end 24-03-2021*/

elseif($id == 'KeinZeitintervallTbl'){

	   $typ = $_POST['typ'];
	   /*new-mm-start 26-03-2021*/
	   $query = "SELECT T1.mst_ID AS T1_mst_ID, * FROM MessstellenAnlagen AS T1 ";
	   /*new-mm-end 26-03-2021*/
	   $query .= "LEFT JOIN interneMesswerteConfig AS T2 ";
	   $query .= "ON T1.mst_ID = T2.mst_ID ";
	   $query .= "LEFT JOIN iMwUnits AS T3 ";
	   $query .= "ON T3.unt_ID = T2.unt_ID ";
	   $query .= "LEFT JOIN intervalType AS T4 ";
	   $query .= "ON T4.intTp_ID = T2.intTp_ID ";
	   $query .= "WHERE T1.deleted <> 'true' ";
	   $query .= "AND T1.messartMst = 'manuell' ";
	   $query .= "AND T1.typ = '$typ' ";
	   /*new-mm-start 26-03-2021*/
	   $query .= " ORDER BY T1.mst_ID ASC";
	   /*new-mm-end 26-03-2021*/
       
	     /*last-mm*/

}
elseif($id == 'MesssetelleTbl'){

	   $typ = $_POST['typ'];

	   $query = "SELECT T1.mst_ID AS T1_mst_ID, T1.nameMSt AS T1_nameMSt,T1.anlageMst AS T1_anlageMst, * FROM MessstellenAnlagen AS T1 ";
	   //$query = "SELECT * FROM MessstellenAnlagen AS T1 ";
	   $query .= "LEFT JOIN produktionsAnlagenConfig AS T2 ";
	   $query .= "ON T1.mst_ID = T2.mst_ID ";
	   //$query .= "ON T1.mst_ID AS T1_mst_ID = T2.mst_ID AS T2_mst_ID ";
	   $query .= "LEFT JOIN iMwUnits AS T3 ";
	   $query .= "ON T2.unt_ID = T3.unt_ID ";
	   $query .= "LEFT JOIN intervalType AS T4 ";
	   $query .= "ON T2.intTp_ID = T4.intTp_ID ";
	   $query .= "WHERE T1.deleted <> 'true' ";
	   $query .= "AND T1.messartMst = 'manuell' ";
	   $query .= "AND T1.typ = '$typ' ";
	   //echo $query;die();

}elseif($id == 'SearchKeinZeitintervallTbl'){
	   /*new-mm-start*/
	   $checkboxSearch = $_POST['checkboxSearch'];
	   $typ = $_POST['typ'];
	   if($checkboxSearch == 1){
	   	   /*new-mm-start 26-03-2021*/
		   $query = "SELECT T1.mst_ID AS T1_mst_ID,* FROM MessstellenAnlagen AS T1 ";
		   /*new-mm-end 26-03-2021*/
		   $query .= "LEFT JOIN interneMesswerteConfig AS T2 ";
		   $query .= "ON T1.mst_ID = T2.mst_ID ";
		   $query .= "LEFT JOIN iMwUnits AS T3 ";
		   $query .= "ON T3.unt_ID = T2.unt_ID ";
		   $query .= "LEFT JOIN intervalType AS T4 ";
		   $query .= "ON T4.intTp_ID = T2.intTp_ID ";
		   $query .= "WHERE T1.deleted <> 'true' ";
		   $query .= "AND T1.messartMst = 'manuell' ";
		   $query .= "AND T1.typ = '$typ' ";
		   /*new-mm-start 26-03-2021*/
	       $query .= " ORDER BY T1.mst_ID ASC";
	       /*new-mm-end 26-03-2021*/
		   //echo $query;die();
		}
		elseif($checkboxSearch == 2){
		   /*new-mm-start 26-03-2021*/
		   $query = "SELECT T1.mst_ID AS T1_mst_ID,* FROM MessstellenAnlagen AS T1 ";
		   /*new-mm-end 26-03-2021*/
		   $query .= "LEFT JOIN interneMesswerteConfig AS T2 ";
		   $query .= "ON T1.mst_ID = T2.mst_ID ";
		   $query .= "LEFT JOIN iMwUnits AS T3 ";
		   $query .= "ON T3.unt_ID = T2.unt_ID ";
		   $query .= "LEFT JOIN intervalType AS T4 ";
		   $query .= "ON T4.intTp_ID = T2.intTp_ID ";
		   $query .= "WHERE T1.deleted <> 'true' ";
		   $query .= "AND T1.messartMst = 'manuell' ";
		   $query .= "AND T1.typ = '$typ' ";
		   $query .= "AND NULLIF(T2.startDate,'') IS NOT NULL ";
		   /*new-mm-start 26-03-2021*/
	       $query .= " ORDER BY T1.mst_ID ASC";
	       /*new-mm-end 26-03-2021*/
		   /*WHERE NULLIF(x,'') IS NOT NULL
			AND NULLIF(y,'') IS NOT NULL
			AND NULLIF(z,'') IS NOT NULL*/
		}
		elseif($checkboxSearch == 3){
		   /*new-mm-start 26-03-2021*/
		   $query = "SELECT T1.mst_ID AS T1_mst_ID,* FROM MessstellenAnlagen AS T1 ";
		   /*new-mm-end 26-03-2021*/
		   $query .= "LEFT JOIN interneMesswerteConfig AS T2 ";
		   $query .= "ON T1.mst_ID = T2.mst_ID ";
		   $query .= "LEFT JOIN iMwUnits AS T3 ";
		   $query .= "ON T3.unt_ID = T2.unt_ID ";
		   $query .= "LEFT JOIN intervalType AS T4 ";
		   $query .= "ON T4.intTp_ID = T2.intTp_ID ";
		   $query .= "WHERE T1.deleted <> 'true' ";
		   $query .= "AND T1.messartMst = 'manuell' ";
		   $query .= "AND T1.typ = '$typ' ";
		   $query .= "AND NULLIF(T2.startDate,'') IS NULL ";
		   /*new-mm-start 26-03-2021*/
	       $query .= " ORDER BY T1.mst_ID ASC";
	       /*new-mm-end 26-03-2021*/
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

			/*new-mm-start 25-03-2021*/ 
			/*use for show only energiedaten type*/
			$query1 .= "AND T1.typ = 'energiedaten' ";
			/*new-mm-end 25-03-2021*/

			$query1 .= "AND ((T2.startDate >= '$startDate' AND T2.startDate <= '$endDate') OR (T2.endDate >= '$startDate' AND T2.endDate <= '$endDate') OR (T2.startDate <= '$startDate' AND T2.endDate >= '$endDate') OR (T2.startDate <= '$startDate' AND T2.endDate =''))";
			$query1 .= "AND T2.intTp_ID = '$zeitintervallAnl' ";
			$query1 .= "ORDER BY T1.mst_ID ASC";

			$query2 = "SELECT * FROM masseneingabeSucheIMw ";
			$query2 .= "WHERE type = '$zeitintervallAnl' ";

			$query3 = "SELECT * FROM masseneingabeSucheErgebnisIMw ";
			$query3 .= "WHERE type = '$zeitintervallAnl' ";

			//$query4 = "SELECT COUNT(id) AS inputCountVal FROM masseneingabeSucheErgebnisIMw ";
			//$query4 .= "WHERE type = '$zeitintervallAnl' ";

}
/*new-mm-start 01-04-2021*/
elseif($id == 'masseneingabePrdktSearch'){
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

			/*new-mm-start 25-03-2021*/ 
			/*use for show only energiedaten type*/
			$query1 .= "AND T1.typ = 'energiedaten' ";
			/*new-mm-end 25-03-2021*/

			$query1 .= "AND ((T2.startDate >= '$startDate' AND T2.startDate <= '$endDate') OR (T2.endDate >= '$startDate' AND T2.endDate <= '$endDate') OR (T2.startDate <= '$startDate' AND T2.endDate >= '$endDate') OR (T2.startDate <= '$startDate' AND T2.endDate =''))";
			$query1 .= "AND T2.intTp_ID = '$zeitintervallAnl' ";
			$query1 .= "ORDER BY T1.mst_ID ASC";

			$query2 = "SELECT * FROM masseneingabeSucheIMw ";
			$query2 .= "WHERE type = '$zeitintervallAnl' ";

			$query3 = "SELECT * FROM masseneingabeSucheErgebnisIMw ";
			$query3 .= "WHERE type = '$zeitintervallAnl' ";

			//$query4 = "SELECT COUNT(id) AS inputCountVal FROM masseneingabeSucheErgebnisIMw ";
			//$query4 .= "WHERE type = '$zeitintervallAnl' ";

}
/*new-mm-end 01-04-2021*/
/* masseneingabe Page  Messsetelle Inputs Search */
/*new-mm-start 31-03-2021*/
elseif($id == 'masseneingabeMesssetelleSearch'){
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
			$query1 .= "LEFT JOIN produktionsAnlagenConfig AS T2 ";
			$query1 .= "ON T1.mst_ID = T2.mst_ID ";
			$query1 .= "WHERE T1.messartMst = 'manuell' ";
			$query1 .= "AND T1.deleted <> 'true' ";

			/*use for show only betriebsdaten type*/
			$query1 .= "AND T1.typ = 'betriebsdaten' ";


			$query1 .= "AND ((T2.startDate >= '$startDate' AND T2.startDate <= '$endDate') OR (T2.endDate >= '$startDate' AND T2.endDate <= '$endDate') OR (T2.startDate <= '$startDate' AND T2.endDate >= '$endDate') OR (T2.startDate <= '$startDate' AND T2.endDate =''))";
			$query1 .= "AND T2.intTp_ID = '$zeitintervallAnl' ";
			$query1 .= "ORDER BY T1.mst_ID ASC";

			$query2 = "SELECT * FROM masseneingabeSucheIMw ";
			$query2 .= "WHERE type = '$zeitintervallAnl' ";

			$query3 = "SELECT * FROM masseneingabeSucheErgebnisIMw ";
			$query3 .= "WHERE type = '$zeitintervallAnl' ";

			//$query4 = "SELECT COUNT(id) AS inputCountVal FROM masseneingabeSucheErgebnisIMw ";
			//$query4 .= "WHERE type = '$zeitintervallAnl' ";

}
/*new-mm-end 31-03-2021*/

elseif($id == 'masseneingabeAlertRangeMinMax'){
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
}elseif($id == 'ProdukteTbl'){
	    $query  = "SELECT DISTINCT prd_ID,ca.[col] as anl_Col, ca.[id] as anl_ID, namePrd,artikelNrPrd,anlagen.[bezeichnungAnl]";
	    $query .= " FROM produkte";
	    $query .= " CROSS APPLY (";
        $query .= " Values  ('anl01_ID' , anl01_ID),('anl02_ID' , anl02_ID),('anl03_ID' , anl03_ID),";
        $query .= "         ('anl04_ID' , anl04_ID),('anl05_ID' , anl05_ID),('anl06_ID' , anl06_ID),";
		$query .= "         ('anl07_ID' , anl07_ID),('anl08_ID' , anl08_ID),('anl09_ID' , anl09_ID)";
        $query .= " )AS CA (col, id)";
        $query .= " LEFT JOIN anlagen ON ca.[id] =  anlagen.anl_ID";
        $query .= " Where anl_ID != 0";

}
/*new-mm-start 25-03-2021*/
elseif($id == 'ProdukteAnlDataTbl'){

	$query = "SELECT DISTINCT T1.prd_id,T1.anl_col,T1.anl_id,T1.type ,T2.namePrd,T2.artikelNrPrd,T3.bezeichnungAnl,T1.id FROM produktionsAnlagenMoreOpt As T1";
	$query .= " LEFT JOIN produkte AS T2 ON T1.prd_id = T2.prd_ID";
    $query .= " LEFT JOIN anlagen AS T3 ON T1.anl_id = T3.anl_ID";
    $query .= " WHERE T1.type = 2";
    //echo $query;die();
}
/*new-mm-start 25-03-2021*/
elseif($id == 'displayDataPrdkt'){

	    $Prd_Id = $_POST['Prd_Id'];
	    $Anl_Col = $_POST['Anl_Col'];
	    $Anl_Id = $_POST['Anl_Id'];

	    $query  = " SELECT namePrd, artikelNrPrd , anlagen.[bezeichnungAnl] ";
	    $query .= " FROM produkte";
	    $query .= " LEFT JOIN anlagen ON $Anl_Id =  anlagen.anl_ID";
	    $query .= " WHERE prd_ID = $Prd_Id ";
        $query .= " AND $Anl_Col = $Anl_Id ";
}
elseif($id == 'displayDataPrdktAnlage'){

	    $Prd_Id = $_POST['Prd_Id'];
	    $Anl_Col = $_POST['Anl_Col'];
	    $Anl_Id = $_POST['Anl_Id'];

	    //$query  = " SELECT namePrd , artikelNrPrd , T3.[bezeichnungAnl] , T2.[mstIMw] ";
        $query  = " SELECT * ";
	    $query .= " FROM produkte AS T1 ";
	    $query .= " LEFT JOIN produktionsAnlagenConfig AS T2 ";
		$query .= " ON T1.prd_ID = T2.prd_ID ";
		$query .= " AND T1.$Anl_Col = T2.anl_id";
		//$query .= " AND $Anl_Col = T2.anl_Col ";
	    $query .= " LEFT JOIN anlagen AS T3 ";
	    $query .= " ON T3.anl_ID =  $Anl_Id";

	    $query .= " WHERE T1.prd_ID = $Prd_Id ";
        $query .= "ORDER BY T2.iBdePrdktConf_ID ASC";
	    // $query .= " AND T2.prd_id = $Prd_Id ";
        // $query .= " AND T2.anl_col = '$Anl_Col' ";
        // $query .= " AND T2.anl_id = $Anl_Id ";
        //echo $query;die();
}
elseif($id == 'displayDataMesssetelle'){

		$iBdeType = $_POST['iBdeType'];
		$mst_ID = $_POST['mst_ID'];
		$typ = $_POST['typ'];
		// $query = "SELECT * FROM produktionsAnlagenConfig ";
		// $query .= "WHERE mst_ID  = '$mst_ID' AND iBdeType = '$iBdeType' ";

	   	$query  = " SELECT * FROM MessstellenAnlagen AS T1 ";
		$query .= " LEFT JOIN produktionsAnlagenConfig AS T2 ";
		$query .= " ON T1.mst_ID = T2.mst_ID ";
		// $query .= "LEFT JOIN iMwUnits AS T3 ";
		// $query .= "ON T2.unt_ID = T3.unt_ID ";
		$query .= " LEFT JOIN intervalType AS T4 ";
		$query .= " ON T2.intTp_ID = T4.intTp_ID ";
		//$query .= "WHERE T1.deleted <> 'true' ";
		//$query .= "AND T1.messartMst = 'manuell' ";
		//$query .= "AND T1.typ = '$typ' ";
		$query .= " WHERE T1.typ = '$typ' ";
	    $query .= " AND T1.mst_ID = '$mst_ID' ";
        $query .= " AND T2.iBdeType = '$iBdeType' ";
        $query .= "ORDER BY T2.iBdePrdktConf_ID DESC";
	    //echo $query ;die();
}
if($id == 'masseneingabeSearch'){
	$records['query1'] = queryDB($conn, $query1, "read");
	$records['query2'] = queryDB($conn, $query2, "read");
	$records['query3'] = queryDB($conn, $query3, "read");
	//$records['query4'] = queryDB($conn, $query4, "read");
	echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
}
/*new-mm-start 01-04-2021*/
elseif($id == 'masseneingabePrdktSearch'){
	$records['query1'] = queryDB($conn, $query1, "read");
	$records['query2'] = queryDB($conn, $query2, "read");
	$records['query3'] = queryDB($conn, $query3, "read");
	//$records['query4'] = queryDB($conn, $query4, "read");
	echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
}
/*new-mm-end 01-04-2021*/
/*new-mm-start 31-03-2021*/
else if($id == 'masseneingabeMesssetelleSearch'){
	$records['query1'] = queryDB($conn, $query1, "read");
	$records['query2'] = queryDB($conn, $query2, "read");
	$records['query3'] = queryDB($conn, $query3, "read");
	//$records['query4'] = queryDB($conn, $query4, "read");
	echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
}
/*new-mm-end 31-03-2021*/
else if($id == 'masseneingabeAlertRangeMinMax'){
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
