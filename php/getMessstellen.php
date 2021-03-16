<?php
include('top-cache.php');
error_reporting ( -1 ) ;
ini_set ( 'display_errors', 'On' ) ;

require 'DbOperations.php' ;

$nameDB = $_POST [ 'nameDB' ] ;
$conn = connectToDB ( $nameDB ) ;

$ins = $_POST [ 'ins' ] ;

function messstellenAnlagen ( $berOrLieg, $connLink ) {

	switch ( $berOrLieg ) {
		case "none" :

			$query1  = "SELECT * FROM MessstellenAnlagen " ;
			$query1 .= "WHERE deleted <> 'true' " ;
			break ;
		case "ber" :
			$berID = $_POST [ 'berID' ] ;

			$query1  = "SELECT * FROM MessstellenAnlagen " ;
			$query1 .= "WHERE ber_ID = $berID " ;
			$query1 .= "AND deleted <> 'true' " ;
			break ;
		case "lieg" :
			$liegID = $_POST [ 'liegID' ] ;

			$query1  = "SELECT * FROM MessstellenAnlagen " ;
			$query1 .= "WHERE lieg_ID = $liegID " ;
			$query1 .= "AND deleted <> 'true' " ;
			break ;
		case "liegEnt" :
			$liegID = $_POST [ 'liegID' ] ;
			$energietraeger = $_POST [ 'nameEnt' ] ;

			$query1 = "SELECT * FROM MessstellenAnlagen " ;
			$query1 .= "WHERE energietraegerMst = '$energietraeger' " ;
			$query1 .= "AND deleted <> 'true' " ;
			$query1 .= "AND lieg_ID = '$liegID' " ;
			break ;

		default :
			echo "messstellenAnlagen ( $ berOrLieg ): An invalid argument was passed !" ;
			break ;
	}

	$records1 = queryDB ( $connLink, $query1, "read" ) ;

	return json_encode ( $records1, JSON_INVALID_UTF8_IGNORE ) ;
}

if ( $ins == "vorgelagerteMstE" || $ins == "vorgelagerteMstB") {
	echo messstellenAnlagen( "ber", $conn ) ;
}
elseif ( $ins === "mstSuchenVergl1" || $ins === "mstSuchenVergl1" || $ins == "mstMsm" || $ins == "mstERng" || $ins == "mstDiag1" || $ins == "mstDiag2" || $ins == "mstDiag3" || $ins == "mstCompDiag" || $ins == "mstDatenexport" ) {
	echo messstellenAnlagen( "lieg", $conn ) ;
}
elseif ( $ins == "mst1Anl" || $ins == "mst2Anl" || $ins == "mst3Anl" || $ins == "mst4Anl" ) {
 echo	messstellenAnlagen ( "liegEnt", $conn ) ;
}
elseif ( $ins == "mstZp" ) {
 echo	messstellenAnlagen ( "none", $conn ) ;
}
else {
	if($ins === "mstESuchen"){
		$berID = $_POST [ 'berID' ] ;

		$query = "SELECT * FROM MessstellenAnlagen " ;
		$query .= "WHERE deleted <> 'true' " ;
		$query .= "AND ber_ID = $berID " ;
		$query .= "AND typ = 'energiedaten' " ;
	}
	elseif($ins === "mstBSuchen"){
		$berID = $_POST [ 'berID' ] ;

		$query = "SELECT * FROM MessstellenAnlagen " ;
		$query .= "WHERE deleted <> 'true' " ;
		$query .= "AND ber_ID = $berID " ;
		$query .= "AND typ = 'betriebsdaten' " ;
	}
	elseif($dl = $ins == "mst1ExtDl" || $ins == "mst2ExtDl" || $ins == "mst3ExtDl" || $ins == "mst4ExtDl" || $ins == "mst5ExtDl" || $ins == "mst6ExtDl"){
		$liegID = $_POST [ 'liegID' ] ;

		$query = "SELECT * FROM messstellen " ;
		$query .= "WHERE deleted <> 'true' " ;
	}
	elseif($dl = $ins == "mstEngRes1ExtDl" || $ins == "mstEngRes2ExtDl" || $ins == "mstEngRes3ExtDl" || $ins == "mstEngRes4ExtDl" || $ins == "mstEngRes5ExtDl" || $ins == "mstEngRes6ExtDl"){
		$liegID = $_POST [ 'liegID' ] ;

		$query = "SELECT * FROM messstellen " ;
		$query .= "WHERE deleted <> 'true' " ;
	}

	elseif ($ins == "mstVorlFrm") {
		$orgID = $_POST [ 'orgID' ] ;

		$query = "SELECT * FROM messstellen " ;
		$query .= "INNER JOIN bereiche " ;
		$query .= "ON messstellen.ber_ID = bereiche.ber_ID " ;
		$query .= "INNER JOIN liegenschaften " ;
		$query .= "ON bereiche.lieg_ID = liegenschaften.lieg_ID " ;
		$query .= "WHERE messstellen.deleted <> 'true' " ;
		$query .= "AND org_ID = $orgID " ;
	}

	$records = queryDB ( $conn, $query, "read" ) ;

	echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
}

include('bottom-cache.php');
?>
