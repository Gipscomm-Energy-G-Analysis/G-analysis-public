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

    // <---15-8-2021---
    public function saveTableFormat(){
        try{
            global $conn;
            $queryData = $_REQUEST['query_data'];
            $number_records = $queryData['number_records']; 
            $pages_count = $queryData['pages_count']; 
            $page_value = $queryData['page_val']; 
            $type = $queryData['type']; 
            $row_click = $queryData['row_click']; 
            $query_data_records = $queryData['query1']; 
            $query_max_val = $queryData['queryMaxValue'];
            $title = $_REQUEST['title'];
            $html = $_POST['tile_html'];
            $height = $_POST['height'];
            $width = $_POST['width'];

            // echo str_replace("total_records","",$html); die;

            
            $query_data_records = str_replace("'",'',$query_data_records);
            $query_max_val = str_replace("'",'',$query_max_val);

            // $getResult = "SELECT * FROM tableFormat where type='$type' ";
            // $gerRecords = queryDB($conn, $getResult, "read");
            // if($gerRecords != '' && count($gerRecords)  > 0){
            //     $updateQuery = "UPDATE tableFormat set number_records = $number_records,pages_count = $pages_count,page_value = $page_value,row_click = '$row_click',query_data_records = '$query_data_records' ,query_max_val = '$query_max_val', tile_title='$title'  WHERE type = '$type' ";
            //     $updateRecord = queryDB($conn, $updateQuery, "write");
            //     if($updateQuery){
            //         return array('Staus' => 200 , 'Message' => 'Successfully Updated');
            //     }
            // }
            // else{
                $insertQuery = "INSERT into tableFormat (number_records,pages_count,page_value,type,row_click,query_data_records,query_max_val,tile_title,tile_html,height,width ) ";
                $insertQuery .= "VALUES ($number_records,$pages_count,$page_value,'$type','$row_click','$query_data_records','$query_max_val','$title','$html','$height','$width') ";
                $insertRecord = queryDB($conn, $insertQuery, "write");
                if($insertQuery){
                    return array('Staus' => 200 , 'Message' => 'Successfully Inserted');
                }
            // }

            // echo json_encode($_REQUEST['query_data']); die;
            die;
        }
        catch(Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    // --end-->
    public function getWidthHeight(){
       
    
        global $conn;
        $id=$_POST['id'];
        $getResult =  "SELECT height,width from tableFormat where=".$id;
        print_r($getResult);
        $dataResult = queryDB($conn, $getResult, "read");
            return array('data'=>$dataResult);
    }
}

$obj = new dashboardControllerOperations();
?>