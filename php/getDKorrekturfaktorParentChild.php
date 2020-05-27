<?php

error_reporting(-1);
ini_set ('display_errors', 'On');

require 'DbOperations.php';

$nameDB = $_POST['nameDB'];
$conn = connectToDB($nameDB);
//print_r($_POST);die;
if(isset($_POST['key']) && !empty($_POST['key']) && $_POST['key'] == 'DkFeNext'){
	 $nextQuery = "SELECT TOP 1 * FROM dynamischeKorrekturFaktoren WHERE dKff_id >".$_POST['id']." AND  deleted='false' ORDER BY dKff_id ASC";
	$record = queryDB($conn, $nextQuery, "read");

}else if(isset($_POST['key']) && !empty($_POST['key']) && $_POST['key'] == 'DkFePrevious'){
	$previousQuery = "SELECT TOP 1 * FROM dynamischeKorrekturFaktoren WHERE dKff_id <".$_POST['id']." AND  deleted='false' ORDER BY dKff_id DESC";

	$record = queryDB($conn, $previousQuery, "read");
	
}else if(isset($_POST['key']) && !empty($_POST['key']) && $_POST['key'] == 'DkFeLast'){
	$lastQuery = "SELECT TOP 1 * FROM dynamischeKorrekturFaktoren WHERE deleted='false' ORDER BY dKff_id DESC";

	$record = queryDB($conn, $lastQuery, "read");
	
}else if(isset($_POST['key']) && !empty($_POST['key']) && $_POST['key'] == 'DkFeFirst'){
	$firstQuery = "SELECT TOP 1 * FROM dynamischeKorrekturFaktoren WHERE deleted='false' ORDER BY dKff_id ASC";

	$record = queryDB($conn, $firstQuery, "read");
	
}else{
	$query = "SELECT * FROM dynamischeKorrekturFaktoren WHERE dKff_id = (SELECT max(dKff_id) FROM dynamischeKorrekturFaktoren) AND  deleted='false'";

	$record = queryDB($conn, $query, "read");
}

//print_r($records);
//$records = array('parent_record' => $record);
echo json_encode($record, JSON_INVALID_UTF8_IGNORE);

?>