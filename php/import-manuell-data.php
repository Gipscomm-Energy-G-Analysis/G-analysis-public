<?php

error_reporting (-1);
ini_set ('display_errors', 'On');

require 'DbOperations.php';

// Include SimpleXLSX Library
require 'SimpleXLS.php';
require 'SimpleXLSX.php';
use Excelsheet\SimpleXLS;
use Excelsheet\SimpleXLSX;

$position = $_POST['position'];
$username = $_POST['username'];
$user_id='';
$conn2 = connectToDB("gipscomm");
if($position=='ben' && !empty($username)){
    $getbenUser_IDquery = "SELECT ben_ID FROM benutzer WHERE username='$username'";
    $benuserresult = queryDB($conn2, $getbenUser_IDquery, "read");
    if ($benuserresult && isset($benuserresult[0]['ben_ID'])) {
        $user_id=$benuserresult[0]['ben_ID'];
    }
}else if($position=='adm' && !empty($username)){
    $getadmUser_IDquery = "SELECT adm_ID FROM admins WHERE username='$username'";
    $admuserresult = queryDB($conn2, $getadmUser_IDquery, "read");
    if ($admuserresult && isset($admuserresult[0]['adm_ID'])) {
        $user_id=$admuserresult[0]['adm_ID'];
    }
}else if($position=='gipsAdm' && !empty($username)){
    $getgipsAdmUser_IDquery = "SELECT gipsAdm_ID FROM gipscommAdmins WHERE username='$username'";
    $gipsAdmuserresult = queryDB($conn2, $getgipsAdmUser_IDquery, "read");
    if ($gipsAdmuserresult && isset($gipsAdmuserresult[0]['gipsAdm_ID'])) {
        $user_id=$gipsAdmuserresult[0]['gipsAdm_ID'];
    }
}else if($position=='sAdm' && !empty($username)){
    $getsAdmUser_IDquery = "SELECT sAdm_ID FROM superAdmins WHERE username='$username'";
    $sAdmuserresult = queryDB($conn2, $getsAdmUser_IDquery, "read");
    if ($sAdmuserresult && isset($sAdmuserresult[0]['sAdm_ID'])) {
        $user_id=$sAdmuserresult[0]['sAdm_ID'];
    }
}
if(empty($user_id)){
    echo "<p style='color: red;margin-bottom: 5px;margin-top: 5px;'>Please login your account before uploading the file!</p>";
    return false;
}
$nameDB = $_POST['nameDB'];
$tableType = $_POST['tableType'];
$conn = connectToDB($nameDB);

$tableName='';
$kilowattValue='';
if($tableType=='day'){
    $tableName='data_value_manual_imp_daily';
    $kilowattValue=$_POST['dayPowerUnit'];
}else if($tableType=='hour'){
    $tableName='data_value_manual_imp_hourly';
    $kilowattValue=$_POST['hourPowerUnit'];
}else if($tableType=='month'){
    $tableName='data_value_manual_imp_monthly';
    $kilowattValue=$_POST['monthPowerUnit'];
}else if($tableType=='year'){
    $tableName='data_value_manual_imp_yearly';
    $kilowattValue=$_POST['yearPowerUnit'];
}
// if($tableType=='day'){
//     $type=1;
// }else if($tableType=='week'){
//     $type=2;
// }else if($tableType=='month'){
//     $type=3;
// }else if($tableType=='year'){
//     $type=4;
// }

