<?php

include('top-cache.php');
error_reporting(-1);
ini_set('display_errors', 'On');

// Performs an operation on an associative record
function actionOn($record, $field, $fn)
{
    $record[$field] = $fn($record[$field]);

    return $record;
}

// Prepends a zero in case n is smaller 10
function prependZero($n)
{
    return (int)$n < 10 ? "0" . $n : (int)$n;
}

// Filters an array of arrays and returns just non-empty arrays
function notEmpty($arr)
{
    return !empty($arr);
}

// Returns the first element of an array
function head($arr)
{
    return $arr[0];
}

// Returns the array without the head
function tail($arr)
{
    return array_slice($arr, 1);
}

// Returns the last element of an array
function last($arr)
{
    return $arr[count($arr) - 1];
}

// Adds an index field to an associative array
function indexAssocArray($arr)
{
    for ($i = 0; $i < count($arr); $i++) {
        $arr[$i]["index"] = $i + 1;
    }

    return $arr;
}

// Pipes the return values from function to function
function pipe($fns)
{
    $results = [head($fns)];
    for ($i = 1; $i < count($fns); $i++) {
        array_push($results, $fns[$i]($results[$i - 1]));
    }
    return $results;
}

// Function which as the name suggests, splits a string at spaces
function splitSpace($string)
{
    return explode(" ", $string);
}

// Function that splits a string at underlines
function splitUnderscore($string)
{
    return explode("_", $string);
}

// Remove duplicates in multidim array
function unique_multidim_array($array, $key)
{
    $temp_array = array();
    $i = 0;
    $key_array = array();

    foreach ($array as $val) {
        if (!in_array($val[$key], $key_array)) {
            $key_array[$i] = $val[$key];
            $temp_array[$i] = $val;
        }
        $i++;
    }
    return $temp_array;
}

// Creates flat array from nested array
function array_flatten($array)
{
    if (!is_array($array)) {
        return false;
    }
    $result = array();
    foreach ($array as $key => $value) {
        if (is_array($value)) {
            $result = array_merge($result, array_flatten($value));
        } else {
            $result = array_merge($result, array($key => $value));
        }
    }
    return $result;
}

// Splits array into chunks of a given size
function splitArray($size, $records)
{
    return array_chunk($records, $size);
}

// Transposes array
function flipDiagonally($arr)
{
    $out = array();
    foreach ($arr as $key => $subarr) {
        foreach ($subarr as $subkey => $subvalue) {
            $out[$subkey][$key] = $subvalue;
        }
    }
    return $out;
}

// Tests if two arrays are of equal length
function equalLength($arr1, $arr2)
{
    return count($arr1) === count($arr2);
}

// Takes a date object and returns a date string
function dateTimeToString($dateObject)
{
    return $dateObject->format('Y-m-d H:i:s.u');
}

// Returns the current formatted date
function dateNow()
{
    $date = getdate();

    $year = $date["year"];
    $month = prependZero($date["mon"]);
    $day = prependZero($date["mday"]);
    $hours = prependZero($date["hours"]);
    $minutes = prependZero($date["minutes"]);
    $seconds = prependZero($date["seconds"]);

    return $year . "-" . $month . "-" . $day . " " . $hours . ":" . $minutes . ":" . $seconds . ".000";
}

// Adds 15 min to a datetime string
function add15min($date)
{
    $dateTime = new DateTime($date);
    $dateTime->modify('+15 minutes');
    return $dateTime->format('Y-m-d H:i:s.000000');;
}

// Adds 2 month to a datetime string
function addTwoMonth($date)
{
    $dateTime = new DateTime($date);
    $dateTime->modify('+2 month');
    return $dateTime->format('Y-m-d H:i:s.000000');
}

// Sorts a string array
function sortStrings($arr)
{
    sort($arr);
    return $arr;
}

// Replaces every a with b in a string
function replaceInString($a, $b, $str)
{
    return implode($b, explode($a, $str));
}

// Takes a list of datetime objects and returns a sorted list
// of datetime strings
function sortDates($dateArray_)
{
    return sortStrings(array_map('dateTimeToString', $dateArray_));
}

// Retrieves the current URL
function getURL()
{
    return replaceInString("%20", " ", "https://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI']);
}

// Sets the path for prepareEnergiedaten
function prepareEnergiedatenPath()
{
    return "https://" . $_SERVER['HTTP_HOST'] . "/php/prepareEnergiedaten.php";
}
// Version for main page
//
// function prepareEnergiedatenPath() {
//     return "https://".$_SERVER['HTTP_HOST']."/php/prepareEnergiedaten.php" ;
// }

// Builds the value string to write php paths to DB
function buildValueStringPaths($last, $current)
{
    return $last . ", ('" . $current . "')";
}

// Concats the value string to write php paths to DB
function buildValuesStringPaths($paths)
{
    return substr(array_reduce($paths, 'buildValueStringPaths'), 1);
}

// Separate the path from the mode
function extractPath($pathString)
{
    return head(explode("',", $pathString));
}

// Inserts php paths into DB tbl phpScriptsToExecute
function writePathsToDB($scriptPaths)
{

    $retVal = [];

    if (empty($scriptPaths)) {
        $retVal = $retVal;
    } else {
        $query = "INSERT INTO phpScriptsToExecute (pathScript, mode) ";
        $query .= "VALUES " . buildValuesStringPaths($scriptPaths);

        queryDB(connGipscomm, $query, "write");

        $retVal = array_map('extractPath', $scriptPaths);
    }

    return $retVal;
}

// Retrieves all DBs with active data inflow
// the const connGipscomm has to be defined in the target script
function getActiveCustomerDBs()
{

    $query =  "SELECT name FROM kundenDBs ";
    $query .= "WHERE active = 1 ";

    function getNames($record)
    {
        return $record["name"];
    }

    $retVal = array_map('getNames', queryDB(connGipscomm, $query, "read"));

    return $retVal;
}
