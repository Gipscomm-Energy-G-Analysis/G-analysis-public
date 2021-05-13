<?php

include('top-cache.php');
error_reporting(-1);
ini_set ('display_errors', 'On');
require 'DbOperations.php';

$nameDB = $_POST['nameDB'];

$conn = connectToDB($nameDB);

$id = $_POST['id'];

if($id == "gipscAdm"){

$query = "SELECT * FROM gipscommAdmins";

}

elseif($id == "betrGrp"){

  $query = "SELECT * FROM betreuerGruppen WHERE deleted_at IS NULL";

}

elseif($id == "sAdm"){

  $betrGrpID = $_POST['betrGrpID'];
  $query = "SELECT * FROM superAdmins WHERE betrGrp_ID = '$betrGrpID' AND deleted_at IS NULL";

}elseif($id == "manDBs"){

  $betrGrpID = $_POST['betrGrpID'];
  if(!empty($betrGrpID)) {
    //$query = "SELECT * FROM mandanten WHERE betrGrp_ID = '$betrGrpID'";
    $mandantenBetr = "SELECT * FROM mandantenBetrGruppen WHERE betrGrp_ID = '$betrGrpID'";
    $data = queryDB($conn, $mandantenBetr, "read");
    $query = '';
    
    if(!empty($data)) {
      $IDs = explode(',', $data[0]['mandantenIDs']);
  
      $manIDs = "'" . implode ( "', '", $IDs ) . "'";
    
      $query = "SELECT * FROM mandanten WHERE man_ID IN  (".$manIDs.")";
    }
  } else {
    $defaultGrpID = $_POST['defaultGrpID'];
    //$query = "SELECT * FROM mandanten WHERE betrGrp_ID = '$defaultGrpID'";
    $mandantenBetr = "SELECT * FROM mandantenBetrGruppen WHERE betrGrp_ID = '$defaultGrpID'";
    $data = queryDB($conn, $mandantenBetr, "read");
    $query = '';
    
    if(!empty($data)) {
      $IDs = explode(',', $data[0]['mandantenIDs']);
  
      $manIDs = "'" . implode ( "', '", $IDs ) . "'";
    
      $query = "SELECT * FROM mandanten WHERE man_ID IN  (".$manIDs.")";
    }
  }
  
  
}
 elseif($id == "sAdmGetRolePermission"){
  $userId = $_POST['userId'];
  if(!empty($userId)) {
    $query = "SELECT * FROM rolePermission WHERE user_id = '$userId' ";
  }

} elseif($id == "alleNutzerGetRolePermission"){
  $roleId = $_POST['role_id'];
  $userId = $_POST['userId'];
  $tableName = $_POST['tableName'];
  $userName = $_POST['userName'];


  if(!empty($userId)) {
    $query1 = "SELECT * FROM $tableName WHERE username = '$userName' ";
    $records = queryDB($conn, $query1, "read") ;
  }
  $ID = $records[0][$userId.'_ID'];

  $query = "SELECT rolePermission.role_id, accessibleTab.tab_id, accessibleTab.tab_name, accessibleTab.display_superadmin, rolePermission.user_id FROM rolePermission RIGHT JOIN accessibleTab ON accessibleTab.tab_id = rolePermission.tab_id AND rolePermission.user_id = '$ID' ";

}elseif($id == "manBetrGrp"){
  $betrGrpID = $_POST['betrGrpID'];
  $query = "SELECT * FROM mandantenBetrGruppen WHERE betrGrp_ID = '$betrGrpID'";

}elseif($id == "manGrp"){
  $betrGrpID = $_POST['betrGrpID'];
  $query = "SELECT * FROM mandantenGruppen WHERE betrGrp_ID = '$betrGrpID'";
}

elseif($id == "tblMan"){
$mandantenIDs = $_POST['mandantenIDs'];
$mandantenIDs = explode(",",$mandantenIDs);
$query = "SELECT * FROM mandanten ";
$query .= "WHERE man_ID = $mandantenIDs[0] ";

for($n = 1; $n < count($mandantenIDs);$n++){

      $query .= "OR man_ID = $mandantenIDs[$n] ";

  }

}

