<?php
session_start();

if (ini_get('register_globals')) {
    foreach ($_SESSION as $key => $value) {
        if (isset($GLOBALS[$key]))
            unset($GLOBALS[$key]);
    }
}

error_reporting(-1);
ini_set('display_errors', 'On');

require 'DbOperations.php';

$_SESSION["nameDB"] = $_POST['nameDB'];

$conn = connectToDB($_SESSION["nameDB"]);

$id = $_POST['id'];

if ($id == "adm") {
    $query = '';
    if (!empty($_POST['admID'])) {
        $admID = $_POST['admID'];
        $query = "SELECT * FROM admins WHERE adm_ID = " . $admID . "' AND deleted_at IS NULL ";
    } else {

        $ins = $_POST['ins'];
        $idIns = $_POST['insID'];
        $recordSet = $_POST['recordSet'];

        if (!empty($idIns)) {
            $query = "SELECT * FROM admins WHERE $ins = " . $idIns . " AND deleted_at IS NULL ";
        }
    }
} elseif ($id == "ben") {
    $query = '';
    if (!empty($_POST['benID'])) {
        $benID = $_POST['benID'];
        $query = "SELECT * FROM benutzer WHERE ben_ID = '" . $benID . "' AND deleted_at IS NULL";
    } else {
        $ins = $_POST['ins'];
        $idIns = $_POST['insID'];
        $recordSet = $_POST['recordSet'];

        if (!empty($idIns)) {
            $query = "SELECT * FROM benutzer WHERE $ins = '" . $idIns . "' OR manGrp_ID = '" . $idIns . "' AND deleted_at IS NULL";
        }
    }
} elseif ($id == "man") {
    $manID = $_POST['manID'];

    $query = "SELECT * FROM mandanten ";
    $query .= "WHERE man_ID = '" . $manID . "' ";
} elseif ($id == "org") {
    $query = "SELECT * FROM organisationen ";
    $query .= "WHERE deleted = 0 ";
} elseif ($id == "lieg") {
    $orgID = $_POST['orgID'];

    $query = "SELECT * FROM liegenschaften ";
    $query .= "WHERE org_ID = " . $orgID . " ";
    $query .= "AND deleted = 0 ";
} elseif ($id == "extDl") {
    $liegID = $_POST['liegID'];

    $query = "SELECT * FROM externeDurchleitungen ";
    $query .= "WHERE lieg_ID = " . $liegID . " ";
    $query .= "AND deleted = 0 ";
} elseif ($id == "ber") {
    $liegID = $_POST['liegID'];

    $query = "SELECT * FROM bereiche ";
    $query .= "WHERE lieg_ID = " . $liegID . " ";
    $query .= "AND deleted = 0 ";
} elseif ($id == "mst") {

    $berID = $_POST['berID'];
    $query = "SELECT * FROM messstellen ";
    $query .= "WHERE ber_ID = '" . $berID . "' ";
    $query .= "AND deleted = 0 ";
    $query .= "ORDER BY nameMSt ";
} elseif ($id == "std") {

    $liegID = $_POST['liegID'];

    $query = "SELECT * FROM standorte ";
    $query .= "WHERE lieg_ID = " . $liegID . " ";
    $query .= "AND deleted = 0 ";
} elseif ($id == "stdDr") {
    $liegID = $_POST['liegID'];

    $query = "SELECT * FROM standorteDritter ";
    $query .= "WHERE lieg_ID = " . $liegID . " ";
    $query .= "AND deleted = 0 ";
} elseif ($id == "anl" || $id == "anlID") {
    $liegID = $_POST['liegID'];

    $query = "SELECT * FROM anlagen ";


    if ($id === "anlID") {

        $anlID = $_POST['anlID'];

        $query .= "WHERE anl_ID = " . $anlID . " ";
    } else {

        $query .= "WHERE lieg_ID = " . $liegID . " ";
    }

    $query .= "AND deleted = 0 ";
    $query .= "AND archiviertAnl = 0 ";
} elseif ($id == "msm") {


    $liegID = $_POST['liegID'];

    $query = "SELECT * FROM messmittel ";

    $query .= "WHERE lieg_ID = " . $liegID . " ";

    $query .= "AND deleted = 0 ";
} elseif ($id == "ent") {

    $liegID = $_POST['liegID'];

    $query = "SELECT * FROM energietraeger ";
    $query .= "WHERE lieg_ID = " . $liegID . " ";
    $query .= "AND deleted = 0 ";
} elseif ($id == "vers") {

    $entID = $_POST['entID'];

    $query = "SELECT * FROM versorger ";
    $query .= "WHERE ent_ID = " . $entID . " ";
} elseif ($id == "enf") {

    $liegID = $_POST['liegID'];

    $query = "SELECT * FROM energieformen ";
    $query .= "WHERE lieg_ID = " . $liegID . " ";
} elseif ($id == "ePrd") {

    $query  = "SELECT * FROM erweiterungenProdukte ";
    $query .= "WHERE deleted = 0 ";
} elseif ($id == "eRng") {

    $liegID = $_POST['liegID'];

    $query = "SELECT * FROM externeRechnungen ";
    $query .= "WHERE lieg_ID = " . $liegID . " ";
    $query .= "AND deleted = 0 ";
} elseif ($id == "intEngIMw") {

    //$liegID = $_POST['liegID'];

    $query = "SELECT * FROM messstellen ";
    $query .= "WHERE messartMst = 'manuell' ";
    $query .= "AND deleted = 0 ";
} elseif ($id == "intBdeIMw") {

    //$liegID = $_POST['liegID'];

    $query = "SELECT * FROM Anlagen ";

    $query .= "WHERE deleted = 0 ";

    $query .= "AND archiviertAnl = 0 ";
    /*17-03-2021*/
    /*new-mm-start*/
    // $query .= "AND tpy <> 'energiedaten' ";
    /*new-mm end*/
} elseif ($id == "zp") {

    $liegID = $_POST['liegID'];

    $query = "SELECT * FROM zaehlpunktnummern ";

    $query .= "WHERE lieg_ID = " . $liegID . " ";

    $query .= "AND deleted = 0 ";
} elseif ($id == "betrPar") {

    $query = "SELECT * FROM config.betriebsparameter ";
}

echo json_encode(queryDB($conn, $query, "read"));

closeDbConn($conn);
