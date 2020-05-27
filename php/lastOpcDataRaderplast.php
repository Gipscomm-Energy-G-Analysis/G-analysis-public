<?php
include('top-cache.php');
error_reporting (-1);
ini_set ('display_errors', 'On');

require 'DbOperations.php';

function printDataInRows($data){
    echo "<label style='display:inline-block'>".json_encode($data, JSON_INVALID_UTF8_IGNORE)."</label>";
    echo "<br>";
}

function timeAndValue($record){
    $timestamp = (array) $record['Timestamp'];
    return [$timestamp['date'], $record["Value"]];
}

$key = $_GET['key'];

if($key === "8a4528bca54661f63e623ab08de9be83f00e48384df64f1224acb848b8b336259917e424679941b1d3662168cc085b13d5abb13625dc0d13b5f7a66d9ba5a888999e68d47c692c2907d00d4bbde1db07"){

    $conn = connectToDB("006_radpl");

    $query = "SELECT TOP 1000 * FROM opcdata ";
    $query .= "ORDER BY Timestamp DESC ";
    $records = queryDB($conn, $query, "read");

    echo "<h3>[Date, Value]</h3>";

    array_map("printDataInRows", array_map("timeAndValue", $records));

}
else {
    echo "<h3>Access denied.</h3>";
}
include('bottom-cache.php');
?>
