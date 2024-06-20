<?php
error_reporting(-1);
ini_set ('display_errors', 'On');

require '../../php/DbOperations.php';

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
            $expand_view = isset($_POST['expand_view']) ? $_POST['expand_view'] : '0' ;
            $outside_table_checkbox = isset($_POST['outside_table_checkbox']) ? $_POST['outside_table_checkbox'] : '0';
            $outside_table_input_height =  isset($_POST['outside_table_input_height']) ? $_POST['outside_table_input_height'] : '';
            $outside_table_input_width =  isset($_POST['outside_table_input_width']) ? $_POST['outside_table_input_width']: '';
            $outside_chart_display = isset($_POST['outside_chart_display']) ? $_POST['outside_chart_display']: '';
            $table_outer_table_limit_column = isset($_POST['table_outer_table_limit_column']) ? $_POST['table_outer_table_limit_column'] : '';
            $height = $_POST['height'];
            $width = $_POST['width'];
            $input_height = $_POST['input_height'];
            $input_width = $_POST['input_width'];
            $record_type_of_tile = $_POST['record_type_of_tile'];
            $type_data_tile = $_POST['type_data_tile'];
            $table_other = $_POST['table_other'];
            $mst_id = isset($queryData['mst_id']) ?  $queryData['mst_id'] : '';
            $name_val = isset($queryData['name_val']) ? $queryData['name_val'] : '';
            $energy_layer_filter = isset($queryData['select_filter_day_week']) ?  $queryData['select_filter_day_week'] : '';
            $energy_layer_range = isset($queryData['input_val_week_day']) ?  $queryData['input_val_week_day'] : '';
            $table_type = isset($queryData['table_type']) ? $queryData['table_type'] : '' ;
            $table_filter = isset($queryData['table_filter']) ? $queryData['table_filter']  : '' ;
            // echo $mst_id; die;
            // echo str_replace("total_records","",$html); die;

            
            $query_data_records = str_replace("'",'',$query_data_records);
            $query_max_val = str_replace("'",'',$query_max_val);
        //   print_r($query_max_val);

        
            $insertQuery = "INSERT into tableFormat (number_records,pages_count,page_value,type,row_click,query_data_records,query_max_val,tile_title,tile_html,height,width,input_height,input_width,tile_record_type,tile_data_type,username,table_other,mst_id,expand_view,outside_tile_checkbox,outside_tile_input_height,outside_tile_input_width,outside_tile_chart_display,outer_table_column_limit,energy_layer_model_name,energy_layer_filter,energy_layer_range,table_type,table_filter ) ";

            $insertQuery .= "VALUES ($number_records,$pages_count,$page_value,'$type','$row_click','$query_data_records','$query_max_val','$title','$html','$height','$width','$input_height','$input_width','$record_type_of_tile','$type_data_tile','$username','$table_other', '$mst_id' ,'$expand_view',$outside_table_checkbox,'$outside_table_input_height','$outside_table_input_width','$outside_chart_display','$table_outer_table_limit_column','$name_val','$energy_layer_filter','$energy_layer_range','$table_type','$table_filter') ";
           //  echo $insertQuery; 
             //die;
 //die('check query');
            $insertRecord = queryDB($conn, $insertQuery, "write");

            $selectMaxId = "SELECT MAX(id) as max_id from tableFormat ";
            $maxResult = queryDB($conn, $selectMaxId, "read");

            // <----23-11-2021--
            $totalQuery = "SELECT * from tableFormat ";
            $totalResult = queryDB($conn, $totalQuery, "read");
            $totalResult = count($totalResult);

            $last_id = $maxResult[0]['max_id'];
            // <----6-1-2022--
            // $connGipscomm = connectToDB("gipscomm");
            // $selectMaxIdGipscomm = "SELECT MAX(id) as max_id from tableFormat ";
            // $maxResultGipscomm = queryDB($connGipscomm, $selectMaxIdGipscomm, "read");
            // // echo json_encode($maxResultGipscomm); die;
            // if($selectMaxIdGipscomm != null){
            //     $last_id = $maxResultGipscomm[0]['max_id'] + $maxResult[0]['max_id']; 
            // }
            // $conn = connectToDB($_POST['nameDB']);
            // $last_id_val = $maxResult[0]['max_id'];
            // --end->
            $updatePriority = "UPDATE tableFormat set priority = '$last_id' where id = '$last_id' ";
            $updatePriorityResult = queryDB($conn, $updatePriority, "write");
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

    public function saveTableFormatExpandView(){
        try {
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
            $mst_id = isset($queryData['mst_id']) ?  $queryData['mst_id'] : '';
            $name_val = isset($queryData['name_val']) ? $queryData['name_val'] : '';
            $energy_layer_filter = isset($queryData['select_filter_day_week']) ?  $queryData['select_filter_day_week'] : '';
            $energy_layer_range = isset($queryData['input_val_week_day']) ?  $queryData['input_val_week_day'] : '';
            $query_data_records = str_replace("'",'',$query_data_records);
            $query_max_val = str_replace("'",'',$query_max_val);
            $expand_view = $_POST['expand_view'];
            $table_type = isset($queryData['table_type']) ? $queryData['table_type'] : '' ;
            $table_filter = isset($queryData['table_filter']) ? $queryData['table_filter']  : '' ;

            $insertQuery = "INSERT into tableFormat (number_records,pages_count,page_value,type,row_click,query_data_records,query_max_val,tile_title,tile_html,height,width,input_height,input_width,tile_record_type,tile_data_type,username,table_other,mst_id,energy_layer_model_name,energy_layer_filter,energy_layer_range,expand_view,table_type,table_filter ) ";
            $insertQuery .= "VALUES ($number_records,$pages_count,$page_value,'$type','$row_click','$query_data_records','$query_max_val','$title','$html','$height','$width','$input_height','$input_width','$record_type_of_tile','$type_data_tile','$username','$table_other', '$mst_id' ,'$name_val','$energy_layer_filter','$energy_layer_range','$expand_view','$table_type','$table_filter') ";
            // echo $insertQuery; die;
            $insertRecord = queryDB($conn, $insertQuery, "write");

            $selectMaxId = "SELECT MAX(id) as max_id from tableFormat ";
            $maxResult = queryDB($conn, $selectMaxId, "read");

            // <----07-04-2022--
            $totalQuery = "SELECT * from tableFormat ";
            $totalResult = queryDB($conn, $totalQuery, "read");
            $totalResult = count($totalResult);

            $last_id = $maxResult[0]['max_id'];

            $updatePriority = "UPDATE tableFormat set priority = '$last_id' where id = '$last_id' ";
            $updatePriorityResult = queryDB($conn, $updatePriority, "read");

            if($insertQuery){
                return array('Staus' => 200 , 'Message' => 'Successfully Inserted','max_id'=>$maxResult);
            }
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }

    // <----24-12-2021---
    public function saveTableFormatProductAutomatic(){
        try{
            global $conn;
            // $conn = connectToDB("gipscomm");
            $nameDB = $_POST['nameDB'];
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
            $expand_view = isset($_POST['expand_view']) ? $_POST['expand_view'] : '' ;
            $outside_table_checkbox =  isset($_POST['outside_table_checkbox']) ? $_POST['outside_table_checkbox'] : '';
            $outside_table_input_height =  isset($_POST['outside_table_input_height']) ? $_POST['outside_table_input_height'] : '';
            $outside_table_input_width =  isset($_POST['outside_table_input_width']) ? $_POST['outside_table_input_width']: '';
            $outside_chart_display = isset($_POST['outside_chart_display']) ? $_POST['outside_chart_display']: '';
            $table_outer_table_limit_column = isset($_POST['table_outer_table_limit_column']) ? $_POST['table_outer_table_limit_column'] : '';
            $height = $_POST['height'];
            $width = $_POST['width'];
            $input_height = $_POST['input_height'];
            $input_width = $_POST['input_width'];
            $record_type_of_tile = $_POST['record_type_of_tile'];
            $type_data_tile = $_POST['type_data_tile'];
            $table_other = $_POST['table_other'];
            $prd_all_columns_automatic = isset($_POST['prd_all_columns_automatic']) ? serialize(json_decode($_POST['prd_all_columns_automatic'])) : '';
            $prd_all_columns_type = isset($_POST['columnDataType']) ? serialize(json_decode($_POST['columnDataType'])) : '';
            $db_table = $_POST['db_table'];
            // echo str_replace("total_records","",$html); die;
            // echo $prd_all_columns_automatic;  die;
            
            $query_data_records = str_replace("'",'',$query_data_records);
            $query_max_val = str_replace("'",'',$query_max_val);

        
            $insertQuery = "INSERT into tableFormat (number_records,pages_count,page_value,type,row_click,query_data_records,query_max_val,tile_title,tile_html,expand_view,outside_tile_checkbox,outside_tile_input_height,outside_tile_input_width,outside_tile_chart_display,outer_table_column_limit,height,width,input_height,input_width,tile_record_type,tile_data_type,username,table_other,database_name,prd_all_columns_automatic,prd_all_columns_type_automatic,database_table ) ";
            $insertQuery .= "VALUES ($number_records,$pages_count,$page_value,'$type','$row_click','$query_data_records','$query_max_val','$title','$html','$expand_view',$outside_table_checkbox,'$outside_table_input_height','$outside_table_input_width','$outside_chart_display','$table_outer_table_limit_column','$height','$width','$input_height','$input_width','$record_type_of_tile','$type_data_tile','$username','$table_other','$nameDB','$prd_all_columns_automatic','$prd_all_columns_type','$db_table') ";
            // echo $insertQuery; die;
            $insertRecord = queryDB($conn, $insertQuery, "write");

            $selectMaxId = "SELECT MAX(id) as max_id from tableFormat ";
            $maxResult = queryDB($conn, $selectMaxId, "read");

            // <----23-11-2021--
            $totalQuery = "SELECT * from tableFormat ";
            $totalResult = queryDB($conn, $totalQuery, "read");
            $totalResult = count($totalResult);

            $last_id = $maxResult[0]['max_id'];
            // <---5-1-2022--
            // $nameDB = $_POST['nameDB'];
            // $connTable = connectToDB($nameDB);
            // $getResult = "SELECT MAX(id) as max_id from tableFormat ";
            // $result = sqlsrv_query($connTable,$getResult);
            // $dataResult = [];
            // if($result != false)
            // {
            //     while( $row = sqlsrv_fetch_array( $result, SQLSRV_FETCH_ASSOC ) ) {
            //         $dataResult[] = $row ;
            //     };
            //     // echo json_encode(count($dataResult)); die;
            //     if(count($dataResult) > 0)
            //     {
            //         $last_id = $dataResult[0]['max_id'] + $maxResult[0]['max_id']; 
            //     }
            //     // echo json_encode($row); die;
            // }
            
            // $conn = connectToDB("gipscomm");
            // $last_id_val = $maxResult[0]['max_id'];
            // --end-->
            $updatePriority = "UPDATE tableFormat set priority = '$last_id' where id = '$last_id' ";
            $updatePriorityResult = queryDB($conn, $updatePriority, "write");
            // --end-->

            if($insertQuery) {
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
    // --end--->

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
            $outside_table_checkbox =  isset($_POST['outside_table_checkbox']) ? $_POST['outside_table_checkbox'] : '';
            $outside_table_input_height =  isset($_POST['outside_table_input_height']) ? $_POST['outside_table_input_height'] : '';
            $outside_table_input_width =  isset($_POST['outside_table_input_width']) ? $_POST['outside_table_input_width']: '';
            $outside_chart_display = isset($_POST['outside_chart_display']) ? $_POST['outside_chart_display']: '';
            $table_outer_table_limit_column = isset($_POST['table_outer_table_limit_column']) ? $_POST['table_outer_table_limit_column'] : '';
            $height = $_REQUEST['height'];
            $width = $_REQUEST['width'];
            $input_height = $_REQUEST['input_height'];
            $input_width = $_REQUEST['input_width'];
            $record_type_of_tile = $_POST['record_type_of_tile'];
            $type_data_tile = $_POST['type_data_tile'];
            $table_other = $_POST['table_other'];
            $expand_view = isset($_POST['expand_view'])  ? $_POST['expand_view'] : 0;
            $mst_id = isset($queryData['mst_id']) ?  $queryData['mst_id'] : '';
            $name_val = isset($queryData['name_val']) ? $queryData['name_val'] : '';
            $energy_layer_filter = isset($queryData['select_filter_day_week']) ?  $queryData['select_filter_day_week'] : '';
            $energy_layer_range = isset($queryData['input_val_week_day']) ?  $queryData['input_val_week_day'] : '';
            
            $table_type = isset($queryData['table_type']) ? $queryData['table_type'] : '';
            $table_filter = isset($queryData['table_filter']) ? $queryData['table_filter'] : '';

            $query_data_records = str_replace("'",'',$query_data_records);
            $query_max_val = str_replace("'",'',$query_max_val);
            // if (strpos($html, 'expand_view') !== false) {
            //     $html=str_replace('tiles-click','',$html);
            // }

            // $tile_html = $_REQUEST['tile_html'];
            $updateQuery = "UPDATE tableFormat set number_records =$number_records,pages_count=$pages_count,page_value=$page_value,type='$type',row_click='$row_click',query_data_records = '$query_data_records',query_max_val = '$query_max_val',tile_title='$title',tile_html='$html', expand_view = '$expand_view', outside_tile_checkbox = '$outside_table_checkbox', outside_tile_input_height = '$outside_table_input_height', outside_tile_input_width='$outside_table_input_width', outer_table_column_limit = '$table_outer_table_limit_column', height='$height', width='$width', input_height = '$input_height', input_width = '$input_width' ,table_other = '$table_other' , tile_record_type='$record_type_of_tile', mst_id = '$mst_id', energy_layer_model_name = '$name_val',energy_layer_filter = '$energy_layer_filter', energy_layer_range = '$energy_layer_range' , table_type = '$table_type',table_filter = '$table_filter' WHERE id = $id AND username ='$username' ";
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

    // <---3-1-2022--
    public function updateTileRecordProductAutomatic(){
        try{
            // $conn = connectToDB("gipscomm");
           
            global $conn;
            $nameDB = $_POST['nameDB'];
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
            $expand_view = isset($_POST['expand_view']) ? $_POST['expand_view'] : '0' ;
            $outside_table_checkbox = isset($_POST['outside_table_checkbox']) ? $_POST['outside_table_checkbox'] : '0';
            $outside_table_input_height =  isset($_POST['outside_table_input_height']) ? $_POST['outside_table_input_height'] : '';
            $outside_table_input_width =  isset($_POST['outside_table_input_width']) ? $_POST['outside_table_input_width']: '';
            $outside_chart_display = isset($_POST['outside_chart_display']) ? $_POST['outside_chart_display']: '';
            $table_outer_table_limit_column = isset($_POST['table_outer_table_limit_column']) ? $_POST['table_outer_table_limit_column'] : '';
            $height = $_REQUEST['height'];
            $width = $_REQUEST['width'];
            $input_height = $_REQUEST['input_height'];
            $input_width = $_REQUEST['input_width'];
            $record_type_of_tile = $_POST['record_type_of_tile'];
            $type_data_tile = $_POST['type_data_tile'];
            $table_other = $_POST['table_other'];
            $expand_view = isset($_POST['expand_view'])  ? $_POST['expand_view'] : 0;
            $prd_all_columns_automatic = isset($_POST['prd_all_columns_automatic']) ? serialize(json_decode($_POST['prd_all_columns_automatic'])) : '';
            $prd_all_columns_type = isset($_POST['columnDataType']) ? serialize(json_decode($_POST['columnDataType'])) : '';
            $db_table = $_POST['db_table'];
            

            $table_type = isset($queryData['table_type']) ? $queryData['table_type'] : '';
            $table_filter = isset($queryData['table_filter']) ? $queryData['table_filter'] : '';

            // echo $table_filter; die;
            $query_data_records = str_replace("'",'',$query_data_records);
            $query_max_val = str_replace("'",'',$query_max_val);

            // $tile_html = $_REQUEST['tile_html'];
            $updateQuery = "UPDATE tableFormat set number_records =$number_records,pages_count=$pages_count,page_value=$page_value,type='$type',row_click='$row_click',query_data_records = '$query_data_records',query_max_val = '$query_max_val',tile_title='$title',tile_html='$html', expand_view = '$expand_view', outside_tile_checkbox = '$outside_table_checkbox', outside_tile_input_height = '$outside_table_input_height', outside_tile_input_width='$outside_table_input_width', outer_table_column_limit = '$table_outer_table_limit_column', height='$height', width='$width', input_height = '$input_height', input_width = '$input_width' ,table_other = '$table_other' , tile_record_type='$record_type_of_tile',database_name = '$nameDB',prd_all_columns_automatic = '$prd_all_columns_automatic',prd_all_columns_type_automatic = '$prd_all_columns_type',database_table = '$db_table' ,table_type = '$table_type' ,table_filter = '$table_filter' WHERE id = $id AND username ='$username' ";
            // echo $updateQuery; die;
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
    // --end--->

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
            $type = $_POST['type'];
            $mst_id = isset($_POST['mst_id']) ? $_POST['mst_id'] : '';
            $analgen_config_id = isset($_POST['analgen_config_id']) ? $_POST['analgen_config_id'] : '';
            $chart_filter = $_POST['chart_record_filter'];
            $chart_type = $_POST['chart_type'];
            $chart_time_interval = isset($_POST['chart_time_interval']) ? $_POST['chart_time_interval'] : '';
            $expand_view = $_POST['expand_view'];
            $outside_chart_checkbox =  $_POST['outside_chart_checkbox'];
            $outside_chart_input_height =  $_REQUEST['outside_chart_input_height'];
            $outside_chart_input_width =  $_REQUEST['outside_chart_input_width'];
            $outside_chart_display = $_POST['outside_chart_display'];
            $chart_outer_table_limit_column = $_POST['chart_outer_table_limit_column'];
            $saved_graph_id = isset($_POST['saved_graph_id']) ? $_POST['saved_graph_id'] : '';
            $live_graph = isset($_POST['live_graph']) ? $_POST['live_graph'] : '';
            $graph_table_option = isset($_POST['graph_table_option']) ? $_POST['graph_table_option'] : '';
            $mst_table_option = isset($_POST['mst_table_option']) ? $_POST['mst_table_option'] : '';
            $auto_refresh = isset($_POST['auto_refresh']) ? $_POST['auto_refresh'] : '';


            $insertQuery = "INSERT into tableFormat (type,tile_title,tile_html,height,width,input_height,input_width,tile_record_type,tile_data_type,username,mst_id,chart_filter,chart_type,chart_time_interval,expand_view,outside_tile_checkbox,outside_tile_input_height,outside_tile_input_width,outside_tile_chart_display,outer_table_column_limit,prd_anlagen_config_id,saved_graph_id,live_graph,graph_table_option,mst_table_option,auto_refresh ) ";
            $insertQuery .= "VALUES ('$type','$title','$html','$height','$width','$input_height','$input_width','$record_type_of_tile','$type_data_tile','$username','$mst_id','$chart_filter','$chart_type','$chart_time_interval',$expand_view,$outside_chart_checkbox,'$outside_chart_input_height','$outside_chart_input_width','$outside_chart_display','$chart_outer_table_limit_column','$analgen_config_id','$saved_graph_id','$live_graph','$graph_table_option','$mst_table_option','$auto_refresh') ";

            $insertRecord = queryDB($conn, $insertQuery, "write");



            $selectMaxId = "SELECT MAX(id) as max_id from tableFormat ";
            $maxResult = queryDB($conn, $selectMaxId, "read");

            
            $html=str_replace('lineChart-none','lineChart'.$maxResult[0]['max_id'],$html);
            $html=str_replace('areaChart-none','areaChart'.$maxResult[0]['max_id'],$html);
            $html=str_replace('barChart-none','barChart'.$maxResult[0]['max_id'],$html);
            $html=str_replace('pieChart-none','pieChart'.$maxResult[0]['max_id'],$html);
            if (strpos($html, 'chart_tile_expand_view') !== false) {
                $html=str_replace('tiles-click','',$html);
            }
            

            // <----23-11-2021--
            $totalQuery = "SELECT * from tableFormat ";
            $totalResult = queryDB($conn, $totalQuery, "read");
            $totalResult = count($totalResult);

            $last_id = $maxResult[0]['max_id'];
            $updatePriority = "UPDATE tableFormat set priority = '$last_id',tile_html='$html' where id = '$last_id' ";
            $updatePriorityResult = queryDB($conn, $updatePriority, "write");
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


    // <----22-02-2022---
    public function saveTileChartEnergyLayer(){
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
            $type = $_POST['type'];
            $energy_type_dashboard_chart = $_POST['energy_type_dashboard_chart'];

            $analgen_config_id = isset($_POST['analgen_config_id']) ? $_POST['analgen_config_id'] : '';

            
            $energy_layer_filter = isset($_POST['chart_record_filter']) ? $_POST['chart_record_filter'] : '';
            $energy_chart_layer_range = $_POST['energy_chart_layer_range'];
            $energy_type_dashboard_chart = $_POST['energy_type_dashboard_chart'];

            $chart_type = $_POST['chart_type'];

            $mst_id = '';
            if($chart_type == 'line_chart')
            {
                $mst_id = isset($_POST['mst_id']) ? serialize($_POST['mst_id']) : '';
            }
            else{
                $mst_id = isset($_POST['mst_id']) ? $_POST['mst_id'][0] : '';
            }

            $chart_time_interval = isset($_POST['chart_time_interval']) ? $_POST['chart_time_interval'] : '';
            $expand_view = $_POST['expand_view'];
            $outside_chart_checkbox =  $_POST['outside_chart_checkbox'];
            $outside_chart_input_height =  $_REQUEST['outside_chart_input_height'];
            $outside_chart_input_width =  $_REQUEST['outside_chart_input_width'];
            $outside_chart_display = $_POST['outside_chart_display'];
            $chart_outer_table_limit_column = $_POST['chart_outer_table_limit_column'];

//            print_r($html);die;
//            print_r($maxResult[0]['max_id']);die;

            $insertQuery = "INSERT into tableFormat (type,tile_title,tile_html,height,width,input_height,input_width,tile_record_type,tile_data_type,username,mst_id,chart_type,chart_time_interval,expand_view,outside_tile_checkbox,outside_tile_input_height,outside_tile_input_width,outside_tile_chart_display,outer_table_column_limit,prd_anlagen_config_id,energy_layer_filter,energy_layer_range,energy_chart_type ) ";
            $insertQuery .= "VALUES ('$type','$title','$html','$height','$width','$input_height','$input_width','$record_type_of_tile','$type_data_tile','$username','$mst_id','$chart_type','$chart_time_interval',$expand_view,$outside_chart_checkbox,'$outside_chart_input_height','$outside_chart_input_width','$outside_chart_display','$chart_outer_table_limit_column','$analgen_config_id','$energy_layer_filter','$energy_chart_layer_range','$energy_type_dashboard_chart') ";
            // echo $insertQuery; die;
            $insertRecord = queryDB($conn, $insertQuery, "write");


            $selectMaxId = "SELECT MAX(id) as max_id from tableFormat ";
            $maxResult = queryDB($conn, $selectMaxId, "read");
            
            $html=str_replace('lineChart-none','lineChart'.$maxResult[0]['max_id'],$html);
            $html=str_replace('areaChart-none','areaChart'.$maxResult[0]['max_id'],$html);
            $html=str_replace('barChart-none','barChart'.$maxResult[0]['max_id'],$html);
            $html=str_replace('pieChart-none','pieChart'.$maxResult[0]['max_id'],$html);
            if (strpos($html, 'chart_tile_expand_view') !== false) {
                $html=str_replace('tiles-click','',$html);
            }

            // print_r($html);  die;
            // <----23-11-2021--
            $totalQuery = "SELECT * from tableFormat ";
            $totalResult = queryDB($conn, $totalQuery, "read");
            $totalResult = count($totalResult);

            $last_id = $maxResult[0]['max_id'];
            $updatePriority = "UPDATE tableFormat set priority = '$last_id',tile_html='$html' where id = '$last_id' ";
            $updatePriorityResult = queryDB($conn, $updatePriority, "write");
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
    // --end--->


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
            $mst_Id = isset($_POST['mst_ID']) ? $_POST['mst_ID'] : '';
            $analgen_config_id = isset($_POST['analgen_config_id']) ? $_POST['analgen_config_id'] : '';
            $type = $_POST['type'];
            $data_table_other = $_POST['data_table_other'];
            $insertQuery = "INSERT into tableFormat (type,tile_title,tile_html,height,width,input_height,input_width,tile_record_type,tile_data_type,username,mst_iD,table_other,prd_anlagen_config_id ) ";
            $insertQuery .= "VALUES ('$type','$title','$html','$height','$width','$input_height','$input_width','$record_type_of_tile','$type_data_tile','$username', '$mst_Id' ,'$data_table_other','$analgen_config_id') ";
            $insertRecord = queryDB($conn, $insertQuery, "write");

            $selectMaxId = "SELECT MAX(id) as max_id from tableFormat ";
            $maxResult = queryDB($conn, $selectMaxId, "read");

            // <----23-11-2021--
            $totalQuery = "SELECT * from tableFormat ";
            $totalResult = queryDB($conn, $totalQuery, "read");
            $totalResult = count($totalResult);

            $last_id = $maxResult[0]['max_id'];
            $updatePriority = "UPDATE tableFormat set priority = '$last_id' where id = '$last_id' ";
            $updatePriorityResult = queryDB($conn, $updatePriority, "write");
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
            $mst_Id = isset($_POST['mst_ID']) ? $_POST['mst_ID'] : '';
            $analgen_config_id = isset($_POST['analgen_config_id']) ? $_POST['analgen_config_id'] : '';
            $data_other = $_POST['data_other'];
            $type = $_POST['type'];
           
            
            // $insertQuery = "INSERT into tableFormat (type,tile_title,tile_html,height,width,input_height,input_width,tile_record_type,tile_data_type,username,mst_iD ) ";
            // $insertQuery .= "VALUES ('$type','$title','$html','$height','$width','$input_height','$input_width','$record_type_of_tile','$type_data_tile','$username', $mst_Id) ";
            
            $updateQuery = "UPDATE tableFormat set tile_title='$title' ,type='$type', tile_html='$html' ,height='$height',width='$width', input_height='$input_height' , input_width = '$input_width' , tile_record_type = '$record_type_of_tile' , tile_data_type = '$type_data_tile', mst_iD = '$mst_Id' ,table_other = '$data_other', prd_anlagen_config_id = '$analgen_config_id' ";
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
            $type = $_POST['type'];
            $mst_id = isset($_POST['mst_id']) ? $_POST['mst_id'] : '';
            $analgen_config_id = isset($_POST['analgen_config_id']) ? $_POST['analgen_config_id'] : '';
            $chart_filter = $_POST['chart_record_filter'];
            $chart_type = $_POST['chart_type'];
            $chart_time_interval = isset($_POST['chart_time_interval']) ? $_POST['chart_time_interval'] : '';

            $expand_view = $_POST['expand_view'];
            $outside_chart_checkbox =  $_POST['outside_chart_checkbox'];
            $outside_chart_input_height =  $_REQUEST['outside_chart_input_height'];
            $outside_chart_input_width =  $_REQUEST['outside_chart_input_width'];

            $chart_outer_table_limit_column = $_POST['chart_outer_table_limit_column'];

            $html=str_replace('lineChart-none','lineChart'.$id,$html);
            $html=str_replace('areaChart-none','areaChart'.$id,$html);
            $html=str_replace('barChart-none','barChart'.$id,$html);
            $html=str_replace('pieChart-none','pieChart'.$id,$html);
            if (strpos($html, 'chart_tile_expand_view') !== false) {
                $html=str_replace('tiles-click','',$html);
            }

            $updateQuery = "UPDATE tableFormat  set type = '$type',tile_title = '$title',tile_html = '$html',height='$height',width='$width' ,input_height='$input_height' ,input_width = '$input_width' ,tile_record_type = '$record_type_of_tile' ,mst_id = '$mst_id' ,chart_filter = '$chart_filter',chart_type = '$chart_type',chart_time_interval = '$chart_time_interval', expand_view = $expand_view , outside_tile_checkbox = $outside_chart_checkbox , outside_tile_input_height = '$outside_chart_input_height', outside_tile_input_width='$outside_chart_input_width', outer_table_column_limit = '$chart_outer_table_limit_column',prd_anlagen_config_id = '$analgen_config_id' ";
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

    // <---2024--
    public function updateDashboardGraphChart(){
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
            $saved_graph_id = $_POST['saved_graph_id'];
            $live_graph = $_POST['live_graph'];
            $graph_table_option = isset($_POST['graph_table_option']) ? $_POST['graph_table_option'] : '';
            $mst_table_option = isset($_POST['mst_table_option']) ? $_POST['mst_table_option'] : '';
            $auto_refresh = isset($_POST['auto_refresh']) ? $_POST['auto_refresh'] : '';
            $record_type_of_tile = $_POST['record_type_of_tile'];
            // $type_data_tile = $_POST['type_data_tile'];
            $type = $_POST['type'];
            $expand_view = $_POST['expand_view'];

            $updateQuery = "UPDATE tableFormat  set type = '$type',tile_title = '$title',tile_html = '$html',height='$height',width='$width' ,input_height='$input_height' ,input_width = '$input_width' ,saved_graph_id = '$saved_graph_id',live_graph = '$live_graph', tile_record_type = '$record_type_of_tile' ,expand_view = $expand_view,graph_table_option = '$graph_table_option',mst_table_option = '$mst_table_option',auto_refresh = '$auto_refresh'";
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

    public function updateDashboardChartEnergyLayer(){
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
            $type = $_POST['type'];
            // $mst_id = isset($_POST['mst_id']) ? serialize($_POST['mst_id']) : '';
            $analgen_config_id = isset($_POST['analgen_config_id']) ? $_POST['analgen_config_id'] : '';
            $chart_filter = isset($_POST['chart_record_filter']) ? $_POST['chart_record_filter'] : '';
            $chart_type = $_POST['chart_type'];

            $mst_id = '';
            if($chart_type == 'line_chart')
            {
                $mst_id = isset($_POST['mst_id']) ? serialize($_POST['mst_id']) : '';
            }
            else{
                $mst_id = isset($_POST['mst_id']) ? $_POST['mst_id'][0] : '';
            }

            $chart_time_interval = isset($_POST['chart_time_interval']) ? $_POST['chart_time_interval'] : '';

            $energy_chart_layer_filter = isset($_POST['energy_chart_layer_filter']) ? $_POST['energy_chart_layer_filter'] : '';
            $energy_chart_layer_range = $_POST['energy_chart_layer_range'];
            $energy_type_dashboard_chart = $_POST['energy_type_dashboard_chart'];


            $expand_view = $_POST['expand_view'];
            $outside_chart_checkbox =  $_POST['outside_chart_checkbox'];
            $outside_chart_input_height =  $_REQUEST['outside_chart_input_height'];
            $outside_chart_input_width =  $_REQUEST['outside_chart_input_width'];

            $chart_outer_table_limit_column = $_POST['chart_outer_table_limit_column'];

            // <--18-4-2022--
            $html=str_replace('lineChart-none','lineChart'.$id,$html);
            $html=str_replace('areaChart-none','areaChart'.$id,$html);
            $html=str_replace('barChart-none','barChart'.$id,$html);
            $html=str_replace('pieChart-none','pieChart'.$id,$html);
            if (strpos($html, 'chart_tile_expand_view') !== false) {
                $html=str_replace('tiles-click','',$html);
            }
            // --end-->

            $updateQuery = "UPDATE tableFormat  set type = '$type',tile_title = '$title',tile_html = '$html',height='$height',width='$width' ,input_height='$input_height' ,input_width = '$input_width' ,tile_record_type = '$record_type_of_tile' ,mst_id = '$mst_id' ,chart_filter = '$chart_filter',chart_type = '$chart_type',chart_time_interval = '$chart_time_interval', expand_view = $expand_view , outside_tile_checkbox = $outside_chart_checkbox , outside_tile_input_height = '$outside_chart_input_height', outside_tile_input_width='$outside_chart_input_width', outer_table_column_limit = '$chart_outer_table_limit_column',prd_anlagen_config_id = '$analgen_config_id', energy_layer_filter = '$energy_chart_layer_filter' , energy_layer_range = '$energy_chart_layer_range', energy_chart_type = '$energy_type_dashboard_chart' ";
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

}

$obj = new dashboardControllerOperations();
