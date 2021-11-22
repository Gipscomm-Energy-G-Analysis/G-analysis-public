<?php
// include_once('dbConnection.php');
error_reporting(-1);
ini_set ('display_errors', 'On');

require '..\..\/php/DbOperations.php';

$nameDB = isset($_POST['nameDB']) ? $_POST['nameDB'] : '';
// $nameDB = 'g000_demo';
session_start();
$conn = connectToDB($nameDB);

class dashboardController {
    public function __construct() {
        $action = $_REQUEST['action'];
        echo json_encode($this->$action());
    }
    public function getDatabaseList(){
        try{
            global $conn;
            $query = "SELECT * FROM mandanten " ;
            $query .= "ORDER BY nameMan " ;

            $records = queryDB ( $conn, $query, "read") ;
            echo json_encode($records, JSON_INVALID_UTF8_IGNORE) ;
            die;
        }
        catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    public function getCountDashBoard()
    {
        try {
            global $conn;
            $date_diff = date('Y-m-d H:i:s', strtotime('-30 days'));
            $current_date = date('Y-m-d');
            //Energy
            $query1 = "SELECT * FROM interneBetriebsdatenHistorie where created_on >=  convert(datetime,'$date_diff',101) And archiviert='true'";
            $records['energy'] = queryDB($conn, $query1, "read");
            $records['energy'] = count($records['energy']);

            //Product
            $query1 = "SELECT * FROM produktionsAnlagenHistorie where created_on >=  convert(datetime,'$date_diff',101) AND iBdeType='1' AND archiviert='true'";
            $records['product'] = queryDB($conn, $query1, "read");
            // echo json_encode($records['product'],JSON_INVALID_UTF8_IGNORE); die;
            $records['product'] = count($records['product']);

            //Mesurement
            $query1 = "SELECT * FROM produktionsAnlagenHistorie where created_on >=  convert(datetime,'$date_diff',101) AND iBdeType='2' AND archiviert='true'";
            $records['mesurement'] = queryDB($conn, $query1, "read");
            $records['mesurement'] = count($records['mesurement']);


            //Enregy Consumed
            $date_diff_on_date = date('Y-m-d', strtotime('-30 days'));
            $eneryConsumed = "SELECT SUM(cast(T2.val as int)) FROM interneBetriebsdatenHistorie As T1 ";
            $eneryConsumed .= "Inner JOIN masseneingabeSucheIMw as T2 ";
            $eneryConsumed .= "ON T1.mstID = T2.mst_ID ";
            $eneryConsumed .= "WHERE T2.on_date >= '$date_diff_on_date' ";
            $eneryConsumed .= "AND T2.on_date <= '$current_date' ";
            $eneryConsumed .= "AND T2.type <= '1' ";
            $eneryConsumed .= "AND T1.deleted <> 'true' ";
            $eneryConsumed.= "AND T1.archiviert ='true' ";
            // echo  $eneryConsumed; die;
            $records['energy_consumed'] = queryDB($conn, $eneryConsumed, "read");
            // echo json_encode( $records['energy_consumed']); die;

            //Energy Not Consumed Table
            //<--Old Code--
            // $eneryNotConsumed = "SELECT * FROM interneBetriebsdatenHistorie As T1 ";
            // $eneryNotConsumed .= "LEFT JOIN masseneingabeSucheIMw as T2 ";
            // $eneryNotConsumed .= "ON T1.mstID = T2.mst_ID ";
            // // $eneryNotConsumed .= "WHERE T1.created_on >= convert(datetime,'$date_diff',101) ";
            // $eneryNotConsumed .= "WHERE T1.deleted <> 'true' ";
            // $eneryNotConsumed.= "AND T1.archiviert ='true' ";
            // $eneryNotConsumed.= "AND T2.mst_ID IS Null ";
            // $dataEnergy = queryDB($conn, $eneryNotConsumed, "read");
            // --end-->
            
            $eneryNotConsumed = "SELECT * FROM interneMesswerteConfig As T1 ";
            $eneryNotConsumed .= "LEFT JOIN ";
            $eneryNotConsumed .= "(SELECT T2.mst_ID as table_2_mst_id, max(cast(val as int)) as val from ";
            $eneryNotConsumed .= "masseneingabeSucheIMw as T2 ";
            $eneryNotConsumed .= "GROUP By T2.mst_id) ";
            $eneryNotConsumed .= "T2 ";
            $eneryNotConsumed .= "ON T1.mst_ID = T2.table_2_mst_id ";
            $eneryNotConsumed .= "LEFT JOIN ";
            $eneryNotConsumed .= "(SELECT T3.mst_ID as table_3_mst_id , T3.nameMSt as mst_name from ";
            $eneryNotConsumed .= "MessstellenAnlagen as T3) ";
            $eneryNotConsumed .= "T3 ";
            $eneryNotConsumed .= "ON T1.mst_ID = T3.table_3_mst_id ";
            $eneryNotConsumed .= "ORDER BY T1.mst_ID Desc ";
            $dataEnergy = queryDB($conn, $eneryNotConsumed, "read");
            // echo json_encode($dataEnergy); die;
            $tr = '';
            if($dataEnergy != '' && count($dataEnergy) > 0){
                foreach($dataEnergy as $key => $value){
                    $tr .= '<tr>';
                    $tr.= "<td>".$value['mst_name']."</td>";
                    if($value['intTp_ID'] == "1"){
                        $tr.= "<td>Days</td>";
                    }
                    else if($value['intTp_ID'] == "2"){
                        $tr.= "<td>Weeks</td>";
                    }
                    else if($value['intTp_ID'] == "3"){
                        $tr.= "<td>Months</td>";
                    }
                    else if($value['intTp_ID'] == "4"){
                        $tr.= "<td>Years</td>";
                    }
                    else{
                        $tr.= "<td></td>";
                    }
                    // tr+= "<td class='text-danger'>"+28.76+ "<i class='ti-arrow-down'></i></td>";
                    if($value['intTp_ID'] == "2" && $value['startWeek'] != ''){
                        $tr.= "<td>".$value['startWeek'].'-'.$value['startDate']."</td>";
                    }
                    else{
                        $tr.= "<td>".$value['startDate']."</td>";
                    }
                    // tr+= "<td class='text-danger'>"+28.76+ "<i class='ti-arrow-down'></i></td>";
                    if($value['val'] == null){
                        $tr.= "<td><label class='badge badge-danger'>Pending </label></td>";
                    }
                    else{
                        $tr.= "<td><label class='badge badge-success'>Active </label></td>"; 
                    }
                    $tr.="</tr>";
                }
            }else{
                 $tr = "<tr><td colspan='4' class='text-center'>No Data</td></tr>";
            }
            $records['energy_not_consumed'] = $tr;

            

            echo json_encode($records,JSON_INVALID_UTF8_IGNORE); 
            die;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
        
    }

    //Get Records Measurement
    public function getNumberRecordsMesurement()
    {
        try{
            global $conn;
            $total_number_records = $_POST['total_number_records'];
            $number_records = isset($_POST['number_records']) ? $_POST['number_records'] : 5;
            $time_interval = $_POST['time_interval'];
            $order_by_val = $_POST['measurement_order_by_val'];
            $page_val = isset($_POST['page_val']) ? $_POST['page_val'] : 1;
            $selected_number_record_measurement = isset($_POST['selected_number_record_measurement']) ? $_POST['selected_number_record_measurement'] : 'false';
            $measurement_type = $_POST['measurement_type'];
            $dataMesaurement = '';
            $queryMaxVal = '';
            $pagesCount = '';
            // <----14-9-2021---
            if($measurement_type == "calculated"){
                $this->getAutomaticTableMeasurementData1();
                die;
            }
            if($measurement_type == "automatic"){
                $this->getAutomaticTableMeasurementData();
                die;
            }
            // --end-->

            if($order_by_val == 'order_by_desc'){
                $order_by_val = "Order by cast(T2.val as int) desc ";
            }
            else if($order_by_val == 'order_by_asc'){
                $order_by_val = "Order by cast(T2.val as int) asc ";
            }

            $search_record = isset($_POST['search_record']) ? $_POST['search_record'] : '';
            $queryTotalRecordCondition = "";
            $queryMainCondition = '';
            if($search_record != ''){
                $queryTotalRecordCondition = "AND T1.mstIMw LIKE '%$search_record%' ";
                $queryMainCondition = "AND T1.mstIMw LIKE '%$search_record%' ";
            }

            //Pagination Code
            $queryTotalRecords = "SELECT TOP($total_number_records) * ";
            $queryTotalRecords .= "FROM produktionsAnlagenConfig as T1 ";
            $queryTotalRecords .= "LEFT JOIN ";
            $queryTotalRecords .= "(SELECT T2.mst_ID as table_2_mst_id, sum(cast(val as int)) as val from ";
            $queryTotalRecords .= "masseneingabeSucheIMw as T2 ";
            $queryTotalRecords .= "GROUP By T2.mst_id) ";
            $queryTotalRecords .= "T2 ";
            $queryTotalRecords .= "ON T1.mst_ID = T2.table_2_mst_id ";
            $queryTotalRecords  .= "where T1.iBdeType='2' ";
            $queryTotalRecords .= "AND T1.intTp_ID = '$time_interval' ";
            $queryTotalRecords .= $queryTotalRecordCondition;
            $queryTotalRecords .= $order_by_val;
            $totalRecordsValue = queryDB($conn, $queryTotalRecords, "read");
            // echo json_encode($totalRecordsValue); die;s
            
            $pagesCount = '';
            $offSetVal = 0;
            if(count($totalRecordsValue) > 0){
               if($total_number_records <= $number_records){
                   $offSetVal = 0;
                   $number_records = $total_number_records;
                   $pagesCount = 1; 
                   $page_val = 1;
               }
               else{

                    if($selected_number_record_measurement == 'true'){
                        $pagesCount = ceil(count($totalRecordsValue) / $number_records);
                        $pagesCount = $pagesCount <= 0 ? 1 : $pagesCount;
                        $page_val = 1;
                        $offSetVal = 0;

                    }
                    else{
                        $pagesCount = ceil(count($totalRecordsValue) / $number_records);
                        $pagesCount = $pagesCount <= 0 ? 1 : $pagesCount;
                        $offSetVal = ($page_val - 1) * $number_records;
                        
                        //Only Valid when User Click on Last page
                        if($page_val == $pagesCount){
                            $number_records = $total_number_records - $offSetVal;
                        }
                    }
                //    echo $number_records;s
               }

            }

            $query1 = "SELECT * ";
            $query1 .= "FROM produktionsAnlagenConfig as T1 ";
            $query1 .= "LEFT JOIN ";
            $query1 .= "(SELECT T2.mst_ID as table_2_mst_id, sum(cast(val as int)) as val from ";
            $query1 .= "masseneingabeSucheIMw as T2 ";
            $query1 .= "GROUP By T2.mst_id) ";
            $query1 .= "T2 ";
            $query1 .= "ON T1.mst_ID = T2.table_2_mst_id ";
            $query1  .= "where T1.iBdeType='2' ";
            $query1 .= "AND T1.intTp_ID = '$time_interval' ";
            $query1 .= $queryMainCondition;
            $query1 .= $order_by_val;
            $query1 .= "offset $offSetVal rows FETCH NEXT $number_records ROWS ONLY ";
            // echo json_encode($query1); die;
            $dataMesaurement = queryDB($conn, $query1, "read");
            
            $records['measurement_html'] = $this->generateHtmlTableMeasurementData($dataMesaurement);

            $records['pagination_html'] =  $this->generatePaginationHtmlMeasurementData($page_val,$pagesCount,$dataMesaurement);

            // echo $pagination_html['paginationHTMl']; die;
            //<---13-8-2021--
            $ar_page_val = isset($_POST['page_val']) ? $_POST['page_val'] : 1;
            $ar_number_records = isset($_POST['number_records']) ? $_POST['number_records'] : 5;
            $ar = array('pages_count' => $pagesCount,'page_val' => $ar_page_val,'number_records' => $ar_number_records,'query1' => $query1 ,'queryMaxValue' => '','row_click' => 'false' , 'type' => 'Measurement');
            $records['query_data'] = $ar;
             // --end-->

            echo json_encode($records,JSON_INVALID_UTF8_IGNORE);
            die;
        }
        catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }

    // <--3-8-2021
    public function rowClickMeasurementTableData(){
        try{
            global $conn;
            $total_number_records = $_POST['total_number_records'];
            $mst_id = $_POST['mst_id'];
            $type = $_POST['data_type'];
            $number_records = $_POST['number_records'];
            $page_val = isset($_POST['page_val']) ? $_POST['page_val'] : 1;
            $selected_number_record_measurement = isset($_POST['selected_number_record_measurement']) ? $_POST['selected_number_record_measurement'] : 'false';
            $order_by_val = $_POST['measurement_order_by_val'];
            $measurement_type = $_POST['measurement_type'];
            // <---15-9-2021----
            if($measurement_type == "automatic"){
                $this->rowClickAutomaticMeasurementTableData();
                die;
            }
            // --end--->

            $date_differnce_five_days = date('Y-m-d', strtotime('-5 days'));
            $current_date = date('Y-m-d');

            if($order_by_val == 'order_by_desc'){
                $order_by_val = "Order by cast(T2.val as int) desc ";
            }
            else if($order_by_val == 'order_by_asc'){
                $order_by_val = "Order by cast(T2.val as int) asc ";
            }

            //Pagination Code 
            $queryTotalPagination = "SELECT TOP($total_number_records) * ";
            $queryTotalPagination .= "FROM produktionsAnlagenConfig as T1 ";
            $queryTotalPagination .= "INNER JOIN ";
            $queryTotalPagination .= "masseneingabeSucheIMw as T2 ";
            $queryTotalPagination .= "ON T1.mst_ID = T2.mst_Id ";
            $queryTotalPagination  .= "where T1.iBdeType='2' ";
            // $queryMaxValue  .= "AND T2.on_date >='$date_differnce_five_days' ";
            // $queryMaxValue  .= "AND T2.on_date <='$current_date' ";
            $queryTotalPagination .= "AND T2.type = '$type' ";
            $queryTotalPagination .= "AND T2.mst_ID = '$mst_id' ";
            $totalRecordsValue = queryDB($conn, $queryTotalPagination, "read");
            
            $pagesCount = '';
            $offSetVal = 0;
            if(count($totalRecordsValue) > 0){
               if($total_number_records <= $number_records){
                    $offSetVal = 0;
                    $number_records = $total_number_records;
                    $pagesCount = 1; 
                    $page_val = 1;
               }
               else{
                    if($selected_number_record_measurement == 'true'){
                        $pagesCount = ceil(count($totalRecordsValue) / $number_records);
                        $pagesCount = $pagesCount <= 0 ? 1 : $pagesCount;
                        $page_val = 1;
                        $offSetVal = 0;

                    }
                    else{ 
                        $pagesCount = ceil(count($totalRecordsValue) / $number_records);
                        $pagesCount = $pagesCount <= 0 ? 1 : $pagesCount;
                        $offSetVal = ($page_val - 1) * $number_records;
                        
                        if($page_val == $pagesCount){
                            $number_records = $total_number_records - $offSetVal;
                        }
                    }
               } 

            }

            //--end-->
            
            $queryMaxValue = "SELECT TOP($total_number_records) max(cast(T2.val as int)) as val ";
            $queryMaxValue .= "FROM produktionsAnlagenConfig as T1 ";
            $queryMaxValue .= "INNER JOIN ";
            $queryMaxValue .= "masseneingabeSucheIMw as T2 ";
            $queryMaxValue .= "ON T1.mst_ID = T2.mst_Id ";
            $queryMaxValue  .= "where T1.iBdeType='2' ";
            // $queryMaxValue  .= "AND T2.on_date >='$date_differnce_five_days' ";
            // $queryMaxValue  .= "AND T2.on_date <='$current_date' ";
            $queryMaxValue .= "AND T2.type = '$type' ";
            $queryMaxValue .= "AND T2.mst_ID = '$mst_id' ";
            // echo json_encode($queryMaxValue); die;
            //<---15-8-2021
            $queryMaximum = $queryMaxValue;
            // --end-->
            $queryMaxValue = queryDB($conn, $queryMaxValue, "read");
            $queryMaxVal = count($queryMaxValue) > 0 ? $queryMaxValue[0]['val'] : '';

            $query1 = "SELECT * ";
            $query1 .= "FROM produktionsAnlagenConfig as T1 ";
            $query1 .= "INNER JOIN ";
            $query1 .= "masseneingabeSucheIMw as T2 ";
            $query1 .= "ON T1.mst_ID = T2.mst_ID ";
            $query1  .= "where T1.iBdeType='2' ";
            // $query1  .= "AND T2.on_date >='$date_differnce_five_days' ";
            // $query1  .= "AND T2.on_date <='$current_date' ";
            $query1 .= "AND T2.type = '$type' ";
            $query1 .= "AND T2.mst_ID = '$mst_id' ";
            //$query1 .= "order by T2.val desc ";
            $query1 .= "$order_by_val ";
            $query1 .= "offset $offSetVal rows FETCH NEXT $number_records ROWS ONLY ";
            $dataMesaurement = queryDB($conn, $query1, "read"); 
            // echo json_encode($date_differnce_five_days); die;

            // <---10-11-2021----
            $queryLastDate = "SELECT TOP(1) * From masseneingabeSucheIMw as T1 ";
            $queryLastDate.= "WHERE T1.mst_ID = '$mst_id' ";
            $queryLastDate.= "AND T1.type = '$type' ";
            $queryLastDate.= "ORDER BY T1.id desc ";
            $queryLastDateData = queryDB($conn, $queryLastDate, "read");
            //--end-->

            $records['measurement_html'] = $this->generateHtmlTableMeasurementData($dataMesaurement,$queryMaxVal);
            $records['pagination_html'] =  $this->generatePaginationHtmlMeasurementData($page_val,$pagesCount,$dataMesaurement,$type,$mst_id);
            
            // <--15-8-2021--
            $ar_page_val = isset($_POST['page_val']) ? $_POST['page_val'] : 1;
            $ar_number_records = isset($_POST['number_records']) ? $_POST['number_records'] : 5;
            $ar = array('pages_count' => $pagesCount,'page_val' => $ar_page_val,'number_records' => $ar_number_records,'query1' => $query1 ,'queryMaxValue' => $queryMaximum,'row_click' => 'true', 'type' => 'Measurement');
            $records['query_data'] = $ar;

            $records['queryLastDate'] = $queryLastDateData;
            // --end-->
           
            echo json_encode($records,JSON_INVALID_UTF8_IGNORE);

           die;
        }
        catch(Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }

    // --end-->

    // <---2-8-2021--
    public function generateHtmlTableMeasurementData($dataMesaurement,$queryMaxVal = false){
        $tr = '';
        $col_span = "";
        if($queryMaxVal == ""){
            $col_span = "colspan='5'";
        }
        else if($queryMaxVal != ''){
            $col_span = "colspan='4'";
        }
        if($dataMesaurement != '' && count($dataMesaurement) > 0){
            foreach($dataMesaurement as $key => $value){
                $style='';
                $class_val = '';
                $unit = '';
                if($queryMaxVal == ""){
                    $class_val = 'class="row_click"';
                }
                else if($queryMaxVal != '' && $queryMaxVal == $value['val']){
                    $style="style='background-color: #f77171'";
                }
                $tr .= "<tr $style $class_val data-mst=".$value['mst_ID']." data-type=".$value['intTp_ID']." data-table-other='false'>";
                
                $tr.= "<td>".$value['mstIMw']."</td>";
                if($value['intTp_ID'] == "1"){
                    $tr.= "<td>Days</td>";
                }
                else if($value['intTp_ID'] == "2"){
                    $tr.= "<td>Weeks</td>";
                }
                else if($value['intTp_ID'] == "3"){
                    $tr.= "<td>Months</td>";
                }
                else if($value['intTp_ID'] == "4"){
                    $tr.= "<td>Years</td>";
                }
                else{
                    $tr.= "<td></td>";
                }

                //Units Checks
                if($value['unt_ID'] == "1"){
                    $unit = "Hrs.";
                }
                else if($value['unt_ID'] == "2"){
                    $unit = "kWh";
                }
                else if($value['unt_ID'] == "3"){
                    $unit = "m³";
                }
                else if($value['unt_ID'] == "4"){
                    $unit = "l";
                }
                else if($value['unt_ID'] == "5"){
                    $unit = "kg";
                }

                // tr+= "<td class='text-danger'>"+28.76+ "<i class='ti-arrow-down'></i></td>";
                if($value['intTp_ID'] == "2" && $value['startWeek'] != ''){
                    if($queryMaxVal != ''){
                        $tr.= "<td>".$value['on_week'].'-'.$value['on_date']."</td>";
                    }
                    else{
                        $tr.= "<td>".$value['startWeek'].'-'.$value['startDate']."</td>";
                    }
                }
                else if($queryMaxVal != ''){
                    $tr.= "<td>".$value['on_date']."</td>";
                }
                else{
                    $tr.= "<td>".$value['startDate']."</td>";
                }
                
                if($value['val'] == null){
                    $tr.= "<td> - </td>";
                    if($queryMaxVal == ""){
                        $tr.= "<td><label class='badge badge-danger'>Pending </label></td>";
                    }
                }
                else{
                    $tr.= "<td>".$value['val'].' '.$unit."</td>";
                    if($queryMaxVal == ""){
                        $tr.= "<td><label class='badge badge-success'>Active </label></td>";
                    }
                }
                $tr.="</tr>";
            }
        }else{
                $tr = "<tr><td $col_span class='text-center'>No Data</td></tr>";
        }
        return $tr;
        // $records['measurement_html'] = $tr;

    }
    public function generatePaginationHtmlMeasurementData($page_val,$pagesCount,$dataMesaurement,$data_type = false ,$mst_id = false){
        try{
            //Pagination Code HTML
            // echo $pagesCount; die;
            if($page_val > 0 && $pagesCount > 0 && $dataMesaurement != '' && count($dataMesaurement) > 0){
                $style_background = '';
                $class_page_count_val = 'page_count_val';
                $style_background_end = '';
                $class_page_count_val_end = 'page_count_val';
                // echo $page_val ; die;
                if($page_val == "1"){
                    $style_background = "style='background: #d6d6d6; color: black'";
                    $class_page_count_val = '';
                    if($pagesCount == "1"){
                        $style_background_end = "style='background: #d6d6d6; color: black'";
                        $class_page_count_val_end = '';  
                    }
                    
                }
                else if($page_val == $pagesCount){
                    $style_background_end = "style='background: #d6d6d6; color: black'";
                    $class_page_count_val_end = '';
                }
                else{
                    $style_background = '';
                    $style_background_end = '';
                }
                $paginationHTMl="<nav aria-label='Page navigation example'>
                    <input type='hidden' id='row_click_table' data_type='$data_type' data_mst='$mst_id'>
                    <div class='pagination_items'>
                            <ul class='pagination'>
                                <li class='page-item $class_page_count_val' data_type='$data_type' data_mst='$mst_id' id='previous_pagination_val'>
                                    <a class='page-link'  $style_background href='javascript:void(0);' aria-label='Previous'>
                                        <span aria-hidden='true'>&laquo;</span>
                                        <span class='sr-only'>Previous</span>
                                    </a>
                                </li>";
                                
                for($i = 1; $i <= $pagesCount; $i++){
                    $active = $i == $page_val ? 'active' : '';
                    $hide_style='display: none';
                    if($i == $page_val){
                        $paginationHTMl.="<li class='page-item'><a class='page-link' href='javascript:void(0);'>Page</a></li>";
                        $hide_style = 'display: block';
                    }
                    $paginationHTMl.="<li style='$hide_style' class='page-item  $active '><input type='number' class='active_background pagination_input_val page-link' data_type='$data_type' data_mst='$mst_id' value='$i'></li>";

                    if($i == $pagesCount){
                        $paginationHTMl.="<li class='page-item'><a class='page-link' href='javascript:void(0);'>of</a></li>";
                        $paginationHTMl.="<li class='page-item'><a class='page-link ' readonly id='last_input_val' href='javascript:void(0);'>$i</a></li>";
                    }
                }
                $paginationHTMl.="<li class='page-item $class_page_count_val_end' data_type='$data_type' data_mst='$mst_id' id='next_pagination_val'>
                                        <a class='page-link' $style_background_end href='javascript:void(0);' aria-label='Next'>
                                            <span aria-hidden='true'>&raquo;</span>
                                            <span class='sr-only'>Next</span>
                                        </a>
                                    </li>";

                //Pagination Select Tag   
                
                $paginationHTMl.="<li class ='page-item'>
                                        <select class='page-link select_pagination' id='measurement_number_record' data_type='$data_type' data_mst='$mst_id'>
                                            <option value='5'>5</option>
                                            <option value='10'>10</option>
                                            <option value='20'>20</option>
                                            <option value='30'>30</option>
                                            <option value='50'>50</option>
                                        </select>
                                    </li>
                                    </ul>
                                </div>
                            </nav>";

                //ScreenShot Code
                $paginationHTMl.="<div id='save_table_format' class='text-center'>
                                    <input type='button' id='modal_open_button' tile-edit='false' class='btn btn-sm btn-success' value='Save & Preview'>
                                </div>";            
                return $paginationHTMl;
                // $records['pagination_html'] = $paginationHTMl;
            }

        }
        catch(Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    // --end-->

    // <---16-8-2021--
    function getTableFormatDashboard(){
        try{
            global $conn;
            $username = $_SESSION['username']; 
            $getResult = "SELECT * from tableFormat WHERE type = 'Measurement' AND username = '$username' order by priority asc";
            $dataResult = queryDB($conn, $getResult, "read");
            if($dataResult != '' && count($dataResult) > 0){

                $records['data'] = $dataResult;
                $records['total_record'] = count($dataResult);
                $dataMeasurement = '';
                if($dataResult[0]['row_click'] == 'false' && $dataResult[0]['query_max_val'] == '' && $dataResult[0]['tile_data_type'] == 'table' && $dataResult[0]['table_other'] == 'false'){
                    //Seacrh Record 
                    
                    $firstPostion =  strpos($dataResult[0]['query_data_records'],'%');
                    $lastPostion = strripos($dataResult[0]['query_data_records'],'%');
                    $subStr = "%";
                    $attachment = "$";
                    if($firstPostion != '' && $lastPostion != '')
                    {
                        // $firstPostionQuery = str_replace($subStr, $attachment.$subStr, $dataResult[0]['query_data_records']);
                        //$firstPostionQuery = str_replace($dataResult[0]['query_data_records'],$attachment, $firstPostion,0);
                        // $firstPostionQuery = substr_replace($dataResult[0]['query_data_records'],$attachment, $lastPostion,0);
                        $firstPostionQuery= substr_replace($dataResult[0]['query_data_records'],$attachment,$firstPostion,1);
                        // $firstPostionQuery = str_replace($subStr, $attachment, $dataResult[0]['query_data_records'],0);
                        
                        $firstPostionQuery=str_replace('%',"%'", $firstPostionQuery);
                        $firstPostionQuery=str_replace('$',"'%", $firstPostionQuery);
                        $dataMeasurement = queryDB($conn, $firstPostionQuery, "read");
                    }
                    else{
                        $dataMeasurement = queryDB($conn, $dataResult[0]['query_data_records'], "read");
                    }
                    $dashboardMeasurementHtml = $this->dashboardMeasurementHtml($dataMeasurement);
                    $records['dashboardMeasurementHtml'] = $dashboardMeasurementHtml;

                    echo json_encode($records, JSON_INVALID_UTF8_IGNORE);  die;
                }
                else{
                    if($dataResult[0]['tile_data_type'] == 'table' && $dataResult[0]['table_other'] == 'false'){
                        $dataMeasurement = queryDB($conn, $dataResult[0]['query_data_records'], "read");
                        $queryMaxValue = queryDB($conn, $dataResult[0]['query_max_val'], "read");
                        $queryMaxVal = count($queryMaxValue) > 0 ? $queryMaxValue[0]['val'] : '';
                        $dashboardMeasurementHtml = $this->dashboardMeasurementHtml($dataMeasurement,$queryMaxVal);
                        $records['dashboardMeasurementHtml'] = $dashboardMeasurementHtml;

                        echo json_encode($records, JSON_INVALID_UTF8_IGNORE);  die;
                    }
                }
                echo json_encode($records, JSON_INVALID_UTF8_IGNORE);  die;
                die;
            }else{
                $tr = "<thead>";
                $tr .= "<tr>";
                $tr .= "<th>Name</th>";
                $tr .= "<th>Time Interval</th>";
                $tr .= "<th>Created Date</th>";
                $tr .= "<th>Total Units</th>";
                $tr .= "<th>Status</th>";
                $tr .= "</tr>";
                $tr .= "</thead>";
                $tr .= "<tbody><tr><td colspan='5' class='text-center'>No Data</td></tr></tbody>";
                $records['dashboardMeasurementHtml'] = $tr;
                echo json_encode($records, JSON_INVALID_UTF8_IGNORE);  die;
            }
            die;
        }
        catch(Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }

    public function dashboardMeasurementHtml($dataMeasurement,$queryMaxVal = false)
    {
        try{
            $col_span = "";
            $tr = "";
            if($queryMaxVal == ""){
                $col_span = "colspan='5'";
                $tr = "<thead>";
                $tr .= "<tr>";
                $tr .= "<th>Name</th>";
                $tr .= "<th>Time Interval</th>";
                $tr .= "<th>Created Date</th>";
                $tr .= "<th>Total Units</th>";
                $tr .= "<th>Status</th>";
                $tr .= "</tr>";
                $tr .= "</thead>";
            }
            else if($queryMaxVal != ''){
                $col_span = "colspan='4'";
                $tr = "<thead style='background-color: #c5c8d2'>";
                $tr .= "<tr>";
                $tr .= "<th>Name</th>";
                $tr .= "<th>Time Interval</th>";
                $tr .= "<th>Date</th>";
                $tr .= "<th>Units Consumed</th>";
                $tr .= "</tr>";
                $tr .= "</thead>";
            }
            if($dataMeasurement != '' && count($dataMeasurement) > 0){
                $tr .= "<tbody>";
                foreach($dataMeasurement as $key => $value){
                    $unit = '';
                    $style='';
                    if($queryMaxVal != '' && $queryMaxVal == $value['val']){
                        $style="style='background-color: #f77171; padding: 8px !important; font-size: .875rem'";
                    }
                    
                    $tr .= "<tr $style>";
                    
                    $tr.= "<td>".$value['mstIMw']."</td>";
                    if($value['intTp_ID'] == "1"){
                        $tr.= "<td>Days</td>";
                    }
                    else if($value['intTp_ID'] == "2"){
                        $tr.= "<td>Weeks</td>";
                    }
                    else if($value['intTp_ID'] == "3"){
                        $tr.= "<td>Months</td>";
                    }
                    else if($value['intTp_ID'] == "4"){
                        $tr.= "<td>Years</td>";
                    }
                    else{
                        $tr.= "<td></td>";
                    }
    
                    //Units Checks
                    if($value['unt_ID'] == "1"){
                        $unit = "Hrs.";
                    }
                    else if($value['unt_ID'] == "2"){
                        $unit = "kWh";
                    }
                    else if($value['unt_ID'] == "3"){
                        $unit = "m³";
                    }
                    else if($value['unt_ID'] == "4"){
                        $unit = "l";
                    }
                    else if($value['unt_ID'] == "5"){
                        $unit = "kg";
                    }
    
                    // tr+= "<td class='text-danger'>"+28.76+ "<i class='ti-arrow-down'></i></td>";
                    if($value['intTp_ID'] == "2" && $value['startWeek'] != ''){
                        if($queryMaxVal != ''){
                            $tr.= "<td>".$value['on_week'].'-'.$value['on_date']."</td>";
                        }
                        else{
                            $tr.= "<td>".$value['startWeek'].'-'.$value['startDate']."</td>";
                        }
                    }
                    else if($queryMaxVal != ''){
                        $tr.= "<td>".$value['on_date']."</td>";
                    }
                    else{
                        $tr.= "<td>".$value['startDate']."</td>";
                    }
                    
                    if($value['val'] == null){
                        $tr.= "<td> - </td>";
                        if($queryMaxVal == ""){
                            $tr.= "<td><label class='badge badge-danger'>Pending </label></td>";
                        }
                    }
                    else{
                        $tr.= "<td>".$value['val'].' '.$unit."</td>";
                        if($queryMaxVal == ""){
                            $tr.= "<td><label class='badge badge-success'>Active </label></td>";
                        }
                    }
                    $tr.="</tr>";
                }
                $tr.= "</tbody>";
            }else{
                    $tr .= "<tbody><tr><td $col_span class='text-center'>No Data</td></tr></tbody>";
            }
            return $tr;
        }
        catch(Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    // --end-->

    // <---23-4-2021--
    public function generateHtmlMeasurementTiles(){
        try{
            global $conn;
            $username = $_SESSION['username']; 
            $measurement_title =  $_POST['measurement_title'];
            $type =  $_POST['type'];
            $getResult =  "SELECT * from tableFormat Where (tile_data_type='table' OR tile_data_type='overall_count')  AND username = '$username' ";
            $dataResult = queryDB($conn, $getResult, "read");
            $tileHtml = '';
            $total_result = count($dataResult);
            
            $last_id_query = "SELECT max(id) as max_id from tableFormat ";
            $last_id = queryDB($conn, $last_id_query, "read");
            $last_id = $last_id[0]['max_id'] != null ? $last_id[0]['max_id']+1 : 0; 

            // $last_id = 0;
            // if($total_result>0){
            //     $last_id=$dataResult[$total_result-1]['id']+1;
                
            // }
           
            // print_r($last_id);die;
            $url  = isset($_SERVER['HTTPS']) ? 'https://' : 'http://';
            $url .= $_SERVER['SERVER_NAME'];
            $url .= $_SERVER['REQUEST_URI'];
            $url_path =  dirname(dirname($url)); 
            if($dataResult != null && count($dataResult)>0){
                for($i= 0; $i<=$total_result; $i++){
//                    $measurement_title = $total_result[$i]['tile_title'];
                    $style= '';
                    if($i == $total_result){
                         
                        $measurement_title = $_POST['measurement_title'];;
                        $tileHtml .= "<input type='hidden' id='total_records' value='$last_id'>";
                        $tileHtml.="<div class='measurement_html_modal_$last_id'><div style='height: 145px; width: 285px' class='grid-margin actual_tile_height actual_tile_width stretch-card ' id='measurement_count_tile_modal_$last_id' data-i='$last_id' data-type-tile='Measurement'>
                                    <div class='card card-border tile_border'>
                                        <div class='card-body overflow-hide display-flex'>
                                            <div id='' class=''>
                                                <div class='action-modal-button-div'>
                                                    <img src='images/edit.png' class='edit_val edit_btn_tile' data-type-tile='Measurement' data-i-value ='$last_id' style='height: 17px; width: 17px; margin-right: 5px;'>
                                                    <img src='images/delete.png' class='id_val delete_btn_tile' data-type-tile='Measurement' style='height: 17px; width: 17px;'>
                                                </div>
                                                <p class='card-title text-md-center text-xl-left' id='measurement_tile_heading_modal'>$measurement_title</p>
                                                <div class='d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center logo-image-main-div'>
                                               
                                                <img src='images/table_logo.png' class='tile-image-icon tile-image-icon-table'>
                                                </div>  
                                                <p class='mb-0 mt-2 text-success count_result_tile'>(30 days)<span class='text-black ml-1'><small></small></span></p>
                                                
                                            </div>
                                            
                                            <div class='overflow-hide ml-3'>
                                                <div class='col-md-6 p-0 small-table small-table_$last_id' style='display: none'>
                                                    <table class='wish-table table-striped table-bordered m-0' style='display:table'><thead><tr><th>Date</th><th>Consumption</th></tr></thead><tbody><tr><td id='td_table_tile_text_$last_id'></td><td id='td_table_tile_two_text_$last_id'></td></tr></tbody>
                                                    </table>
                                                </div>
                                                <div class='save_table_div_show_table'> 
                                                    <table class='table table-striped table-bordered table-hover' id='measurement_modal_table'>
                                                    </table>                        
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div></div>"; 
                    } 
                    
                    if($i < $total_result){
                        $dataResult[$i]['tile_html']=str_replace('stretch-card','stretch-card hide_table_preview',$dataResult[$i]['tile_html']);
                       $tileHtml.= $dataResult[$i]['tile_html'];
                    } 
                }
                
            }
            else{
                $tileHtml.="<div class='measurement_html_modal_$last_id'><div style='height: 145px; width: 285px' class='grid-margin actual_tile_height actual_tile_width stretch-card ' id='measurement_count_tile_modal_$last_id' data-i='$last_id' data-type-tile='Measurement'>
                                <input type='hidden' id='total_records' value='$last_id'>                
                                <div class='card card-border tile_border'>
                                    <div class='card-body overflow-hide display-flex'>
                                        <div id='' class=''>
                                            <div class='action-modal-button-div'>
                                                <img src='images/edit.png' class='edit_val edit_btn_tile' data-type-tile='Measurement' data-i-value ='$last_id' style='height: 17px; width: 17px; margin-right: 5px'>
                                                <img src='images/delete.png' class='id_val delete_btn_tile' data-type-tile='Measurement' style='height: 17px; width: 17px;'>
                                            </div>
                                            <p class='card-title text-md-center text-xl-left' id='measurement_tile_heading_modal'>".$measurement_title."</p>
                                            <div class='d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center logo-image-tile logo-image-main-div'>
                                            
                                            <img src='images/table_logo.png' class='tile-image-icon tile-image-icon-table'>
                                            </div>  
                                            <p class='mb-0 mt-2 text-success count_result_tile'>(30 days)<span class='text-black ml-1'><small></small></span></p>
                                            
                                        </div>
                                        
                                        <div class='overflow-hide ml-3'>
                                            <div class='col-md-6 p-0 small-table small-table_$last_id' style='display: none'>
                                                <table class='wish-table table-striped table-bordered m-0' style='display:table'><thead><tr><th>Date</th><th>Consumption</th></tr></thead><tbody><tr><td id='td_table_tile_text_$last_id'></td><td id='td_table_tile_two_text_$last_id'></td></tr></tbody>
                                                </table>
                                            </div>
                                            <div class='save_table_div_show_table'> 
                                                <table class='table table-striped table-bordered table-hover' id='measurement_modal_table'>
                                                </table>                        
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div></div>";    
            }
            $records['tile_html'] = $tileHtml;
            $records['data'] = $dataResult;
            $records['total_record'] = count($dataResult) + 1;
            $records['last_id'] = $last_id;
            echo json_encode($records,JSON_INVALID_UTF8_IGNORE);
            die;

        }
        catch(Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }

    }

    // <---22-11-2021---
    public function generateHtmlEnergyTiles(){
        try{
            global $conn;
            $username = $_SESSION['username']; 
            $energy_title =  $_POST['energy_title'];
            $type =  $_POST['type'];
            $getResult =  "SELECT * from tableFormat Where (tile_data_type='table' OR tile_data_type='overall_count')  AND username = '$username' ";
            $dataResult = queryDB($conn, $getResult, "read");
            $tileHtml = '';
            $total_result = count($dataResult);
            
            $last_id_query = "SELECT max(id) as max_id from tableFormat ";
            $last_id = queryDB($conn, $last_id_query, "read");
            $last_id = $last_id[0]['max_id'] != null ? $last_id[0]['max_id']+1 : 0; 
           
            $url  = isset($_SERVER['HTTPS']) ? 'https://' : 'http://';
            $url .= $_SERVER['SERVER_NAME'];
            $url .= $_SERVER['REQUEST_URI'];
            $url_path =  dirname(dirname($url)); 
            if($dataResult != null && count($dataResult)>0){
                for($i= 0; $i<=$total_result; $i++){
//                    $measurement_title = $total_result[$i]['tile_title'];
                    $style= '';
                    if($i == $total_result){
                         
                        $energy_title = $_POST['energy_title'];;
                        $tileHtml .= "<input type='hidden' id='total_records' value='$last_id'>";
                        $tileHtml.="<div class='energy_html_modal_$last_id'><div style='height: 145px; width: 285px' class='grid-margin actual_tile_height actual_tile_width stretch-card ' id='energy_count_tile_modal_$last_id' data-i='$last_id' data-type-tile='Energy'>
                                    <div class='card card-border tile_border'>
                                        <div class='card-body overflow-hide display-flex'>
                                            <div id='' class=''>
                                                <div class='action-modal-button-div'>
                                                    <img src='images/edit.png' class='edit_val edit_btn_tile' data-type-tile='Energy' data-i-value ='$last_id' style='height: 17px; width: 17px; margin-right: 5px;'>
                                                    <img src='images/delete.png' class='id_val delete_btn_tile' data-type-tile='Energy' style='height: 17px; width: 17px;'>
                                                </div>
                                                <p class='card-title text-md-center text-xl-left' id='energy_tile_heading_modal'>$energy_title</p>
                                                <div class='d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center logo-image-main-div'>
                                               
                                                <img src='images/table_logo.png' class='tile-image-icon tile-image-icon-table'>
                                                </div>  
                                                <p class='mb-0 mt-2 text-success count_result_tile'>(30 days)<span class='text-black ml-1'><small></small></span></p>
                                                
                                            </div>
                                            
                                            <div class='overflow-hide ml-3'>
                                                <div class='col-md-6 p-0 small-table small-table_$last_id' style='display: none'>
                                                    <table class='wish-table table-striped table-bordered m-0' style='display:table'><thead><tr><th>Date</th><th>Consumption</th></tr></thead><tbody><tr><td id='td_table_tile_text_$last_id'></td><td id='td_table_tile_two_text_$last_id'></td></tr></tbody>
                                                    </table>
                                                </div>
                                                <div class='save_table_div_show_table'> 
                                                    <table class='table table-striped table-bordered table-hover' id='energy_modal_table'>
                                                    </table>                        
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div></div>"; 
                    } 
                    
                    if($i < $total_result){
                        $dataResult[$i]['tile_html']=str_replace('stretch-card','stretch-card hide_table_preview',$dataResult[$i]['tile_html']);
                       $tileHtml.= $dataResult[$i]['tile_html'];
                    } 
                }
                
            }
            else{
                $tileHtml.="<div class='energy_html_modal_$last_id'><div style='height: 145px; width: 285px' class='grid-margin actual_tile_height actual_tile_width stretch-card ' id='energy_count_tile_modal_$last_id' data-i='$last_id' data-type-tile='Energy'>
                                <input type='hidden' id='total_records' value='$last_id'>                
                                <div class='card card-border tile_border'>
                                    <div class='card-body overflow-hide display-flex'>
                                        <div id='' class=''>
                                            <div class='action-modal-button-div'>
                                                <img src='images/edit.png' class='edit_val edit_btn_tile' data-type-tile='Energy' data-i-value ='$last_id' style='height: 17px; width: 17px; margin-right: 5px'>
                                                <img src='images/delete.png' class='id_val delete_btn_tile' data-type-tile='Energy' style='height: 17px; width: 17px;'>
                                            </div>
                                            <p class='card-title text-md-center text-xl-left' id='energy_tile_heading_modal'>".$energy_title."</p>
                                            <div class='d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center logo-image-tile logo-image-main-div'>
                                            
                                            <img src='images/table_logo.png' class='tile-image-icon tile-image-icon-table'>
                                            </div>  
                                            <p class='mb-0 mt-2 text-success count_result_tile'>(30 days)<span class='text-black ml-1'><small></small></span></p>
                                            
                                        </div>
                                        
                                        <div class='overflow-hide ml-3'>
                                            <div class='col-md-6 p-0 small-table small-table_$last_id' style='display: none'>
                                                <table class='wish-table table-striped table-bordered m-0' style='display:table'><thead><tr><th>Date</th><th>Consumption</th></tr></thead><tbody><tr><td id='td_table_tile_text_$last_id'></td><td id='td_table_tile_two_text_$last_id'></td></tr></tbody>
                                                </table>
                                            </div>
                                            <div class='save_table_div_show_table'> 
                                                <table class='table table-striped table-bordered table-hover' id='energy_modal_table'>
                                                </table>                        
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div></div>";    
            }
            $records['tile_html'] = $tileHtml;
            $records['data'] = $dataResult;
            $records['total_record'] = count($dataResult) + 1;
            $records['last_id'] = $last_id;
            echo json_encode($records,JSON_INVALID_UTF8_IGNORE);
            die;

        }
        catch(Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }

    }
    // ---end--->

    public function getChartDataDashboard(){
        try{
            global $conn;
            $username = $_SESSION['username']; 
            $measurement_title  = $_POST['measurement_title'];
            // $measurement_title  = "Test Chart";

            $getResult =  "SELECT * from tableFormat where tile_data_type ='chart' AND username = '$username' ";
            $dataResult = queryDB($conn, $getResult, "read");
            $tileHtml = '';
            $total_result = count($dataResult);
            $last_id_query = "SELECT max(id) as max_id from tableFormat ";
            $last_id = queryDB($conn, $last_id_query, "read");
            $last_id = $last_id[0]['max_id'] != null ? $last_id[0]['max_id']+1 : 0; 
            // if($total_result>0){
            //     $last_id=$dataResult[$total_result-1]['id']+1;
                
            // }
            
            if($dataResult != null && count($dataResult)>0){
                for($i= 0; $i<=$total_result; $i++){
//                    $measurement_title = $total_result[$i]['tile_title'];
                    $style= '';
                    if($i == $total_result){
                         
                        $measurement_title = $_POST['measurement_title'];
                        $tileHtml .= "<input type='hidden' id='total_records_chart' value='$last_id'>";
                        $tileHtml.="<div class='dashboard_chart_tile_html_$last_id'><div style='height: 290px; width: 570px' class='grid-margin actual_tile_height actual_tile_width stretch-card ' id='measurement_count_tile_modal_chart_$last_id' data-i='$last_id' data-type-tile='Measurement'>
                                    <div class='card card-border tile_border'>
                                        <div class='card-body overflow-hide display-flex pr-0'>
                                            <div id='' class=''>
                                                <div class='action-modal-button-div'>
                                                    <img src='images/edit.png' class='edit_val edit_btn_tile_chart' data-type-tile='Measurement' data-i-value ='$last_id' style='height: 17px; width: 17px; margin-right: 5px;'>
                                                    <img src='images/delete.png' class='id_val delete_btn_tile' data-type-tile='Measurement' style='height: 17px; width: 17px;'>
                                                </div>
                                                <p class='card-title text-md-center text-xl-left' id='measurement_tile_heading_modal'>$measurement_title</p>
                                                <div class='d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center logo-image-main-div'>
                                                <img src='images/chartlogo.jpg' class='tile-image-icon tile-image-icon-table'>
                                                </div>  
                                                <p class='mb-0 mt-2 text-success count_result_tile chart_text_$last_id'>(Chart)<span class='text-black ml-1'><small></small></span></p>
                                                
                                            </div>
                                            
                                            <div class='overflow-hide ml-3 chart-width'>
                                            <div class='col-md-6 p-0 small-table small-table_$last_id' style='display:none'>
                                            <table class='wish-table table-striped table-bordered m-0' style='display:table'><thead><tr><th>Date</th><th>Consumption</th></tr></thead><tbody><tr><td id='td_text_$last_id'></td><td id='td_two_text_$last_id'></td></tr></tbody>
                                            </table>
                                            </div> 
                                                <div class='save_table_div_show_table'> 
                                                    <canvas id='areaChart'></canvas>                       
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div></div>"; 

                        //Tile Outer HTML
                        $tileHtml.="<div class='dashboard_chart_outer_tile_html_$last_id outer_chart_tile_structure'><div style='height: 145px; width: 290px' class='grid-margin actual_tile_height actual_tile_width stretch-card ' id='measurement_count_outer_tile_modal_chart_$last_id' data-i='$last_id' data-type-tile='Measurement'>
                            <div class='card card-border tile_border'>
                                <div class='card-body overflow-hide display-flex pr-0'>
                                    <div id='' class=''>
                                        <div class='action-modal-button-div'>
                                            <img src='images/edit.png' class='edit_val edit_btn_tile_chart' data-type-tile='Measurement' data-i-value ='$last_id' style='height: 17px; width: 17px; margin-right: 5px;'>
                                            <img src='images/delete.png' class='id_val delete_btn_tile' data-type-tile='Measurement' style='height: 17px; width: 17px;'>
                                        </div>
                                        <p class='card-title text-md-center text-xl-left' id='measurement_tile_heading_modal'>$measurement_title</p>
                                        <div class='d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center logo-image-main-div'>
                                        <img src='images/chartlogo.jpg' class='tile-image-icon tile-image-icon-table'>
                                        </div>  
                                        <p class='mb-0 mt-2 text-success count_result_tile chart_text_$last_id'>(Chart)<span class='text-black ml-1'><small></small></span></p>
                                        
                                    </div>
                                    
                                    <div class='overflow-hide ml-3 chart-width'>
                                        <div id='chart_outer_tile_text_heading' style='text-align: center'>
                                            <p class='text-muted'>Outer Tile View</p>
                                        </div>
                                        <div class='col-md-6 p-0 small-table small-table_$last_id'>
                                            <table class='wish-table table-striped table-bordered m-0' style='display:table'><thead><tr><th>Date</th><th>Consumption</th></tr></thead><tbody><tr><td id='td_outer_tile_text_$last_id'></td><td id='td_outer_tile_two_text_$last_id'></td></tr></tbody>
                                            </table>
                                        </div> 
                                        <div class='save_table_div_show_table'> 
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div></div>"; 
                    } 
                    
                    if($i < $total_result){
                        $dataResult[$i]['tile_html']=str_replace('stretch-card','stretch-card hide_table_preview',$dataResult[$i]['tile_html']);
                       $tileHtml.= $dataResult[$i]['tile_html'];
                    } 
                }
                
            }
            else{
                $tileHtml.="<div class='dashboard_chart_tile_html_$last_id'><div style='height: 290px; width: 570px' class='grid-margin actual_tile_height actual_tile_width stretch-card ' id='measurement_count_tile_modal_chart_$last_id' data-i='$last_id' data-type-tile='Measurement'>
                                <input type='hidden' id='total_records_chart' value='$last_id'>                
                                <div class='card card-border tile_border'>
                                    <div class='card-body overflow-hide display-flex pr-0'>
                                        <div id='' class=''>
                                            <div class='action-modal-button-div'>
                                                <img src='images/edit.png' class='edit_val edit_btn_tile_chart' data-type-tile='Measurement' data-i-value ='$last_id' style='height: 17px; width: 17px; margin-right: 5px'>
                                                <img src='images/delete.png' class='id_val delete_btn_tile' data-type-tile='Measurement' style='height: 17px; width: 17px;'>
                                            </div>
                                            <p class='card-title text-md-center text-xl-left' id='measurement_tile_heading_modal'>".$measurement_title."</p>
                                            <div class='d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center'>
                                                <img src='images/chartlogo.jpg' class='tile-image-icon tile-image-icon-table'>
                                            </div> 
                                            <p class='mb-0 mt-2 text-success count_result_tile chart_text_$last_id'>(Chart)<span class='text-black ml-1'><small></small></span></p>
                                            
                                        </div>
                                        
                                        <div class='overflow-hide ml-3 chart-width'>
                                        <div class='col-md-6 p-0 small-table small-table_$last_id' style='display:none'>
                                            <table class='wish-table table-striped table-bordered m-0' style='display:table'><thead><tr><th>Date</th><th>Consumption</th></tr></thead><tbody><tr><td id='td_text_$last_id'></td><td id='td_two_text_$last_id'></td></tr></tbody>
                                            </table>
                                            </div> 
                                            <div class='save_table_div_show_table'> 
                                                <canvas id='areaChart'></canvas>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div></div>"; 
                            
                    //Tile Outer HTML
                    $tileHtml.="<div class='dashboard_chart_outer_tile_html_$last_id outer_chart_tile_structure'><div style='height: 145px; width: 290px' class='grid-margin actual_tile_height actual_tile_width stretch-card ' id='measurement_count_outer_tile_modal_chart_$last_id' data-i='$last_id' data-type-tile='Measurement'>
                                    <div class='card card-border tile_border'>
                                        <div class='card-body overflow-hide display-flex pr-0'>
                                            <div id='' class=''>
                                                <div class='action-modal-button-div'>
                                                    <img src='images/edit.png' class='edit_val edit_btn_tile_chart' data-type-tile='Measurement' data-i-value ='$last_id' style='height: 17px; width: 17px; margin-right: 5px;'>
                                                    <img src='images/delete.png' class='id_val delete_btn_tile' data-type-tile='Measurement' style='height: 17px; width: 17px;'>
                                                </div>
                                                <p class='card-title text-md-center text-xl-left' id='measurement_tile_heading_modal'>$measurement_title</p>
                                                <div class='d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center logo-image-main-div'>
                                                <img src='images/chartlogo.jpg' class='tile-image-icon tile-image-icon-table'>
                                                </div>  
                                                <p class='mb-0 mt-2 text-success count_result_tile chart_text_$last_id'>(Chart)<span class='text-black ml-1'><small></small></span></p>
                                                
                                            </div>
                                            
                                            <div class='overflow-hide ml-3 chart-width'>
                                                <div id='chart_outer_tile_text_heading' style='text-align: center'>
                                                    <p class='text-muted'>Outer Tile View</p>
                                                </div>
                                                <div class='col-md-6 p-0 small-table small-table_$last_id'>
                                                    <table class='wish-table table-striped table-bordered m-0' style='display:table'><thead><tr><th>Date</th><th>Consumption</th></tr></thead><tbody><tr><td id='td_outer_tile_text_$last_id'></td><td id='td_outer_tile_two_text_$last_id'></td></tr></tbody>
                                                    </table>
                                                </div> 
                                                <div class='save_table_div_show_table'> 
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div></div>"; 
            }
            $records['tile_html'] = $tileHtml;
            $records['data'] = $dataResult;
            $records['total_record'] = count($dataResult) + 1;
            $records['last_id'] = $last_id;
            echo json_encode($records,JSON_INVALID_UTF8_IGNORE);
            die;
        }
        catch(Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }


    }

    

    // /<---Edit tile Functionality--
    public function getEditTiles(){
        try{
            global $conn;
            $username = $_SESSION['username']; 
            $id = $_REQUEST['id'];
            $type = $_REQUEST['type'];
            $getResult =  "SELECT * from tableFormat where (tile_data_type ='table' OR tile_data_type='overall_count') AND username = '$username' ";
            $dataResult = queryDB($conn, $getResult, "read");
            $tileHtml = '';
            $total_result = count($dataResult);
            $i_value = $_REQUEST['i_value'];
            $measurement_title = $_REQUEST['measurement_title'];
            if($dataResult != null && count($dataResult)){
                for($i = 0; $i < $total_result; $i++){
                    if($id == $dataResult[$i]['id']){
                        // $total_record_id = $id-1;
                        $tileHtml .= "<input type='hidden' id='total_records' value='$i_value'>";
                        // $tileHtml.= $dataResult[$i]['tile_html'];
                        $tileHtml.="<div class='measurement_html_modal_$i_value'><div style='height: 145px; width: 285px' class='grid-margin actual_tile_height actual_tile_width stretch-card ' id='measurement_count_tile_modal_$i_value' data-i='$i_value' data-type-tile='Measurement'>
                                    <div class='card card-border'>
                                        <div class='card-body overflow-hide display-flex'>
                                            <div id='' class=''>
                                                <div class='action-modal-button-div'>
                                                    <img src='images/edit.png' class='edit_val edit_btn_tile' data-type-tile='Measurement' data-i-value ='$i_value' style='height: 17px; width: 17px; margin-right: 5px;'>
                                                    <img src='images/delete.png' class='id_val delete_btn_tile' data-type-tile='Measurement' style='height: 17px; width: 17px;'>
                                                </div>
                                                <p class='card-title text-md-center text-xl-left' id='measurement_tile_heading_modal'>$measurement_title</p>
                                                <div class='d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center logo-image-main-div'>
                                                <img src='images/table_logo.png' class='tile-image-icon tile-image-icon-table'>
                                                </div>  
                                                <p class='mb-0 mt-2 text-success count_result_tile'>(30 days)<span class='text-black ml-1'><small></small></span></p>
                                               
                                            </div>
                                            
                                            <div class='overflow-hide ml-3'>
                                                <div class='col-md-6 p-0 small-table small-table_$i_value' style='display: none'>
                                                    <table class='wish-table table-striped table-bordered m-0' style='display:table'><thead><tr><th>Date</th><th>Consumption</th></tr></thead><tbody><tr><td id='td_table_tile_text_$i_value'></td><td id='td_table_tile_two_text_$i_value'></td></tr></tbody>
                                                    </table>
                                                </div>
                                                <div class='save_table_div_show_table'> 
                                                    <table class='table table-striped table-bordered table-hover' id='measurement_modal_table'>
                                                    </table>                        
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div></div>"; 

                        $records['data'] = $dataResult[$i];
                    }
                    else{
                        $dataResult[$i]['tile_html']=str_replace('stretch-card','stretch-card hide_table_preview',$dataResult[$i]['tile_html']);
                        $tileHtml.= $dataResult[$i]['tile_html'];
                    }
                    
                }
            $records['tile_html'] = $tileHtml;
            $records['total_record'] = count($dataResult);
            echo json_encode($records,JSON_INVALID_UTF8_IGNORE);
            }
            die;
        }
        catch(Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    // --endd->

    // <---7-10-2021---
    public function getEditChartDataDashboard(){
        try{
            global $conn;
            $username = $_SESSION['username'];
            $i_value = $_POST['i_value'];
            $id = $_POST['id'];
            $tile_title = $_POST['measurement_title'];
            $getResult =  "SELECT * from tableFormat where tile_data_type ='chart' AND username = '$username' ";
            $dataResult = queryDB($conn, $getResult, "read");
            $tileHtml = '';
            $chart_type = '';
            $chart_filter = '';
            $mst_id = '';
            $chart_time_interval = '';
            $total_result = count($dataResult);
            if($dataResult != null && count($dataResult)>0){
                for($i= 0; $i < $total_result; $i++){
                    if($id == $dataResult[$i]['id']){
                        $chart_type = $dataResult[$i]['chart_type'];
                        $chart_filter = $dataResult[$i]['chart_filter'];
                        $mst_id = $dataResult[$i]['mst_id'];
                        $chart_time_interval = $dataResult[$i]['chart_time_interval'];
                        $records['data'] = $dataResult[$i];
                        $tileHtml .= "<input type='hidden' id='total_records_chart' value='$i_value'>";
                        $tileHtml.="<div class='dashboard_chart_tile_html_$i_value'><div style='height: 290px; width: 570px' class='grid-margin actual_tile_height actual_tile_width stretch-card ' id='measurement_count_tile_modal_chart_$i_value' data-i='$i_value' data-type-tile='Measurement'>
                                    <div class='card card-border'>
                                        <div class='card-body overflow-hide display-flex pr-0'>
                                            <div id='' class=''>
                                                <div class='action-modal-button-div'>
                                                    <img src='images/edit.png' class='edit_val edit_btn_tile_chart' data-type-tile='Measurement' data-i-value ='$i_value' style='height: 17px; width: 17px; margin-right: 5px;'>
                                                    <img src='images/delete.png' class='id_val delete_btn_tile' data-type-tile='Measurement' style='height: 17px; width: 17px;'>
                                                </div>
                                                <p class='card-title text-md-center text-xl-left' id='measurement_tile_heading_modal'>$tile_title</p>
                                                <div class='d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center logo-image-main-div'>
                                                <img src='images/chartlogo.jpg' class='tile-image-icon tile-image-icon-table'>
                                                </div> 
                                                <p class='mb-0 mt-2 text-success count_result_tile chart_text_edit_$i_value'>(Chart)<span class='text-black ml-1'><small></small></span></p>
                                                
                                            </div>
                                            
                                            <div class='overflow-hide ml-3 chart-width'>
                                            <div class='col-md-6 p-0 small-table small-table_$i_value' style='display:none'>
                                            <table class='wish-table table-striped table-bordered m-0' style='display:table'><thead><tr><th>Date</th><th>Consumption</th></tr></thead><tbody><tr><td id='td_text_$i_value'></td><td id='td_two_text_$i_value'></td></tr></tbody>
                                            </table>
                                            </div>
                                                <div class='save_table_div_show_table'> 
                                                    <canvas id='areaChart'></canvas>                       
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div></div>";
                                
                                //Tile Outer HTML
                                $tileHtml.="<div class='dashboard_chart_outer_tile_html_$i_value outer_chart_tile_structure'><div style='height: 145px; width: 290px' class='grid-margin actual_tile_height actual_tile_width stretch-card ' id='measurement_count_outer_tile_modal_chart_$i_value' data-i='$i_value' data-type-tile='Measurement'>
                                                <div class='card card-border'>
                                                    <div class='card-body overflow-hide display-flex pr-0'>
                                                        <div id='' class=''>
                                                            <div class='action-modal-button-div'>
                                                                <img src='images/edit.png' class='edit_val edit_btn_tile_chart' data-type-tile='Measurement' data-i-value ='$i_value' style='height: 17px; width: 17px; margin-right: 5px;'>
                                                                <img src='images/delete.png' class='id_val delete_btn_tile' data-type-tile='Measurement' style='height: 17px; width: 17px;'>
                                                            </div>
                                                            <p class='card-title text-md-center text-xl-left' id='measurement_tile_heading_modal'>$tile_title</p>
                                                            <div class='d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center logo-image-main-div'>
                                                            <img src='images/chartlogo.jpg' class='tile-image-icon tile-image-icon-table'>
                                                            </div>  
                                                            <p class='mb-0 mt-2 text-success count_result_tile chart_text_$i_value'>(Chart)<span class='text-black ml-1'><small></small></span></p>
                                                            
                                                        </div>
                                                        
                                                        <div class='overflow-hide ml-3 chart-width'>
                                                            <div id='chart_outer_tile_text_heading' style='text-align: center'>
                                                                <p class='text-muted'>Outer Tile View</p>
                                                            </div>
                                                            <div class='col-md-6 p-0 small-table small-table_$i_value'>
                                                                <table class='wish-table table-striped table-bordered m-0' style='display:table'><thead><tr><th>Date</th><th>Consumption</th></tr></thead><tbody><tr><td id='td_outer_tile_text_$i_value'></td><td id='td_outer_tile_two_text_$i_value'></td></tr></tbody>
                                                                </table>
                                                            </div> 
                                                            <div class='save_table_div_show_table'> 
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div></div>"; 

                    }
                    else{
                        $dataResult[$i]['tile_html']=str_replace('stretch-card','stretch-card hide_table_preview',$dataResult[$i]['tile_html']);
                        $tileHtml.= $dataResult[$i]['tile_html'];
                    }
                }
                $records['tile_html'] = $tileHtml;
                $records['total_record'] = count($dataResult);
                $records['mst_id'] = $mst_id;
                $records['chart_filter'] = $chart_filter;
                $records['chart_type'] = $chart_type;
                $records['chart_time_interval'] = $chart_time_interval;
                echo json_encode($records,JSON_INVALID_UTF8_IGNORE);
            }
            die;
        }
        catch(Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    // -endd--->


    // <----01-9-2021---
    public function getEditDataDashboard(){
        try{
            global $conn;
            $username = $_SESSION['username']; 
            $id = $_REQUEST['id'];
            $selectQuery = "SELECT * from tableFormat where id ='$id' AND username = '$username' ";
            $records['data'] = queryDB($conn, $selectQuery, "read"); 
            echo json_encode($records,JSON_INVALID_UTF8_IGNORE); 
            die;
        }
        catch(Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    // --end-->

    // <---03-9-2021---
    public function getChartTimeIntervalRecord(){
        try{
            global $conn;
            $time_interval = $_REQUEST['time_interval'];
            $query1 = "SELECT T1.mstIMw,T1.mst_ID,T2.val,T1.iBdeType ";
            $query1 .= "FROM produktionsAnlagenConfig as T1 ";
            $query1 .= "INNER JOIN ";
            $query1 .= "(SELECT T2.mst_ID as t2_mst_id , sum(cast(T2.val as int)) as val from masseneingabeSucheIMw as T2 ";
            $query1 .= "group by T2.mst_ID) T2 ";
            $query1 .= "ON T1.mst_ID = t2_mst_id ";
            $query1  .= "where T1.iBdeType='2' ";
            $query1 .= "AND T1.intTp_ID = '$time_interval' ";
            $query1 .= "Order by T2.val  Desc ";
            $data = queryDB($conn, $query1, "read");
            echo json_encode($data,JSON_INVALID_UTF8_IGNORE);
            die;
        }
        catch(Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }

    }

    // ---end--->
    //Get Records Energy
    public function getNumberRecordsEnergy()
    {
        try{
            global $conn;
            $total_number_records = $_POST['total_number_records'];
            $number_records = isset($_POST['number_records']) ? $_POST['number_records'] : 5;
            $time_interval = $_POST['time_interval'];
            $order_by_val = $_POST['energy_order_by_val'];
            $page_val = isset($_POST['page_val']) ? $_POST['page_val'] : 1;
            $selected_number_record_measurement = isset($_POST['energy_search_record']) ? $_POST['energy_search_record'] : 'false';
            $energy_type = $_POST['energy_type'];
            $dataMesaurement = '';
            $queryMaxVal = '';
            $pagesCount = '';

            
            // <----14-9-2021---
            // if($energy_type == "calculated"){
            //     $this->getAutomaticTableEnergyData1();
            //     die;
            // }
            if($energy_type == "automatic"){
                $this->getAutomaticTableEnergyData();
                die;
            }
            // --end-->

            if($order_by_val == 'order_by_desc'){
                $order_by_val = "Order by cast(T2.val as int) desc ";
            }
            else if($order_by_val == 'order_by_asc'){
                $order_by_val = "Order by cast(T2.val as int) asc ";
            }

            $search_record = isset($_POST['search_record']) ? $_POST['search_record'] : '';
            $queryTotalRecordCondition = "";
            $queryMainCondition = '';
            if($search_record != ''){
                $queryTotalRecordCondition = "AND T3.nameMst LIKE '%$search_record%' ";
                $queryMainCondition = "AND T3.nameMst LIKE '%$search_record%' ";
            }

            //Pagination Code
            $queryTotalRecords = "SELECT TOP($total_number_records) * ";
            $queryTotalRecords .= "FROM interneMesswerteConfig as T1 ";
            $queryTotalRecords .= "LEFT JOIN ";
            $queryTotalRecords .= "(SELECT T2.mst_ID as table_2_mst_id, sum(cast(val as int)) as val from ";
            $queryTotalRecords .= "masseneingabeSucheIMw as T2 ";
            $queryTotalRecords .= "GROUP By T2.mst_id) ";
            $queryTotalRecords .= "T2 ";
            $queryTotalRecords .= "ON T1.mst_ID = T2.table_2_mst_id ";
            $queryTotalRecords .=  "LEFT JOIN ";
            $queryTotalRecords .= "MessstellenAnlagen  as T3 ";
            $queryTotalRecords .= "ON T1.mst_ID = T3.mst_ID ";
            $queryTotalRecords .= "where T1.intTp_ID = '$time_interval' ";
            $queryTotalRecords .= $queryTotalRecordCondition;
            $queryTotalRecords .= $order_by_val;
            $totalRecordsValue = queryDB($conn, $queryTotalRecords, "read");
            // echo json_encode($totalRecordsValue); die;
            
            $pagesCount = '';
            $offSetVal = 0;
            if(count($totalRecordsValue) > 0){
               if($total_number_records <= $number_records){
                   $offSetVal = 0;
                   $number_records = $total_number_records;
                   $pagesCount = 1; 
                   $page_val = 1;
               }
               else{

                    if($selected_number_record_measurement == 'true'){
                        $pagesCount = ceil(count($totalRecordsValue) / $number_records);
                        $pagesCount = $pagesCount <= 0 ? 1 : $pagesCount;
                        $page_val = 1;
                        $offSetVal = 0;

                    }
                    else{
                        $pagesCount = ceil(count($totalRecordsValue) / $number_records);
                        $pagesCount = $pagesCount <= 0 ? 1 : $pagesCount;
                        $offSetVal = ($page_val - 1) * $number_records;
                        
                        //Only Valid when User Click on Last page
                        if($page_val == $pagesCount){
                            $number_records = $total_number_records - $offSetVal;
                        }
                    }
                //    echo $number_records;s
               }

            }

            $query1 = "SELECT * ";
            $query1 .= "FROM interneMesswerteConfig as T1 ";
            $query1 .= "LEFT JOIN ";
            $query1 .= "(SELECT T2.mst_ID as table_2_mst_id, sum(cast(val as int)) as val from ";
            $query1 .= "masseneingabeSucheIMw as T2 ";
            $query1 .= "GROUP By T2.mst_id) ";
            $query1 .= "T2 ";
            $query1 .= "ON T1.mst_ID = T2.table_2_mst_id ";
            $query1 .=  "LEFT JOIN ";
            $query1 .= "MessstellenAnlagen  as T3 ";
            $query1 .= "ON T1.mst_ID = T3.mst_ID ";
            $query1 .= "where T1.intTp_ID = '$time_interval' ";
            $query1 .= $queryMainCondition;
            $query1 .= $order_by_val;
            $query1 .= "offset $offSetVal rows FETCH NEXT $number_records ROWS ONLY ";
            $dataMesaurement = queryDB($conn, $query1, "read");
            
            $records['energy_html'] = $this->generateHtmlTableEnergyData($dataMesaurement);

            $records['pagination_html_energy'] =  $this->generatePaginationHtmlEnergyData($page_val,$pagesCount,$dataMesaurement);

            // echo $pagination_html['paginationHTMl']; die;
            //<---13-8-2021--
            $ar_page_val = isset($_POST['page_val']) ? $_POST['page_val'] : 1;
            $ar_number_records = isset($_POST['number_records']) ? $_POST['number_records'] : 5;
            $ar = array('pages_count' => $pagesCount,'page_val' => $ar_page_val,'number_records' => $ar_number_records,'query1' => $query1 ,'queryMaxValue' => '','row_click' => 'false' , 'type' => 'Energy');
            $records['query_data'] = $ar;
             // --end-->

            echo json_encode($records,JSON_INVALID_UTF8_IGNORE);
            // <--old code--
            // $number_records = $_POST['number_records'];
            // $query1 = "SELECT Top($number_records) * ";
            // $query1 .= "FROM interneMesswerteConfig as T1 ";
            // $query1 .= "LEFT JOIN ";
            // $query1 .= "(SELECT T2.mst_ID as table_2_mst_id, max(cast(val as int)) as val from ";
            // $query1 .= "masseneingabeSucheIMw as T2 ";
            // $query1 .= "GROUP By T2.mst_id) ";
            // $query1 .= "T2 ";
            // $query1 .= "ON T1.mst_ID = T2.table_2_mst_id ";
            // $query1 .=  "LEFT JOIN ";
            // $query1 .= "MessstellenAnlagen on ";
            // $query1 .= "T1.mst_ID = MessstellenAnlagen.mst_ID ";
            // $query1 .= "order by T1.mst_ID desc ";
            // $dataEnergy = queryDB($conn, $query1, "read");
            // $tr = '';
            // --end--->
           

            die;
        }
        catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }

    // <--18-11-2021--
       // <--3-8-2021
       public function rowClickEnergyTableData(){
        try{
            global $conn;
            $total_number_records = $_POST['total_number_records'];
            $mst_id = $_POST['mst_id'];
            $type = $_POST['data_type'];
            $number_records = $_POST['number_records'];
            $page_val = isset($_POST['page_val']) ? $_POST['page_val'] : 1;
            $selected_number_record_measurement = isset($_POST['selected_number_record_measurement']) ? $_POST['selected_number_record_measurement'] : 'false';
            $order_by_val = $_POST['energy_order_by_val'];
            $energy_type = $_POST['energy_type'];
            // <---15-9-2021----
            if($energy_type == "automatic"){
                $this->rowClickAutomaticEnergyTableData();
                die;
            }
            // --end--->

            $date_differnce_five_days = date('Y-m-d', strtotime('-5 days'));
            $current_date = date('Y-m-d');

            if($order_by_val == 'order_by_desc'){
                $order_by_val = "Order by cast(T2.val as int) desc ";
            }
            else if($order_by_val == 'order_by_asc'){
                $order_by_val = "Order by cast(T2.val as int) asc ";
            }

            //Pagination Code 
            $queryTotalPagination = "SELECT TOP($total_number_records) * ";
            $queryTotalPagination .= "FROM interneMesswerteConfig as T1 ";
            $queryTotalPagination .= "INNER JOIN ";
            $queryTotalPagination .= "masseneingabeSucheIMw as T2 ";
            $queryTotalPagination .= "ON T1.mst_ID = T2.mst_Id ";
            $queryTotalPagination .=  "INNER JOIN ";
            $queryTotalPagination .= "MessstellenAnlagen  as T3 ";
            $queryTotalPagination .= "ON T1.mst_ID = T3.mst_ID ";
            $queryTotalPagination .= "where T2.type = '$type' ";
            $queryTotalPagination .= "AND T2.mst_ID = '$mst_id' ";
            $totalRecordsValue = queryDB($conn, $queryTotalPagination, "read");
            
            // echo json_encode($queryTotalPagination); die;

            $pagesCount = '';
            $offSetVal = 0;
            if(count($totalRecordsValue) > 0){
               if($total_number_records <= $number_records){
                    $offSetVal = 0;
                    $number_records = $total_number_records;
                    $pagesCount = 1; 
                    $page_val = 1;
               }
               else{
                    if($selected_number_record_measurement == 'true'){
                        $pagesCount = ceil(count($totalRecordsValue) / $number_records);
                        $pagesCount = $pagesCount <= 0 ? 1 : $pagesCount;
                        $page_val = 1;
                        $offSetVal = 0;

                    }
                    else{ 
                        $pagesCount = ceil(count($totalRecordsValue) / $number_records);
                        $pagesCount = $pagesCount <= 0 ? 1 : $pagesCount;
                        $offSetVal = ($page_val - 1) * $number_records;
                        
                        if($page_val == $pagesCount){
                            $number_records = $total_number_records - $offSetVal;
                        }
                    }
               } 

            }

            //--end-->
            
            $queryMaxValue = "SELECT TOP($total_number_records) max(cast(T2.val as int)) as val ";
            $queryMaxValue .= "FROM interneMesswerteConfig as T1 ";
            $queryMaxValue .= "INNER JOIN ";
            $queryMaxValue .= "masseneingabeSucheIMw as T2 ";
            $queryMaxValue .= "ON T1.mst_ID = T2.mst_Id ";
            $queryMaxValue .=  "INNER JOIN ";
            $queryMaxValue .= "MessstellenAnlagen  as T3 ";
            $queryMaxValue .= "ON T1.mst_ID = T3.mst_ID ";
            $queryMaxValue .= "where T2.type = '$type' ";
            $queryMaxValue .= "AND T2.mst_ID = '$mst_id' ";
            // echo json_encode($queryMaxValue); die;
            //<---15-8-2021
            $queryMaximum = $queryMaxValue;
            // --end-->
            $queryMaxValue = queryDB($conn, $queryMaxValue, "read");
            $queryMaxVal = count($queryMaxValue) > 0 ? $queryMaxValue[0]['val'] : '';
            // echo json_encode($queryMaxVal); die;

            $query1 = "SELECT * ";
            $query1 .= "FROM interneMesswerteConfig as T1 ";
            $query1 .= "INNER JOIN ";
            $query1 .= "masseneingabeSucheIMw as T2 ";
            $query1 .= "ON T1.mst_ID = T2.mst_ID ";
            $query1 .=  "INNER JOIN ";
            $query1 .= "MessstellenAnlagen  as T3 ";
            $query1 .= "ON T1.mst_ID = T3.mst_ID ";
            $query1 .= "Where T2.type = '$type' ";
            $query1 .= "AND T2.mst_ID = '$mst_id' ";
            $query1 .= "$order_by_val ";
            $query1 .= "offset $offSetVal rows FETCH NEXT $number_records ROWS ONLY ";
            $dataMesaurement = queryDB($conn, $query1, "read"); 
            // echo json_encode($date_differnce_five_days); die;

            // <---10-11-2021----
            $queryLastDate = "SELECT TOP(1) * From masseneingabeSucheIMw as T1 ";
            $queryLastDate.= "WHERE T1.mst_ID = '$mst_id' ";
            $queryLastDate.= "AND T1.type = '$type' ";
            $queryLastDate.= "ORDER BY T1.id desc ";
            $queryLastDateData = queryDB($conn, $queryLastDate, "read");
            //--end-->

            $records['energy_html'] = $this->generateHtmlTableEnergyData($dataMesaurement,$queryMaxVal);
            $records['pagination_html_energy'] =  $this->generatePaginationHtmlEnergyData($page_val,$pagesCount,$dataMesaurement,$type,$mst_id);
            
            // <--15-8-2021--
            $ar_page_val = isset($_POST['page_val']) ? $_POST['page_val'] : 1;
            $ar_number_records = isset($_POST['number_records']) ? $_POST['number_records'] : 5;
            $ar = array('pages_count' => $pagesCount,'page_val' => $ar_page_val,'number_records' => $ar_number_records,'query1' => $query1 ,'queryMaxValue' => $queryMaximum,'row_click' => 'true', 'type' => 'Energy');
            $records['query_data'] = $ar;

            $records['queryLastDate'] = $queryLastDateData;
            // --end-->
           
            echo json_encode($records,JSON_INVALID_UTF8_IGNORE);

           die;
        }
        catch(Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    // --end-->

    // <----18-11-2021----
    public function generateHtmlTableEnergyData($dataMesaurement,$queryMaxVal = false){
        $tr = '';
        $col_span = "";
        if($queryMaxVal == ""){
            $col_span = "colspan='5'";
        }
        else if($queryMaxVal != ''){
            $col_span = "colspan='4'";
        }
        if($dataMesaurement != '' && count($dataMesaurement) > 0){
            foreach($dataMesaurement as $key => $value){
                $style='';
                $class_val = '';
                $unit = '';
                if($queryMaxVal == ""){
                    $class_val = 'class="row_click_energy"';
                }
                else if($queryMaxVal != '' && $queryMaxVal == $value['val']){
                    $style="style='background-color: #f77171'";
                }
                $tr .= "<tr $style $class_val data-mst=".$value['mst_ID']." data-type=".$value['intTp_ID']." data-table-other='false'>";
                
                $tr.= "<td>".$value['nameMSt']."</td>";
                if($value['intTp_ID'] == "1"){
                    $tr.= "<td>Days</td>";
                }
                else if($value['intTp_ID'] == "2"){
                    $tr.= "<td>Weeks</td>";
                }
                else if($value['intTp_ID'] == "3"){
                    $tr.= "<td>Months</td>";
                }
                else if($value['intTp_ID'] == "4"){
                    $tr.= "<td>Years</td>";
                }
                else{
                    $tr.= "<td></td>";
                }

                //Units Checks
                if($value['unt_ID'] == "1"){
                    $unit = "Hrs.";
                }
                else if($value['unt_ID'] == "2"){
                    $unit = "kWh";
                }
                else if($value['unt_ID'] == "3"){
                    $unit = "m³";
                }
                else if($value['unt_ID'] == "4"){
                    $unit = "l";
                }
                else if($value['unt_ID'] == "5"){
                    $unit = "kg";
                }

                // tr+= "<td class='text-danger'>"+28.76+ "<i class='ti-arrow-down'></i></td>";
                if($value['intTp_ID'] == "2" && $value['startWeek'] != ''){
                    if($queryMaxVal != ''){
                        $tr.= "<td>".$value['on_week'].'-'.$value['on_date']."</td>";
                    }
                    else{
                        $tr.= "<td>".$value['startWeek'].'-'.$value['startDate']."</td>";
                    }
                }
                else if($queryMaxVal != ''){
                    $tr.= "<td>".$value['on_date']."</td>";
                }
                else{
                    $tr.= "<td>".$value['startDate']."</td>";
                }
                
                if($value['val'] == null){
                    $tr.= "<td> - </td>";
                    if($queryMaxVal == ""){
                        $tr.= "<td><label class='badge badge-danger'>Pending </label></td>";
                    }
                }
                else{
                    $tr.= "<td>".$value['val'].' '.$unit."</td>";
                    if($queryMaxVal == ""){
                        $tr.= "<td><label class='badge badge-success'>Active </label></td>";
                    }
                }
                $tr.="</tr>";
            }
        }else{
                $tr = "<tr><td $col_span class='text-center'>No Data</td></tr>";
        }
        return $tr;
        // $records['measurement_html'] = $tr;

    }
    public function generatePaginationHtmlEnergyData($page_val,$pagesCount,$dataMesaurement,$data_type = false ,$mst_id = false){
        try{
            //Pagination Code HTML
            // echo $pagesCount; die;
            if($page_val > 0 && $pagesCount > 0 && $dataMesaurement != '' && count($dataMesaurement) > 0){
                $style_background = '';
                $class_page_count_val = 'page_count_val_energy';
                $style_background_end = '';
                $class_page_count_val_end = 'page_count_val_energy';
                // echo $page_val ; die;
                if($page_val == "1"){
                    $style_background = "style='background: #d6d6d6; color: black'";
                    $class_page_count_val = '';
                    if($pagesCount == "1"){
                        $style_background_end = "style='background: #d6d6d6; color: black'";
                        $class_page_count_val_end = '';  
                    }
                    
                }
                else if($page_val == $pagesCount){
                    $style_background_end = "style='background: #d6d6d6; color: black'";
                    $class_page_count_val_end = '';
                }
                else{
                    $style_background = '';
                    $style_background_end = '';
                }
                $paginationHTMl="<nav aria-label='Page navigation example'>
                    <input type='hidden' id='row_click_table_energy' data_type='$data_type' data_mst='$mst_id'>
                    <div class='pagination_items'>
                            <ul class='pagination'>
                                <li class='page-item $class_page_count_val' data_type='$data_type' data_mst='$mst_id' id='previous_pagination_val_energy'>
                                    <a class='page-link'  $style_background href='javascript:void(0);' aria-label='Previous'>
                                        <span aria-hidden='true'>&laquo;</span>
                                        <span class='sr-only'>Previous</span>
                                    </a>
                                </li>";
                                
                for($i = 1; $i <= $pagesCount; $i++){
                    $active = $i == $page_val ? 'active' : '';
                    $hide_style='display: none';
                    if($i == $page_val){
                        $paginationHTMl.="<li class='page-item'><a class='page-link' href='javascript:void(0);'>Page</a></li>";
                        $hide_style = 'display: block';
                    }
                    $paginationHTMl.="<li style='$hide_style' class='page-item  $active '><input type='number' class='active_background pagination_input_val_energy page-link' data_type='$data_type' data_mst='$mst_id' value='$i'></li>";

                    if($i == $pagesCount){
                        $paginationHTMl.="<li class='page-item'><a class='page-link' href='javascript:void(0);'>of</a></li>";
                        $paginationHTMl.="<li class='page-item'><a class='page-link ' readonly id='last_input_val_energy' href='javascript:void(0);'>$i</a></li>";
                    }
                }
                $paginationHTMl.="<li class='page-item $class_page_count_val_end' data_type='$data_type' data_mst='$mst_id' id='next_pagination_val_energy'>
                                        <a class='page-link' $style_background_end href='javascript:void(0);' aria-label='Next'>
                                            <span aria-hidden='true'>&raquo;</span>
                                            <span class='sr-only'>Next</span>
                                        </a>
                                    </li>";

                //Pagination Select Tag   
                
                $paginationHTMl.="<li class ='page-item'>
                                        <select class='page-link select_pagination' id='energy_number_record' data_type='$data_type' data_mst='$mst_id'>
                                            <option value='5'>5</option>
                                            <option value='10'>10</option>
                                            <option value='20'>20</option>
                                            <option value='30'>30</option>
                                            <option value='50'>50</option>
                                        </select>
                                    </li>
                                    </ul>
                                </div>
                            </nav>";

                //ScreenShot Code
                $paginationHTMl.="<div id='save_table_format' class='text-center'>
                                    <input type='button' id='energy_modal_open_button' tile-edit='false' class='btn btn-sm btn-success' value='Save & Preview'>
                                </div>";            
                return $paginationHTMl;
                // $records['pagination_html'] = $paginationHTMl;
            }

        }
        catch(Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }


    public function getAutomaticTableEnergyData(){
        try{
            global $conn;
            $total_number_records = $_POST['total_number_records'];
            $number_records = isset($_POST['number_records']) ? $_POST['number_records'] : 5;
            $time_interval = $_POST['time_interval'];
            $order_by_val = $_POST['energy_order_by_val'];
            $page_val = isset($_POST['page_val']) ? $_POST['page_val'] : 1;
            $selected_number_record_energy = isset($_POST['energy_search_record']) ? $_POST['energy_search_record'] : 'false';
            $dataMesaurement = '';
            $queryMaxVal = '';
            $pagesCount = '';

            if($order_by_val == 'order_by_desc'){
                $order_by_val = "Order by convert(decimal(38,5), T2.val) desc ";
            }
            else if($order_by_val == 'order_by_asc'){
                $order_by_val = "Order by convert(decimal(38,5), T2.val) asc ";
            }

            $search_record = isset($_POST['search_record']) ? $_POST['search_record'] : '';
            $queryTotalRecordCondition = "";
            $queryMainCondition = '';
            if($search_record != ''){
                $queryTotalRecordCondition = "WHERE T1.nameMSt LIKE '%$search_record%' ";
                $queryMainCondition = "WHERE T1.nameMSt LIKE '%$search_record%' ";
            }

            //Pagination Code
            $queryTotalRecords = "SELECT TOP($total_number_records) * ";
            $queryTotalRecords .= "FROM messstellen as T1 ";
            $queryTotalRecords .= "INNER JOIN ";
            $queryTotalRecords .= "(SELECT T2.mst_ID as table_2_mst_id, sum(convert(decimal(38,5), Value)) as val from ";
            $queryTotalRecords .= "berechneteEnergiedaten as T2 ";
            $queryTotalRecords .= "GROUP By T2.mst_id) ";
            $queryTotalRecords .= "T2 ";
            $queryTotalRecords .= "ON T1.mst_ID = T2.table_2_mst_id ";
            $queryTotalRecords .= $queryTotalRecordCondition;
            $queryTotalRecords .= $order_by_val;
            // echo $queryTotalRecords; die;


            $totalRecordsValue = queryDB($conn, $queryTotalRecords, "read");
            // echo json_encode($totalRecordsValue); die;s
            
            $pagesCount = '';
            $offSetVal = 0;
            if(count($totalRecordsValue) > 0){
               if($total_number_records <= $number_records){
                   $offSetVal = 0;
                   $number_records = $total_number_records;
                   $pagesCount = 1; 
                   $page_val = 1;
               }
               else{

                    if($selected_number_record_energy == 'true'){
                        $pagesCount = ceil(count($totalRecordsValue) / $number_records);
                        $pagesCount = $pagesCount <= 0 ? 1 : $pagesCount;
                        $page_val = 1;
                        $offSetVal = 0;

                    }
                    else{
                        $pagesCount = ceil(count($totalRecordsValue) / $number_records);
                        $pagesCount = $pagesCount <= 0 ? 1 : $pagesCount;
                        $offSetVal = ($page_val - 1) * $number_records;
                        
                        //Only Valid when User Click on Last page
                        if($page_val == $pagesCount){
                            $number_records = $total_number_records - $offSetVal;
                        }
                    }
                //    echo $number_records;s
               }

            }
            $query1 = "SELECT * ";
            $query1 .= "FROM messstellen as T1 ";
            $query1 .= "INNER JOIN ";
            $query1 .= "(SELECT T2.mst_ID as table_2_mst_id, sum(convert(decimal(38,5), Value)) as val from ";
            $query1 .= "berechneteEnergiedaten as T2 ";
            $query1 .= "GROUP By T2.mst_id) ";
            $query1 .= "T2 ";
            $query1 .= "ON T1.mst_ID = T2.table_2_mst_id ";
            $query1 .= $queryMainCondition;
            $query1 .= $order_by_val;
            $query1 .= "offset $offSetVal rows FETCH NEXT $number_records ROWS ONLY ";  
            // echo $query1; die; 
            
            $dataMesaurement = queryDB($conn, $query1, "read");

            $records['energy_html'] = $this->generateHtmlAutomaticTableEnergyData($dataMesaurement);

            $records['pagination_html_energy'] =  $this->generatePaginationHtmlAutomaticEnergyData($page_val,$pagesCount,$dataMesaurement);

            // echo $pagination_html['paginationHTMl']; die;
            //<---13-8-2021--
            $ar_page_val = isset($_POST['page_val']) ? $_POST['page_val'] : 1;
            $ar_number_records = isset($_POST['number_records']) ? $_POST['number_records'] : 5;
            $ar = array('pages_count' => $pagesCount,'page_val' => $ar_page_val,'number_records' => $ar_number_records,'query1' => $query1 ,'queryMaxValue' => '','row_click' => 'false' , 'type' => 'Energy');
            $records['query_data'] = $ar;
             // --end-->

            echo json_encode($records,JSON_INVALID_UTF8_IGNORE);
            die;
        }
        catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        } 
    }

    // <--15-9-2021
    public function rowClickAutomaticEnergyTableData(){
        try{
            global $conn;
            $total_number_records = $_POST['total_number_records'];
            $mst_id = $_POST['mst_id'];
            $type = $_POST['data_type'];
            $number_records = $_POST['number_records'];
            $page_val = isset($_POST['page_val']) ? $_POST['page_val'] : 1;
            $selected_number_record_energy = isset($_POST['selected_number_record_energy']) ? $_POST['selected_number_record_energy'] : 'false';
            $order_by_val = $_POST['energy_order_by_val'];
            $energy_type = $_POST['energy_type'];

            $date_differnce_five_days = date('Y-m-d', strtotime('-5 days'));
            $current_date = date('Y-m-d');

            if($order_by_val == 'order_by_desc'){
                $order_by_val = "Order by convert(decimal(38,5), T1.Value) desc ";
            }
            else if($order_by_val == 'order_by_asc'){
                $order_by_val = "Order by convert(decimal(38,5), T1.Value) asc ";
            }

            //Pagination Code 
            $queryTotalPagination = "SELECT TOP($total_number_records) * ";
            $queryTotalPagination .= "FROM berechneteEnergiedaten as T1 ";
            $queryTotalPagination .= "INNER JOIN ";
            $queryTotalPagination .= "messstellen as T2 ";
            $queryTotalPagination .= "ON T1.mst_ID = T2.mst_Id ";
            $queryTotalPagination .= "WHERE T1.mst_ID = '$mst_id' ";
            $totalRecordsValue = queryDB($conn, $queryTotalPagination, "read");
            
            
            $pagesCount = '';
            $offSetVal = 0;
            if(count($totalRecordsValue) > 0){
               if($total_number_records <= $number_records){
                    $offSetVal = 0;
                    $number_records = $total_number_records;
                    $pagesCount = 1; 
                    $page_val = 1;
               }
               else{
                    if($selected_number_record_energy == 'true'){
                        $pagesCount = ceil(count($totalRecordsValue) / $number_records);
                        $pagesCount = $pagesCount <= 0 ? 1 : $pagesCount;
                        $page_val = 1;
                        $offSetVal = 0;

                    }
                    else{ 
                        $pagesCount = ceil(count($totalRecordsValue) / $number_records);
                        $pagesCount = $pagesCount <= 0 ? 1 : $pagesCount;
                        $offSetVal = ($page_val - 1) * $number_records;
                        
                        if($page_val == $pagesCount){
                            $number_records = $total_number_records - $offSetVal;
                        }
                    }
               } 

            }

            //--end-->
            
            $queryMaxValue = "SELECT TOP($total_number_records) max(convert(decimal(38,5), Value)) as val ";
            $queryMaxValue .= "FROM berechneteEnergiedaten as T1 ";
            $queryMaxValue .= "INNER JOIN ";
            $queryMaxValue .= "messstellen as T2 ";
            $queryMaxValue .= "ON T1.mst_ID = T2.mst_Id ";
            $queryMaxValue .= "WHERE T1.mst_ID = '$mst_id' ";
            // echo json_encode($queryMaxValue); die;
            //<---15-8-2021
            $queryMaximum = $queryMaxValue;
            // --end-->
            $queryMaxValue = queryDB($conn, $queryMaxValue, "read");
            $queryMaxVal = count($queryMaxValue) > 0 ? $queryMaxValue[0]['val'] : '';
            

            $query1 = "SELECT * ";
            $query1 .= "FROM berechneteEnergiedaten as T1 ";
            $query1 .= "INNER JOIN ";
            $query1 .= "messstellen as T2 ";
            $query1 .= "ON T1.mst_ID = T2.mst_ID ";
            $query1 .= "Where T1.mst_ID = '$mst_id' ";
            $query1 .= "$order_by_val ";
            $query1 .= "offset $offSetVal rows FETCH NEXT $number_records ROWS ONLY ";
            $dataMesaurement = queryDB($conn, $query1, "read"); 
            // echo json_encode($dataMesaurement); die;
            

            $records['energy_html'] = $this->generateHtmlAutomaticTableEnergyData($dataMesaurement,$queryMaxVal);
            $records['pagination_html_energy'] =  $this->generatePaginationHtmlAutomaticEnergyData($page_val,$pagesCount,$dataMesaurement,$type,$mst_id);
            

            // <---10-11-2021----
            $queryLastDate = "SELECT TOP(1) * From berechneteEnergiedaten as T1 ";
            $queryLastDate.= "WHERE T1.mst_ID = '$mst_id' ";
            $queryLastDate.= "ORDER BY T1.berNrg_ID desc ";
            $queryLastDateData = queryDB($conn, $queryLastDate, "read");
            //--end-->


            // <--15-8-2021--
            $ar_page_val = isset($_POST['page_val']) ? $_POST['page_val'] : 1;
            $ar_number_records = isset($_POST['number_records']) ? $_POST['number_records'] : 5;
            $ar = array('pages_count' => $pagesCount,'page_val' => $ar_page_val,'number_records' => $ar_number_records,'query1' => $query1 ,'queryMaxValue' => $queryMaximum,'row_click' => 'true', 'type' => 'Energy');
            $records['query_data'] = $ar;

            $records['queryLastDate'] = $queryLastDateData;
            // --end-->
           
            echo json_encode($records,JSON_INVALID_UTF8_IGNORE);

           die;
        }
        catch(Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }

    public function generateHtmlAutomaticTableEnergyData($dataMesaurement,$queryMaxVal = false){
        global $conn;
        $tr = '';
        $col_span = "";
        if($queryMaxVal == ""){
            $col_span = "colspan='5'";
        }
        else if($queryMaxVal != ''){
            $col_span = "colspan='4'";
        }
        if($dataMesaurement != '' && count($dataMesaurement) > 0){
            foreach($dataMesaurement as $key => $value){
                $style='';
                $class_val = '';
                $unit = '';
                $mst_id = $value['mst_ID'];


                $queryResult = '';
                if($queryMaxVal == ''){
                    $queryData = "SELECT Top(1) * from berechneteEnergiedaten where mst_ID = $mst_id order by Time desc ";
                    $queryResult = queryDB($conn, $queryData, "read");
                }
                
                
                if($queryMaxVal == ""){
                    $class_val = 'class="row_click_energy"';
                }
                else if($queryMaxVal != '' && $queryMaxVal == $value['Value']){
                    $style="style='background-color: #f77171'";
                }
                $tr .= "<tr $style $class_val data-mst=".$value['mst_ID']." data-type='1' data-table-other='true'>";
                
                $tr.= "<td>".$value['nameMSt']."</td>";
                
                if($queryMaxVal == '')
                {
                    $tr.= "<td>".$queryResult[0]['Time']."</td>";
                    $tr.= "<td>".$queryResult[0]['ConvFactor']."</td>";
                    $tr.= "<td>".$value['val']."</td>";
                }
                else{
                    $tr.= "<td>".$value['Time']."</td>";
                    $tr.= "<td>".$value['ConvFactor']."</td>";
                    $tr.= "<td>".$value['Value']."</td>";
                }
                $tr.="</tr>";
            }
        }else{
                $tr = "<tr><td $col_span class='text-center'>No Data</td></tr>";
        }
        return $tr;
        // $records['measurement_html'] = $tr;

    }
    
    public function generatePaginationHtmlAutomaticEnergyData($page_val,$pagesCount,$dataMesaurement,$data_type = false ,$mst_id = false){
        try{
            //Pagination Code HTML
            // echo $pagesCount; die;
            if($page_val > 0 && $pagesCount > 0 && $dataMesaurement != '' && count($dataMesaurement) > 0){
                $style_background = '';
                $class_page_count_val = 'page_count_val_energy';
                $style_background_end = '';
                $class_page_count_val_end = 'page_count_val_energy';
                // echo $page_val ; die;
                if($page_val == "1"){
                    $style_background = "style='background: #d6d6d6; color: black'";
                    $class_page_count_val = '';
                    if($pagesCount == "1"){
                        $style_background_end = "style='background: #d6d6d6; color: black'";
                        $class_page_count_val_end = '';  
                    }
                    
                }
                else if($page_val == $pagesCount){
                    $style_background_end = "style='background: #d6d6d6; color: black'";
                    $class_page_count_val_end = '';
                }
                else{
                    $style_background = '';
                    $style_background_end = '';
                }
                $paginationHTMl="<nav aria-label='Page navigation example'>
                    <input type='hidden' id='row_click_table_energy' data_type='$data_type' data_mst='$mst_id'>
                    <div class='pagination_items'>
                            <ul class='pagination'>
                                <li class='page-item $class_page_count_val' data_type='$data_type' data_mst='$mst_id' id='previous_pagination_val_energy'>
                                    <a class='page-link'  $style_background href='javascript:void(0);' aria-label='Previous'>
                                        <span aria-hidden='true'>&laquo;</span>
                                        <span class='sr-only'>Previous</span>
                                    </a>
                                </li>";
                                
                for($i = 1; $i <= $pagesCount; $i++){
                    $active = $i == $page_val ? 'active' : '';
                    $hide_style='display: none';
                    if($i == $page_val){
                        $paginationHTMl.="<li class='page-item'><a class='page-link' href='javascript:void(0);'>Page</a></li>";
                        $hide_style = 'display: block';
                    }
                    $paginationHTMl.="<li style='$hide_style' class='page-item  $active '><input type='number' class='active_background pagination_input_val_energy page-link' data_type='$data_type' data_mst='$mst_id' value='$i'></li>";

                    if($i == $pagesCount){
                        $paginationHTMl.="<li class='page-item'><a class='page-link' href='javascript:void(0);'>of</a></li>";
                        $paginationHTMl.="<li class='page-item'><a class='page-link ' readonly id='last_input_val_energy' href='javascript:void(0);'>$i</a></li>";
                    }
                }
                $paginationHTMl.="<li class='page-item $class_page_count_val_end' data_type='$data_type' data_mst='$mst_id' id='next_pagination_val_energy'>
                                        <a class='page-link' $style_background_end href='javascript:void(0);' aria-label='Next'>
                                            <span aria-hidden='true'>&raquo;</span>
                                            <span class='sr-only'>Next</span>
                                        </a>
                                    </li>";

                //Pagination Select Tag   
                
                $paginationHTMl.="<li class ='page-item'>
                                        <select class='page-link select_pagination' id='energy_number_record' data_type='$data_type' data_mst='$mst_id'>
                                            <option value='5'>5</option>
                                            <option value='10'>10</option>
                                            <option value='20'>20</option>
                                            <option value='30'>30</option>
                                            <option value='50'>50</option>
                                        </select>
                                    </li>
                                    </ul>
                                </div>
                            </nav>";

                //ScreenShot Code
                $paginationHTMl.="<div id='save_table_format' class='text-center'>
                                    <input type='button' id='energy_modal_open_button' tile-edit='false' class='btn btn-sm btn-success' value='Save & Preview'>
                                </div>";            
                return $paginationHTMl;
                // $records['pagination_html'] = $paginationHTMl;
            }

        }
        catch(Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    // --end-->

    //Get Records Product
    public function getNumberRecordsProduct()
    {
        try{
            global $conn;
            $number_records = $_POST['number_records'];
            // <---old code
            // $query1 = "SELECT Top($number_records) * FROM produktionsAnlagenConfig as t1
            // left join produkte as t2 on t1.prd_ID = t2.prd_ID
            // left join anlagen as t3 on t1.anl_id = t3.anl_ID
            // where t1.iBdeType='1' order by t1.iBdePrdktConf_ID desc";
            //--end-->
            $query1 = "SELECT Top($number_records) * FROM produktionsAnlagenConfig as t1 ";
            $query1 .="LEFT join "; 
            $query1.="( ";
            $query1 .="select t2.id as table_2_id , t2.prd_id as table_2_prd_id  , t2.anl_id as table_2_anl_id , t2.anl_col as table_2_anl_col ";
            $query1 .="from produktionsAnlagenMoreOpt as t2 ";
            $query1.=") ";
            $query1 .="t2 ";
            $query1 .="on t1.prd_id = t2.table_2_prd_id AND t1.anl_id = t2.table_2_anl_id AND t1.anl_col = t2.table_2_anl_col ";
            $query1 .= "left join ";
            $query1 .= "( ";
            $query1 .= "select t3.prd_anl_ID as table_3_prd_anl_Id , max(cast(t3.val as int)) as val ";
            $query1 .= "from masseneingabeSuchePrdIMw  as t3 group by t3.prd_anl_ID ";
            $query1 .= ") ";
            $query1 .= "t3 ";
            $query1 .= "on t2.table_2_id = t3.table_3_prd_anl_Id ";
            $query1 .= "left join produkte as t4 on t1.prd_iD = t4.prd_ID ";
            $query1 .= "left join anlagen as t5 on t1.anl_id = t5.anl_ID ";
            $query1 .= "where t1.iBdeType='1' ";
            $query1 .= "order by t1.iBdePrdktConf_ID desc ";
            $dataProduct = queryDB($conn, $query1, "read");
            // echo json_encode($dataProduct); die;
            $tr = '';
            if($dataProduct != '' && count($dataProduct) > 0){
                foreach($dataProduct as $key => $value){
                    $tr .= '<tr>';
                    $tr.= "<td>".$value['namePrd']."</td>";
                    $tr.= "<td>".$value['bezeichnungAnl']."</td>";
                    if($value['intTp_ID'] == "1"){
                        $tr.= "<td>Days</td>";
                    }
                    else if($value['intTp_ID'] == "2"){
                        $tr.= "<td>Weeks</td>";
                    }
                    else if($value['intTp_ID'] == "3"){
                        $tr.= "<td>Months</td>";
                    }
                    else if($value['intTp_ID'] == "4"){
                        $tr.= "<td>Years</td>";
                    }
                    else{
                        $tr.= "<td></td>";
                    }
                    // tr+= "<td class='text-danger'>"+28.76+ "<i class='ti-arrow-down'></i></td>";
                    if($value['intTp_ID'] == "2" && $value['startWeek'] != ''){
                        $tr.= "<td>".$value['startWeek'].'-'.$value['startDate']."</td>";
                    }
                    else{
                        $tr.= "<td>".$value['startDate']."</td>";
                    }
                    if($value['val'] == null){
                        $tr.= "<td><label class='badge badge-danger'>Pending </label></td>";
                    }
                    else{
                        $tr.= "<td><label class='badge badge-success'>Active </label></td>";
                    }
                    
                    $tr.="</tr>";
                }
            }else{
                 $tr = "<tr><td colspan='4' class='text-center'>No Data</td></tr>";
            }

            $records['product_html'] = $tr;
            echo json_encode($records,JSON_INVALID_UTF8_IGNORE);
            die;
        }
        catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }

    public function getNumberRecordsProductionData(){
       try{
        global $conn;
        $number_records = $_POST['number_records'];

        $query1 = "SELECT  TOP($number_records) * FROM produktionsAnlagenConfig as t1 ";
        $query1 .= "left join produkte as t2 on t1.prd_ID = t2.prd_ID ";
        $query1 .= "left join anlagen as t3 on t1.anl_id = t3.anl_ID ";
        $query1 .= "where t1.iBdeType='1' order by t1.iBdePrdktConf_ID desc";
        $dataProduct = queryDB($conn, $query1, "read");
        // echo json_encode($dataProduct); die;
        $tr = '';
        if($dataProduct != '' && count($dataProduct) > 0){
            foreach($dataProduct as $key => $value){
                $tr .= '<tr>';
                $tr.= "<td>".$value['namePrd']."</td>";
                $tr.= "<td>".$value['bezeichnungAnl']."</td>";
                if($value['intTp_ID'] == "1"){
                    $tr.= "<td>Days</td>";
                }
                else if($value['intTp_ID'] == "2"){
                    $tr.= "<td>Weeks</td>";
                }
                else if($value['intTp_ID'] == "3"){
                    $tr.= "<td>Months</td>";
                }
                else if($value['intTp_ID'] == "4"){
                    $tr.= "<td>Years</td>";
                }
                else{
                    $tr.= "<td></td>";
                }
                // tr+= "<td class='text-danger'>"+28.76+ "<i class='ti-arrow-down'></i></td>";
                if($value['intTp_ID'] == "2" && $value['startWeek'] != ''){
                    $tr.= "<td>".$value['startWeek'].'-'.$value['startDate']."</td>";
                }
                else{
                    $tr.= "<td>".$value['startDate']."</td>";
                }
                $tr.="</tr>";
            }
        }else{
             $tr = "<tr><td colspan='4' class='text-center'>No Data</td></tr>";
        }

        $records['production_data_html'] = $tr;
        echo json_encode($records,JSON_INVALID_UTF8_IGNORE);
        die;

        }
        catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }      
    }

    public function getAlerts(){
        try{
            global $conn;
            //$query1 = "SELECT Top($number_records) * FROM produktionsAnlagenConfig where iBdeType='2'  order by iBdePrdktConf_ID desc";
            //Measurement Table Entries
            $query1 = "SELECT TOP(40) * ";
            $query1 .= "FROM produktionsAnlagenConfig as T1 ";
            $query1  .= "where T1.iBdeType='2' ";
            $query1  .= "AND (min_val IS NULL ";
            $query1  .= "OR  max_val IS NULL) ";
            $query1 .=  "order by T1.iBdePrdktConf_ID desc ";
            // echo $query1; die;
            $dataMesaurement = queryDB($conn, $query1, "read");
            // echo json_encode($dataMesaurement); die;
            $tr = '';
            if($dataMesaurement != '' && count($dataMesaurement) > 0){
                foreach($dataMesaurement as $key => $value){
                    $tr .= '<tr>';
                    $tr.= "<td>".$value['mstIMw']."</td>";
                    if($value['intTp_ID'] == "1"){
                        $tr.= "<td>Days</td>";
                    }
                    else if($value['intTp_ID'] == "2"){
                        $tr.= "<td>Weeks</td>";
                    }
                    else if($value['intTp_ID'] == "3"){
                        $tr.= "<td>Months</td>";
                    }
                    else if($value['intTp_ID'] == "4"){
                        $tr.= "<td>Years</td>";
                    }
                    else{
                        $tr.= "<td></td>";
                    }
                    // tr+= "<td class='text-danger'>"+28.76+ "<i class='ti-arrow-down'></i></td>";
                    if($value['intTp_ID'] == "2" && $value['startWeek'] != ''){
                        $tr.= "<td>".$value['startWeek'].'-'.$value['startDate']."</td>";
                    }
                    else{
                        $tr.= "<td>".$value['startDate']."</td>";
                    }
                    if($value['min_val'] == null  && $value['max_val'] == null ){
                        $tr.= "<td><label class='text-danger'>Min and Max Value Empty</label></td>";
                    }
                    else if($value['min_val'] == null){
                        $tr.= "<td><label class='text-danger'>Min Value Empty</label></td>";
                    }
                    else if($value['max_val'] == null){
                        $tr.= "<td><label class='text-danger'>Max Value Empty</label></td>";
                    }
                    else{
                        $tr.= "<td><label class='badge badge-danger'>NA </label></td>";
                    }
                    $tr.="</tr>";
                }
            }else{
                 $tr = "<tr><td colspan='4' class='text-center'>No Data</td></tr>";
            }

            //2nd Case  Min Value Greater
            $query1 = "SELECT TOP(20) * ";
            $query1 .= "FROM produktionsAnlagenConfig as T1 ";
            $query1  .= "where T1.iBdeType='2' ";
            $query1  .= "AND (cast(t1.min_val as int) >= cast(t1.max_val as int)) ";
            $query1 .=  "order by T1.iBdePrdktConf_ID desc ";
            // echo $query1; die;
            $dataMesaurement = queryDB($conn, $query1, "read");
            
            if($dataMesaurement != '' && count($dataMesaurement) > 0){
                foreach($dataMesaurement as $key => $value){
                    $tr .= '<tr>';
                    $tr.= "<td>".$value['mstIMw']."</td>";
                    if($value['intTp_ID'] == "1"){
                        $tr.= "<td>Days</td>";
                    }
                    else if($value['intTp_ID'] == "2"){
                        $tr.= "<td>Weeks</td>";
                    }
                    else if($value['intTp_ID'] == "3"){
                        $tr.= "<td>Months</td>";
                    }
                    else if($value['intTp_ID'] == "4"){
                        $tr.= "<td>Years</td>";
                    }
                    else{
                        $tr.= "<td></td>";
                    }
                    // tr+= "<td class='text-danger'>"+28.76+ "<i class='ti-arrow-down'></i></td>";
                    if($value['intTp_ID'] == "2" && $value['startWeek'] != ''){
                        $tr.= "<td>".$value['startWeek'].'-'.$value['startDate']."</td>";
                    }
                    else{
                        $tr.= "<td>".$value['startDate']."</td>";
                    }
                    if($value['min_val'] != null  && $value['max_val'] != null ){
                        $tr.= "<td><label class='text-danger'>Min Value Greater</label></td>";
                    }
                    else{
                        $tr.= "<td><label class='badge badge-danger'>NA </label></td>";
                    }
                    $tr.="</tr>";
                }
            }

            $records['alerts_min_max_null_mesurement_tables'] = $tr;


            //Product Tale Entries
            $query1 = "SELECT TOP(40) * FROM produktionsAnlagenConfig as t1 ";
            $query1 .= "left join produkte as t2 on t1.prd_ID = t2.prd_ID ";
            $query1 .= "left join anlagen as t3 on t1.anl_id = t3.anl_ID ";
            $query1 .= "where t1.iBdeType='1' ";
            $query1 .= "AND (t1.min_val is null or t1.max_val is null) ";
            $query1  .= "order by t1.iBdePrdktConf_ID desc ";
            $dataProduct = queryDB($conn, $query1, "read");
            // echo json_encode($dataProduct); die;
            $tr = '';
            if($dataProduct != '' && count($dataProduct) > 0){
                foreach($dataProduct as $key => $value){
                    $tr .= '<tr>';
                    $tr.= "<td>".$value['namePrd']."</td>";
                    $tr.= "<td>".$value['bezeichnungAnl']."</td>";
                    if($value['intTp_ID'] == "1"){
                        $tr.= "<td>Days</td>";
                    }
                    else if($value['intTp_ID'] == "2"){
                        $tr.= "<td>Weeks</td>";
                    }
                    else if($value['intTp_ID'] == "3"){
                        $tr.= "<td>Months</td>";
                    }
                    else if($value['intTp_ID'] == "4"){
                        $tr.= "<td>Years</td>";
                    }
                    else{
                        $tr.= "<td></td>";
                    }
                    // tr+= "<td class='text-danger'>"+28.76+ "<i class='ti-arrow-down'></i></td>";
                    if($value['intTp_ID'] == "2" && $value['startWeek'] != ''){
                        $tr.= "<td>".$value['startWeek'].'-'.$value['startDate']."</td>";
                    }
                    else{
                        $tr.= "<td>".$value['startDate']."</td>";
                    }
                    if($value['min_val'] == null  && $value['max_val'] == null ){
                        $tr.= "<td><label class='text-danger'>Min and Max Value Empty</label></td>";
                    }
                    else if($value['min_val'] == null){
                        $tr.= "<td><label class='text-danger'>Min Value Empty</label></td>";
                    }
                    else if($value['max_val'] == null){
                        $tr.= "<td><label class='text-danger'>Max Value Empty</label></td>";
                    }
                    else{
                        $tr.= "<td><label class='badge badge-danger'>NA </label></td>";
                    }

                    $tr.="</tr>";
                }
            }else{
                $tr = "<tr><td colspan='5' class='text-center'>No Data</td></tr>";
            }

            

            //2nd Case Product Min Value Greater
            $query1 = "SELECT TOP(20) * FROM produktionsAnlagenConfig as t1 ";
            $query1 .= "left join produkte as t2 on t1.prd_ID = t2.prd_ID ";
            $query1 .= "left join anlagen as t3 on t1.anl_id = t3.anl_ID ";
            $query1 .= "where t1.iBdeType='1' ";
            $query1 .= "AND (cast(t1.min_val as int ) >= cast(t1.max_val as int)) ";
            $query1  .= "order by t1.iBdePrdktConf_ID desc ";
            $dataProduct = queryDB($conn, $query1, "read");
            // echo json_encode($dataProduct); die;
            if($dataProduct != '' && count($dataProduct) > 0){
                foreach($dataProduct as $key => $value){
                    $tr .= '<tr>';
                    $tr.= "<td>".$value['namePrd']."</td>";
                    $tr.= "<td>".$value['bezeichnungAnl']."</td>";
                    if($value['intTp_ID'] == "1"){
                        $tr.= "<td>Days</td>";
                    }
                    else if($value['intTp_ID'] == "2"){
                        $tr.= "<td>Weeks</td>";
                    }
                    else if($value['intTp_ID'] == "3"){
                        $tr.= "<td>Months</td>";
                    }
                    else if($value['intTp_ID'] == "4"){
                        $tr.= "<td>Years</td>";
                    }
                    else{
                        $tr.= "<td></td>";
                    }
                    // tr+= "<td class='text-danger'>"+28.76+ "<i class='ti-arrow-down'></i></td>";
                    if($value['intTp_ID'] == "2" && $value['startWeek'] != ''){
                        $tr.= "<td>".$value['startWeek'].'-'.$value['startDate']."</td>";
                    }
                    else{
                        $tr.= "<td>".$value['startDate']."</td>";
                    }
                    if($value['min_val'] != null  && $value['max_val'] != null ){
                        $tr.= "<td><label class='text-danger'>Min Value Greater</label></td>";
                    }
                    else{
                        $tr.= "<td><label class='badge badge-danger'>NA </label></td>";
                    }

                    $tr.="</tr>";
                }
            }

            $records['alerts_min_max_null_product_tables'] = $tr;



            //<--Energy Table
            $energyData = "SELECT TOP(40) * FROM interneBetriebsdatenHistorie As T1 ";
            $energyData .= "WHERE (t1.invest_min is null or t1.invest_max is null) ";
            $energyData .= "AND T1.deleted <> 'true' ";
            $energyData.= "AND T1.archiviert ='true' ";
            $energyData  .= "order by t1.histID desc ";
            $dataEnergy = queryDB($conn, $energyData, "read");
            // echo json_encode($dataEnergy); die;
            $tr = '';
            if($dataEnergy != '' && count($dataEnergy) > 0){
                foreach($dataEnergy as $key => $value){
                    $tr .= '<tr>';
                    $tr.= "<td>".$value['anlIMw']."</td>";
                    if($value['zeitintervallAnl'] == "1"){
                        $tr.= "<td>Days</td>";
                    }
                    else if($value['zeitintervallAnl'] == "2"){
                        $tr.= "<td>Weeks</td>";
                    }
                    else if($value['zeitintervallAnl'] == "3"){
                        $tr.= "<td>Months</td>";
                    }
                    else if($value['zeitintervallAnl'] == "4"){
                        $tr.= "<td>Years</td>";
                    }
                    else{
                        $tr.= "<td></td>";
                    }
                    // tr+= "<td class='text-danger'>"+28.76+ "<i class='ti-arrow-down'></i></td>";
                    if($value['zeitintervallAnl'] == "2" && $value['zeitintervallAnl'] != ''){
                        $tr.= "<td>".$value['startWeek'].'-'.$value['startDate']."</td>";
                    }
                    else{
                        $tr.= "<td>".$value['startDate']."</td>";
                    }
                   
                    if($value['invest_min'] == null && $value['invest_max'] == null ){
                        $tr.= "<td><label class='text-danger'>Min and Max Value Empty</label></td>";
                    }
                    else if($value['invest_min'] == null){
                        $tr.= "<td><label class='text-danger'>Min Value Empty</label></td>";
                    }
                    else if($value['invest_max'] == null ){
                        $tr.= "<td><label class='text-danger'>Max Value Empty</label></td>";
                    }
                    else{
                        $tr.= "<td><label class='badge badge-danger'>NA </label></td>";
                    }

                    $tr.="</tr>";
                }
            }else{
                $tr = "<tr><td colspan='4' class='text-center'>No Data</td></tr>";
            }


            //2nd case Energy Data Min Value is Greater
            $energyData = "SELECT TOP(20) * FROM interneBetriebsdatenHistorie As T1 ";
            $energyData .= "WHERE (cast(t1.invest_min as int) >= cast(t1.invest_max as int)) ";
            $energyData .= "AND T1.deleted <> 'true' ";
            $energyData.= "AND T1.archiviert ='true' ";
            $energyData  .= "order by t1.histID desc ";
            $dataEnergy = queryDB($conn, $energyData, "read");
            // echo json_encode($dataEnergy); die;
            if($dataEnergy != '' && count($dataEnergy) > 0){
                foreach($dataEnergy as $key => $value){
                    $tr .= '<tr>';
                    $tr.= "<td>".$value['anlIMw']."</td>";
                    if($value['zeitintervallAnl'] == "1"){
                        $tr.= "<td>Days</td>";
                    }
                    else if($value['zeitintervallAnl'] == "2"){
                        $tr.= "<td>Weeks</td>";
                    }
                    else if($value['zeitintervallAnl'] == "3"){
                        $tr.= "<td>Months</td>";
                    }
                    else if($value['zeitintervallAnl'] == "4"){
                        $tr.= "<td>Years</td>";
                    }
                    else{
                        $tr.= "<td></td>";
                    }
                    // tr+= "<td class='text-danger'>"+28.76+ "<i class='ti-arrow-down'></i></td>";
                    if($value['zeitintervallAnl'] == "2" && $value['zeitintervallAnl'] != ''){
                        $tr.= "<td>".$value['startWeek'].'-'.$value['startDate']."</td>";
                    }
                    else{
                        $tr.= "<td>".$value['startDate']."</td>";
                    }
                   
                    if($value['invest_min'] != null && $value['invest_max'] != null ){
                        $tr.= "<td><label class='text-danger'>Min Value Greater</label></td>";
                    }
                    else{
                        $tr.= "<td><label class='badge badge-danger'>NA </label></td>";
                    }

                    $tr.="</tr>";
                }
            }

            $records['alerts_min_max_null_energy_tables'] = $tr;

            echo json_encode($records,JSON_INVALID_UTF8_IGNORE);
            die;

        }
        catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }   

    }

    public function getDashBoardChart(){
        try{
            global $conn;
            //<---Chart Data ---
            // $currentDayVal = date('d');
            // $previousDayVal = date('d-m-y',strtotime("+1 month"));
        
            $ar = [];
            $current_date = date('Y-m-d');
            for($i = 1; $i<=6; $i++){
               $days_val = 5 * $i; 
               $date_differnce = date('Y-m-d', strtotime("-$days_val days"));
            //    <---old Code---
            //    $energyConsumed = "SELECT SUM(cast(T2.val as int)) as val FROM interneBetriebsdatenHistorie As T1 ";
            //    $energyConsumed .= "LEFT JOIN masseneingabeSucheIMw as T2 ";
            //    $energyConsumed .= "ON T1.mstID = T2.mst_ID ";
            //    $energyConsumed .= "WHERE T2.on_date >= '$date_differnce' ";
            //    $energyConsumed .= "AND T2.on_date <= '$current_date' ";
            //    $energyConsumed .= "AND T2.type = '1' ";
            //    $energyConsumed .= "AND T1.deleted <> 'true' ";
            //    $energyConsumed.= "AND T1.archiviert ='true' ";
              
            //    $dataEnergy = queryDB($conn, $energyConsumed, "read");
            //    array_push($ar,$dataEnergy);
            // ---end-->

                // <---02-9-2021--
                $queryTotalRecords = "SELECT SUM(cast(T2.val as int)) as val ";
                $queryTotalRecords .= "FROM produktionsAnlagenConfig as T1 ";
                $queryTotalRecords .= "INNER JOIN masseneingabeSucheIMw as T2 ";
                $queryTotalRecords .= "ON T1.mst_ID = T2.mst_ID ";
                // $queryTotalRecords  .= "where T1.iBdeType='2' ";
                $queryTotalRecords .= "WHERE T2.on_date >= '$date_differnce' ";
                $queryTotalRecords .= "AND T2.on_date <= '$current_date' ";
                $queryTotalRecords .= "AND T2.type = '1' ";
                $queryTotalRecords .= "AND T1.intTp_ID = '1' ";
                $queryTotalRecords .= "AND T1.iBdeType = '2' ";
                $totalRecordsValue = queryDB($conn, $queryTotalRecords, "read");
                
                array_push($ar,$totalRecordsValue);
            }
            
            $energy_chart['energy_chart_ar'] = $ar;

           
            


            //Reports Details Charts
            $date_differnce_days = date('Y-m-d H:i:s', strtotime('-30 days'));
            
            //Total Energy
            $TotalenergyConsumed = "SELECT SUM(cast(T2.val as int)) as val FROM interneBetriebsdatenHistorie As T1 ";
            $TotalenergyConsumed .= "LEFT JOIN masseneingabeSucheIMw as T2 ";
            $TotalenergyConsumed .= "ON T1.mstID = T2.mst_ID ";
            $TotalenergyConsumed .= "WHERE T1.created_on >= convert(datetime,'$date_differnce_days',101) ";
            $TotalenergyConsumed .= "AND T1.deleted <> 'true' ";
            $TotalenergyConsumed.= "AND T1.archiviert ='true' ";
            $dataEnergy = queryDB($conn, $TotalenergyConsumed, "read");
            $energy_chart['totalEnergyConsumed'] = $dataEnergy;

            //Days Energy
            $daysEnergyConsumed = "SELECT SUM(cast(T2.val as int)) as val FROM interneBetriebsdatenHistorie As T1 ";
            $daysEnergyConsumed .= "LEFT JOIN masseneingabeSucheIMw as T2 ";
            $daysEnergyConsumed .= "ON T1.mstID = T2.mst_ID ";
            $daysEnergyConsumed .= "WHERE T1.created_on >= convert(datetime,'$date_differnce_days',101) ";
            $daysEnergyConsumed .= "AND T1.zeitintervallAnl = '1' ";
            $daysEnergyConsumed .= "AND T1.deleted <> 'true' ";
            $daysEnergyConsumed.= "AND T1.archiviert ='true' ";
            $dataEnergy = queryDB($conn, $daysEnergyConsumed, "read");
            $energy_chart['daysEnergyConsumed'] = $dataEnergy;
            

            //Week Energy
            $weekEnergyConsumed = "SELECT SUM(cast(T2.val as int)) as val FROM interneBetriebsdatenHistorie As T1 ";
            $weekEnergyConsumed .= "LEFT JOIN masseneingabeSucheIMw as T2 ";
            $weekEnergyConsumed .= "ON T1.mstID = T2.mst_ID ";
            $weekEnergyConsumed .= "WHERE T1.created_on >= convert(datetime,'$date_differnce_days',101) ";
            $weekEnergyConsumed .= "AND T1.zeitintervallAnl = '2' ";
            $weekEnergyConsumed .= "AND T1.deleted <> 'true' ";
            $weekEnergyConsumed.= "AND T1.archiviert ='true' ";
            $dataEnergy = queryDB($conn, $weekEnergyConsumed, "read");
            $energy_chart['weekEnergyConsumed'] = $dataEnergy;
            // echo $weekEnergyConsumed; die;

            //Month Energy
            $monthEnergyConsumed = "SELECT SUM(cast(T2.val as int)) as val FROM interneBetriebsdatenHistorie As T1 ";
            $monthEnergyConsumed .= "LEFT JOIN masseneingabeSucheIMw as T2 ";
            $monthEnergyConsumed .= "ON T1.mstID = T2.mst_ID ";
            $monthEnergyConsumed .= "WHERE T1.created_on >= convert(datetime,'$date_differnce_days',101) ";
            $monthEnergyConsumed .= "AND T1.zeitintervallAnl = '3' ";
            $monthEnergyConsumed .= "AND T1.deleted <> 'true' ";
            $monthEnergyConsumed.= "AND T1.archiviert ='true' ";
            $dataEnergy = queryDB($conn, $monthEnergyConsumed, "read");
            $energy_chart['monthEnergyConsumed'] = $dataEnergy;
     

            //Year Energy
            $yearEnergyConsumed = "SELECT SUM(cast(T2.val as int)) as val FROM interneBetriebsdatenHistorie As T1 ";
            $yearEnergyConsumed .= "LEFT JOIN masseneingabeSucheIMw as T2 ";
            $yearEnergyConsumed .= "ON T1.mstID = T2.mst_ID ";
            $yearEnergyConsumed .= "WHERE T1.created_on >= convert(datetime,'$date_differnce_days',101) ";
            $yearEnergyConsumed .= "AND T1.zeitintervallAnl = '4' ";
            $yearEnergyConsumed .= "AND T1.deleted <> 'true' ";
            $yearEnergyConsumed.= "AND T1.archiviert ='true' ";
            $dataEnergy = queryDB($conn, $yearEnergyConsumed, "read");
            $energy_chart['yearEnergyConsumed'] = $dataEnergy;
            
            
            // echo json_encode($energy_chart['monthEnergyConsumed']); die;

           

            echo json_encode($energy_chart,JSON_INVALID_UTF8_IGNORE);
            die;

        }
        catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }  
    }

    public function getDataFiveDaysEnergyConsumeed(){
        try{
            global $conn;
            
            // $date_differnce_days = date('Y-m-d H:i:s', strtotime('-5 days'));
            $date_differnce_days = date('Y-m-d', strtotime('-5 days'));
            $current_date = date('Y-m-d');

            //Get Max Energy Consumed Five Days
            $maxFiveDayEnergyConsumed = "SELECT max(cast(T2.val as int)) as val FROM interneBetriebsdatenHistorie As T1 ";
            $maxFiveDayEnergyConsumed .= "INNER JOIN masseneingabeSucheIMw as T2 ";
            $maxFiveDayEnergyConsumed .= "ON T1.mstID = T2.mst_ID ";
            $maxFiveDayEnergyConsumed .= "WHERE T2.on_date >= '$date_differnce_days' ";
            $maxFiveDayEnergyConsumed.= "AND T2.on_date <= '$current_date' ";
            $maxFiveDayEnergyConsumed.= "AND T2.type ='1' ";
            $maxFiveDayEnergyConsumed .= "AND T1.deleted <> 'true' ";
            $maxFiveDayEnergyConsumed.= "AND T1.archiviert ='true' ";
            $maxdataEnergy = queryDB($conn, $maxFiveDayEnergyConsumed, "read");
            $total_max_energy = count($maxdataEnergy) > 0 ? $maxdataEnergy[0]['val'] : ''; 

            //Total Sum Energy Consumed 
            $totalSumFiveDayEnergyConsumed = "SELECT sum(cast(T2.val as int)) as val FROM interneBetriebsdatenHistorie As T1 ";
            $totalSumFiveDayEnergyConsumed .= "INNER JOIN masseneingabeSucheIMw as T2 ";
            $totalSumFiveDayEnergyConsumed .= "ON T1.mstID = T2.mst_ID ";
            $totalSumFiveDayEnergyConsumed .= "WHERE T2.on_date >= '$date_differnce_days' ";
            $totalSumFiveDayEnergyConsumed.= "AND T2.on_date <= '$current_date' ";
            $totalSumFiveDayEnergyConsumed.= "AND T2.type ='1' ";
            $totalSumFiveDayEnergyConsumed .= "AND T1.deleted <> 'true' ";
            $totalSumFiveDayEnergyConsumed.= "AND T1.archiviert ='true' ";
            $totalSumDataEnergyConsumed = queryDB($conn, $totalSumFiveDayEnergyConsumed, "read");
            // echo json_encode($totalSumDataEnergyConsumed); die;
            // $energyData['totalSumDataEnergyConsumed'] = count($totalSumDataEnergyConsumed) > 0 && $totalSumDataEnergyConsumed[0]['val'] != null ? $totalSumDataEnergyConsumed[0]['val'] : 0;
            $energyData['totalSumDataEnergyConsumed'] = $totalSumDataEnergyConsumed;

            //Data Five Days
            $fiveDayEnergyConsumed = "SELECT * FROM interneBetriebsdatenHistorie As T1 ";
            $fiveDayEnergyConsumed .= "INNER JOIN masseneingabeSucheIMw as T2 ";
            $fiveDayEnergyConsumed .= "ON T1.mstID = T2.mst_ID ";
            $fiveDayEnergyConsumed .= "WHERE T2.on_date >= '$date_differnce_days' ";
            $fiveDayEnergyConsumed.= "AND T2.on_date <= '$current_date' ";
            $fiveDayEnergyConsumed .= "AND T2.type ='1' ";
            $fiveDayEnergyConsumed .= "AND T1.deleted <> 'true' ";
            $fiveDayEnergyConsumed.= "AND T1.archiviert ='true' ";
            $fiveDayEnergyConsumed.= "order by T2.on_date desc ";
            // echo $fiveDayEnergyConsumed; die;
            $dataEnergy = queryDB($conn, $fiveDayEnergyConsumed, "read");
            $tr = '';
            
            if(count($dataEnergy)>0){
                for($i = 0; $i<count($dataEnergy); $i++){
                    $dateFormat = $dataEnergy[$i]['on_date']; 
                    $day = date('D', strtotime($dateFormat));

                    $style='';
                    if($total_max_energy != '' && $total_max_energy == $dataEnergy[$i]['val']){
                        $style="style='background-color: #f77171'";
                    }

                    $tr .= "<tr $style>";
                    $tr.= "<td>".$dataEnergy[$i]['anlIMw']."</td>";
                    if($dataEnergy[$i]['zeitintervallAnl'] == "1"){
                        $tr.= "<td>Days</td>";
                    }
                    else if($dataEnergy[$i]['zeitintervallAnl'] == "2"){
                        $tr.= "<td>Weeks</td>";
                    }
                    else if($dataEnergy[$i]['zeitintervallAnl'] == "3"){
                        $tr.= "<td>Months</td>";
                    }
                    else if($dataEnergy[$i]['zeitintervallAnl'] == "4"){
                        $tr.= "<td>Years</td>";
                    }
                    else{
                        $tr.= "<td></td>";
                    }
                    $tr.= "<td>".$day."</td>";
                    // tr+= "<td class='text-danger'>"+28.76+ "<i class='ti-arrow-down'></i></td>";
                    if($dataEnergy[$i]['zeitintervallAnl'] == "2" && $dataEnergy[$i]['zeitintervallAnl'] != ''){
                        $tr.= "<td>".$dataEnergy[$i]['startWeek'].'-'.$dataEnergy[$i]['startDate']."</td>";
                    }
                    else{
                        $tr.= "<td>".$dataEnergy[$i]['on_date']."</td>";
                    }
                   
                    $tr.="<td>".$dataEnergy[$i]['val']."<p class='energy_unit text-muted'>kWh</p></td>";
                    $tr.="</tr>";
                }
            }
            else{
                $tr.="<tr><td colspan='5' class='text-center'>No Record Found</td></tr>";
            }
            $energyData['five_days_energy_data'] = $tr;
            
            
            echo json_encode($energyData,JSON_INVALID_UTF8_IGNORE);
            die;
        }
        catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }  

    }

    //<---Screen Code 
    // public function moveMeasurementTableScreenShot(){
    //     try{
    //         $image = $_POST['image'];

    //         $id =    $_POST['id'];

    //         $location = "..\upload/";

    //         $image_parts = explode(";base64,", $image);

    //         $image_base64 = base64_decode($image_parts[1]);

    //         $filename = "screenshot_".$id.'.png';
    //         // unlink($filename);
    //         $file = $location . $filename;
    //         file_put_contents($file, $image_base64);
            
    //         $ar = array('staus'=>'200', 'message'=> 'SuccessFully Uploaded');
    //         echo json_encode($ar,JSON_INVALID_UTF8_IGNORE);
    //         die;
    //     }
    //     catch (Exception $e) {
    //         echo 'Caught exception: ',  $e->getMessage(), "\n";
    //     } 
    // }
    // --end-->
    public function getDimentions(){


        global $conn;
        $username = $_SESSION['username']; 
        $id=$_POST['id'];
        $getResult =  "SELECT * from tableFormat where id='$id' AND username = '$username' ";
//        print_r($getResult);die;
        $dataResult = queryDB($conn, $getResult, "read");
        return array('data'=>$dataResult[0]);
    }


    // <---09-8-2021---
    public function getTileClickOverAllCount(){
        try{
            global $conn;
            $id = $_REQUEST['id'];
            $mst_id = $_REQUEST['mst_id'];

            $queryTableFormat = "Select * from tableFormat where id = $id ";
            $getResult = queryDB($conn, $queryTableFormat, "read");
            if($getResult[0]['table_other'] == "true"){
               $this->getTileClickOverAllCountAutomatic();
               die;
            }

            $queryTotalSum = "SELECT sum(cast(t2.val as int)) as total_value from produktionsAnlagenConfig  as t1 ";
            $queryTotalSum .= "INNER JOIN masseneingabeSucheIMw as t2 ";
            $queryTotalSum .= "ON t1.mst_ID = t2.mst_ID ";
            $queryTotalSum .= "Where t1.mst_ID = $mst_id ";
            $totalSum = queryDB($conn, $queryTotalSum, "read");
            $totalSum = $totalSum[0]['total_value'] != null ?  $totalSum[0]['total_value'] : '';


            $queryUnit = "SELECT unt_ID,mstIMw FROM produktionsAnlagenConfig where mst_ID = $mst_id ";
            $resultUnit = queryDB($conn, $queryUnit, "read");
            $record['name_value'] = $resultUnit[0]['mstIMw'];
            // echo json_encode($resultUnit); die;
            // Units Checks
            $unit = '';
            if($resultUnit != null){
                if($resultUnit[0]['unt_ID'] == "1"){
                    $unit = "Hrs.";
                }
                else if($resultUnit[0]['unt_ID'] == "2"){
                    $unit = "kWh";
                }
                else if($resultUnit[0]['unt_ID'] == "3"){
                    $unit = "m³";
                }
                else if($resultUnit[0]['unt_ID'] == "4"){

                    $unit = "l";
                }
                else if($resultUnit[0]['unt_ID'] == "5"){
                    $unit = "kg";
                }
            }

            $total_name_merge='';
            if($totalSum != '' && $resultUnit != null){
                $total_name_merge = $totalSum.' '.$unit;
            }
            $record['total_sum'] = $total_name_merge;
            $record['measurement_type'] = 'Mannual';
            echo json_encode($record,JSON_INVALID_UTF8_IGNORE);
            die;
        }
        catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        } 
    }
    // --end-->

    public function getTableDashboardData(){
        try{
            global $conn;
            $id = $_REQUEST['id'];
            $username = $_SESSION['username']; 
            $getResult = "SELECT * from tableFormat WHERE type = 'Measurement' AND username = '$username' AND id = $id ";
            $dataResult = queryDB($conn, $getResult, "read");
            if($dataResult != '' && count($dataResult) > 0){
                $dataMeasurement = '';
                if($dataResult[0]['row_click'] == 'false' && $dataResult[0]['query_max_val'] == ''){
                    //Seacrh Record 
                    // echo json_encode($dataResult[0]['query_data_records']); die;
                    $firstPostion =  strpos($dataResult[0]['query_data_records'],'%');
                    $lastPostion = strripos($dataResult[0]['query_data_records'],'%');
                    $subStr = "%";
                    $attachment = "$";
                    if($firstPostion != '' && $lastPostion != '')
                    {
                        // $firstPostionQuery = str_replace($subStr, $attachment.$subStr, $dataResult[0]['query_data_records']);
                        //$firstPostionQuery = str_replace($dataResult[0]['query_data_records'],$attachment, $firstPostion,0);
                        // $firstPostionQuery = substr_replace($dataResult[0]['query_data_records'],$attachment, $lastPostion,0);
                        $firstPostionQuery= substr_replace($dataResult[0]['query_data_records'],$attachment,$firstPostion,1);
                        // $firstPostionQuery = str_replace($subStr, $attachment, $dataResult[0]['query_data_records'],0);
                        $firstPostionQuery=str_replace('%',"%'", $firstPostionQuery);
                        $firstPostionQuery=str_replace('$',"'%", $firstPostionQuery);
                        $dataMeasurement = queryDB($conn, $firstPostionQuery, "read");
                    }
                    else{
                        $dataMeasurement = queryDB($conn, $dataResult[0]['query_data_records'], "read");
                    }
                    // <----15-9-2021---
                    $dashboardMeasurementHtml = '';
                    if($dataResult[0]['table_other'] == 'false'){
                        $dashboardMeasurementHtml = $this->dashboardMeasurementHtml($dataMeasurement);
                    }else{
                        $dashboardMeasurementHtml = $this->dashboardMeasurementHtmlAutomatic($dataMeasurement);
                    }
                    // --end-->
                    $records['dashboardMeasurementHtml'] = $dashboardMeasurementHtml;

                    echo json_encode($records, JSON_INVALID_UTF8_IGNORE);  die;
                }
                else{
                    if($dataResult[0]['tile_data_type'] == 'table'){
                        $dataMeasurement = queryDB($conn, $dataResult[0]['query_data_records'], "read");
                        $queryMaxValue = queryDB($conn, $dataResult[0]['query_max_val'], "read");
                        $queryMaxVal = count($queryMaxValue) > 0 ? $queryMaxValue[0]['val'] : '';
                        // <---15-9-2021---
                        $dashboardMeasurementHtml = '';
                        if($dataResult[0]['table_other'] == 'false'){
                            $dashboardMeasurementHtml = $this->dashboardMeasurementHtml($dataMeasurement,$queryMaxVal);
                        }
                        else{
                            $dashboardMeasurementHtml = $this->dashboardMeasurementHtmlAutomatic($dataMeasurement,$queryMaxVal);
                        }
                        // --end---->
                        $records['dashboardMeasurementHtml'] = $dashboardMeasurementHtml;

                        echo json_encode($records, JSON_INVALID_UTF8_IGNORE);  die;
                    }
                }
                echo json_encode($records, JSON_INVALID_UTF8_IGNORE);  
                die;
            }else{
                $tr = "<thead>";
                $tr .= "<tr>";
                $tr .= "<th>Name</th>";
                $tr .= "<th>Time Interval</th>";
                $tr .= "<th>Created Date</th>";
                $tr .= "<th>Total Units</th>";
                $tr .= "<th>Status</th>";
                $tr .= "</tr>";
                $tr .= "</thead>";
                $tr .= "<tbody><tr><td colspan='5' class='text-center'>No Data</td></tr></tbody>";
                $records['dashboardMeasurementHtml'] = $tr;
                echo json_encode($records, JSON_INVALID_UTF8_IGNORE);  die;
            }
            die;
        }
        catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        } 
    }

    public function getChartRecordFilter(){
        try{
            global $conn;
            $record_type_of_tile = $_POST['record_type_of_tile'];
            $filter_val = $_POST['filterVal'];
            $type = $_POST['type'];
            $mst_id = $_POST['mst_id'];
            $chart_outer_table_limit_column = $_POST['chart_outer_table_limit_column'] != '' ? $_POST['chart_outer_table_limit_column'] : 1;
            if($record_type_of_tile == 'measurement')
            {
                $queryOverAllCount = "SELECT * From masseneingabeSucheIMw ";
                $queryOverAllCount .= "WHERE mst_ID = '$mst_id' ";
                $resultOverallCount = queryDB($conn, $queryOverAllCount, "read");
                $overallCount = count($resultOverallCount);
                if($filter_val == 10){
                    $ar_days = [];
                    $ar_value = [];
                    $countSum = '';
                    $loopCount = '';
                    for($i = 1; $i <= 10; $i++){
                        if($i <= $overallCount){
                            $query = "SELECT SUM(CAST(val as int)) as val FROM masseneingabeSucheIMw WHERE id in ";
                            $query .= "(SELECT id From masseneingabeSucheIMw ";
                            $query .= "WHERE mst_ID = '$mst_id' ";
                            $query .= "ORDER by id ASC ";
                            $query .= "offset 0 rows FETCH NEXT $i ROWS ONLY )";
                            $result = queryDB($conn, $query, "read");
                            if($result[0]['val'] != null){
                                array_push($ar_value, $result[0]['val']);
                            }
                            if($i == $overallCount || $i == 10){
                                $countSum = $result[0]['val'];
                               
                            }
                            // <---12-11-2021--
                            $loopCount = $i;
                            // --end-->
                            array_push($ar_days,$i);
                        }

                    }
                    // <---12-11-2021--
                    // $ar_reverse_val = array_reverse($ar_value);
                    // echo json_encode($ar_reverse_val); die;
                    $offsetLoopVal = '';
                    $tableOutsideHTML = '';
                    $offsetLoopVal = '';
                    if($loopCount != '')
                    {
                        if($chart_outer_table_limit_column >= $loopCount) //Limit Greater than Overall Count
                        {
                            $chart_outer_table_limit_column = $loopCount;
                            if($overallCount > 0 && $overallCount > $filter_val){ //More Than 10 Condition
                                $offsetLoopVal = $overallCount -  $filter_val;
                            }
                            else{
                                $offsetLoopVal = 0;
                            }
                        }
                        else if($loopCount > $chart_outer_table_limit_column)
                        {
                            if($overallCount > 0 && $overallCount <= $filter_val){ //10 RECORD Condition
                                $offsetLoopVal = 0;
                            }
                            else if($overallCount > 0 && $overallCount > $filter_val){ //More Than 10 Condition
                                $offsetLoopVal = $overallCount -  $filter_val;
                            }
                        }
                        
                        $queryOutsideTable = "SELECT * from masseneingabeSucheIMw ";
                        $queryOutsideTable .= "WHERE mst_ID = '$mst_id' ";
                        $queryOutsideTable .= "ORDER by id DESC ";
                        $queryOutsideTable .= "offset $offsetLoopVal rows FETCH NEXT $chart_outer_table_limit_column ROWS ONLY ";
                        $resultOutsideTable = queryDB($conn, $queryOutsideTable, "read");

                        $tableOutsideHTML = '';
                        for($i = 0; $i < count($resultOutsideTable); $i++)
                        {
                            $tableOutsideHTML .= "<tr>";
                            if($resultOutsideTable[$i]['type'] == '2'){
                                $tableOutsideHTML.= "<td>".$resultOutsideTable[$i]['on_week'].'-'.$resultOutsideTable[$i]['on_date']."</td>";
                            }
                            else{
                                $tableOutsideHTML.= "<td>".$resultOutsideTable[$i]['on_date']."</td>";
                            }
                            $tableOutsideHTML .= "<td>".$resultOutsideTable[$i]['val']."</td>";
                            $tableOutsideHTML .= "</tr>";
                        }

                    }
                    
                    $records['outer_table_html'] = $tableOutsideHTML;
                    // --end-->

                    // <--11-11-2021--
                    $offsetDate = '';
                    $resultDateData = '';
                    if($overallCount > 0 && $overallCount <= $filter_val){ //10 RECORD Condition
                        $offsetDate = $overallCount - 1;
                    }
                    else if($overallCount > 0 && $overallCount > $filter_val){ //More Than 10 Condition
                        $offsetDate = $filter_val - 1;
                        $overallCount = 10;
                    }
                    else{
                        $offsetDate = '';
                    }
                    
                    if($offsetDate != '')
                    {
                        $queryDateData = "SELECT * from masseneingabeSucheIMw ";
                        $queryDateData .= "WHERE mst_ID = '$mst_id' ";
                        $queryDateData .= "ORDER by id ASC ";
                        $queryDateData .= "offset $offsetDate rows FETCH NEXT $overallCount ROWS ONLY ";
                        $resultDateData = queryDB($conn, $queryDateData, "read");
                        // echo json_encode($resultDateData); die;
                        
                    }
                    // --end-->
                    $records['countDate'] = $resultDateData;
                    $records['count_val'] = $ar_value;
                    $records['count_days'] = $ar_days;
                    $records['count_sum'] = $countSum;
                    echo json_encode($records, JSON_INVALID_UTF8_IGNORE);  
                    die;
                }
                else if($filter_val == 20){
                    $ar_days = [];
                    $ar_value = [];
                    $countSum = '';
                    $loopCount = '';
                    for($i = 1; $i <= 20; $i++){
                        if($i <= $overallCount){
                            $offset_val = 2 * $i;
                            $query = "SELECT SUM(CAST(val as int)) as val FROM masseneingabeSucheIMw WHERE id in ";
                            $query .= "(SELECT id From masseneingabeSucheIMw ";
                            $query .= "WHERE mst_ID = '$mst_id' ";
                            $query .= "ORDER by id ASC ";
                            $query .= "offset 0 rows FETCH NEXT $i ROWS ONLY )";
                            $result = queryDB($conn, $query, "read");
                            if($result[0]['val'] != null){
                                array_push($ar_value, $result[0]['val']);
                            }
                            if($i == $overallCount || $i == 20){
                                $countSum = $result[0]['val'];
                            }
                                $loopCount = $i;
                                $day_20 =  $i;
                                // $r+2;
                                array_push($ar_days,$day_20);
        
                            // }
                        }
                        
                    }
                    // print_r($ar_value);die;

                    // <---12-11-2021--
                    $offsetLoopVal = '';
                    $tableOutsideHTML = '';
                    $offsetLoopVal = '';
                    if($loopCount != '')
                    {
                        if($chart_outer_table_limit_column >= $loopCount) //Limit Greater than Overall Count
                        {
                            $chart_outer_table_limit_column = $loopCount;
                            if($overallCount > 0 && $overallCount > $filter_val){ //More Than 20 Condition
                                $offsetLoopVal = $overallCount -  $filter_val;
                            }
                            else{
                                $offsetLoopVal = 0;
                            }
                        }
                        else if($loopCount > $chart_outer_table_limit_column)
                        {
                            if($overallCount > 0 && $overallCount <= $filter_val){ //20 RECORD Condition
                                $offsetLoopVal = 0;
                            }
                            else if($overallCount > 0 && $overallCount > $filter_val){ //More Than 20 Condition
                                $offsetLoopVal = $overallCount -  $filter_val;
                            }
                        }
                        
                        $queryOutsideTable = "SELECT * from masseneingabeSucheIMw ";
                        $queryOutsideTable .= "WHERE mst_ID = '$mst_id' ";
                        $queryOutsideTable .= "ORDER by id DESC ";
                        $queryOutsideTable .= "offset $offsetLoopVal rows FETCH NEXT $chart_outer_table_limit_column ROWS ONLY ";
                        $resultOutsideTable = queryDB($conn, $queryOutsideTable, "read");

                        $tableOutsideHTML = '';
                        for($i = 0; $i < count($resultOutsideTable); $i++)
                        {
                            $tableOutsideHTML .= "<tr>";
                            if($resultOutsideTable[$i]['type'] == '2'){
                                $tableOutsideHTML.= "<td>".$resultOutsideTable[$i]['on_week'].'-'.$resultOutsideTable[$i]['on_date']."</td>";
                            }
                            else{
                                $tableOutsideHTML.= "<td>".$resultOutsideTable[$i]['on_date']."</td>";
                            }
                            $tableOutsideHTML .= "<td>".$resultOutsideTable[$i]['val']."</td>";
                            $tableOutsideHTML .= "</tr>";
                        }

                    }
                    $records['outer_table_html'] = $tableOutsideHTML;
                    // --end-->

                    // <--11-11-2021--
                    $offsetDate = '';
                    $resultDateData = '';
                    if($overallCount > 0 && $overallCount <= $filter_val){ //20 RECORD Condition
                        $offsetDate = $overallCount - 1;
                    }
                    else if($overallCount > 0 && $overallCount > $filter_val){ //More Than 20 Condition
                        $offsetDate = $filter_val - 1;
                        $overallCount = 20;
                    }
                    else{
                        $offsetDate = '';
                    }
                    
                    if($offsetDate != '')
                    {
                        $queryDateData = "SELECT * from masseneingabeSucheIMw ";
                        $queryDateData .= "WHERE mst_ID = '$mst_id' ";
                        $queryDateData .= "ORDER by id ASC ";
                        $queryDateData .= "offset $offsetDate rows FETCH NEXT $overallCount ROWS ONLY ";
                        $resultDateData = queryDB($conn, $queryDateData, "read");
                    }
                    $records['countDate'] = $resultDateData;
                    // --end-->

                    $records['count_val'] = $ar_value;
                    $records['count_days'] = $ar_days;
                    $records['count_sum'] = $countSum;
                    echo json_encode($records, JSON_INVALID_UTF8_IGNORE);  
                    die;
                }
                else if($filter_val == 30) {
                    $ar_days = [];
                    $ar_value = [];
                    $countSum = '';
                    $loopCount = '';
                    for($i = 1; $i <= 30; $i++){
                        if($i <= $overallCount){
                            $offset_val = 3 * $i;
                            $query = "SELECT SUM(CAST(val as int)) as val FROM masseneingabeSucheIMw WHERE id in ";
                            $query .= "(SELECT id From masseneingabeSucheIMw ";
                            $query .= "WHERE mst_ID = '$mst_id' ";
                            $query .= "ORDER by id ASC ";
                            $query .= "offset 0 rows FETCH NEXT $i ROWS ONLY )";
                            $result = queryDB($conn, $query, "read");
                            if($result[0]['val'] != null){
                                array_push($ar_value, $result[0]['val']);
                            }
                            if($i == $overallCount || $i == 30){
                                $countSum = $result[0]['val'];
                            }
                            $loopCount = $i;
                            $day_30 = $i;
                            array_push($ar_days,$day_30);
                        }

                    }

                    // <---12-11-2021--
                    $offsetLoopVal = '';
                    $tableOutsideHTML = '';
                    $offsetLoopVal = '';
                    if($loopCount != '')
                    {
                        if($chart_outer_table_limit_column >= $loopCount) //Limit Greater than Overall Count
                        {
                            $chart_outer_table_limit_column = $loopCount;
                            if($overallCount > 0 && $overallCount > $filter_val){ //More Than 30 Condition
                                $offsetLoopVal = $overallCount -  $filter_val;
                            }
                            else{
                                $offsetLoopVal = 0;
                            }
                        }
                        else if($loopCount > $chart_outer_table_limit_column)
                        {
                            if($overallCount > 0 && $overallCount <= $filter_val){ //30 RECORD Condition
                                $offsetLoopVal = 0;
                            }
                            else if($overallCount > 0 && $overallCount > $filter_val){ //More Than 30 Condition
                                $offsetLoopVal = $overallCount -  $filter_val;
                            }
                        }
                        
                        $queryOutsideTable = "SELECT * from masseneingabeSucheIMw ";
                        $queryOutsideTable .= "WHERE mst_ID = '$mst_id' ";
                        $queryOutsideTable .= "ORDER by id DESC ";
                        $queryOutsideTable .= "offset $offsetLoopVal rows FETCH NEXT $chart_outer_table_limit_column ROWS ONLY ";
                        $resultOutsideTable = queryDB($conn, $queryOutsideTable, "read");

                        $tableOutsideHTML = '';
                        for($i = 0; $i < count($resultOutsideTable); $i++)
                        {
                            $tableOutsideHTML .= "<tr>";
                            if($resultOutsideTable[$i]['type'] == '2'){
                                $tableOutsideHTML.= "<td>".$resultOutsideTable[$i]['on_week'].'-'.$resultOutsideTable[$i]['on_date']."</td>";
                            }
                            else{
                                $tableOutsideHTML.= "<td>".$resultOutsideTable[$i]['on_date']."</td>";
                            }
                            $tableOutsideHTML .= "<td>".$resultOutsideTable[$i]['val']."</td>";
                            $tableOutsideHTML .= "</tr>";
                        }

                    }
                    $records['outer_table_html'] = $tableOutsideHTML;
                    // --end-->

                    // <--11-11-2021--
                    $offsetDate = '';
                    $resultDateData = '';
                    if($overallCount > 0 && $overallCount <= $filter_val){ //30 RECORD Condition
                        $offsetDate = $overallCount - 1;
                    }
                    else if($overallCount > 0 && $overallCount > $filter_val){ //More Than 30 Condition
                        $offsetDate = $filter_val - 1;
                        $overallCount = 30;
                    }
                    else{
                        $offsetDate = '';
                    }
                    
                    if($offsetDate != '')
                    {
                        $queryDateData = "SELECT * from masseneingabeSucheIMw ";
                        $queryDateData .= "WHERE mst_ID = '$mst_id' ";
                        $queryDateData .= "ORDER by id ASC ";
                        $queryDateData .= "offset $offsetDate rows FETCH NEXT $overallCount ROWS ONLY ";
                        $resultDateData = queryDB($conn, $queryDateData, "read");
                    }
                    $records['countDate'] = $resultDateData;
                    // --end-->

                    $records['count_val'] = $ar_value;
                    $records['count_days'] = $ar_days;
                    $records['count_sum'] = $countSum;
                    echo json_encode($records, JSON_INVALID_UTF8_IGNORE);  
                    die;
                    
                }
                else if($filter_val == 'all') {
                    $ar_days = [];
                    $ar_value = [];
                    $countSum = '';
                    $loopCount = '';
                    for($i = 1; $i <= 50; $i++){
                        if($i <= $overallCount){
                            $offset_val = 5 * $i;
                            $query = "SELECT SUM(CAST(val as int)) as val FROM masseneingabeSucheIMw WHERE id in ";
                            $query .= "(SELECT id From masseneingabeSucheIMw ";
                            $query .= "WHERE mst_ID = '$mst_id' ";
                            $query .= "ORDER by id ASC ";
                            $query .= "offset 0 rows FETCH NEXT $i ROWS ONLY )";
                            $result = queryDB($conn, $query, "read");
                            if($result[0]['val'] != null){
                                array_push($ar_value, $result[0]['val']);
                            }
                            if($i == $overallCount || $i == 50){
                                $countSum = $result[0]['val'];
                            }
                            $loopCount = $i;
                            $day_50 = $i;
                            array_push($ar_days,$day_50);
                        }

                    }

                    // <---12-11-2021--
                    $offsetLoopVal = '';
                    $tableOutsideHTML = '';
                    $offsetLoopVal = '';
                    if($loopCount != '')
                    {
                        if($chart_outer_table_limit_column >= $loopCount) //Limit Greater than Overall Count
                        {
                            $chart_outer_table_limit_column = $loopCount;
                            if($overallCount > 0 && $overallCount > 50){ //More Than 50 Condition
                                $offsetLoopVal = $overallCount -  50;
                            }
                            else{
                                $offsetLoopVal = 0;
                            }
                        }
                        else if($loopCount > $chart_outer_table_limit_column)
                        {
                            if($overallCount > 0 && $overallCount <= 50){ //50 RECORD Condition
                                $offsetLoopVal = 0;
                            }
                            else if($overallCount > 0 && $overallCount > 50){ //More Than 50 Condition
                                $offsetLoopVal = $overallCount -  50;
                            }
                        }
                        
                        $queryOutsideTable = "SELECT * from masseneingabeSucheIMw ";
                        $queryOutsideTable .= "WHERE mst_ID = '$mst_id' ";
                        $queryOutsideTable .= "ORDER by id DESC ";
                        $queryOutsideTable .= "offset $offsetLoopVal rows FETCH NEXT $chart_outer_table_limit_column ROWS ONLY ";
                        $resultOutsideTable = queryDB($conn, $queryOutsideTable, "read");

                        $tableOutsideHTML = '';
                        for($i = 0; $i < count($resultOutsideTable); $i++)
                        {
                            $tableOutsideHTML .= "<tr>";
                            if($resultOutsideTable[$i]['type'] == '2'){
                                $tableOutsideHTML.= "<td>".$resultOutsideTable[$i]['on_week'].'-'.$resultOutsideTable[$i]['on_date']."</td>";
                            }
                            else{
                                $tableOutsideHTML.= "<td>".$resultOutsideTable[$i]['on_date']."</td>";
                            }
                            $tableOutsideHTML .= "<td>".$resultOutsideTable[$i]['val']."</td>";
                            $tableOutsideHTML .= "</tr>";
                        }

                    }
                    $records['outer_table_html'] = $tableOutsideHTML;
                    // --end-->

                    // <--11-11-2021--
                    $offsetDate = '';
                    $resultDateData = '';
                    if($overallCount > 0 && $overallCount <= 50){ //50 RECORD Condition
                        $offsetDate = $overallCount - 1;
                    }
                    else if($overallCount > 0 && $overallCount > 50){ //More Than 50 Condition
                        $offsetDate = 50 - 1;
                        $overallCount = 50;
                    }
                    else{
                        $offsetDate = '';
                    }
                    
                    if($offsetDate != '')
                    {
                        $queryDateData = "SELECT * from masseneingabeSucheIMw ";
                        $queryDateData .= "WHERE mst_ID = '$mst_id' ";
                        $queryDateData .= "ORDER by id ASC ";
                        $queryDateData .= "offset $offsetDate rows FETCH NEXT $overallCount ROWS ONLY ";
                        $resultDateData = queryDB($conn, $queryDateData, "read");
                    }
                    $records['countDate'] = $resultDateData;
                    // --end-->

                    $records['count_val'] = $ar_value;
                    $records['count_days'] = $ar_days;
                    $records['count_sum'] = $countSum;
                    echo json_encode($records, JSON_INVALID_UTF8_IGNORE);  
                    die;
                    
                }

                $records = ['status'=>400,'message'=>'Data Not found'];
                echo json_encode($records, JSON_INVALID_UTF8_IGNORE);  die;
                
            }
            die;

        }
        catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        } 
    }

    // <----14-9-2021---
    public function getAutomaticTableMeasurementData(){
        try{
            global $conn;
            $total_number_records = $_POST['total_number_records'];
            $number_records = isset($_POST['number_records']) ? $_POST['number_records'] : 5;
            $time_interval = $_POST['time_interval'];
            $order_by_val = $_POST['measurement_order_by_val'];
            $page_val = isset($_POST['page_val']) ? $_POST['page_val'] : 1;
            $selected_number_record_measurement = isset($_POST['selected_number_record_measurement']) ? $_POST['selected_number_record_measurement'] : 'false';
            $measurement_type = $_POST['measurement_type'];
            $dataMesaurement = '';
            $queryMaxVal = '';
            $pagesCount = '';

            if($order_by_val == 'order_by_desc'){
                $order_by_val = "Order by convert(decimal(38,5), T2.val) desc ";
            }
            else if($order_by_val == 'order_by_asc'){
                $order_by_val = "Order by convert(decimal(38,5), T2.val) asc ";
            }

            $search_record = isset($_POST['search_record']) ? $_POST['search_record'] : '';
            $queryTotalRecordCondition = "";
            $queryMainCondition = '';
            if($search_record != ''){
                $queryTotalRecordCondition = "WHERE T1.nameMSt LIKE '%$search_record%' ";
                $queryMainCondition = "WHERE T1.nameMSt LIKE '%$search_record%' ";
            }

            //Pagination Code
            $queryTotalRecords = "SELECT TOP($total_number_records) * ";
            $queryTotalRecords .= "FROM messstellen as T1 ";
            $queryTotalRecords .= "INNER JOIN ";
            $queryTotalRecords .= "(SELECT T2.mst_ID as table_2_mst_id, sum(convert(decimal(38,5), Value)) as val from ";
            $queryTotalRecords .= "berechneteEnergiedaten as T2 ";
            $queryTotalRecords .= "GROUP By T2.mst_id) ";
            $queryTotalRecords .= "T2 ";
            $queryTotalRecords .= "ON T1.mst_ID = T2.table_2_mst_id ";
            $queryTotalRecords .= $queryTotalRecordCondition;
            $queryTotalRecords .= $order_by_val;
            // echo $queryTotalRecords; die;


            $totalRecordsValue = queryDB($conn, $queryTotalRecords, "read");
            // echo json_encode($totalRecordsValue); die;s
            
            $pagesCount = '';
            $offSetVal = 0;
            if(count($totalRecordsValue) > 0){
               if($total_number_records <= $number_records){
                   $offSetVal = 0;
                   $number_records = $total_number_records;
                   $pagesCount = 1; 
                   $page_val = 1;
               }
               else{

                    if($selected_number_record_measurement == 'true'){
                        $pagesCount = ceil(count($totalRecordsValue) / $number_records);
                        $pagesCount = $pagesCount <= 0 ? 1 : $pagesCount;
                        $page_val = 1;
                        $offSetVal = 0;

                    }
                    else{
                        $pagesCount = ceil(count($totalRecordsValue) / $number_records);
                        $pagesCount = $pagesCount <= 0 ? 1 : $pagesCount;
                        $offSetVal = ($page_val - 1) * $number_records;
                        
                        //Only Valid when User Click on Last page
                        if($page_val == $pagesCount){
                            $number_records = $total_number_records - $offSetVal;
                        }
                    }
                //    echo $number_records;s
               }

            }
            $query1 = "SELECT * ";
            $query1 .= "FROM messstellen as T1 ";
            $query1 .= "INNER JOIN ";
            $query1 .= "(SELECT T2.mst_ID as table_2_mst_id, sum(convert(decimal(38,5), Value)) as val from ";
            $query1 .= "berechneteEnergiedaten as T2 ";
            $query1 .= "GROUP By T2.mst_id) ";
            $query1 .= "T2 ";
            $query1 .= "ON T1.mst_ID = T2.table_2_mst_id ";
            $query1 .= $queryMainCondition;
            $query1 .= $order_by_val;
            $query1 .= "offset $offSetVal rows FETCH NEXT $number_records ROWS ONLY ";  
            // echo $query1; die; 
            
            $dataMesaurement = queryDB($conn, $query1, "read");

            $records['measurement_html'] = $this->generateHtmlAutomaticTableMeasurementData($dataMesaurement);

            $records['pagination_html'] =  $this->generatePaginationHtmlAutomaticMeasurementData($page_val,$pagesCount,$dataMesaurement);

            // echo $pagination_html['paginationHTMl']; die;
            //<---13-8-2021--
            $ar_page_val = isset($_POST['page_val']) ? $_POST['page_val'] : 1;
            $ar_number_records = isset($_POST['number_records']) ? $_POST['number_records'] : 5;
            $ar = array('pages_count' => $pagesCount,'page_val' => $ar_page_val,'number_records' => $ar_number_records,'query1' => $query1 ,'queryMaxValue' => '','row_click' => 'false' , 'type' => 'Measurement');
            $records['query_data'] = $ar;
             // --end-->

            echo json_encode($records,JSON_INVALID_UTF8_IGNORE);
            die;
        }
        catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        } 
    }
    public function getAutomaticTableMeasurementData1(){
        try{
            global $conn;
            $total_number_records = $_POST['total_number_records'];
            $number_records = isset($_POST['number_records']) ? $_POST['number_records'] : 5;
            $time_interval = $_POST['time_interval'];
            $order_by_val = $_POST['measurement_order_by_val'];
            $page_val = isset($_POST['page_val']) ? $_POST['page_val'] : 1;
            $selected_number_record_measurement = isset($_POST['selected_number_record_measurement']) ? $_POST['selected_number_record_measurement'] : 'false';
            $measurement_type = $_POST['measurement_type'];
            $dataMesaurement = '';
            $queryMaxVal = '';
            $pagesCount = '';

            if($order_by_val == 'order_by_desc'){
                $order_by_val = "Order by convert(decimal(38,5), T2.val) desc ";
            }
            else if($order_by_val == 'order_by_asc'){
                $order_by_val = "Order by convert(decimal(38,5), T2.val) asc ";
            }

            $search_record = isset($_POST['search_record']) ? $_POST['search_record'] : '';
            $queryTotalRecordCondition = "";
            $queryMainCondition = '';
            if($search_record != ''){
                $queryTotalRecordCondition = "WHERE T1.nameMSt LIKE '%$search_record%' ";
                $queryMainCondition = "WHERE T1.nameMSt LIKE '%$search_record%' ";
            }

            //Pagination Code
            $queryTotalRecords = "SELECT TOP($total_number_records) * ";
            $queryTotalRecords .= "FROM messstellen as T1 ";
            $queryTotalRecords .= "INNER JOIN ";
            $queryTotalRecords .= "(SELECT T2.mst_ID as table_2_mst_id, sum(convert(decimal(38,5), Value)) as val from ";
            $queryTotalRecords .= "berechneteEnergiedaten as T2 ";
            $queryTotalRecords .= "GROUP By T2.mst_id) ";
            $queryTotalRecords .= "T2 ";
            $queryTotalRecords .= "ON T1.mst_ID = T2.table_2_mst_id ";
            $queryTotalRecords .= $queryTotalRecordCondition;
            $queryTotalRecords .= $order_by_val;
            // echo $queryTotalRecords; die;


            $totalRecordsValue = queryDB($conn, $queryTotalRecords, "read");
            // echo json_encode($totalRecordsValue); die;s

            $pagesCount = '';
            $offSetVal = 0;
            if(count($totalRecordsValue) > 0){
                if($total_number_records <= $number_records){
                    $offSetVal = 0;
                    $number_records = $total_number_records;
                    $pagesCount = 1;
                    $page_val = 1;
                }
                else{

                    if($selected_number_record_measurement == 'true'){
                        $pagesCount = ceil(count($totalRecordsValue) / $number_records);
                        $pagesCount = $pagesCount <= 0 ? 1 : $pagesCount;
                        $page_val = 1;
                        $offSetVal = 0;

                    }
                    else{
                        $pagesCount = ceil(count($totalRecordsValue) / $number_records);
                        $pagesCount = $pagesCount <= 0 ? 1 : $pagesCount;
                        $offSetVal = ($page_val - 1) * $number_records;

                        //Only Valid when User Click on Last page
                        if($page_val == $pagesCount){
                            $number_records = $total_number_records - $offSetVal;
                        }
                    }
                    //    echo $number_records;s
                }

            }
            $query1 = "SELECT * ";
            $query1 .= "FROM messstellen as T1 ";
            $query1 .= "INNER JOIN ";
            $query1 .= "(SELECT T2.mst_ID as table_2_mst_id, sum(convert(decimal(38,5), Value)) as val from ";
            $query1 .= "berechneteEnergiedaten as T2 ";
            $query1 .= "GROUP By T2.mst_id) ";
            $query1 .= "T2 ";
            $query1 .= "ON T1.mst_ID = T2.table_2_mst_id ";
            $query1 .= $queryMainCondition;
            $query1 .= $order_by_val;
            $query1 .= "offset $offSetVal rows FETCH NEXT $number_records ROWS ONLY ";
            // echo $query1; die;

            $dataMesaurement = queryDB($conn, $query1, "read");
            $dataMesaurement=[];
            $records['measurement_html'] = $this->generateHtmlAutomaticTableMeasurementData($dataMesaurement);

            $records['pagination_html'] =  $this->generatePaginationHtmlAutomaticMeasurementData($page_val,$pagesCount,$dataMesaurement);

            // echo $pagination_html['paginationHTMl']; die;
            //<---13-8-2021--
            $ar_page_val = isset($_POST['page_val']) ? $_POST['page_val'] : 1;
            $ar_number_records = isset($_POST['number_records']) ? $_POST['number_records'] : 5;
            $ar = array('pages_count' => $pagesCount,'page_val' => $ar_page_val,'number_records' => $ar_number_records,'query1' => $query1 ,'queryMaxValue' => '','row_click' => 'false' , 'type' => 'Measurement');
            $records['query_data'] = $ar;
            // --end-->

            echo json_encode($records,JSON_INVALID_UTF8_IGNORE);
            die;
        }
        catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    // <--15-9-2021
    public function rowClickAutomaticMeasurementTableData(){
        try{
            global $conn;
            $total_number_records = $_POST['total_number_records'];
            $mst_id = $_POST['mst_id'];
            $type = $_POST['data_type'];
            $number_records = $_POST['number_records'];
            $page_val = isset($_POST['page_val']) ? $_POST['page_val'] : 1;
            $selected_number_record_measurement = isset($_POST['selected_number_record_measurement']) ? $_POST['selected_number_record_measurement'] : 'false';
            $order_by_val = $_POST['measurement_order_by_val'];
            $measurement_type = $_POST['measurement_type'];

            $date_differnce_five_days = date('Y-m-d', strtotime('-5 days'));
            $current_date = date('Y-m-d');

            if($order_by_val == 'order_by_desc'){
                $order_by_val = "Order by convert(decimal(38,5), T1.Value) desc ";
            }
            else if($order_by_val == 'order_by_asc'){
                $order_by_val = "Order by convert(decimal(38,5), T1.Value) asc ";
            }

            //Pagination Code 
            $queryTotalPagination = "SELECT TOP($total_number_records) * ";
            $queryTotalPagination .= "FROM berechneteEnergiedaten as T1 ";
            $queryTotalPagination .= "INNER JOIN ";
            $queryTotalPagination .= "messstellen as T2 ";
            $queryTotalPagination .= "ON T1.mst_ID = T2.mst_Id ";
            $queryTotalPagination .= "WHERE T1.mst_ID = '$mst_id' ";
            $totalRecordsValue = queryDB($conn, $queryTotalPagination, "read");
            
            
            $pagesCount = '';
            $offSetVal = 0;
            if(count($totalRecordsValue) > 0){
               if($total_number_records <= $number_records){
                    $offSetVal = 0;
                    $number_records = $total_number_records;
                    $pagesCount = 1; 
                    $page_val = 1;
               }
               else{
                    if($selected_number_record_measurement == 'true'){
                        $pagesCount = ceil(count($totalRecordsValue) / $number_records);
                        $pagesCount = $pagesCount <= 0 ? 1 : $pagesCount;
                        $page_val = 1;
                        $offSetVal = 0;

                    }
                    else{ 
                        $pagesCount = ceil(count($totalRecordsValue) / $number_records);
                        $pagesCount = $pagesCount <= 0 ? 1 : $pagesCount;
                        $offSetVal = ($page_val - 1) * $number_records;
                        
                        if($page_val == $pagesCount){
                            $number_records = $total_number_records - $offSetVal;
                        }
                    }
               } 

            }

            //--end-->
            
            $queryMaxValue = "SELECT TOP($total_number_records) max(convert(decimal(38,5), Value)) as val ";
            $queryMaxValue .= "FROM berechneteEnergiedaten as T1 ";
            $queryMaxValue .= "INNER JOIN ";
            $queryMaxValue .= "messstellen as T2 ";
            $queryMaxValue .= "ON T1.mst_ID = T2.mst_Id ";
            $queryMaxValue .= "WHERE T1.mst_ID = '$mst_id' ";
            // echo json_encode($queryMaxValue); die;
            //<---15-8-2021
            $queryMaximum = $queryMaxValue;
            // --end-->
            $queryMaxValue = queryDB($conn, $queryMaxValue, "read");
            $queryMaxVal = count($queryMaxValue) > 0 ? $queryMaxValue[0]['val'] : '';
            

            $query1 = "SELECT * ";
            $query1 .= "FROM berechneteEnergiedaten as T1 ";
            $query1 .= "INNER JOIN ";
            $query1 .= "messstellen as T2 ";
            $query1 .= "ON T1.mst_ID = T2.mst_ID ";
            $query1 .= "Where T1.mst_ID = '$mst_id' ";
            $query1 .= "$order_by_val ";
            $query1 .= "offset $offSetVal rows FETCH NEXT $number_records ROWS ONLY ";
            $dataMesaurement = queryDB($conn, $query1, "read"); 
            // echo json_encode($dataMesaurement); die;
            

            $records['measurement_html'] = $this->generateHtmlAutomaticTableMeasurementData($dataMesaurement,$queryMaxVal);
            $records['pagination_html'] =  $this->generatePaginationHtmlAutomaticMeasurementData($page_val,$pagesCount,$dataMesaurement,$type,$mst_id);
            

            // <---10-11-2021----
            $queryLastDate = "SELECT TOP(1) * From berechneteEnergiedaten as T1 ";
            $queryLastDate.= "WHERE T1.mst_ID = '$mst_id' ";
            $queryLastDate.= "ORDER BY T1.berNrg_ID desc ";
            $queryLastDateData = queryDB($conn, $queryLastDate, "read");
            //--end-->


            // <--15-8-2021--
            $ar_page_val = isset($_POST['page_val']) ? $_POST['page_val'] : 1;
            $ar_number_records = isset($_POST['number_records']) ? $_POST['number_records'] : 5;
            $ar = array('pages_count' => $pagesCount,'page_val' => $ar_page_val,'number_records' => $ar_number_records,'query1' => $query1 ,'queryMaxValue' => $queryMaximum,'row_click' => 'true', 'type' => 'Measurement');
            $records['query_data'] = $ar;

            $records['queryLastDate'] = $queryLastDateData;
            // --end-->
           
            echo json_encode($records,JSON_INVALID_UTF8_IGNORE);

           die;
        }
        catch(Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }


    // <---2-8-2021--
    public function generateHtmlAutomaticTableMeasurementData($dataMesaurement,$queryMaxVal = false){
        global $conn;
        $tr = '';
        $col_span = "";
        if($queryMaxVal == ""){
            $col_span = "colspan='5'";
        }
        else if($queryMaxVal != ''){
            $col_span = "colspan='4'";
        }
        if($dataMesaurement != '' && count($dataMesaurement) > 0){
            foreach($dataMesaurement as $key => $value){
                $style='';
                $class_val = '';
                $unit = '';
                $mst_id = $value['mst_ID'];


                $queryResult = '';
                if($queryMaxVal == ''){
                    $queryData = "SELECT Top(1) * from berechneteEnergiedaten where mst_ID = $mst_id order by Time desc ";
                    $queryResult = queryDB($conn, $queryData, "read");
                }
                
                
                if($queryMaxVal == ""){
                    $class_val = 'class="row_click"';
                }
                else if($queryMaxVal != '' && $queryMaxVal == $value['Value']){
                    $style="style='background-color: #f77171'";
                }
                $tr .= "<tr $style $class_val data-mst=".$value['mst_ID']." data-type='1' data-table-other='true'>";
                
                $tr.= "<td>".$value['nameMSt']."</td>";
               
                if($queryMaxVal == '')
                {
                    $tr.= "<td>".$queryResult[0]['Time']."</td>";
                    $tr.= "<td>".$queryResult[0]['ConvFactor']."</td>";
                    $tr.= "<td>".$value['val']."</td>";
                }
                else{
                    $tr.= "<td>".$value['Time']."</td>";
                    $tr.= "<td>".$value['ConvFactor']."</td>";
                    $tr.= "<td>".$value['Value']."</td>";
                }
                $tr.="</tr>";
            }
        }else{
                $tr = "<tr><td $col_span class='text-center'>No Data</td></tr>";
        }
        return $tr;
        // $records['measurement_html'] = $tr;

    }

    public function generatePaginationHtmlAutomaticMeasurementData($page_val,$pagesCount,$dataMesaurement,$data_type = false ,$mst_id = false){
        try{
            //Pagination Code HTML
            // echo $pagesCount; die;
            if($page_val > 0 && $pagesCount > 0 && $dataMesaurement != '' && count($dataMesaurement) > 0){
                $style_background = '';
                $class_page_count_val = 'page_count_val';
                $style_background_end = '';
                $class_page_count_val_end = 'page_count_val';
                // echo $page_val ; die;
                if($page_val == "1"){
                    $style_background = "style='background: #d6d6d6; color: black'";
                    $class_page_count_val = '';
                    if($pagesCount == "1"){
                        $style_background_end = "style='background: #d6d6d6; color: black'";
                        $class_page_count_val_end = '';  
                    }
                    
                }
                else if($page_val == $pagesCount){
                    $style_background_end = "style='background: #d6d6d6; color: black'";
                    $class_page_count_val_end = '';
                }
                else{
                    $style_background = '';
                    $style_background_end = '';
                }
                $paginationHTMl="<nav aria-label='Page navigation example'>
                    <input type='hidden' id='row_click_table' data_type='$data_type' data_mst='$mst_id'>
                    <div class='pagination_items'>
                            <ul class='pagination'>
                                <li class='page-item $class_page_count_val' data_type='$data_type' data_mst='$mst_id' id='previous_pagination_val'>
                                    <a class='page-link'  $style_background href='javascript:void(0);' aria-label='Previous'>
                                        <span aria-hidden='true'>&laquo;</span>
                                        <span class='sr-only'>Previous</span>
                                    </a>
                                </li>";
                                
                for($i = 1; $i <= $pagesCount; $i++){
                    $active = $i == $page_val ? 'active' : '';
                    $hide_style='display: none';
                    if($i == $page_val){
                        $paginationHTMl.="<li class='page-item'><a class='page-link' href='javascript:void(0);'>Page</a></li>";
                        $hide_style = 'display: block';
                    }
                    $paginationHTMl.="<li style='$hide_style' class='page-item  $active '><input type='number' class='active_background pagination_input_val page-link' data_type='$data_type' data_mst='$mst_id' value='$i'></li>";

                    if($i == $pagesCount){
                        $paginationHTMl.="<li class='page-item'><a class='page-link' href='javascript:void(0);'>of</a></li>";
                        $paginationHTMl.="<li class='page-item'><a class='page-link ' readonly id='last_input_val' href='javascript:void(0);'>$i</a></li>";
                    }
                }
                $paginationHTMl.="<li class='page-item $class_page_count_val_end' data_type='$data_type' data_mst='$mst_id' id='next_pagination_val'>
                                        <a class='page-link' $style_background_end href='javascript:void(0);' aria-label='Next'>
                                            <span aria-hidden='true'>&raquo;</span>
                                            <span class='sr-only'>Next</span>
                                        </a>
                                    </li>";

                //Pagination Select Tag   
                
                $paginationHTMl.="<li class ='page-item'>
                                        <select class='page-link select_pagination' id='measurement_number_record' data_type='$data_type' data_mst='$mst_id'>
                                            <option value='5'>5</option>
                                            <option value='10'>10</option>
                                            <option value='20'>20</option>
                                            <option value='30'>30</option>
                                            <option value='50'>50</option>
                                        </select>
                                    </li>
                                    </ul>
                                </div>
                            </nav>";

                //ScreenShot Code
                $paginationHTMl.="<div id='save_table_format' class='text-center'>
                                    <input type='button' id='modal_open_button' tile-edit='false' class='btn btn-sm btn-success' value='Save & Preview'>
                                </div>";            
                return $paginationHTMl;
                // $records['pagination_html'] = $paginationHTMl;
            }

        }
        catch(Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    // --end-->

    // <---15-9-2021---
    public function dashboardMeasurementHtmlAutomatic($dataMeasurement,$queryMaxVal = false)
    {
        try{
            global $conn;
            $col_span = "";
            $tr = "";
            if($queryMaxVal == ""){
                $col_span = "colspan='5'";
                $tr = "<thead>";
                $tr .= "<tr>";
                $tr .= "<th>Name</th>";
                $tr .= "<th>Time</th>";
                $tr .= "<th>Conv. Factor</th>";
                $tr .= "<th>Value</th>";
                $tr .= "</tr>";
                $tr .= "</thead>";
            }
            else if($queryMaxVal != ''){
                $col_span = "colspan='4'";
                $tr = "<thead style='background-color: #c5c8d2'>";
                $tr .= "<tr>";
                $tr .= "<th>Name</th>";
                $tr .= "<th>Time</th>";
                $tr .= "<th>Conv. Factor</th>";
                $tr .= "<th>Value</th>";
                $tr .= "</tr>";
                $tr .= "</thead>";
            }
            if($dataMeasurement != '' && count($dataMeasurement) > 0){
                $tr .= "<tbody>";
                foreach($dataMeasurement as $key => $value){
                    $unit = '';
                    $style='';
                    $mst_id = $value['mst_ID'];
                    if($queryMaxVal != '' && $queryMaxVal == $value['Value']){
                        $style="style='background-color: #f77171; padding: 8px !important; font-size: .875rem'";
                    }
                    
                    $tr .= "<tr $style>";

                    $queryResult = '';
                    if($queryMaxVal == ''){
                        $queryData = "SELECT Top(1) * from berechneteEnergiedaten where mst_ID = $mst_id order by Time desc ";
                        $queryResult = queryDB($conn, $queryData, "read");
                    }

                    $tr.= "<td>".$value['nameMSt']."</td>";
               
                    if($queryMaxVal == '')
                    {
                        $tr.= "<td>".$queryResult[0]['Time']."</td>";
                        $tr.= "<td>".$queryResult[0]['ConvFactor']."</td>";
                        $tr.= "<td>".$value['val']."</td>";
                    }
                    else{
                        $tr.= "<td>".$value['Time']."</td>";
                        $tr.= "<td>".$value['ConvFactor']."</td>";
                        $tr.= "<td>".$value['Value']."</td>";
                    }
                    $tr.="</tr>";
                }
                $tr.= "</tbody>";
            }else{
                    $tr .= "<tbody><tr><td $col_span class='text-center'>No Data</td></tr></tbody>";
            }
            return $tr;
        }
        catch(Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }

     // <---09-8-2021---
     public function getTileClickOverAllCountAutomatic(){
        try{
            global $conn;
            $id = $_REQUEST['id'];
            $mst_id = $_REQUEST['mst_id'];
            $queryTotalSum = "SELECT sum(convert(decimal(38,5), Value)) as val from berechneteEnergiedaten  as t1 ";
            $queryTotalSum .= "Where t1.mst_ID = $mst_id ";
            $totalSum = queryDB($conn, $queryTotalSum, "read");
            $totalSumVal = $totalSum[0]['val'] != null ?  $totalSum[0]['val'] : '';
            
            $queryName = "SELECT TOp(1) nameMSt from messstellen Where mst_ID = $mst_id ";
            $queryNameVal = queryDB($conn, $queryName, "read");
            $nameVal = $queryNameVal != null ?  $queryNameVal[0]['nameMSt'] : '';
            
            $record['name_value'] = $nameVal;
            $record['total_sum'] = $totalSumVal;
            $record['measurement_type'] = 'Automatic';
            
            echo json_encode($record,JSON_INVALID_UTF8_IGNORE);
            die;
        }
        catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        } 
    }
    // --end-->

    // <--6-10-2021---
    public function getClickDashboardChart(){
        try{
            global $conn;
            $record_type_of_tile = $_POST['record_type_of_tile'];
            $filter_val = $_POST['chart_filter_value'];
            $mst_id = $_POST['mst_id'];
            if($record_type_of_tile == 'measurement')
            {
                $queryOverAllCount = "SELECT * From masseneingabeSucheIMw ";
                $queryOverAllCount .= "WHERE mst_ID = '$mst_id' ";
                $resultOverallCount = queryDB($conn, $queryOverAllCount, "read");
                $overallCount = count($resultOverallCount);
                if($filter_val == 10){
                    $ar_days = [];
                    $ar_value = [];
                    for($i = 1; $i <= 10; $i++){
                        if($i <= $overallCount){
                            $query = "SELECT SUM(CAST(val as int)) as val FROM masseneingabeSucheIMw WHERE id in ";
                            $query .= "(SELECT id From masseneingabeSucheIMw ";
                            $query .= "WHERE mst_ID = '$mst_id' ";
                            $query .= "ORDER by id ASC ";
                            $query .= "offset 0 rows FETCH NEXT $i ROWS ONLY )";
                            $result = queryDB($conn, $query, "read");
                            if($result[0]['val'] != null){
                                array_push($ar_value, $result[0]['val']);
                            }
                            
                            array_push($ar_days,$i);
                        }

                    }
                    $records['count_val'] = $ar_value;
                    $records['count_days'] = $ar_days;
                    echo json_encode($records, JSON_INVALID_UTF8_IGNORE);  
                    die;
                }
                else if($filter_val == 20){
                    $ar_days = [];
                    $ar_value = [];
                    for($i = 1; $i <= 20; $i++){
                        if($i <= $overallCount){
                            $offset_val = 2 * $i;
                            $query = "SELECT SUM(CAST(val as int)) as val FROM masseneingabeSucheIMw WHERE id in ";
                            $query .= "(SELECT id From masseneingabeSucheIMw ";
                            $query .= "WHERE mst_ID = '$mst_id' ";
                            $query .= "ORDER by id ASC ";
                            $query .= "offset 0 rows FETCH NEXT $i ROWS ONLY )";
                            $result = queryDB($conn, $query, "read");
                            if($result[0]['val'] != null){
                                array_push($ar_value, $result[0]['val']);
                            }
                        
                                $day_20 =  $i;
                                // $r+2;
                                array_push($ar_days,$day_20);
    
                        }
                        
                    }
                    // print_r($ar_value);die;
                    $records['count_val'] = $ar_value;
                    $records['count_days'] = $ar_days;
                    echo json_encode($records, JSON_INVALID_UTF8_IGNORE);  
                    die;
                }
                else if($filter_val == 30) {
                    $ar_days = [];
                    $ar_value = [];
                    for($i = 1; $i <= 30; $i++){
                        if($i <= $overallCount){
                            $offset_val = 3 * $i;
                            $query = "SELECT SUM(CAST(val as int)) as val FROM masseneingabeSucheIMw WHERE id in ";
                            $query .= "(SELECT id From masseneingabeSucheIMw ";
                            $query .= "WHERE mst_ID = '$mst_id' ";
                            $query .= "ORDER by id ASC ";
                            $query .= "offset 0 rows FETCH NEXT $i ROWS ONLY )";
                            $result = queryDB($conn, $query, "read");
                            if($result[0]['val'] != null){
                                array_push($ar_value, $result[0]['val']);
                            }
                            $day_30 = $i;
                            array_push($ar_days,$day_30);
                        }

                    }
                    $records['count_val'] = $ar_value;
                    $records['count_days'] = $ar_days;
                    echo json_encode($records, JSON_INVALID_UTF8_IGNORE);  
                    die;
                    
                }
                else if($filter_val == 'all') {
                    $ar_days = [];
                    $ar_value = [];
                    for($i = 1; $i <= 50; $i++){
                        if($i <= $overallCount){
                            $offset_val = 5 * $i;
                            $query = "SELECT SUM(CAST(val as int)) as val FROM masseneingabeSucheIMw WHERE id in ";
                            $query .= "(SELECT id From masseneingabeSucheIMw ";
                            $query .= "WHERE mst_ID = '$mst_id' ";
                            $query .= "ORDER by id ASC ";
                            $query .= "offset 0 rows FETCH NEXT $i ROWS ONLY )";
                            $result = queryDB($conn, $query, "read");
                            if($result[0]['val'] != null){
                                array_push($ar_value, $result[0]['val']);
                            }
                            $day_50 = $i;
                            array_push($ar_days,$day_50);
                        }

                    }
                    $records['count_val'] = $ar_value;
                    $records['count_days'] = $ar_days;
                    echo json_encode($records, JSON_INVALID_UTF8_IGNORE);  
                    die;
                    
                }

                $records = ['status'=>400,'message'=>'Data Not found'];
                echo json_encode($records, JSON_INVALID_UTF8_IGNORE);  die;
                
            }
        }
        catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        } 
    }
  
}
$obj = new dashboardController();

?>