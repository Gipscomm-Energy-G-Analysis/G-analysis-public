<?php

error_reporting(-1);
ini_set ('display_errors', 'On');

require 'DbOperations.php';

$nameDB = $_POST['nameDB'];
$conn = connectToDB($nameDB);
$id = $_POST["id"];
$modus = $_POST['modus'];

if(isset($id) && $id =='ePrdKFEGruppenGet' && $modus == "display"){
	$query = "SELECT ePrdKFE_GrpID,grp_name FROM korrekturFaktorEinfugenGruppen WHERE deleted='false'";
	$records = queryDB($conn, $query, "read");
    echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
}
if(isset($id) && $id =="ePrdKFEGruppen"){  
  if($modus == "save" && isset($_POST['addNewGroupTxt'])){
        $addNewGroupTxt = $_POST['addNewGroupTxt']; 
        $gruppenIdUnique = "SELECT ePrdKFE_GrpID FROM korrekturFaktorEinfugenGruppen WHERE grp_name ='".$addNewGroupTxt."' AND deleted ='false'";
        //$gruppenIdExist = queryDB( $conn, $gruppenIdUnique, "read" );
        $params = array();
		$options =  array( "Scrollable" => SQLSRV_CURSOR_KEYSET );
		$stmt = sqlsrv_query( $conn,  $gruppenIdUnique, $params, $options );

		$row_count = sqlsrv_num_rows( $stmt );
		//echo $row_count;die;
		if ($row_count === 0){
			$query = "INSERT INTO korrekturFaktorEinfugenGruppen(grp_name,deleted)";
			$query .= "VALUES ('$addNewGroupTxt','false')";
			$records = queryDB($conn, $query, "write");
			//echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
			echo 1;
		} else{
			echo 2;
		}
  }
}
if(isset($id) && $id =="ePrdKFEGruppenUpdate"){  
  if($modus == "update" && isset($_POST['updateGroupTxt']) && isset($_POST['updateGroupSelID']) ){
    $updateGroupTxt = $_POST['updateGroupTxt']; 
    $gruppenIdUniqueUpdate = "SELECT ePrdKFE_GrpID FROM korrekturFaktorEinfugenGruppen WHERE grp_name ='".$updateGroupTxt."' AND deleted ='false'";
    //$gruppenIdExist = queryDB( $conn, $gruppenIdUnique, "read" );
    $params_update = array();
    $options_update =  array( "Scrollable" => SQLSRV_CURSOR_KEYSET );
    $stmt_query = sqlsrv_query( $conn,  $gruppenIdUniqueUpdate, $params_update, $options_update );

    $row_count_update = sqlsrv_num_rows( $stmt_query );
    //echo $row_count;die;
    if ($row_count_update === 0){

  	$query =  "UPDATE korrekturFaktorEinfugenGruppen SET grp_name ='".$_POST['updateGroupTxt']."'";
    $query .= "WHERE ePrdKFE_GrpID = '".$_POST['updateGroupSelID']."'";
    $records = queryDB($conn, $query, "write");
      echo 1;
    } else{
      echo 2;
    }
    //echo "Datensatz wurde erfolgreich aktualisiert!";
  }
}

if(isset($id) && $id =="ePrdKFEGruppenDelete"){  
  if($modus == "delete" && isset($_POST['groupSelID'])){
  	$query =  "UPDATE korrekturFaktorEinfugenGruppen SET deleted = 1";
    $query .= "WHERE ePrdKFE_GrpID = '".$_POST['groupSelID']."'";
    $records = queryDB($conn, $query, "write");
    echo 'Datensatz wurde erfolgreich gelöscht!';
  }
}

if(isset($id) && $id =="ePrdKFEGruppenGetTblData"){  
  if($modus == "getData" && isset($_POST['grpId'])){
    $query = "SELECT T1.*,T2.*
    FROM korrekturFaktorEinfugen AS T1
    LEFT JOIN korrekturFaktorEinfugenGruppen AS T2
    ON T1.ePrdKFE_GrpID = T2.ePrdKFE_GrpID WHERE T1.deleted='false' AND T1.ePrdKFE_GrpID='".$_POST['grpId']."'";    
}else{
  $query ="SELECT T1.*,T2.*
    FROM korrekturFaktorEinfugen AS T1
    LEFT JOIN korrekturFaktorEinfugenGruppen AS T2
    ON T1.ePrdKFE_GrpID = T2.ePrdKFE_GrpID WHERE T2.deleted='false' AND T1.deleted='false'";
}
$records = queryDB($conn, $query, "read");
    echo json_encode($records, JSON_INVALID_UTF8_SUBSTITUTE);
}
