<?php
error_reporting(-1);
ini_set ('display_errors', 'On');

require '..\..\/php/DbOperations.php';

$nameDB = $_POST['nameDB'];
// $nameDB = 'g000_demo';
$conn = connectToDB($nameDB);

class dashboardControllerOperations {
    public function __construct() {
        $action = $_REQUEST['action'];
        echo json_encode($this->$action());
    }


    function saveDashboardSelect(){
        try{
            global $conn;
            $arDatas = $_POST['arData'];
            $arData = json_decode($arDatas,JSON_INVALID_UTF8_IGNORE);
            if(count($arData) > 0){
                $deleteQuery = "truncate table dashboardSelectOption";
                queryDB($conn, $deleteQuery, "write");
                
                foreach($arData as $key){
                    $div_id_val =  $key['div_id_val'];
                    $description_val = $key['description_val'];
                    $tsql = "INSERT INTO dashboardSelectOption (div_id, description_val) ";
                    $tsql .= "VALUES ('$div_id_val', '$description_val') ";
                    queryDB($conn, $tsql, "write");
                }
                echo "Successfully Inserted";
            }
            die;
        }
        catch(Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }  
    }

}

$obj = new dashboardControllerOperations();
?>