<?php
error_reporting( -1 ) ;
ini_set ( 'display_errors', 'On' ) ;
set_error_handler("warning_handler", E_WARNING);

require 'DbOperations.php';
require 'helpers.php';

function warning_handler($errno, $errstr) { 
    throw new Exception("ErrorNr : ".$errno.", ErrorDescr : ".$errstr) ;
}

define("db", $_GET["db"]) ;
define("mst_ID", $_GET["mst_ID"]) ;

// If there is NULL or 0 value data for consecutive days we call 
// it a gap.

// Every found day with a gap has at least one gap(not necessaryly the whole day !)

function queryMstData($db_, $mstID) {
    $query  = "SELECT Time_ FROM " ;
    $query .= "	(SELECT CONVERT(varchar(10), Time, 120) AS Time_ FROM MessstellenEnergiedaten " ;
    $query .= "	 WHERE mst_ID = ".$mstID." AND (Value = 0 OR Value IS NULL)) AS div " ;
    $query .= "GROUP BY Time_ " ;
    $query .= "ORDER BY Time_ " ;

    return queryDB(connectToDB($db_), $query, "read") ;
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

function gapFromTo($gapGroup) {
    return
        count($gapGroup) === 1 ? 
        ["db" => db, "mstID" => mst_ID, "from" => $gapGroup[0], "to" => $gapGroup[0]] :
        ["db" => db, "mstID" => mst_ID, "from" => $gapGroup[0], "to" => $gapGroup[count($gapGroup) - 1]] ;
}

function createRows($acc, $gap) {
    return $acc.
        "<tr>
            <td>".$gap["db"]."</td>
            <td>".$gap["mstID"]."</td>
            <td>".$gap["from"]."</td>
            <td>".$gap["to"]."</td>
        </tr>" ;
}

function generateTblData($data) {
    return array_reduce($data, 'createRows') ;
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
                            <th>DB</th>
                            <th>Mst</th>
                            <th>Von</th>
                            <th>Bis</th>
                        </tr>
                    </thead>
                    <tbody>".$tblData."</tbody>
                </table><br><br>" ;
    echo $table ;
}
printResult(generateTblData(array_map('gapFromTo',findGaps(queryMstData(db, mst_ID))))) ;

// https://g-analysis.com/testwebsite3/php/findGapsInEnergyData.php?db=g002_badber&mst_ID=117

?>
