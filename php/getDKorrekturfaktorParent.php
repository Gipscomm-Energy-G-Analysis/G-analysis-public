<?php

error_reporting(-1);
ini_set ('display_errors', 'On');

require 'DbOperations.php';

$nameDB = $_POST['nameDB'];
$conn = connectToDB($nameDB);

if(isset($_POST['dKff_id']) && !empty($_POST['dKff_id'])){
	$query = "SELECT * FROM dynamischeKorrekturFaktoren WHERE deleted='false' AND dKff_id='".$_POST['dKff_id']."'";
}else{
	$query = "SELECT * FROM dynamischeKorrekturFaktoren WHERE deleted='false'";
}
$records = queryDB($conn, $query, "read");

echo json_encode($records, JSON_INVALID_UTF8_IGNORE);

?>