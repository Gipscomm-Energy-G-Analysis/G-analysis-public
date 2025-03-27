<?php

error_reporting (-1);
ini_set ('display_errors', 'On');

require '..\..\/php/DbOperations.php';

$nameDB = $_POST['nameDB'];
$conn = connectToDB($nameDB);
$position = $_POST['position'];
$username = $_POST['username'];
$tableName='data_value_15m';

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
$checkColumnQuery ="SELECT COUNT(*) AS count FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME ='data_value_15m' AND COLUMN_NAME = 'user_id'";
$columnExist = queryDB($conn, $checkColumnQuery, "read");
if($columnExist[0]['count']=='1'){
    $query = "SELECT dv.data_value_15m_id, dv.time_server, dv.value, dv.power, ch.name AS channel_name FROM data_value_15m dv INNER JOIN channel ch ON dv.channel_id = ch.channel_id WHERE dv.user_id = '$user_id' ";
    $records = queryDB($conn, $query, "read");
}else{
    echo json_encode(["message" => "Something went wrong, Contact with DB Administrator."], JSON_INVALID_UTF8_IGNORE);
    exit;
}

echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
