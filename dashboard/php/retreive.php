<?php
// include_once('dbConnection.php');
error_reporting(-1);
ini_set ('display_errors', 'On');

require '..\..\/php/DbOperations.php';

$nameDB = $_POST['nameDB'];
// $nameDB = 'g000_demo';
$conn = connectToDB($nameDB);

class dashboardController {
    public function __construct() {
        $action = $_REQUEST['action'];
        echo json_encode($this->$action());
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
            $dataMesaurement = '';
            $queryMaxVal = '';
            $pagesCount = '';

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

            $records['pagination_html'] =  $this->generatePaginationHtmlMeasurementData($page_val,$pagesCount);

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
           
            $date_differnce_five_days = date('Y-m-d', strtotime('-5 days'));
            $current_date = date('Y-m-d');

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
            $query1 .= "order by T2.val desc ";
            $query1 .= "offset $offSetVal rows FETCH NEXT $number_records ROWS ONLY ";
            $dataMesaurement = queryDB($conn, $query1, "read"); 
            // echo json_encode($date_differnce_five_days); die;

            $records['measurement_html'] = $this->generateHtmlTableMeasurementData($dataMesaurement,$queryMaxVal);
            $records['pagination_html'] =  $this->generatePaginationHtmlMeasurementData($page_val,$pagesCount,$type,$mst_id);
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
                $tr .= "<tr $style $class_val data-mst=".$value['mst_ID']." data-type=".$value['intTp_ID'].">";
                
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
    public function generatePaginationHtmlMeasurementData($page_val,$pagesCount,$data_type = false ,$mst_id = false){
        try{
            //Pagination Code HTML
            // echo $pagesCount; die;
            if($page_val > 0 && $pagesCount > 0){
                $style_background = '';
                $class_page_count_val = 'page_count_val';
                $style_background_end = '';
                $class_page_count_val_end = 'page_count_val';
                // echo $page_val ; die;
                if($page_val == "1"){
                    $style_background = "style='background: #d6d6d6;'";
                    $class_page_count_val = '';
                    if($pagesCount == "1"){
                        $style_background_end = "style='background: #d6d6d6;'";
                        $class_page_count_val_end = '';  
                    }
                    
                }
                else if($page_val == $pagesCount){
                    $style_background_end = "style='background: #d6d6d6;'";
                    $class_page_count_val_end = '';
                }
                else{
                    $style_background = '';
                    $style_background_end = '';
                }
                $paginationHTMl="<nav aria-label='Page navigation example'>
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
                return $paginationHTMl;
                // $records['pagination_html'] = $paginationHTMl;
            }

        }
        catch(Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    // --end-->
    //Get Records Energy
    public function getNumberRecordsEnergy()
    {
        try{
            global $conn;
            $number_records = $_POST['number_records'];
            $query1 = "SELECT Top($number_records) * ";
            $query1 .= "FROM interneMesswerteConfig as T1 ";
            $query1 .= "LEFT JOIN ";
            $query1 .= "(SELECT T2.mst_ID as table_2_mst_id, max(cast(val as int)) as val from ";
            $query1 .= "masseneingabeSucheIMw as T2 ";
            $query1 .= "GROUP By T2.mst_id) ";
            $query1 .= "T2 ";
            $query1 .= "ON T1.mst_ID = T2.table_2_mst_id ";
            $query1 .=  "LEFT JOIN ";
            $query1 .= "MessstellenAnlagen on ";
            $query1 .= "T1.mst_ID = MessstellenAnlagen.mst_ID ";
            $query1 .= "order by T1.mst_ID desc ";
            $dataEnergy = queryDB($conn, $query1, "read");
            $tr = '';
            if($dataEnergy != '' && count($dataEnergy) > 0){
                foreach($dataEnergy as $key => $value){
                    $tr .= '<tr>';
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
            $records['energy_html'] = $tr;

            echo json_encode($records,JSON_INVALID_UTF8_IGNORE);
            die;
        }
        catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }

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
               
               $energyConsumed = "SELECT SUM(cast(T2.val as int)) as val FROM interneBetriebsdatenHistorie As T1 ";
               $energyConsumed .= "LEFT JOIN masseneingabeSucheIMw as T2 ";
               $energyConsumed .= "ON T1.mstID = T2.mst_ID ";
               $energyConsumed .= "WHERE T2.on_date >= '$date_differnce' ";
               $energyConsumed .= "AND T2.on_date <= '$current_date' ";
               $energyConsumed .= "AND T2.type = '1' ";
               $energyConsumed .= "AND T1.deleted <> 'true' ";
               $energyConsumed.= "AND T1.archiviert ='true' ";
              
               $dataEnergy = queryDB($conn, $energyConsumed, "read");
               array_push($ar,$dataEnergy);
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

}
$obj = new dashboardController();

?>