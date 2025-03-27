<?php

error_reporting (-1);
ini_set ('display_errors', 'On');

require 'DbOperations.php';

$nameDB = $_POST['nameDB'];
$conn = connectToDB($nameDB);

$query = "SELECT channel.channel_id as 'Channel ID', channel.name as 'Name', channel.label as Label, channel.description as 'Description', channel.phase as 'Phase', channel.unit_id as 'DeviceID', messstellen.nameMSt as 'Name MST' FROM channel INNER JOIN messmittel ON messmittel.kanal1Msm = channel.channel_id OR messmittel.kanal2Msm = channel.channel_id OR messmittel.kanal3Msm = channel.channel_id INNER JOIN messstellen ON messmittel.mst_ID = messstellen.mst_ID WHERE channel.name !=''";

$records = queryDB($conn, $query, "read");

if (!empty($records) && is_array($records) && isset($records[0])) {
    // Set headers for CSV download
    header('Content-Type: text/csv');
    header('Content-Disposition: attachment; filename="data.csv"');
    
    // Open PHP output stream
    $output = fopen('php://output', 'w');

    // Output the column headings
    fputcsv($output, array_keys($records[0]));

    // Output all rows in CSV format
    foreach ($records as $row) {
        fputcsv($output, $row);
    }

    fclose($output);
    exit;
} else {
    echo "No data found.";
}

//echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
