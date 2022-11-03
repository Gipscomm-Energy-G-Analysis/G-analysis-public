<?php

error_reporting(-1);
ini_set('display_errors', 'On');

require 'DbOperations.php';

$conn = connectToDB($_POST['nameDB']);

$query   = "SELECT (SELECT nummerAnl + ' ' + bezeichnungAnl FROM anlagen WHERE anl_ID = [messstellen].[anl_id]) AS anl ";
$query  .= ",(SELECT nrMsm FROM messmittel WHERE msm_ID = [messstellen].[msm_ID]) AS msm ";
$query  .= ",(SELECT nameExtDl FROM externeDurchleitungen WHERE extDl_ID = [messstellen].[extDl_ID]) AS extDl ";
$query  .= ", * ";
$query  .= "FROM [dbo].[messstellen]";
$query  .= "WHERE ber_ID = " . $_POST['berID'] . " ";
$query  .= "AND typ = '" . $_POST['type'] . "' ";
$query  .= "AND deleted = 0 ";

$records = (array)queryDB($conn, $query, "read");

for ($i = 0; $i < count($records); $i++) {

    if ($records[$i]["vorgelMst_ID"] != 0 && $records[$i]["vorgelMst_ID"] != null) {

        foreach ($records as $mst) {

            if ($records[$i]["vorgelMst_ID"] === $mst["mst_ID"]) {

                $records[$i]["vorgelMst"] = $mst["nameMSt"];
            }
        }
    } else {
        $records[$i]["vorgelMst"] = "";
    }
}

closeDbConn($conn);

echo json_encode($records, JSON_INVALID_UTF8_SUBSTITUTE);
