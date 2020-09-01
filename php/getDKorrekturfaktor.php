<?php

error_reporting(-1);
ini_set ('display_errors', 'On');

require 'DbOperations.php';

$nameDB = $_POST['nameDB'];
$conn = connectToDB($nameDB);
if(isset($_POST['FaktoreType']) && !empty($_POST['FaktoreType'])  && ($_POST['FaktoreType']==1 || $_POST['FaktoreType']==6 || $_POST['FaktoreType']==4 || $_POST['FaktoreType']==8) ){ 
	if(isset($_POST['dKff_id']) && !empty($_POST['dKff_id'])){
		$query = "SELECT T1.*,T2.*
		FROM dynamischeKorrekturFaktorenOption AS T1
		LEFT JOIN bereiche AS T2		
		ON T1.bereichID = T2.ber_ID 
		WHERE T1.deleted='false'
		AND T1.dKff_id='".$_POST['dKff_id']."'";
	}else{
		$query = "SELECT T1.*,T2.*
		FROM dynamischeKorrekturFaktorenOption AS T1
		LEFT JOIN bereiche AS T2		
		ON T1.bereichID = T2.ber_ID 
		WHERE T1.deleted='false'";
	}
}else if(isset($_POST['FaktoreType']) && !empty($_POST['FaktoreType'])  && ($_POST['FaktoreType']==5 || $_POST['FaktoreType']==9) ){
	if(isset($_POST['dKff_id']) && !empty($_POST['dKff_id'])){
		$query = "SELECT T1.*,T2.*,T3.*,T4.*
		FROM dynamischeKorrekturFaktorenOption AS T1
		LEFT JOIN dynamischeKorrekturFaktorenBasisFaktor AS T2		
		ON T1.dKffOption_id = T2.dKffOption_id 
		LEFT JOIN dynamischeKorrekturFaktorenCalculation AS T3
		ON T3.calculateID = T1.calculateID
		LEFT JOIN bereiche AS T4		
		ON T1.bereichID = T4.ber_ID
		WHERE T1.deleted='false'
		AND T1.dKff_id='".$_POST['dKff_id']."'";
	}else{
		$query = "SELECT T1.*,T2.*,T3.*,T4.*
		FROM dynamischeKorrekturFaktorenOption AS T1
		LEFT JOIN dynamischeKorrekturFaktorenBasisFaktor AS T2		
		ON T1.dKffOption_id = T2.dKffOption_id 
		LEFT JOIN dynamischeKorrekturFaktorenCalculation AS T3
		ON T3.calculateID = T1.calculateID
		LEFT JOIN bereiche AS T4		
		ON T1.bereichID = T4.ber_ID
		WHERE T1.deleted='false'";
	}
}else if(isset($_POST['calcID']) && !empty($_POST['calcID'])  && $_POST['id']=='deleteOrReset' ){
		$query = "SELECT T1.*,T2.*,T3.*,T4.*
		FROM dynamischeKorrekturFaktorenOption AS T1
		LEFT JOIN dynamischeKorrekturFaktorenBasisFaktor AS T2		
		ON T1.dKffOption_id = T2.dKffOption_id 
		LEFT JOIN dynamischeKorrekturFaktorenCalculation AS T3
		ON T3.calculateID = T1.calculateID
		LEFT JOIN bereiche AS T4		
		ON T1.bereichID = T4.ber_ID
		WHERE T1.deleted='false'
		AND T1.calculateID='".$_POST['calcID']."'";
}else{
	if(isset($_POST['dKff_id']) && !empty($_POST['dKff_id'])){
		$query = "SELECT T1.*,T2.*,T3.*
		FROM dynamischeKorrekturFaktorenOption AS T1
		LEFT JOIN dynamischeKorrekturFaktorenBasisFaktor AS T2
		ON T1.dKffOption_id = T2.dKffOption_id 
		LEFT JOIN bereiche AS T3		
		ON T1.bereichID = T3.ber_ID
		WHERE T1.deleted='false' 
		AND T1.dKff_id='".$_POST['dKff_id']."'";
	}else{
		$query = "SELECT T1.*,T2.*,T3.*
		FROM dynamischeKorrekturFaktorenOption AS T1
		LEFT JOIN dynamischeKorrekturFaktorenBasisFaktor AS T2
		ON T1.dKffOption_id = T2.dKffOption_id 
		LEFT JOIN bereiche AS T3		
		ON T1.bereichID = T3.ber_ID
		WHERE T1.deleted='false'";
	}
}
$records = queryDB($conn, $query, "read");

echo json_encode($records, JSON_INVALID_UTF8_IGNORE);

?>