// Define the expected CSV headers
// if($tableType=='week'){
//     $expectedHeaders = ['anl_ID', 'anl_name', 'on_date', 'on_week', 'val'];
// }else{
//     $expectedHeaders = ['anl_ID', 'anl_name', 'on_date', 'val'];
// }
$expectedHeaders = ['channel_name','mst_name','time_server','value','power'];
// Check if a file is uploaded
if (isset($_FILES['csvFile']) && $_FILES['csvFile']['error'] === UPLOAD_ERR_OK) {
    $fileTmpPath = $_FILES['csvFile']['tmp_name'];
    $fileName = $_FILES['csvFile']['name'];
    $fileSize = $_FILES['csvFile']['size'];
    $fileType = $_FILES['csvFile']['type'];
    $fileExtension = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
        
    // Define allowed extensions and MIME types
    $allowedExtensions = ['csv','xls','xlsx'];
    $allowedMimeTypes = ['text/csv','application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','application/vnd.ms-office','text/plain'];

    // Check file extension
    if (!in_array($fileExtension, $allowedExtensions)) {
        echo "<p style='color: red;margin-bottom: 5px;margin-top: 5px;'>Please upload only CSV, XLS or XLSX format file.</p>";
        return;
    }

    // Check file size (optional, e.g., limit to 2MB)
    if ($fileSize > 102400) {
        echo "<p style='color: red;margin-bottom: 5px;margin-top: 5px;'>File size must be under 100 KB.</p>";
        return;
    }
    //code for xls and xlsx file type
    if ($fileExtension === 'xls' || $fileExtension === 'xlsx') {
        $data = [];
        // Check the file type (xls or xlsx) and use the appropriate library
        if ($fileExtension === 'xls') {
            // Read XLS file using SimpleXLS
            $xls = SimpleXLS::parse($fileTmpPath);
            if (!$xls) {
                die(SimpleXLS::parseError());
            }
            $data = $xls->rows();
        } else if ($fileExtension === 'xlsx') {
            // Read XLSX file using SimpleXLSX
            $xlsx = SimpleXLSX::parse($fileTmpPath);
            if (!$xlsx) {
                die(SimpleXLSX::parseError());
            }
            $data = $xlsx->rows();
        }
       // Skip the header row (optional)
       $isHeader = true;
       $fileHeaders = array_map('trim', $data[0]);
        if ($fileHeaders !== $expectedHeaders) {
            echo "<p style='color: red;margin-bottom: 5px;margin-top: 5px;'>File headers format do not match the expected format. Please upload the correct file and try again!</p>";
            return;
        }
        if ($data) {
            array_shift($data); // Remove the header row
        }
        // Initialize counts
        $insertedCount = 0;
        $skippedCount = 0;
        $chunkSize = 100;
        $dataChunks = [];

        // Read rows
        foreach ($data as $row) {
            // Ensure all necessary fields are present
            $channel_name = $row[0] ?? null;
            $mst_name = $row[1] ?? null;
            $time_server = $row[2] ?? null;

            if (empty($channel_name) || empty($mst_name) || empty($time_server)) {
                $skippedCount++; // Increment skipped count for missing fields
                continue;
            }
            // Validate $time_server format
            if (!validateServerTime($time_server)) {
                $skippedCount++; // Increment skipped count for invalid datetime
                continue;
            }

            // Get mst_ID by mst_name
            $getMST_IDquery = "SELECT mst_ID FROM messstellen WHERE nameMSt='$mst_name'";
            $mstresult = queryDB($conn, $getMST_IDquery, "read");
            $mst_ID = isset($mstresult['error']) ? null : $mstresult[0]['mst_ID'];

            // Get channel_id by channel_name
            $getChannel_IDquery = "SELECT channel_id FROM channel WHERE name='$channel_name'";
            $channelresult = queryDB($conn, $getChannel_IDquery, "read");
            $channel_id = isset($channelresult['error']) ? null : $channelresult[0]['channel_id'];

            //if case Kilowatt then multiply value with 4 number
            $value='';
            $power='';
            if($kilowattValue === 'KW'){
                $value=$row[3] * 4;
                $power=$row[4] * 4;
            }else{
                $value=$row[3];
                $power=$row[4];
            }

            // If both channel_id and mst_ID are found, add to chunk array
            if (!empty($channel_id) && !empty($mst_ID)) {
                $dataChunks[] = [
                    'channel_id' => $channel_id,
                    'user_id' => $user_id,
                    'position' => $position,
                    'mst_ID' => $mst_ID,
                    'time_server' => $time_server,
                    'value' => $value ?? null,
                    'power' => $power ?? null,
                ];

                // Insert chunk if chunk size is reached
                if (count($dataChunks) === $chunkSize) {
                    $result = insertChunk($dataChunks, $tableName, $conn); // Assume insertChunk returns an array
                    $inserted = $result['inserted'] ?? 0; // Extract 'inserted' count
                    $insertedCount += $inserted; // Add to total inserted count
                    $dataChunks = []; // Reset chunk array
                }
            } else {
                $skippedCount++; // Increment skipped count for invalid rows
            }
        }

        // Process remaining rows in chunks
        if (!empty($dataChunks)) {
            $result = insertChunk($dataChunks, $tableName, $conn);
            $inserted = $result['inserted'] ?? 0;
            $insertedCount += $inserted;
        }

        // Display counts
        if ($insertedCount > 0) {
            echo "<p style='color: green; margin-bottom: 5px; margin-top: 5px;'>$insertedCount records inserted successfully.</p>";
        }
        if ($skippedCount > 0) {
            echo "<p style='color: red; margin-bottom: 5px; margin-top: 5px;'>$skippedCount records skipped due to missing or invalid data format.</p>";
        }
    }else{
        //code for CSV file type
        // Open the CSV file for reading
        if (($handle = fopen($fileTmpPath, 'r')) !== false) {
            // Read the first row to get the column headers
            $headers = fgetcsv($handle, 1000, ',');
            if ($headers !== $expectedHeaders) {
                echo "<p style='color: red;margin-bottom: 5px;margin-top: 5px;'>File headers format do not match the expected format. Please upload the correct format file and try again!</p>";
                fclose($handle);
                return;
            }
            // Initialize counts
            $insertedCount = 0;
            $skippedCount = 0;
            $chunkSize = 100;
            $dataChunks = [];
        
            // Process each row in the CSV file
            while (($data = fgetcsv($handle, 1000, ',')) !== false) {
                // Ensure all necessary fields are present
                $channel_name = $data[0] ?? null;
                $mst_name = $data[1] ?? null;
                $time_server = $data[2] ?? null;

                if (empty($channel_name) || empty($mst_name) || empty($time_server)) {
                    $skippedCount++; // Increment skipped count for missing fields
                    continue;
                }
                // Validate $time_server format
                if (!isValidDateTimeWithStrtotime($time_server)) {
                    $skippedCount++; // Increment skipped count for invalid datetime
                    continue;
                }
                // Get mst_ID by mst_name
                $getMST_IDquery = "SELECT mst_ID FROM messstellen WHERE nameMSt='$mst_name'";
                $mstresult = queryDB($conn, $getMST_IDquery, "read");
                $mst_ID = isset($mstresult['error']) ? null : $mstresult[0]['mst_ID'];

                // Get channel_id by channel_name
                $getChannel_IDquery = "SELECT channel_id FROM channel WHERE name='$channel_name'";
                $channelresult = queryDB($conn, $getChannel_IDquery, "read");
                $channel_id = isset($channelresult['error']) ? null : $channelresult[0]['channel_id'];

                //if case Kilowatt then multiply value with 4 number
                $value='';
                $power='';
                if($kilowattValue === 'KW'){
                    $value=$data[3] * 4;
                    $power=$data[4] * 4;
                }else{
                    $value=$data[3];
                    $power=$data[4];
                }

                // If both channel_id and mst_ID are found, add to chunk array
                if (!empty($channel_id) && !empty($mst_ID)) {
                $dataChunks[] = [
                    'channel_id' => $channel_id,
                    'user_id' => $user_id,
                    'position' => $position,
                    'mst_ID' => $mst_ID,
                    'time_server' => $time_server,
                    'value' => $value ?? null,
                    'power' => $power ?? null
                ];
                
                // Insert chunk if chunk size is reached
                if (count($dataChunks) === $chunkSize) {
                    $result = insertChunk($dataChunks, $tableName, $conn); // Assume insertChunk returns an array
                    $inserted = $result['inserted'] ?? 0; // Extract 'inserted' count
                    $insertedCount += $inserted; // Add to total inserted count
                    $dataChunks = []; // Reset chunk array
                }
            } else {
                $skippedCount++; // Increment skipped count for invalid rows
            }
            }
            // Process remaining rows in chunks
            if (!empty($dataChunks)) {
                $result = insertChunk($dataChunks, $tableName, $conn);
                $inserted = $result['inserted'] ?? 0;
                $insertedCount += $inserted;
            }
            fclose($handle);

            // Display counts
            if ($insertedCount > 0) {
            echo "<p style='color: green; margin-bottom: 5px; margin-top: 5px;'>$insertedCount records inserted successfully.</p>";
            }
            if ($skippedCount > 0) {
            echo "<p style='color: red; margin-bottom: 5px; margin-top: 5px;'>$skippedCount records skipped due to missing or invalid data format.</p>";
            }            
        } else {
            echo "<p style='color: red;margin-bottom: 5px;margin-top: 5px;'>Error opening the CSV file. Please try again.</p>";
        }
    }
    
} else {
    echo "<p style='color: red;margin-bottom: 5px;margin-top: 5px;'>No file uploaded or there was an upload error.</p>";
}
    
