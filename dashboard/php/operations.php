<?php
error_reporting(-1);
ini_set ('display_errors', 'On');

require '..\..\/php/DbOperations.php';

$nameDB = $_POST['nameDB'];
// $nameDB = 'g000_demo';
$conn = connectToDB($nameDB);
session_start();

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
            $username = $_SESSION['username']; 
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
            $input_height = $_POST['input_height'];
            $input_width = $_POST['input_width'];
            $record_type_of_tile = $_POST['record_type_of_tile'];
            $type_data_tile = $_POST['type_data_tile'];
            $table_other = $_POST['table_other'];
            // echo str_replace("total_records","",$html); die;

            
            $query_data_records = str_replace("'",'',$query_data_records);
            $query_max_val = str_replace("'",'',$query_max_val);

        
            $insertQuery = "INSERT into tableFormat (number_records,pages_count,page_value,type,row_click,query_data_records,query_max_val,tile_title,tile_html,height,width,input_height,input_width,tile_record_type,tile_data_type,username,table_other ) ";
            $insertQuery .= "VALUES ($number_records,$pages_count,$page_value,'$type','$row_click','$query_data_records','$query_max_val','$title','$html','$height','$width','$input_height','$input_width','$record_type_of_tile','$type_data_tile','$username','$table_other') ";
            $insertRecord = queryDB($conn, $insertQuery, "write");

            $selectMaxId = "SELECT MAX(id) as max_id from tableFormat ";
            $maxResult = queryDB($conn, $selectMaxId, "read");

            // <----23-11-2021--
            $totalQuery = "SELECT * from tableFormat ";
            $totalResult = queryDB($conn, $totalQuery, "read");
            $totalResult = count($totalResult);

            $last_id = $maxResult[0]['max_id'];
            $updatePriority = "UPDATE tableFormat set priority = '$totalResult' where id = '$last_id' ";
            $updatePriorityResult = queryDB($conn, $updatePriority, "read");
            // --end-->

            if($insertQuery){
                return array('Staus' => 200 , 'Message' => 'Successfully Inserted','max_id'=>$maxResult);
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

    // <-----31-8-2021---
    public function updateTileRecord(){
        try{
            global $conn;
            $username = $_SESSION['username']; 
            $id = $_REQUEST['id'];
            
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
            $height = $_REQUEST['height'];
            $width = $_REQUEST['width'];
            $input_height = $_REQUEST['input_height'];
            $input_width = $_REQUEST['input_width'];
            $record_type_of_tile = $_POST['record_type_of_tile'];
            $type_data_tile = $_POST['type_data_tile'];
            $table_other = $_POST['table_other'];
            

            $query_data_records = str_replace("'",'',$query_data_records);
            $query_max_val = str_replace("'",'',$query_max_val);

            // $tile_html = $_REQUEST['tile_html'];
            $updateQuery = "UPDATE tableFormat set number_records =$number_records,pages_count=$pages_count,page_value=$page_value,type='$type',row_click='$row_click',query_data_records = '$query_data_records',query_max_val = '$query_max_val',tile_title='$title',tile_html='$html', height='$height', width='$width', input_height = '$input_height', input_width = '$input_width' ,table_other = '$table_other'  WHERE id = $id AND username ='$username' ";
            // echo '<pre>';
            // echo htmlspecialchars($updateQuery);
            // echo '</pre>';
            // die;
            
            $updateRecord = queryDB($conn, $updateQuery, "write");
            if($updateQuery){
                return array('Staus' => 200 , 'Message' => 'Successfully Updated');
            }
            die;
        }
        catch(Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }

    // <---27-8-2021--
    public function deleteTile(){
        try{
            global $conn;
            $username = $_SESSION['username']; 
            $id = $_REQUEST['id'];
            $deleteQuery = "DELETE FROM tableFormat where id = $id AND username = '$username' ";
            $dataResult = queryDB($conn, $deleteQuery, "write");
             
            if($dataResult){
                return array('status'=>200,'msg'=>"Successful Deleted");
            }
            die;
        }
        catch(Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    // --end-->

    public function saveTileChart(){
        try{
            global $conn;
            $username = $_SESSION['username']; 
            $title = $_REQUEST['title'];
            $html = $_POST['tile_html'];
            $height = $_POST['height'];
            $width = $_POST['width'];
            $input_height = $_POST['input_height'];
            $input_width = $_POST['input_width'];
            $record_type_of_tile = $_POST['record_type_of_tile'];
            $type_data_tile = $_POST['type_data_tile'];
            $type = "Measurement";
            $mst_id = $_POST['mst_id'];
            $chart_filter = $_POST['chart_record_filter'];
            $chart_type = $_POST['chart_type'];
            $chart_time_interval = $_POST['chart_time_interval'];
            $expand_view = $_POST['expand_view'];
            $outside_chart_checkbox =  $_POST['outside_chart_checkbox'];
            $outside_chart_input_height =  $_REQUEST['outside_chart_input_height'];
            $outside_chart_input_width =  $_REQUEST['outside_chart_input_width'];
            $outside_chart_display = $_POST['outside_chart_display'];
            $chart_outer_table_limit_column = $_POST['chart_outer_table_limit_column'];


            $insertQuery = "INSERT into tableFormat (type,tile_title,tile_html,height,width,input_height,input_width,tile_record_type,tile_data_type,username,mst_id,chart_filter,chart_type,chart_time_interval,expand_view,outside_tile_checkbox,outside_tile_input_height,outside_tile_input_width,outside_tile_chart_display,outer_table_column_limit ) ";
            $insertQuery .= "VALUES ('$type','$title','$html','$height','$width','$input_height','$input_width','$record_type_of_tile','$type_data_tile','$username',$mst_id,'$chart_filter','$chart_type','$chart_time_interval',$expand_view,$outside_chart_checkbox,'$outside_chart_input_height','$outside_chart_input_width','$outside_chart_display','$chart_outer_table_limit_column') ";
            $insertRecord = queryDB($conn, $insertQuery, "write");

            $selectMaxId = "SELECT MAX(id) as max_id from tableFormat ";
            $maxResult = queryDB($conn, $selectMaxId, "read");

            // <----23-11-2021--
            $totalQuery = "SELECT * from tableFormat ";
            $totalResult = queryDB($conn, $totalQuery, "read");
            $totalResult = count($totalResult);

            $last_id = $maxResult[0]['max_id'];
            $updatePriority = "UPDATE tableFormat set priority = '$totalResult' where id = '$last_id' ";
            $updatePriorityResult = queryDB($conn, $updatePriority, "read");
            // --end-->

            if($insertQuery){
                return array('Staus' => 200 , 'Message' => 'Successfully Inserted' ,'max_id'=>$maxResult);
            }
            die;
        }
        catch(Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    // --end-->
    
    
    // <---08-9-2021---
    public function saveOverallCountTile(){
        try{
            global $conn;
            $username = $_SESSION['username']; 
            $title = $_REQUEST['title'];
            $html = $_POST['tile_html'];
            $height = $_POST['height'];
            $width = $_POST['width'];
            $input_height = $_POST['input_height'];
            $input_width = $_POST['input_width'];
            $record_type_of_tile = $_POST['record_type_of_tile'];
            $type_data_tile = $_POST['type_data_tile'];
            $mst_Id = $_POST['mst_ID'];
            $type = $_POST['type'];
            $data_table_other = $_POST['data_table_other'];
            $insertQuery = "INSERT into tableFormat (type,tile_title,tile_html,height,width,input_height,input_width,tile_record_type,tile_data_type,username,mst_iD,table_other ) ";
            $insertQuery .= "VALUES ('$type','$title','$html','$height','$width','$input_height','$input_width','$record_type_of_tile','$type_data_tile','$username', $mst_Id ,'$data_table_other') ";
            $insertRecord = queryDB($conn, $insertQuery, "write");

            $selectMaxId = "SELECT MAX(id) as max_id from tableFormat ";
            $maxResult = queryDB($conn, $selectMaxId, "read");

            // <----23-11-2021--
            $totalQuery = "SELECT * from tableFormat ";
            $totalResult = queryDB($conn, $totalQuery, "read");
            $totalResult = count($totalResult);

            $last_id = $maxResult[0]['max_id'];
            $updatePriority = "UPDATE tableFormat set priority = '$totalResult' where id = '$last_id' ";
            $updatePriorityResult = queryDB($conn, $updatePriority, "read");
            // --end-->

            if($insertQuery){
                return array('Staus' => 200 , 'Message' => 'Successfully Inserted','max_id'=>$maxResult);
            }
            die;
        }
        catch(Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    // --end-->
    public function updateTileRecordOverallCount(){
        try{
            global $conn;
            $id = $_REQUEST['id'];
            $username = $_SESSION['username']; 
            $title = $_REQUEST['title'];
            $html = $_POST['tile_html'];
            $height = $_POST['height'];
            $width = $_POST['width'];
            $input_height = $_POST['input_height'];
            $input_width = $_POST['input_width'];
            $record_type_of_tile = $_POST['record_type_of_tile'];
            $type_data_tile = $_POST['type_data_tile'];
            $mst_Id = $_POST['mst_ID'];
            $data_other = $_POST['data_other'];
            $type = $_POST['type'];
           
            
            // $insertQuery = "INSERT into tableFormat (type,tile_title,tile_html,height,width,input_height,input_width,tile_record_type,tile_data_type,username,mst_iD ) ";
            // $insertQuery .= "VALUES ('$type','$title','$html','$height','$width','$input_height','$input_width','$record_type_of_tile','$type_data_tile','$username', $mst_Id) ";
            
            $updateQuery = "UPDATE tableFormat set tile_title='$title' ,type='$type', tile_html='$html' ,height='$height',width='$width', input_height='$input_height' , input_width = '$input_width' , tile_record_type = '$record_type_of_tile' , tile_data_type = '$type_data_tile', mst_iD = '$mst_Id' ,table_other = '$data_other' ";
            $updateQuery .= "WHERE id = $id AND username = '$username' ";
            $updateRecord = queryDB($conn, $updateQuery, "write");
            if($updateRecord){
                return array('Staus' => 200 , 'Message' => 'Successfully Updated');
            }
            die;
        }
        catch(Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }

    public function saveDashboardTilePosititon(){
        try{
            global $conn; 
            $data = json_decode($_POST['data'],JSON_INVALID_UTF8_IGNORE);
            $username = $_SESSION['username']; 
            $updateRecord = '';
            if(!empty($data) && count($data) > 0){
                foreach($data as $key){
                    $id =  $key['id'];
                    $positon = $key['position'];
                    $queryUpdate = "UPDATE tableFormat set priority = $positon where id = $id AND username = '$username' ";
                    $updateRecord = queryDB($conn, $queryUpdate, "write");
                    
                }
                return array('Staus' => 200 , 'Message' => 'Successfully Updated');
            }
            die;
        }
        catch(Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }

    // <---7-10-2021--
    public function updateDashboardChart(){
        try{
            global $conn;
            $username = $_SESSION['username']; 
            $id = $_POST['id'];
            $title = $_REQUEST['title'];
            $html = $_POST['tile_html'];
            $height = $_POST['height'];
            $width = $_POST['width'];
            $input_height = $_POST['input_height'];
            $input_width = $_POST['input_width'];
            $record_type_of_tile = $_POST['record_type_of_tile'];
            // $type_data_tile = $_POST['type_data_tile'];
            $type = "Measurement";
            $mst_id = $_POST['mst_id'];
            $chart_filter = $_POST['chart_record_filter'];
            $chart_type = $_POST['chart_type'];
            $chart_time_interval = $_POST['chart_time_interval'];

            $expand_view = $_POST['expand_view'];
            $outside_chart_checkbox =  $_POST['outside_chart_checkbox'];
            $outside_chart_input_height =  $_REQUEST['outside_chart_input_height'];
            $outside_chart_input_width =  $_REQUEST['outside_chart_input_width'];

            $chart_outer_table_limit_column = $_POST['chart_outer_table_limit_column'];

            $updateQuery = "UPDATE tableFormat  set type = '$type',tile_title = '$title',tile_html = '$html',height='$height',width='$width' ,input_height='$input_height' ,input_width = '$input_width' ,tile_record_type = '$record_type_of_tile' ,mst_id = $mst_id ,chart_filter = '$chart_filter',chart_type = '$chart_type',chart_time_interval = '$chart_time_interval', expand_view = $expand_view , outside_tile_checkbox = $outside_chart_checkbox , outside_tile_input_height = '$outside_chart_input_height', outside_tile_input_width='$outside_chart_input_width', outer_table_column_limit = '$chart_outer_table_limit_column' ";
            $updateQuery .= "WHERE id = $id AND username = '$username' ";
            $updateRecord = queryDB($conn, $updateQuery, "write");
            if($updateQuery){
                return array('Staus' => 200 , 'Message' => 'Successfully Updated');
            }
            die;
        }
        catch(Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    // ----end-->

}

$obj = new dashboardControllerOperations();
?>