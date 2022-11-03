<?php

error_reporting(-1);
ini_set('display_errors', 'On');

require 'DbOperations.php';

$manID = $_POST['manID'];

$querys = array();

$query = "SELECT nameMan, 'man' AS ins FROM mandanten ";
$query .= "WHERE man_ID = '$manID' ";

$querys[0] = "SELECT nameOrg,org_ID, 'org' AS ins FROM organisationen ";
$querys[0] .= "WHERE deleted <> 'true' ";

$querys[1] = "SELECT nameLieg, org_ID, lieg_ID, energietraeger1, energietraeger2, energietraeger3, energietraeger4, energietraeger5, energietraeger6, energietraeger7, energietraeger8, energietraeger9, 'lieg' AS ins FROM liegenschaften ";
$querys[1] .= "WHERE deleted <> 'true' ";

$querys[2] = "SELECT nameBer, lieg_ID, ber_ID,energietraeger1Ber,energietraeger2Ber,energietraeger3Ber,energietraeger4Ber,vorgelagerterBereich1Ber, 'ber' AS ins FROM bereiche ";
$querys[2] .= "WHERE deleted <> 'true' ";

$querys[3] = "SELECT nameMSt AS nameMst, isDurchleitung, ber_ID, mst_ID, anlageMst, 'mst' AS ins FROM MessstellenAnlagen ";
$querys[3] .= "WHERE deleted <> 'true' ";

$conn1 = connectToDB("gipscomm");
$recordsRaw1 = queryDB($conn1, $query, "read");
closeDbConn($conn1);

$nameDB = $_POST[ 'nameDB' ] ;
$conn2 = connectToDB($nameDB);
$recordsRaw2 = queryDB($conn2, $querys, "read");
closeDbConn($conn2);

$records = array_merge($recordsRaw1, $recordsRaw2);

echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