elseif($id == "adm"){
  $query = '';
  if(!empty($_POST['admID'])) {
    $admID = $_POST['admID'];
    $query = "SELECT * FROM admins WHERE adm_ID = '$admID' AND deleted_at IS NULL";

  } else {

    $ins = $_POST['ins'];
    $idIns = $_POST['insID'];
    $recordSet = $_POST['recordSet'];

    if(!empty($idIns)) {
      $query = "SELECT * FROM admins WHERE $ins = '$idIns' AND deleted_at IS NULL";
    }
  }

}
elseif($id == "ben"){
  $query = '';
  if(!empty($_POST['benID'])) {
    $benID = $_POST['benID'];
    $query = "SELECT * FROM benutzer WHERE ben_ID = '$benID' AND deleted_at IS NULL";
  } else {
    $ins = $_POST['ins'];
    $idIns = $_POST['insID'];
    $recordSet = $_POST['recordSet'];

    if(!empty($idIns)) {
      $query = "SELECT * FROM benutzer WHERE $ins = '$idIns' AND deleted_at IS NULL";
    }
  }
}
elseif($id == "man"){
    $manID = $_POST['manID'] ;

    $query = "SELECT * FROM mandanten " ;
    $query .= "WHERE man_ID = '$manID' " ;

}
elseif($id == "org"){
    $query = "SELECT * FROM organisationen " ;
    $query .= "WHERE deleted <> 'true' " ;
}
elseif($id == "lieg"){
    $orgID = $_POST['orgID'] ;

    $query = "SELECT * FROM liegenschaften " ;
    $query .= "WHERE org_ID = ".$orgID." " ;
    $query .= "AND deleted <> 'true' " ;
}


elseif($id == "extDl"){

  $liegID = $_POST['liegID'];

$query = "SELECT * FROM externeDurchleitungen ";

  $query .= "WHERE lieg_ID = ".$liegID." ";

  $query .= "AND deleted <> 'true' ";

}

elseif($id == "ber"){


  $liegID = $_POST['liegID'];

$query = "SELECT * FROM bereiche ";


  $query .= "WHERE lieg_ID = ".$liegID." ";

  $query .= "AND deleted <> 'true' ";

}


elseif($id == "mst"){


  $berID = $_POST['berID'];

$query = "SELECT * FROM messstellen ";


  $query .= "WHERE ber_ID = '$berID' ";


  $query .= "AND deleted <> 'true' ";



  $query .= "ORDER BY nameMSt ";

}


elseif($id == "std"){


  $liegID = $_POST['liegID'];

$query = "SELECT * FROM standorte ";

  $query .= "WHERE lieg_ID = ".$liegID." ";



  $query .= "AND deleted <> 'true' ";

}


elseif($id == "stdDr"){

  $liegID = $_POST['liegID'];

$query = "SELECT * FROM standorteDritter ";

  $query .= "WHERE lieg_ID = ".$liegID." ";

  $query .= "AND deleted <> 'true' ";

}

elseif($id == "anl" || $id == "anlID"){


	$liegID = $_POST['liegID'];

$query = "SELECT * FROM anlagen ";


  if($id === "anlID"){

    $anlID = $_POST['anlID'];

    $query .= "WHERE anl_ID = '$anlID' ";

  }

  else {

    $query .= "WHERE lieg_ID = '$liegID' ";

  }

  $query .= "AND deleted <> 'true' ";


  $query .= "AND archiviertAnl <> 'true' ";

}


elseif($id == "msm"){


	$liegID = $_POST['liegID'];

$query = "SELECT * FROM messmittel ";

  $query .= "WHERE lieg_ID = ".$liegID." ";

  $query .= "AND deleted <> 'true' ";

}


elseif($id == "ent"){

    $liegID = $_POST['liegID'] ;

    $query = "SELECT * FROM energietraeger " ;
    $query .= "WHERE lieg_ID = '$liegID' " ;
    $query .= "AND deleted = 0 " ;

}


elseif($id == "vers"){

    $entID = $_POST['entID'] ;

    $query = "SELECT * FROM versorger " ;
    $query .= "WHERE ent_ID = '$entID' " ;

}

elseif($id == "enf"){

    $liegID = $_POST['liegID'] ;

    $query = "SELECT * FROM energieformen " ;
    $query .= "WHERE lieg_ID = '$liegID' " ;

}

elseif($id == "eAnl"){

    $query = "SELECT * FROM erweiterungenAnlagen ";
    $query .= "WHERE deleted <> 'true' ";

}

elseif($id == "ePrd"){

    $query = "SELECT * FROM erweiterungenProdukte ";
    $query .= "WHERE deleted <> 'true' ";

}

elseif($id == "eRng"){

    $liegID = $_POST['liegID'];

    $query = "SELECT * FROM externeRechnungen ";
    $query .= "WHERE lieg_ID = ".$liegID." ";
    $query .= "AND deleted <> 'true' ";

}

elseif($id == "intEngIMw"){

  //$liegID = $_POST['liegID'];

  $query = "SELECT * FROM messstellen ";

  $query .= "WHERE messartMst = 'manuell' ";

  $query .= "AND deleted <> 'true' ";
}

elseif($id == "intBdeIMw"){

  //$liegID = $_POST['liegID'];

  $query = "SELECT * FROM Anlagen ";

  $query .= "WHERE deleted <> 'true' ";

  $query .= "AND archiviertAnl <> 'true' ";
  /*17-03-2021*/
  /*new-mm-start*/
  // $query .= "AND tpy <> 'energiedaten' ";
  /*new-mm end*/

}

