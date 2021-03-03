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

$query = "SELECT * FROM betreuerGruppen";

}

elseif($id == "sAdm"){
$betrGrpID = $_POST['betrGrpID'];
$query = "SELECT * FROM superAdmins WHERE betrGrp_ID = '$betrGrpID'";
}

elseif($id == "manGrp"){
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

  // $ins = $_POST['ins'];
  // $idIns = $_POST['insID'];
  // $query = "SELECT * FROM admins WHERE $ins = '$idIns'";
  $query = "SELECT * FROM admins";
}

elseif($id == "ben"){
    $ins = $_POST['ins'];
    $idIns = $_POST['insID'];
    $recordSet = $_POST['recordSet'];
    if($recordSet == 'first') {
        $query = "SELECT TOP (1) * FROM benutzer ";
    } elseif ($recordSet == 'last') {
        $query = "SELECT TOP 1 * FROM benutzer ORDER BY man_ID DESC";
    } elseif ($recordSet == 'next') {
        $query = "SELECT * FROM benutzer"; //WHERE $ins = '$idIns'";
    } elseif ($recordSet == 'previous') {
        $query = "SELECT * FROM benutzer"; //WHERE $ins = '$idIns'";
    } else {
        $query = "SELECT * FROM benutzer WHERE $ins = '$idIns'";
    }

}

elseif($id == "man"){
 $manID = $_POST['manID'];
$query = "SELECT * FROM mandanten ";
 $query .= "WHERE man_ID = '$manID' ";

}


elseif($id == "org"){
$query = "SELECT
 * FROM organisationen ";
$query .= "WHERE deleted <> 'true' ";

}


elseif($id == "lieg"){

$orgID = $_POST['orgID'];

$query = "SELECT * FROM liegenschaften ";

  $query .= "WHERE org_ID = ".$orgID." ";

$query .= "AND deleted <> 'true' ";

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
    $query = "SELECT * FROM admins ";
    //$query .= "WHERE deleted <> 'true' ";   //<> not equal
} elseif($id == 'benSuchen') {
    $query = "SELECT * FROM benutzer ";
    //$query .= "WHERE deleted <> 'true' ";   //<> not equal
}

$records = queryDB($conn, $query, "read") ;
echo json_encode($records, JSON_INVALID_UTF8_IGNORE) ;

include('bottom-cache.php');
?>
