<?php
error_reporting( -1 ) ;
ini_set ( 'display_errors', 'On' ) ;
set_error_handler("warning_handler", E_WARNING);

require 'DbOperations.php';
require 'helpers.php';

function warning_handler($errno, $errstr) { 
    throw new Exception("ErrorNr : ".$errno.", ErrorDescr : ".$errstr) ;
}

// If there is NULL or 0 value data for consecutive days we call 
// it a gap.

function queryMstData($db, $mstID) {
    $query  = "SELECT Time_ FROM " ;
    $query .= "	(SELECT CONVERT(varchar(10), Time, 120) AS Time_ FROM MessstellenEnergiedaten " ;
    $query .= "	WHERE Name = 'Mst-003' AND (Value = 0 OR Value IS NULL)) AS div " ;
    $query .= "GROUP BY Time_ " ;
    $query .= "ORDER BY Time_ " ;

    return queryDB(connectToDB($db) , $query, "read") ;
}

function consecutiveDays($date1, $date2) {
    $interval = date_diff(new DateTime($date1), new DateTime($date2));
    return $interval->format('%a') === '1' ; 
}

function findGaps($data) {
    $group = [$data[0]["Time_"]] ;
    $groups = [] ;
    for ($i=1; $i < count($data); $i++) { 
        $dayBefore = $data[$i - 1]["Time_"] ;
        $day = $data[$i]["Time_"] ;
        if (consecutiveDays($dayBefore, $day)) {
            array_push($group, $data[$i]["Time_"]) ;
        }
        else {
            array_push($groups, $group) ;
            $group = [$data[$i]["Time_"]] ;
        }
    }

    return $groups ;
}

function createRows() {
    return $acc.
        "<tr>
            <td>".$mst["index"]."</td>
            <td>".$mst["db"]."</td>
            <td>".$mst["mst_ID"]."</td>
            <td>".$mst["Name"]."</td>
            <td>".$mst["Channel1"]."</td>
            <td>".$mst["Channel2"]."</td>
            <td>".$mst["Channel3"]."</td>
        </tr>" ;
}

function printResult($tblData) {
    $table  = "<h3>Folgende Gaps existieren : </h3><br>" ;
    $table .= " <style>
                    table, td, th {
                        border: 1px solid black;
                        text-align: left;
                    }
                    table {
                        border-collapse: collapse;
                    }
                    td, th {
                        padding: 5px 10px;
                    }
                </style>
                <table style='border:2px solid black;'>
                    <thead>
                        <tr>
                            <th>Zeile</th>
                            <th>Kunde</th>
                            <th>mst_ID</th>
                            <th>Name</th>
                            <th>Channel 1</th>
                            <th>Channel 2</th>
                            <th>Channel 3</th>
                        </tr>
                    </thead>
                    <tbody>".$tblData."</tbody>
                </table><br><br>" ;
}

print_r(findGaps(queryMstData("g002_badber", 217))) ;

// https://g-analysis.com/testwebsite3/php/findGapsInEnergyData.php

?>
