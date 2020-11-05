<?php

error_reporting(-1);
ini_set ('display_errors', 'On');

require 'DbOperations.php';

$nameDB = $_POST['nameDB'];
$conn = connectToDB($nameDB);

$id = $_POST['id'];

/*if ($id == "Suchen") {
  $query = "SELECT * FROM anlagen ";
  $query .= "WHERE zeitintervallAnl  <> 0 ";
  $query .= "AND deleted <> 1 ";
}else*/
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
		/* $query = "SELECT TOP 1 * FROM MessstellenAnlagen WHERE mst_ID >".$_POST['mst_ID']." AND  deleted='false' ORDER BY mst_ID ASC";*/
		//$record = queryDB($conn, $nextQuery, "read");
		$query = "SELECT TOP 1 * FROM MessstellenAnlagen As T1 ";
		  $query .= "LEFT JOIN interneMesswerteConfig AS T2 ";
		  $query .= "ON T1.mst_ID = T2.mst_ID ";
		  $query .= "WHERE T1.messartMst = 'manuell' ";
		  $query .= "AND T1.deleted <> 'true' ";
		  $query .= "AND T1.mst_ID >".$_POST['mst_ID']." ";
		  $query .= "ORDER BY T1.mst_ID ASC";

	}else if(isset($_POST['key']) && !empty($_POST['key']) && $_POST['key'] == 'intBdeIMwPreviousMst'){
		/*$query = "SELECT TOP 1 * FROM MessstellenAnlagen WHERE mst_ID <".$_POST['mst_ID']." AND  deleted='false' ORDER BY mst_ID DESC";*/
		//$record = queryDB($conn, $previousQuery, "read");
		$query = "SELECT TOP 1 * FROM MessstellenAnlagen As T1 ";
		  $query .= "LEFT JOIN interneMesswerteConfig AS T2 ";
		  $query .= "ON T1.mst_ID = T2.mst_ID ";
		  $query .= "WHERE T1.messartMst = 'manuell' ";
		  $query .= "AND T1.deleted <> 'true' ";
		  $query .= "AND T1.mst_ID <".$_POST['mst_ID']." ";
		  $query .= "ORDER BY T1.mst_ID DESC";


	}else if(isset($_POST['key']) && !empty($_POST['key']) && $_POST['key'] == 'intBdeIMwLastMst'){
		/*$query = "SELECT TOP 1 * FROM MessstellenAnlagen WHERE deleted='false' ORDER BY mst_ID DESC";*/
		$query = "SELECT TOP 1 * FROM MessstellenAnlagen As T1 ";
		  $query .= "LEFT JOIN interneMesswerteConfig AS T2 ";
		  $query .= "ON T1.mst_ID = T2.mst_ID ";
		  $query .= "WHERE T1.messartMst = 'manuell' ";
		  $query .= "AND T1.deleted <> 'true' ";
		  $query .= "ORDER BY T1.mst_ID DESC";

	    //$record = queryDB($conn, $lastQuery, "read");

	}else if(isset($_POST['key']) && !empty($_POST['key']) && $_POST['key'] == 'intBdeIMwFirstMst'){
		/*$query = "SELECT TOP 1 * FROM MessstellenAnlagen WHERE deleted='false' ORDER BY mst_ID ASC";*/
		//$record = queryDB($conn, $firstQuery, "read");
		  $query = "SELECT TOP 1 * FROM MessstellenAnlagen As T1 ";
		  $query .= "LEFT JOIN interneMesswerteConfig AS T2 ";
		  $query .= "ON T1.mst_ID = T2.mst_ID ";
		  $query .= "WHERE T1.messartMst = 'manuell' ";
		  $query .= "AND T1.deleted <> 'true' ";
		  $query .= "ORDER BY T1.mst_ID ASC";

	}
}elseif($id == 'masseneingabeSearch'){
		$startDate = $_POST['startDate'];
		$endDate = $_POST['endDate'];
		$zeitintervallAnl = $_POST['zeitintervallAnl'];
		$query = "SELECT * FROM MessstellenAnlagen As T1 ";
		$query .= "LEFT JOIN interneMesswerteConfig AS T2 ";
		$query .= "ON T1.mst_ID = T2.mst_ID ";
		$query .= "WHERE T1.messartMst = 'manuell' ";
		$query .= "AND T1.deleted <> 'true' ";
		$query .= "AND T2.startDate >= '$startDate' ";
		$query .= "AND T2.endDate <= '$endDate' ";
		$query .= "AND T2.intTp_ID = '$zeitintervallAnl' ";
		$query .= "ORDER BY T1.mst_ID ASC";
}

//echo $query;die;
$records = queryDB($conn, $query, "read");

echo json_encode($records, JSON_INVALID_UTF8_IGNORE);

?>