elseif($id == "zp"){

 $liegID = $_POST['liegID'];

 $query = "SELECT * FROM zaehlpunktnummern ";

  $query .= "WHERE lieg_ID = ".$liegID." ";

  $query .= "AND deleted <> 'true' ";

}
elseif($id == "betrPar"){

  $query = "SELECT * FROM config.betriebsparameter ";

} elseif($id == 'admSuchen') {

  $man_ID = $_POST['manID'];

  $manData = "SELECT * FROM mandanten WHERE nameMan LIKE '%$man_ID%' ";
  $data = queryDB($conn, $manData, "read");

  $manId = $data[0]['man_ID'];
  $query = "SELECT * FROM admins WHERE deleted_at IS NULL AND man_ID = '$manId' OR manGrp_ID = '$manId'";
  //$query .= "WHERE deleted <> 'true' ";   //<> not equal
} elseif($id == 'benSuchen') {

  $man_ID = $_POST['manID'];

  $manData = "SELECT * FROM mandanten WHERE nameMan LIKE '%$man_ID%' ";
  $data = queryDB($conn, $manData, "read");

  $manId = $data[0]['man_ID'];

  $query = "SELECT * FROM benutzer WHERE deleted_at IS NULL AND man_ID = '$manId' OR manGrp_ID = '$manId' ";
    //$query .= "WHERE deleted <> 'true' ";   //<> not equal

} elseif($id == 'rollenUndBerechtigungenSuperadmin') {

  $authSAdm = !empty($_POST['auth']) ? $_POST['auth'] : '';
  
  $sAdmAuth = '';
  if(!empty($authSAdm)) {
    $getsAdm = "SELECT * FROM superAdmins WHERE username LIKE '%$authSAdm%'";
    $sAdmData = queryDB($conn, $getsAdm, "read");
  }
  if(!empty($sAdmData)) {
    $sAdmAuth = 'sAdm';
  }

  if(!empty($sAdmAuth)) {
    $query = "SELECT id, tab_name as text, tab_id, parent_id, display_superadmin FROM accessibleTab WHERE display_superadmin = 1 AND accessibleTab.parent_id IS NOT NULL";
  } else {
    $query = "SELECT id, tab_name as text, tab_id, parent_id, display_superadmin FROM accessibleTab WHERE accessibleTab.parent_id IS NOT NULL";
  }
  $data = queryDB($conn, $query, "read");
  $userId = !empty($_POST['userId']) ? $_POST['userId'] : '';


    function getSubMenu($userId) {

        $checkedData = '';

        if(!empty($userId)) {
          $roleQuery = "SELECT * FROM rolePermission WHERE user_id = '$userId' ";
          $roleData = queryDB(connectToDB($_POST['nameDB']), $roleQuery, "read");
        }
        if(!empty($roleData)) {
          foreach($roleData as $role) {
            $roleExp = explode(',',$role['tab_id']);
            $roleimp[] = implode(',', $roleExp);

          }
          $rolePermission = "'" . implode ( "', '", $roleimp ) . "'";

          if(!empty($sAdmAuth)) { 
            $checkedQuery = "SELECT id, tab_name as text, tab_id, parent_id, display_superadmin FROM accessibleTab WHERE display_superadmin = 1 AND tab_id IN (".$rolePermission.")";
          } else {
            $checkedQuery = "SELECT id, tab_name as text, tab_id, parent_id, display_superadmin FROM accessibleTab WHERE tab_id IN (".$rolePermission.")";
          }
          $checkedData = queryDB(connectToDB($_POST['nameDB']), $checkedQuery, "read") ;
        }
        return $checkedData;
    }

    function buildTree(array $data, $parentId = 0) {
        $branch = array();
        $userId = !empty($_POST['userId']) ? $_POST['userId'] : '';
        foreach ($data as $element) {
            if ($element['parent_id'] == $parentId) {
              $checkedRole = getSubMenu($userId);
              if(!empty($checkedRole)) {
                foreach($checkedRole as $check) {
                  if($check['tab_id'] == $element['tab_id']) {
                    $element['checked'] = 'true';
                  }
                }
              }
              $children = buildTree($data, $element['id']);
              if ($children) {
                  $element['children'] = $children;
              }
                $branch[] = $element;
            }
        }
      return $branch;
    }

    $tree = buildTree($data);

    echo json_encode($tree);
}

if($id != 'rollenUndBerechtigungenSuperadmin' && $id != 'mandantenBetrGruppen') {
  $records = queryDB($conn, $query, "read") ;
  echo json_encode($records, JSON_INVALID_UTF8_IGNORE) ;
}

include('bottom-cache.php');
?>