// Function to insert a chunk of data into the database
function insertChunk($dataChunks, $tableName, $conn) {
    $placeholders = [];
    $values = [];
    $inserted = 0;
    foreach ($dataChunks as $row) {
        $placeholders[] = "($row[channel_id], $row[user_id], '".$row['position']."', $row[mst_ID], '".$row['time_server']."', '".$row['time_server']."', $row[value], $row[power])";
        $values = array_merge($values, array_values($row));
    }
    $query = "INSERT INTO $tableName (channel_id, user_id, position, mst_ID, time_server, time_de, value, power) VALUES " . implode(", ", $placeholders);
    $stmt = queryDB($conn, $query, "write");
    $inserted++;
    return ['inserted' => count($dataChunks)];
}
function formatDateToYMD($inputDate) {
    $formats = [
        'Y-m-d',     // 2024-11-01
        'd-m-Y',     // 01-11-2024
        'm/d/Y',     // 11/01/2024
        'd/m/Y',     // 01/11/2024
        'Y/m/d',     // 2024/11/01
        'd.m.Y',     // 01.11.2024
        'Y.m.d',     // 2024.11.01
    ];
    foreach ($formats as $format) {
        if (!empty($inputDate)) {
            $date = DateTime::createFromFormat($format, $inputDate);
            if ($date && $date->format($format) === $inputDate) {
                return $date->format('Y-m-d'); // Standardized format
            }
        }
    }
}
function detectDateFormat($inputDate) {
     // Check if the input is null or an empty string
     if (is_null($inputDate) || trim($inputDate) === '') {
        return 'Invalid date format';
    }
    if (preg_match('/^\d{4}$/', $inputDate)) {
        return 'Year';
    } elseif (preg_match('/^\d{4}-(0[1-9]|1[0-2])$/', $inputDate)) {
        return 'Year-Month';
    } elseif (preg_match('/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/', $inputDate)) {
        return 'Year-Month-Day';
    }elseif (preg_match('/^(0[1-9]|[12]\d|3[01])-(0[1-9]|1[0-2])-\d{4}$/', $inputDate)) {
        return 'Year-Month-Day';
    } else {
        return 'Invalid date format';
    }
}
function validateServerTime($inputDate, $expectedFormats = ['Y-m-d H:i:s', 'd-m-Y H:i']) {
    if (empty($inputDate)) {
        return false; // Invalid if empty
    }
    foreach ($expectedFormats as $format) {
        $date = DateTime::createFromFormat($format, $inputDate);
        if ($date && $date->format($format) === $inputDate) {
            return $format; // Return matched format
        }
    }
    return null;
}
function isValidDateTimeWithStrtotime($inputDate) {
    // Check if the input can be converted to a valid timestamp
    $timestamp = strtotime($inputDate);

    // If the timestamp is a valid number (not false), it's a valid datetime
    if ($timestamp !== false) {
        return true;
    }

    return false;  // Invalid datetime
}
//echo json_encode($records, JSON_INVALID_UTF8_IGNORE);