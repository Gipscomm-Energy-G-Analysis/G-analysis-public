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
// <---29-7-2021--
    function saveDashboardSelect(){
        try{
            global $conn;
            $arData = $_POST['arData'];
            $arData = json_decode($arData);
            if(count($arData)>0){
                // foreach($arData as $key => $val){
                //     $insertQuery = "Insert into dashboardSelectOption value"
                // }
                echo "working";
            }
            // echo count(json_decode($arData));
            die;
        }
        catch(Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }  
    }

}

$obj = new dashboardControllerOperations();
?>