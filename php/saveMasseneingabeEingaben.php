<?php

error_reporting(-1);
ini_set ('display_errors', 'On');

require 'DbOperations.php';

$nameDB = $_POST['nameDB'];
$conn = connectToDB($nameDB);

$id = $_POST['key'];

if($id == 'Tage'){
	
}elseif($id == 'Wochen'){

}elseif($id == 'Monate'){
	
}elseif($id == 'Jahre'){
	
}
//echo $query;die;
$records = queryDB($conn, $query, "write");

echo json_encode($records, JSON_INVALID_UTF8_IGNORE);

?>