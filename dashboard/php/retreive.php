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

            $records = queryDB ( $conn, $query, "read");
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
            
            $resultQuery = sqlsrv_query($conn,$queryTotalRecords);
            $totalRecordsValue=[] ;
            if($resultQuery != false)
            {
                $totalRecordsValue = queryDB($conn, $queryTotalRecords, "read");
            }
            

            // $totalRecordsValue = queryDB($conn, $queryTotalRecords, "read");
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

            $resultQuery = sqlsrv_query($conn,$query1);
            $dataMesaurement=[] ;
            $tableFound = 'false';
            if($resultQuery != false)
            {
                $dataMesaurement = queryDB($conn, $query1, "read");
                $tableFound = 'true';
            }
            $records['table_found'] = $tableFound;

            // $dataMesaurement = queryDB($conn, $query1, "read");
            
            $records['measurement_html'] = $this->generateHtmlTableMeasurementData($dataMesaurement);
            $records['table_header'] = $this->getNumberRecordsMesurementHeader($measurement_type);

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

    // <----01-03-2022--
    public function getNumberRecordsMesurementHeader($measurement_type)
    {
        try{
            if($measurement_type == 'automatic')
            {
                $tr = "<tr>";
                $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Messstelle</th>";
                $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Datum</th>";
                $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Wert</th>";
                $tr .= "</tr>";
                return $tr;
            }
            else{
                $tr = "<tr>";
                $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Name</th>";
                $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Zeitintervall</th>";
                $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Erstellungsdatum</th>";
                $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Gesamteinheiten</th>";
                $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Status</th>";
                $tr .= "</tr>";
                return $tr;
            }
        }
        catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }

    // --end->

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
            $records['table_header'] = $this->getNumberRecordsMesurementHeader($measurement_type);
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
                    $convertValue = $this->convertValueCommaSeperated($value['val']);
                    $tr.= "<td>".$convertValue.' '.$unit."</td>";
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
            $_SESSION['nameDB'] = isset($_POST['nameDB'])?$_POST['nameDB']:null;
            $selectQuery = "SELECT * from tableFormat where username = '$username' order by priority asc ";
            $dataResult = queryDB($conn, $selectQuery, "read");
            $records['data'] = $dataResult;
            echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
            die;
            
            // <---Old Code With Gipscomm--7-1-2022-
            // // <---27-12-2021-- Get Tiles Gipscommm
            // // $conn = connectToDB('gipscomm');
            // $selectGipscommTile  = "SELECT * from tableFormat where username = '$username' order by priority asc ";
            // $dataResultGipscomm = queryDB($conn, $selectGipscommTile, "read");
            // $records['data'] = $dataResultGipscomm;
            // // echo json_encode($records['data']); die;
            // // --end-->

            // // <---4-1-2022--
            // $nameDB = $_POST['nameDB'];
            // $conn = connectToDB($nameDB);
            // // echo $conn; die;
            // $getResult = "SELECT * from tableFormat WHERE username = '$username' order by priority asc";
            // $result = sqlsrv_query($conn,$getResult);
            // // echo json_encode(gettype($result)); die;
            // $dataResult = [];
            // if($result != false)
            // {
            //     while( $row = sqlsrv_fetch_array( $result, SQLSRV_FETCH_ASSOC ) ) {
            //         $dataResult[] = $row ;
            //     };
            //     // echo json_encode(count($dataResult)); die;
            //     if(count($dataResult) > 0)
            //     {
            //         $arMerge = array_merge($dataResultGipscomm,$dataResult);
            //         // echo json_encode($arMerge); die;
            //         $records['data'] = $arMerge;
            //         $records['total_record'] = count($dataResult);
            //         $dataMeasurement = '';

            //         // <---5-1-2022-
            //         //$priority = array_column($arMerge,'priority');
            //         // array_multisort(array_column($arMerge,'priority'), SORT_ASC, $arMerge,SORT_NUMERIC);
            //         // echo json_encode($arMerge); 
            //         $records['data'] = $arMerge;
            //         // --end--->
            //     }
            //     // echo json_encode($row); die;
            // }
            // echo json_encode($records, JSON_INVALID_UTF8_IGNORE);  die;
            // ---end--->
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
                $tr .= "<th>Zeitintervall</th>";
                $tr .= "<th>Erstellungsdatum</th>";
                $tr .= "<th>Gesamteinheiten</th>";
                $tr .= "<th>Status</th>";
                $tr .= "</tr>";
                $tr .= "</thead>";
            }
            else if($queryMaxVal != ''){
                $col_span = "colspan='4'";
                $tr = "<thead style='background-color: #c5c8d2'>";
                $tr .= "<tr>";
                $tr .= "<th>Name</th>";
                $tr .= "<th>Zeitintervall</th>";
                $tr .= "<th>Datum</th>";
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
                        $convertValue = $this->convertValueCommaSeperated($value['val']);
                        $tr.= "<td>".$convertValue.' '.$unit."</td>";
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

    public function dashboardEnergyHtml($dataMeasurement,$queryMaxVal = false)
    {
        try{
            $col_span = "";
            $tr = "";
            if($queryMaxVal == ""){
                $col_span = "colspan='5'";
                $tr = "<thead>";
                $tr .= "<tr>";
                $tr .= "<th>Name</th>";
                $tr .= "<th>Zeitintervall</th>";
                $tr .= "<th>Erstellungsdatum</th>";
                $tr .= "<th>Gesamteinheiten</th>";
                $tr .= "<th>Status</th>";
                $tr .= "</tr>";
                $tr .= "</thead>";
            }
            else if($queryMaxVal != ''){
                $col_span = "colspan='4'";
                $tr = "<thead style='background-color: #c5c8d2'>";
                $tr .= "<tr>";
                $tr .= "<th>Name</th>";
                $tr .= "<th>Zeitintervall</th>";
                $tr .= "<th>Datum</th>";
                $tr .= "<th>Verbrauchte Einheiten</th>";
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
                        $convertValue = $this->convertValueCommaSeperated($value['val']);
                        $tr.= "<td>".$convertValue.' '.$unit."</td>";
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

    public function dashboardProductHtml($dataProduct,$queryMaxVal = false)
    {
        try{
            $col_span = "";
            $tr = "";
            if($queryMaxVal == ""){
                $col_span = "colspan='5'";
                $tr = "<thead>";
                $tr .= "<tr>";
                $tr .= "<th>Artikelname</th>";
                $tr .= "<th>Zeitintervall</th>";
                $tr .= "<th>Erstellungsdatum</th>";
                $tr .= "<th>Gesamteinheiten</th>";
                $tr .= "<th>Status</th>";
                $tr .= "</tr>";
                $tr .= "</thead>";
            }
            else if($queryMaxVal != ''){
                $col_span = "colspan='4'";
                $tr = "<thead style='background-color: #c5c8d2'>";
                $tr .= "<tr>";
                $tr .= "<th>Artikelname</th>";
                $tr .= "<th>Zeitintervall</th>";
                $tr .= "<th>Datum</th>";
                $tr .= "<th>Verbrauchte Einheiten</th>";
                $tr .= "</tr>";
                $tr .= "</thead>";
            }
            if($dataProduct != '' && count($dataProduct) > 0){
                $tr .= "<tbody>";
                foreach($dataProduct as $key => $value){
                    $style ='';
                    if($queryMaxVal != '' && $queryMaxVal == $value['val']){
                        $style="style='background-color: #f77171'";
                    }
                    
                    $val_prd_ID = '';
                    $prd_name = '';
                    if($queryMaxVal == '')
                    {
                        $val_prd_ID = $value['prd_ID'];
                        $prd_name = $value['namePrd'];
                    }

                    $tr .= "<tr $style prd_id='$val_prd_ID' analgen_config_id=".$value['iBdePrdktConf_ID']." data-table-other='false' prd_name='$prd_name'>";
                    // $tr.= "<td>".$value['namePrd']."</td>";
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

                    //Units Checks
                    $unit='';
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
                        if($queryMaxVal == ''){
                            $tr.= "<td><label class='badge badge-danger'>Pending </label></td>";
                        }
                    }
                    else{
                        $tr.= "<td>".$value['val'].' '.$unit."</td>";
                        if($queryMaxVal == ''){
                            $tr.= "<td><label class='badge badge-success'>Active </label></td>";
                        }
                    }
                    $tr.="</tr>";
                }
                $tr .= "</tbody>";
            }else{
                $tr .= "<tbody><tr><td $col_span class='text-center'>No Data</td></tr></tbody>";
            }

            return $tr;
        }
        catch(Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }

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
                    
                    // if($i < $total_result){
                    //     $dataResult[$i]['tile_html']=str_replace('stretch-card','stretch-card hide_table_preview',$dataResult[$i]['tile_html']);
                    //    $tileHtml.= $dataResult[$i]['tile_html'];
                    // } 
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

    // <---2-12-2021---
    public function generateHtmlProductTiles(){
        try{
            global $conn;
            $username = $_SESSION['username']; 
            $product_title =  $_POST['product_title'];
            $type =  $_POST['type'];
            $getResult =  "SELECT * from tableFormat Where (tile_data_type='table' OR tile_data_type='overall_count')  AND username = '$username' ";
            $dataResult = queryDB($conn, $getResult, "read");
            $tileHtml = '';
            $total_result = count($dataResult);
            
            $last_id_query = "SELECT max(id) as max_id from tableFormat ";
            $last_id = queryDB($conn, $last_id_query, "read");
            $last_id = $last_id[0]['max_id'] != null ? $last_id[0]['max_id']+1 : 0; 
           
            if($dataResult != null && count($dataResult)>0){
                for($i= 0; $i<=$total_result; $i++){
//                    $measurement_title = $total_result[$i]['tile_title'];
                    $style= '';
                    if($i == $total_result){
                         
                        $product_title = $_POST['product_title'];;
                        $tileHtml .= "<input type='hidden' id='total_records' value='$last_id'>";
                        $tileHtml.="<div class='product_html_modal_$last_id'><div style='height: 145px; width: 285px' class='grid-margin actual_tile_height actual_tile_width stretch-card ' id='product_count_tile_modal_$last_id' data-i='$last_id' data-type-tile='Product'>
                                    <div class='card card-border tile_border'>
                                        <div class='card-body overflow-hide display-flex'>
                                            <div id='' class=''>
                                                <div class='action-modal-button-div'>
                                                    <img src='images/edit.png' class='edit_val edit_btn_tile' data-type-tile='Product' data-i-value ='$last_id' style='height: 17px; width: 17px; margin-right: 5px;'>
                                                    <img src='images/delete.png' class='id_val delete_btn_tile' data-type-tile='Product' style='height: 17px; width: 17px;'>
                                                </div>
                                                <p class='card-title text-md-center text-xl-left' id='product_tile_heading_modal'>$product_title</p>
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
                                                    <table class='table table-striped table-bordered table-hover' id='product_modal_table'>
                                                    </table>                        
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div></div>"; 
                    } 
                    
                    // if($i < $total_result){
                    //     $dataResult[$i]['tile_html']=str_replace('stretch-card','stretch-card hide_table_preview',$dataResult[$i]['tile_html']);
                    //    $tileHtml.= $dataResult[$i]['tile_html'];
                    // } 
                }
                
            }
            else{
                $tileHtml.="<div class='product_html_modal_$last_id'><div style='height: 145px; width: 285px' class='grid-margin actual_tile_height actual_tile_width stretch-card ' id='product_count_tile_modal_$last_id' data-i='$last_id' data-type-tile='Product'>
                                <input type='hidden' id='total_records' value='$last_id'>                
                                <div class='card card-border tile_border'>
                                    <div class='card-body overflow-hide display-flex'>
                                        <div id='' class=''>
                                            <div class='action-modal-button-div'>
                                                <img src='images/edit.png' class='edit_val edit_btn_tile' data-type-tile='Product' data-i-value ='$last_id' style='height: 17px; width: 17px; margin-right: 5px'>
                                                <img src='images/delete.png' class='id_val delete_btn_tile' data-type-tile='Product' style='height: 17px; width: 17px;'>
                                            </div>
                                            <p class='card-title text-md-center text-xl-left' id='product_tile_heading_modal'>".$product_title."</p>
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
                                                <table class='table table-striped table-bordered table-hover' id='product_modal_table'>
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
    // --end--->

    // <--24-12-2021---
    public function generateHtmlProductTilesAutomatic(){
        try{
            // global $conn;
            $conn = connectToDB("gipscomm");
            $username = $_SESSION['username']; 
            $product_title =  $_POST['product_title'];
            // $type =  $_POST['type'];
            $getResult =  "SELECT * from tableFormat Where username = '$username' ";
            $dataResult = queryDB($conn, $getResult, "read");
            $tileHtml = '';
            $total_result = count($dataResult);
            
            $last_id_query = "SELECT max(id) as max_id from tableFormat ";
            $last_id = queryDB($conn, $last_id_query, "read");
            $last_id = $last_id[0]['max_id'] != null ? $last_id[0]['max_id']+1 : 0; 
           
            if($dataResult != null && count($dataResult)>0){
                for($i= 0; $i<=$total_result; $i++){
//                    $measurement_title = $total_result[$i]['tile_title'];
                    $style= '';
                    if($i == $total_result){
                         
                        $product_title = $_POST['product_title'];;
                        $tileHtml .= "<input type='hidden' id='total_records' value='$last_id'>";
                        $tileHtml.="<div class='product_html_modal_$last_id'><div style='height: 145px; width: 285px' class='grid-margin actual_tile_height actual_tile_width stretch-card product_automatic_tile ' id='product_count_tile_modal_$last_id' data-i='$last_id' data-type-tile='Product'>
                                    <div class='card card-border product_automatic_tile_card tile_border'>
                                        <div class='card-body overflow-hide display-flex'>
                                            <div id='' class=''>
                                                <div class='action-modal-button-div'>
                                                    <img src='images/edit.png' class='edit_val edit_btn_tile product_automatic_tile_edit' data-type-tile='Product' data-i-value ='$last_id' style='height: 17px; width: 17px; margin-right: 5px;'>
                                                    <img src='images/delete.png' class='id_val delete_btn_tile product_automatic_tile_delete' data-type-tile='Product' style='height: 17px; width: 17px;'>
                                                </div>
                                                <p class='card-title text-md-center text-xl-left' id='product_tile_heading_modal'>$product_title</p>
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
                                                    <table class='table table-striped table-bordered table-hover' id='product_modal_table'>
                                                    </table>                        
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div></div>"; 
                    } 
                    
                    // if($i < $total_result){
                    //     $dataResult[$i]['tile_html']=str_replace('stretch-card','stretch-card hide_table_preview',$dataResult[$i]['tile_html']);
                    //    $tileHtml.= $dataResult[$i]['tile_html'];
                    // } 
                }
                
            }
            else{
                $tileHtml.="<div class='product_html_modal_$last_id'><div style='height: 145px; width: 285px' class='grid-margin actual_tile_height actual_tile_width stretch-card product_automatic_tile ' id='product_count_tile_modal_$last_id' data-i='$last_id' data-type-tile='Product'>
                                <input type='hidden' id='total_records' value='$last_id'>                
                                <div class='card card-border product_automatic_tile_card tile_border'>
                                    <div class='card-body overflow-hide display-flex'>
                                        <div id='' class=''>
                                            <div class='action-modal-button-div'>
                                                <img src='images/edit.png' class='edit_val edit_btn_tile product_automatic_tile_edit' data-type-tile='Product' data-i-value ='$last_id' style='height: 17px; width: 17px; margin-right: 5px'>
                                                <img src='images/delete.png' class='id_val delete_btn_tile product_automatic_tile_delete' data-type-tile='Product' style='height: 17px; width: 17px;'>
                                            </div>
                                            <p class='card-title text-md-center text-xl-left' id='product_tile_heading_modal'>".$product_title."</p>
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
                                                <table class='table table-striped table-bordered table-hover' id='product_modal_table'>
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
    // ---end-->

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
                                $tileHtml .= "<input type='hidden' id='total_records_table' value='$last_id'>";
                        //         $tileHtml.="<div class='dashboard_table_outer_tile_html_$last_id outer_table_tile_structure'><div style='height: 145px; width: 290px' class='grid-margin actual_tile_height actual_tile_width stretch-card ' id='energy_count_outer_tile_modal_table_$last_id' data-i='$last_id' data-type-tile='energy'>
                        //     <div class='card card-border tile_border'>
                        //         <div class='card-body overflow-hide display-flex pr-0'>
                        //             <div id='' class=''>
                        //                 <div class='action-modal-button-div'>
                        //                     <img src='images/edit.png' class='edit_val edit_btn_tile_chart' data-type-tile='energy' data-i-value ='$last_id' style='height: 17px; width: 17px; margin-right: 5px;'>
                        //                     <img src='images/delete.png' class='id_val delete_btn_tile' data-type-tile='energy' style='height: 17px; width: 17px;'>
                        //                 </div>
                        //                 <p class='card-title text-md-center text-xl-left' id='energy_tile_heading_modal'>$energy_title</p>
                        //                 <div class='d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center logo-image-main-div'>
                        //                 <img src='images/chartlogo.jpg' class='tile-image-icon tile-image-icon-table'>
                        //                 </div>  
                        //                 <p class='mb-0 mt-2 text-success count_result_tile chart_text_$last_id'>(Chart)<span class='text-black ml-1'><small></small></span></p>
                                        
                        //             </div>
                                    
                        //             <div class='overflow-hide ml-3 chart-width'>
                        //                 <div id='chart_outer_tile_text_heading' style='text-align: center'>
                        //                     <p class='text-muted'>Outer Tile View</p>
                        //                 </div>
                        //                 <div class='col-md-6 p-0 small-table small-table_$last_id'>
                        //                     <table class='wish-table table-striped table-bordered m-0' style='display:table'><thead><tr><th>Date</th><th>Consumption</th></tr></thead><tbody><tr><td id='td_outer_tile_text_$last_id'></td><td id='td_outer_tile_two_text_$last_id'></td></tr></tbody>
                        //                     </table>
                        //                 </div> 
                        //                 <div class='save_table_div_show_table'> 
                        //                 </div>
                        //             </div>
                        //         </div>
                        //     </div>
                        // </div></div>";
                    } 
                    
                    // if($i < $total_result){
                    //     $dataResult[$i]['tile_html']=str_replace('stretch-card','stretch-card hide_table_preview',$dataResult[$i]['tile_html']);
                    //    $tileHtml.= $dataResult[$i]['tile_html'];
                    // } 
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
                            $tileHtml .= "<input type='hidden' id='total_records_table' value='$last_id'>";
                        //     $tileHtml.="<div class='dashboard_table_outer_tile_html_$last_id outer_table_tile_structure'><div style='height: 145px; width: 290px' class='grid-margin actual_tile_height actual_tile_width stretch-card ' id='energy_count_outer_tile_modal_table_$last_id' data-i='$last_id' data-type-tile='energy'>
                        //     <div class='card card-border tile_border'>
                        //         <div class='card-body overflow-hide display-flex pr-0'>
                        //             <div id='' class=''>
                        //                 <div class='action-modal-button-div'>
                        //                     <img src='images/edit.png' class='edit_val edit_btn_tile_chart' data-type-tile='energy' data-i-value ='$last_id' style='height: 17px; width: 17px; margin-right: 5px;'>
                        //                     <img src='images/delete.png' class='id_val delete_btn_tile' data-type-tile='energy' style='height: 17px; width: 17px;'>
                        //                 </div>
                        //                 <p class='card-title text-md-center text-xl-left' id='energy_tile_heading_modal'>$energy_title</p>
                        //                 <div class='d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center logo-image-main-div'>
                        //                 <img src='images/table_logo.png' class='tile-image-icon tile-image-icon-table'>
                        //                 </div>  
                        //                 <p class='mb-0 mt-2 text-success count_result_tile chart_text_$last_id'>(Chart)<span class='text-black ml-1'><small> </small></span></p>
                                        
                        //             </div>
                                    
                        //             <div class='overflow-hide ml-3 chart-width'>
                        //                 <div id='chart_outer_tile_text_heading' style='text-align: center'>
                        //                     <p class='text-muted'>Outer Tile View</p>
                        //                 </div>
                        //                 <div class='col-md-6 p-0 small-table small-table_$last_id'>
                        //                     <table class='wish-table table-striped table-bordered m-0' style='display:table'><thead><tr><th>Date</th><th>Consumption</th></tr></thead><tbody><tr><td id='td_outer_tile_text_$last_id'></td><td id='td_outer_tile_two_text_$last_id'></td></tr></tbody>
                        //                     </table>
                        //                 </div> 
                        //                 <div class='save_table_div_show_table'> 
                        //                 </div>
                        //             </div>
                        //         </div>
                        //     </div>
                        // </div></div>";
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

            // <---24-11-2021---
            $record_type_of_tile  = $_POST['record_type_of_tile'];
            if($record_type_of_tile == 'energy'){
                $this->getChartDataDashboardEnergy();
                die;
            }
            else if($record_type_of_tile == 'product'){
                $this->getChartDataDashboardProduct();
                die;
            }
            // --end--->
            
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
                                                <p class='mb-0 mt-2 text-success count_result_tile chart_text_$last_id'>(Chart)<span class='text-black ml-1'><small> </small></span></p>
                                                
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
                                        <p class='mb-0 mt-2 text-success count_result_tile chart_text_$last_id'>(Chart)<span class='text-black ml-1'><small> </small></span></p>
                                        
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
                    
                    // if($i < $total_result){
                    //     $dataResult[$i]['tile_html']=str_replace('stretch-card','stretch-card hide_table_preview',$dataResult[$i]['tile_html']);
                    //    $tileHtml.= $dataResult[$i]['tile_html'];
                    // } 
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
                                            <p class='mb-0 mt-2 text-success count_result_tile chart_text_$last_id'>(Chart)<span class='text-black ml-1'><small> </small></span></p>
                                            
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
                                                <p class='mb-0 mt-2 text-success count_result_tile chart_text_$last_id'>(Chart)<span class='text-black ml-1'><small> </small></span></p>
                                                
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


    // <---24-11-2021---
    public function getChartDataDashboardEnergy(){
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
            //  $measurement_title = $total_result[$i]['tile_title'];
                    $style= '';
                    if($i == $total_result){
                         
                        $measurement_title = $_POST['measurement_title'];
                        $tileHtml .= "<input type='hidden' id='total_records_chart' value='$last_id'>";
                        $tileHtml.="<div class='dashboard_chart_tile_html_$last_id'><div style='height: 290px; width: 570px' class='grid-margin actual_tile_height actual_tile_width stretch-card ' id='energy_count_tile_modal_chart_$last_id' data-i='$last_id' data-type-tile='Energy'>
                                    <div class='card card-border tile_border'>
                                        <div class='card-body overflow-hide display-flex pr-0'>
                                            <div id='' class=''>
                                                <div class='action-modal-button-div'>
                                                    <img src='images/edit.png' class='edit_val edit_btn_tile_chart' data-type-tile='Energy' data-i-value ='$last_id' style='height: 17px; width: 17px; margin-right: 5px;'>
                                                    <img src='images/delete.png' class='id_val delete_btn_tile' data-type-tile='Energy' style='height: 17px; width: 17px;'>
                                                </div>
                                                <p class='card-title text-md-center text-xl-left' id='energy_tile_heading_modal'>$measurement_title</p>
                                                <div class='d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center logo-image-main-div'>
                                                <img src='images/chartlogo.jpg' class='tile-image-icon tile-image-icon-table'>
                                                </div>  
                                                <p class='mb-0 mt-2 text-success count_result_tile chart_text_$last_id'>(Chart)<span class='text-black ml-1'><small> </small></span></p>
                                                
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
                        $tileHtml.="<div class='dashboard_chart_outer_tile_html_$last_id outer_chart_tile_structure'><div style='height: 145px; width: 290px' class='grid-margin actual_tile_height actual_tile_width stretch-card ' id='energy_count_outer_tile_modal_chart_$last_id' data-i='$last_id' data-type-tile='Energy'>
                            <div class='card card-border tile_border'>
                                <div class='card-body overflow-hide display-flex pr-0'>
                                    <div id='' class=''>
                                        <div class='action-modal-button-div'>
                                            <img src='images/edit.png' class='edit_val edit_btn_tile_chart' data-type-tile='Energy' data-i-value ='$last_id' style='height: 17px; width: 17px; margin-right: 5px;'>
                                            <img src='images/delete.png' class='id_val delete_btn_tile' data-type-tile='Energy' style='height: 17px; width: 17px;'>
                                        </div>
                                        <p class='card-title text-md-center text-xl-left' id='energy_tile_heading_modal'>$measurement_title</p>
                                        <div class='d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center logo-image-main-div'>
                                        <img src='images/chartlogo.jpg' class='tile-image-icon tile-image-icon-table'>
                                        </div>  
                                        <p class='mb-0 mt-2 text-success count_result_tile chart_text_$last_id'>(Chart)<span class='text-black ml-1'><small> </small></span></p>
                                        
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
                    
                    // if($i < $total_result){
                    //     $dataResult[$i]['tile_html']=str_replace('stretch-card','stretch-card hide_table_preview',$dataResult[$i]['tile_html']);
                    //    $tileHtml.= $dataResult[$i]['tile_html'];
                    // } 
                }
                
            }
            else{
                $tileHtml.="<div class='dashboard_chart_tile_html_$last_id'><div style='height: 290px; width: 570px' class='grid-margin actual_tile_height actual_tile_width stretch-card ' id='energy_count_tile_modal_chart_$last_id' data-i='$last_id' data-type-tile='Energy'>
                                <input type='hidden' id='total_records_chart' value='$last_id'>                
                                <div class='card card-border tile_border'>
                                    <div class='card-body overflow-hide display-flex pr-0'>
                                        <div id='' class=''>
                                            <div class='action-modal-button-div'>
                                                <img src='images/edit.png' class='edit_val edit_btn_tile_chart' data-type-tile='Energy' data-i-value ='$last_id' style='height: 17px; width: 17px; margin-right: 5px'>
                                                <img src='images/delete.png' class='id_val delete_btn_tile' data-type-tile='Energy' style='height: 17px; width: 17px;'>
                                            </div>
                                            <p class='card-title text-md-center text-xl-left' id='energy_tile_heading_modal'>".$measurement_title."</p>
                                            <div class='d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center'>
                                                <img src='images/chartlogo.jpg' class='tile-image-icon tile-image-icon-table'>
                                            </div> 
                                            <p class='mb-0 mt-2 text-success count_result_tile chart_text_$last_id'>(Chart)<span class='text-black ml-1'><small> </small></span></p>
                                            
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
                    $tileHtml.="<div class='dashboard_chart_outer_tile_html_$last_id outer_chart_tile_structure'><div style='height: 145px; width: 290px' class='grid-margin actual_tile_height actual_tile_width stretch-card ' id='energy_count_outer_tile_modal_chart_$last_id' data-i='$last_id' data-type-tile='Energy'>
                                    <div class='card card-border tile_border'>
                                        <div class='card-body overflow-hide display-flex pr-0'>
                                            <div id='' class=''>
                                                <div class='action-modal-button-div'>
                                                    <img src='images/edit.png' class='edit_val edit_btn_tile_chart' data-type-tile='Energy' data-i-value ='$last_id' style='height: 17px; width: 17px; margin-right: 5px;'>
                                                    <img src='images/delete.png' class='id_val delete_btn_tile' data-type-tile='Energy' style='height: 17px; width: 17px;'>
                                                </div>
                                                <p class='card-title text-md-center text-xl-left' id='energy_tile_heading_modal'>$measurement_title</p>
                                                <div class='d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center logo-image-main-div'>
                                                <img src='images/chartlogo.jpg' class='tile-image-icon tile-image-icon-table'>
                                                </div>  
                                                <p class='mb-0 mt-2 text-success count_result_tile chart_text_$last_id'>(Chart)<span class='text-black ml-1'><small> </small></span></p>
                                                
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
    // ---end-->

    // <--7-12-2021---
    public function getChartDataDashboardProduct(){
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
         
            if($dataResult != null && count($dataResult)>0){
                for($i= 0; $i<=$total_result; $i++){
                    $style= '';
                    if($i == $total_result){
                        $measurement_title = $_POST['measurement_title'];
                        $tileHtml .= "<input type='hidden' id='total_records_chart' value='$last_id'>";
                        $tileHtml.="<div class='dashboard_chart_tile_html_$last_id'><div style='height: 290px; width: 570px' class='grid-margin actual_tile_height actual_tile_width stretch-card ' id='product_count_tile_modal_chart_$last_id' data-i='$last_id' data-type-tile='Product'>
                                    <div class='card card-border tile_border'>
                                        <div class='card-body overflow-hide display-flex pr-0'>
                                            <div id='' class=''>
                                                <div class='action-modal-button-div'>
                                                    <img src='images/edit.png' class='edit_val edit_btn_tile_chart' data-type-tile='Product' data-i-value ='$last_id' style='height: 17px; width: 17px; margin-right: 5px;'>
                                                    <img src='images/delete.png' class='id_val delete_btn_tile' data-type-tile='Product' style='height: 17px; width: 17px;'>
                                                </div>
                                                <p class='card-title text-md-center text-xl-left' id='product_tile_heading_modal'>$measurement_title</p>
                                                <div class='d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center logo-image-main-div'>
                                                <img src='images/chartlogo.jpg' class='tile-image-icon tile-image-icon-table'>
                                                </div>  
                                                <p class='mb-0 mt-2 text-success count_result_tile chart_text_$last_id'>(Chart)<span class='text-black ml-1'><small> </small></span></p>
                                                
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
                        $tileHtml.="<div class='dashboard_chart_outer_tile_html_$last_id outer_chart_tile_structure'><div style='height: 145px; width: 290px' class='grid-margin actual_tile_height actual_tile_width stretch-card ' id='product_count_outer_tile_modal_chart_$last_id' data-i='$last_id' data-type-tile='Product'>
                            <div class='card card-border tile_border'>
                                <div class='card-body overflow-hide display-flex pr-0'>
                                    <div id='' class=''>
                                        <div class='action-modal-button-div'>
                                            <img src='images/edit.png' class='edit_val edit_btn_tile_chart' data-type-tile='Product' data-i-value ='$last_id' style='height: 17px; width: 17px; margin-right: 5px;'>
                                            <img src='images/delete.png' class='id_val delete_btn_tile' data-type-tile='Product' style='height: 17px; width: 17px;'>
                                        </div>
                                        <p class='card-title text-md-center text-xl-left' id='product_tile_heading_modal'>$measurement_title</p>
                                        <div class='d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center logo-image-main-div'>
                                        <img src='images/chartlogo.jpg' class='tile-image-icon tile-image-icon-table'>
                                        </div>  
                                        <p class='mb-0 mt-2 text-success count_result_tile chart_text_$last_id'>(Chart)<span class='text-black ml-1'><small> </small></span></p>
                                        
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
                    
                    // if($i < $total_result){
                    //     $dataResult[$i]['tile_html']=str_replace('stretch-card','stretch-card hide_table_preview',$dataResult[$i]['tile_html']);
                    //    $tileHtml.= $dataResult[$i]['tile_html'];
                    // } 
                }
                
            }
            else{
                $tileHtml.="<div class='dashboard_chart_tile_html_$last_id'><div style='height: 290px; width: 570px' class='grid-margin actual_tile_height actual_tile_width stretch-card ' id='product_count_tile_modal_chart_$last_id' data-i='$last_id' data-type-tile='Product'>
                                <input type='hidden' id='total_records_chart' value='$last_id'>                
                                <div class='card card-border tile_border'>
                                    <div class='card-body overflow-hide display-flex pr-0'>
                                        <div id='' class=''>
                                            <div class='action-modal-button-div'>
                                                <img src='images/edit.png' class='edit_val edit_btn_tile_chart' data-type-tile='Product' data-i-value ='$last_id' style='height: 17px; width: 17px; margin-right: 5px'>
                                                <img src='images/delete.png' class='id_val delete_btn_tile' data-type-tile='Product' style='height: 17px; width: 17px;'>
                                            </div>
                                            <p class='card-title text-md-center text-xl-left' id='product_tile_heading_modal'>".$measurement_title."</p>
                                            <div class='d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center'>
                                                <img src='images/chartlogo.jpg' class='tile-image-icon tile-image-icon-table'>
                                            </div> 
                                            <p class='mb-0 mt-2 text-success count_result_tile chart_text_$last_id'>(Chart)<span class='text-black ml-1'><small> </small></span></p>
                                            
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
                    $tileHtml.="<div class='dashboard_chart_outer_tile_html_$last_id outer_chart_tile_structure'><div style='height: 145px; width: 290px' class='grid-margin actual_tile_height actual_tile_width stretch-card ' id='product_count_outer_tile_modal_chart_$last_id' data-i='$last_id' data-type-tile='Product'>
                                    <div class='card card-border tile_border'>
                                        <div class='card-body overflow-hide display-flex pr-0'>
                                            <div id='' class=''>
                                                <div class='action-modal-button-div'>
                                                    <img src='images/edit.png' class='edit_val edit_btn_tile_chart' data-type-tile='Product' data-i-value ='$last_id' style='height: 17px; width: 17px; margin-right: 5px;'>
                                                    <img src='images/delete.png' class='id_val delete_btn_tile' data-type-tile='Product' style='height: 17px; width: 17px;'>
                                                </div>
                                                <p class='card-title text-md-center text-xl-left' id='product_tile_heading_modal'>$measurement_title</p>
                                                <div class='d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center logo-image-main-div'>
                                                <img src='images/chartlogo.jpg' class='tile-image-icon tile-image-icon-table'>
                                                </div>  
                                                <p class='mb-0 mt-2 text-success count_result_tile chart_text_$last_id'>(Chart)<span class='text-black ml-1'><small> </small></span></p>
                                                
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
    // ---end-->

    

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
                        // $dataResult[$i]['tile_html']=str_replace('stretch-card','stretch-card hide_table_preview',$dataResult[$i]['tile_html']);
                        // $tileHtml.= $dataResult[$i]['tile_html'];
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

    // <--24-11-2021---
    // /<---Edit tile Functionality--
    public function getEditTilesEnergy(){
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
            $energy_title = $_REQUEST['energy_title'];
            if($dataResult != null && count($dataResult)){
                for($i = 0; $i < $total_result; $i++){
                    if($id == $dataResult[$i]['id']){
                        // $total_record_id = $id-1;
                        $tileHtml .= "<input type='hidden' id='total_records' value='$i_value'>";
                        // $tileHtml.= $dataResult[$i]['tile_html'];
                        $tileHtml.="<div class='energy_html_modal_$i_value'><div style='height: 145px; width: 285px' class='grid-margin actual_tile_height actual_tile_width stretch-card ' id='energy_count_tile_modal_$i_value' data-i='$i_value' data-type-tile='Energy'>
                                    <div class='card card-border'>
                                        <div class='card-body overflow-hide display-flex'>
                                            <div id='' class=''>
                                                <div class='action-modal-button-div'>
                                                    <img src='images/edit.png' class='edit_val edit_btn_tile' data-type-tile='Energy' data-i-value ='$i_value' style='height: 17px; width: 17px; margin-right: 5px;'>
                                                    <img src='images/delete.png' class='id_val delete_btn_tile' data-type-tile='Energy' style='height: 17px; width: 17px;'>
                                                </div>
                                                <p class='card-title text-md-center text-xl-left' id='energy_tile_heading_modal'>$energy_title</p>
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
                                                    <table class='table table-striped table-bordered table-hover' id='energy_modal_table'>
                                                    </table>                        
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div></div>"; 

                        $records['data'] = $dataResult[$i];
                    }
                    else{
                        // $dataResult[$i]['tile_html']=str_replace('stretch-card','stretch-card hide_table_preview',$dataResult[$i]['tile_html']);
                        // $tileHtml.= $dataResult[$i]['tile_html'];
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
    // --end-->

    // <----06-12-2021--
    // /<---Edit tile Functionality--
    public function getEditTilesProduct(){
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
            $product_title = $_REQUEST['product_title'];
            if($dataResult != null && count($dataResult)){
                for($i = 0; $i < $total_result; $i++){
                    if($id == $dataResult[$i]['id']){
                        // $total_record_id = $id-1;
                        $tileHtml .= "<input type='hidden' id='total_records' value='$i_value'>";
                        // $tileHtml.= $dataResult[$i]['tile_html'];
                        $tileHtml.="<div class='product_html_modal_$i_value'><div style='height: 145px; width: 285px' class='grid-margin actual_tile_height actual_tile_width stretch-card ' id='product_count_tile_modal_$i_value' data-i='$i_value' data-type-tile='Product'>
                                    <div class='card card-border'>
                                        <div class='card-body overflow-hide display-flex'>
                                            <div id='' class=''>
                                                <div class='action-modal-button-div'>
                                                    <img src='images/edit.png' class='edit_val edit_btn_tile' data-type-tile='Product' data-i-value ='$i_value' style='height: 17px; width: 17px; margin-right: 5px;'>
                                                    <img src='images/delete.png' class='id_val delete_btn_tile' data-type-tile='Product' style='height: 17px; width: 17px;'>
                                                </div>
                                                <p class='card-title text-md-center text-xl-left' id='product_tile_heading_modal'>$product_title</p>
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
                                                    <table class='table table-striped table-bordered table-hover' id='product_modal_table'>
                                                    </table>                        
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div></div>"; 

                        $records['data'] = $dataResult[$i];
                    }
                    else{
                        // $dataResult[$i]['tile_html']=str_replace('stretch-card','stretch-card hide_table_preview',$dataResult[$i]['tile_html']);
                        // $tileHtml.= $dataResult[$i]['tile_html'];
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
    // -end--->


    //<---3-1-2022---
    public function getEditTilesProductAutomatic(){
        try{
            // global $conn;
            $conn = connectToDB('gipscomm');
            $username = $_SESSION['username']; 
            $id = $_REQUEST['id'];
            $type = $_REQUEST['type'];
            $getResult =  "SELECT * from tableFormat where (tile_data_type ='table' OR tile_data_type='overall_count') AND username = '$username' ";
            $dataResult = queryDB($conn, $getResult, "read");
            $tileHtml = '';
            $total_result = count($dataResult);
            $i_value = $_REQUEST['i_value'];
            $product_title = $_REQUEST['product_title'];
            if($dataResult != null && count($dataResult)){
                for($i = 0; $i < $total_result; $i++){
                    if($id == $dataResult[$i]['id']){
                        // $total_record_id = $id-1;
                        $tileHtml .= "<input type='hidden' id='total_records' value='$i_value'>";
                        // $tileHtml.= $dataResult[$i]['tile_html'];
                        $tileHtml.="<div class='product_html_modal_$i_value'><div style='height: 145px; width: 285px' class='grid-margin actual_tile_height actual_tile_width stretch-card product_automatic_tile ' id='product_count_tile_modal_$i_value' data-i='$i_value' data-type-tile='Product'>
                                    <div class='card card-border product_automatic_tile_card'>
                                        <div class='card-body overflow-hide display-flex'>
                                            <div id='' class=''>
                                                <div class='action-modal-button-div'>
                                                    <img src='images/edit.png' class='edit_val edit_btn_tile product_automatic_tile_edit' data-type-tile='Product' data-i-value ='$i_value' style='height: 17px; width: 17px; margin-right: 5px;'>
                                                    <img src='images/delete.png' class='id_val delete_btn_tile product_automatic_tile_delete' data-type-tile='Product' style='height: 17px; width: 17px;'>
                                                </div>
                                                <p class='card-title text-md-center text-xl-left' id='product_tile_heading_modal'>$product_title</p>
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
                                                    <table class='table table-striped table-bordered table-hover' id='product_modal_table'>
                                                    </table>                        
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div></div>"; 

                        $records['data'] = $dataResult[$i];
                    }
                    else{
                    //     // $dataResult[$i]['tile_html']=str_replace('stretch-card','stretch-card hide_table_preview',$dataResult[$i]['tile_html']);
                    //     // $tileHtml.= $dataResult[$i]['tile_html'];
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
    // ---end--->

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
                                                            <p class='mb-0 mt-2 text-success count_result_tile chart_text_$i_value'>(Chart)<span class='text-black ml-1'><small> </small></span></p>
                                                            
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

    // <--25-11-2021--
    public function getEditChartDataDashboardEnergy(){
        try{
            global $conn;
            $username = $_SESSION['username'];
            $i_value = $_POST['i_value'];
            $id = $_POST['id'];
            $tile_title = $_POST['energy_title'];
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
                        $tileHtml.="<div class='dashboard_chart_tile_html_$i_value'><div style='height: 290px; width: 570px' class='grid-margin actual_tile_height actual_tile_width stretch-card ' id='energy_count_tile_modal_chart_$i_value' data-i='$i_value' data-type-tile='Energy'>
                                    <div class='card card-border'>
                                        <div class='card-body overflow-hide display-flex pr-0'>
                                            <div id='' class=''>
                                                <div class='action-modal-button-div'>
                                                    <img src='images/edit.png' class='edit_val edit_btn_tile_chart' data-type-tile='Energy' data-i-value ='$i_value' style='height: 17px; width: 17px; margin-right: 5px;'>
                                                    <img src='images/delete.png' class='id_val delete_btn_tile' data-type-tile='Energy' style='height: 17px; width: 17px;'>
                                                </div>
                                                <p class='card-title text-md-center text-xl-left' id='energy_tile_heading_modal'>$tile_title</p>
                                                <div class='d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center logo-image-main-div'>
                                                <img src='images/chartlogo.jpg' class='tile-image-icon tile-image-icon-table'>
                                                </div> 
                                                <p class='mb-0 mt-2 text-success count_result_tile chart_text_edit_$i_value'>(Chart)<span class='text-black ml-1'><small> </small></span></p>
                                                
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
                                $tileHtml.="<div class='dashboard_chart_outer_tile_html_$i_value outer_chart_tile_structure'><div style='height: 145px; width: 290px' class='grid-margin actual_tile_height actual_tile_width stretch-card ' id='energy_count_outer_tile_modal_chart_$i_value' data-i='$i_value' data-type-tile='Energy'>
                                                <div class='card card-border'>
                                                    <div class='card-body overflow-hide display-flex pr-0'>
                                                        <div id='' class=''>
                                                            <div class='action-modal-button-div'>
                                                                <img src='images/edit.png' class='edit_val edit_btn_tile_chart' data-type-tile='Energy' data-i-value ='$i_value' style='height: 17px; width: 17px; margin-right: 5px;'>
                                                                <img src='images/delete.png' class='id_val delete_btn_tile' data-type-tile='Energy' style='height: 17px; width: 17px;'>
                                                            </div>
                                                            <p class='card-title text-md-center text-xl-left' id='energy_tile_heading_modal'>$tile_title</p>
                                                            <div class='d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center logo-image-main-div'>
                                                            <img src='images/chartlogo.jpg' class='tile-image-icon tile-image-icon-table'>
                                                            </div>  
                                                            <p class='mb-0 mt-2 text-success count_result_tile chart_text_$i_value'>(Chart)<span class='text-black ml-1'><small> </small></span></p>
                                                            
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
                    // else{
                    //     $dataResult[$i]['tile_html']=str_replace('stretch-card','stretch-card hide_table_preview',$dataResult[$i]['tile_html']);
                    //     $tileHtml.= $dataResult[$i]['tile_html'];
                    // }
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
    // --end--->

    // <---23-2-2022--
    public function getEditChartDataDashboardEnergyLayer(){
        try{
            global $conn;
            $username = $_SESSION['username'];
            $i_value = $_POST['i_value'];
            $id = $_POST['id'];
            $tile_title = $_POST['energy_title'];
            $getResult =  "SELECT * from tableFormat where tile_data_type ='chart' AND username = '$username' ";
            $dataResult = queryDB($conn, $getResult, "read");
            $tileHtml = '';
            $chart_type = '';
            $chart_filter = '';
            $input_range = '';
            $mst_id = '';
            $chart_time_interval = '';
            $total_result = count($dataResult);
            if($dataResult != null && count($dataResult)>0){
                for($i= 0; $i < $total_result; $i++){
                    if($id == $dataResult[$i]['id']){
                        $chart_type = $dataResult[$i]['chart_type'];
                        $chart_filter = $dataResult[$i]['energy_layer_filter'];
                        $input_range = $dataResult[$i]['energy_layer_range'];
                        $mst_id = $dataResult[$i]['mst_id'];
                        $records['data'] = $dataResult[$i];
                        $tileHtml .= "<input type='hidden' id='total_records_chart' value='$i_value'>";
                        $tileHtml.="<div class='dashboard_chart_tile_html_$i_value'><div style='height: 290px; width: 570px' class='grid-margin actual_tile_height actual_tile_width stretch-card ' id='energy_count_tile_modal_chart_$i_value' data-i='$i_value' data-type-tile='Energy'>
                                    <div class='card card-border'>
                                        <div class='card-body overflow-hide display-flex pr-0'>
                                            <div id='' class=''>
                                                <div class='action-modal-button-div'>
                                                    <img src='images/edit.png' class='edit_val edit_btn_tile_chart' data-type-tile='Energy' data-i-value ='$i_value' style='height: 17px; width: 17px; margin-right: 5px;'>
                                                    <img src='images/delete.png' class='id_val delete_btn_tile' data-type-tile='Energy' style='height: 17px; width: 17px;'>
                                                </div>
                                                <p class='card-title text-md-center text-xl-left' id='energy_tile_heading_modal'>$tile_title</p>
                                                <div class='d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center logo-image-main-div'>
                                                <img src='images/chartlogo.jpg' class='tile-image-icon tile-image-icon-table'>
                                                </div> 
                                                <p class='mb-0 mt-2 text-success count_result_tile chart_text_edit_$i_value'>(Chart)<span class='text-black ml-1'><small> </small></span></p>
                                                
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
                                $tileHtml.="<div class='dashboard_chart_outer_tile_html_$i_value outer_chart_tile_structure'><div style='height: 145px; width: 290px' class='grid-margin actual_tile_height actual_tile_width stretch-card ' id='energy_count_outer_tile_modal_chart_$i_value' data-i='$i_value' data-type-tile='Energy'>
                                                <div class='card card-border'>
                                                    <div class='card-body overflow-hide display-flex pr-0'>
                                                        <div id='' class=''>
                                                            <div class='action-modal-button-div'>
                                                                <img src='images/edit.png' class='edit_val edit_btn_tile_chart' data-type-tile='Energy' data-i-value ='$i_value' style='height: 17px; width: 17px; margin-right: 5px;'>
                                                                <img src='images/delete.png' class='id_val delete_btn_tile' data-type-tile='Energy' style='height: 17px; width: 17px;'>
                                                            </div>
                                                            <p class='card-title text-md-center text-xl-left' id='energy_tile_heading_modal'>$tile_title</p>
                                                            <div class='d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center logo-image-main-div'>
                                                            <img src='images/chartlogo.jpg' class='tile-image-icon tile-image-icon-table'>
                                                            </div>  
                                                            <p class='mb-0 mt-2 text-success count_result_tile chart_text_$i_value'>(Chart)<span class='text-black ml-1'><small> </small></span></p>
                                                            
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
                    // else{
                    //     $dataResult[$i]['tile_html']=str_replace('stretch-card','stretch-card hide_table_preview',$dataResult[$i]['tile_html']);
                    //     $tileHtml.= $dataResult[$i]['tile_html'];
                    // }
                }
                $records['tile_html'] = $tileHtml;
                $records['total_record'] = count($dataResult);
                $records['mst_id'] = $mst_id;
                $records['chart_filter'] = $chart_filter;
                $records['chart_type'] = $chart_type;
                $records['chart_time_interval'] = $chart_time_interval;
                $records['input_range'] = $input_range;
                echo json_encode($records,JSON_INVALID_UTF8_IGNORE);
            }
            die;
        }
        catch(Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    // --end--->


    // <---08-03-2022--
    public function getEditChartDataDashboardEnergyAutomatic(){
        try{
            global $conn;
            $username = $_SESSION['username'];
            $i_value = $_POST['i_value'];
            $id = $_POST['id'];
            $tile_title = $_POST['energy_title'];
            $getResult =  "SELECT * from tableFormat where tile_data_type ='chart' AND username = '$username' ";
            $dataResult = queryDB($conn, $getResult, "read");
            $tileHtml = '';
            $chart_type = '';
            $input_range = '';
            $mst_id = '';
            $chart_time_interval = '';
            $total_result = count($dataResult);
            if($dataResult != null && count($dataResult)>0){
                for($i= 0; $i < $total_result; $i++){
                    if($id == $dataResult[$i]['id']){
                        $chart_type = $dataResult[$i]['chart_type'];
                        $input_range = $dataResult[$i]['energy_layer_range'];
                        $mst_id = $dataResult[$i]['mst_id'];
                        $records['data'] = $dataResult[$i];
                        $tileHtml .= "<input type='hidden' id='total_records_chart' value='$i_value'>";
                        $tileHtml.="<div class='dashboard_chart_tile_html_$i_value'><div style='height: 290px; width: 570px' class='grid-margin actual_tile_height actual_tile_width stretch-card ' id='energy_count_tile_modal_chart_$i_value' data-i='$i_value' data-type-tile='Energy'>
                                    <div class='card card-border'>
                                        <div class='card-body overflow-hide display-flex pr-0'>
                                            <div id='' class=''>
                                                <div class='action-modal-button-div'>
                                                    <img src='images/edit.png' class='edit_val edit_btn_tile_chart' data-type-tile='Energy' data-i-value ='$i_value' style='height: 17px; width: 17px; margin-right: 5px;'>
                                                    <img src='images/delete.png' class='id_val delete_btn_tile' data-type-tile='Energy' style='height: 17px; width: 17px;'>
                                                </div>
                                                <p class='card-title text-md-center text-xl-left' id='energy_tile_heading_modal'>$tile_title</p>
                                                <div class='d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center logo-image-main-div'>
                                                <img src='images/chartlogo.jpg' class='tile-image-icon tile-image-icon-table'>
                                                </div> 
                                                <p class='mb-0 mt-2 text-success count_result_tile chart_text_edit_$i_value'>(Chart)<span class='text-black ml-1'><small> </small></span></p>
                                                
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
                                $tileHtml.="<div class='dashboard_chart_outer_tile_html_$i_value outer_chart_tile_structure'><div style='height: 145px; width: 290px' class='grid-margin actual_tile_height actual_tile_width stretch-card ' id='energy_count_outer_tile_modal_chart_$i_value' data-i='$i_value' data-type-tile='Energy'>
                                                <div class='card card-border'>
                                                    <div class='card-body overflow-hide display-flex pr-0'>
                                                        <div id='' class=''>
                                                            <div class='action-modal-button-div'>
                                                                <img src='images/edit.png' class='edit_val edit_btn_tile_chart' data-type-tile='Energy' data-i-value ='$i_value' style='height: 17px; width: 17px; margin-right: 5px;'>
                                                                <img src='images/delete.png' class='id_val delete_btn_tile' data-type-tile='Energy' style='height: 17px; width: 17px;'>
                                                            </div>
                                                            <p class='card-title text-md-center text-xl-left' id='energy_tile_heading_modal'>$tile_title</p>
                                                            <div class='d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center logo-image-main-div'>
                                                            <img src='images/chartlogo.jpg' class='tile-image-icon tile-image-icon-table'>
                                                            </div>  
                                                            <p class='mb-0 mt-2 text-success count_result_tile chart_text_$i_value'>(Chart)<span class='text-black ml-1'><small> </small></span></p>
                                                            
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
                        // $dataResult[$i]['tile_html']=str_replace('stretch-card','stretch-card hide_table_preview',$dataResult[$i]['tile_html']);
                        // $tileHtml.= $dataResult[$i]['tile_html'];
                    }
                }
                $records['tile_html'] = $tileHtml;
                $records['total_record'] = count($dataResult);
                $records['mst_id'] = $mst_id;
                $records['chart_type'] = $chart_type;
                $records['input_range'] = $input_range;

                if($chart_type == 'line_chart')
                {
                    $records['mst_id'] = unserialize($mst_id);
                }
                echo json_encode($records,JSON_INVALID_UTF8_IGNORE);
            }
            die;
        }
        catch(Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    // ---end--->

    // <----09-12-2021--
    public function getEditChartDataDashboardProduct(){
        try{
            global $conn;
            $username = $_SESSION['username'];
            $i_value = $_POST['i_value'];
            $id = $_POST['id'];
            $tile_title = $_POST['product_title'];
            $getResult =  "SELECT * from tableFormat where tile_data_type ='chart' AND username = '$username' ";
            $dataResult = queryDB($conn, $getResult, "read");
            $tileHtml = '';
            $chart_type = '';
            $chart_filter = '';
            $analgen_config_id = '';
            $chart_time_interval = '';
            $total_result = count($dataResult);
            $queryProduct = "SELECT prd_id from tableFormat INNER JOIN produktionsAnlagenConfig as T2 ON tableFormat.prd_anlagen_config_id = T2.iBdePrdktConf_ID where tile_data_type ='chart' AND id = '$id' AND username = '$username'  ";
            $dataResultProduct = queryDB($conn, $queryProduct, "read");
            $prd_id = $dataResultProduct != null ? $dataResultProduct[0]['prd_id'] : '';
            // echo json_encode($dataResultProduct); die;
            if($dataResult != null && count($dataResult)>0){
                for($i= 0; $i < $total_result; $i++){
                    if($id == $dataResult[$i]['id']){
                        $chart_type = $dataResult[$i]['chart_type'];
                        $chart_filter = $dataResult[$i]['chart_filter'];
                        $analgen_config_id = $dataResult[$i]['prd_anlagen_config_id'];
                        $chart_time_interval = $dataResult[$i]['chart_time_interval'];
                        $records['data'] = $dataResult[$i];
                        $tileHtml .= "<input type='hidden' id='total_records_chart' value='$i_value'>";
                        $tileHtml.="<div class='dashboard_chart_tile_html_$i_value'><div style='height: 290px; width: 570px' class='grid-margin actual_tile_height actual_tile_width stretch-card ' id='product_count_tile_modal_chart_$i_value' data-i='$i_value' data-type-tile='Product'>
                                    <div class='card card-border'>
                                        <div class='card-body overflow-hide display-flex pr-0'>
                                            <div id='' class=''>
                                                <div class='action-modal-button-div'>
                                                    <img src='images/edit.png' class='edit_val edit_btn_tile_chart' data-type-tile='Product' data-i-value ='$i_value' style='height: 17px; width: 17px; margin-right: 5px;'>
                                                    <img src='images/delete.png' class='id_val delete_btn_tile' data-type-tile='Product' style='height: 17px; width: 17px;'>
                                                </div>
                                                <p class='card-title text-md-center text-xl-left' id='product_tile_heading_modal'>$tile_title</p>
                                                <div class='d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center logo-image-main-div'>
                                                <img src='images/chartlogo.jpg' class='tile-image-icon tile-image-icon-table'>
                                                </div> 
                                                <p class='mb-0 mt-2 text-success count_result_tile chart_text_edit_$i_value'>(Chart)<span class='text-black ml-1'><small> </small></span></p>
                                                
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
                                $tileHtml.="<div class='dashboard_chart_outer_tile_html_$i_value outer_chart_tile_structure'><div style='height: 145px; width: 290px' class='grid-margin actual_tile_height actual_tile_width stretch-card ' id='product_count_outer_tile_modal_chart_$i_value' data-i='$i_value' data-type-tile='Product'>
                                                <div class='card card-border'>
                                                    <div class='card-body overflow-hide display-flex pr-0'>
                                                        <div id='' class=''>
                                                            <div class='action-modal-button-div'>
                                                                <img src='images/edit.png' class='edit_val edit_btn_tile_chart' data-type-tile='Product' data-i-value ='$i_value' style='height: 17px; width: 17px; margin-right: 5px;'>
                                                                <img src='images/delete.png' class='id_val delete_btn_tile' data-type-tile='Product' style='height: 17px; width: 17px;'>
                                                            </div>
                                                            <p class='card-title text-md-center text-xl-left' id='product_tile_heading_modal'>$tile_title</p>
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
                    // else{
                    //     $dataResult[$i]['tile_html']=str_replace('stretch-card','stretch-card hide_table_preview',$dataResult[$i]['tile_html']);
                    //     $tileHtml.= $dataResult[$i]['tile_html'];
                    // }
                }
                $records['tile_html'] = $tileHtml;
                $records['total_record'] = count($dataResult);
                $records['analgen_config_id'] = $analgen_config_id;
                $records['chart_filter'] = $chart_filter;
                $records['chart_type'] = $chart_type;
                $records['chart_time_interval'] = $chart_time_interval;
                $records['prd_id'] = $prd_id;
                echo json_encode($records,JSON_INVALID_UTF8_IGNORE);
            }
            die;
        }
        catch(Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    // --end--->

    // <----01-9-2021---
    public function getEditDataDashboard(){
        try{
            // global $conn;
            $product_automatic_tile = $_POST['product_automatic_tile'];
            $conn = '';
            if($product_automatic_tile == 'true')
            {
                $conn = connectToDB('gipscomm');
            }
            else{
                $conn = connectToDB($_POST['nameDB']);
            }
            $username = $_SESSION['username']; 
            $id = $_REQUEST['id'];
            $selectQuery = "SELECT * from tableFormat where id ='$id' AND username = '$username' ";
            $resultQuery = queryDB($conn, $selectQuery, "read"); 
            $records['data'] = $resultQuery;

            $allColumns = $product_automatic_tile == 'true' ? unserialize($resultQuery[0]['prd_all_columns_automatic']) : '';
            $records['all_columns'] = $allColumns;
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
            $record_type_of_tile = $_REQUEST['record_type_of_tile'];
            $data = '';
            if($record_type_of_tile == 'measurement'){
            $query1 = "SELECT T1.mstIMw,T1.mst_ID,T2.val,T1.iBdeType ";
            $query1 .= "FROM produktionsAnlagenConfig as T1 ";
            $query1 .= "INNER JOIN ";
            $query1 .= "(SELECT T2.mst_ID as t2_mst_id , sum(cast(T2.val as int)) as val from masseneingabeSucheIMw as T2 ";
            $query1 .= "group by T2.mst_ID) T2 ";
            $query1 .= "ON T1.mst_ID = t2_mst_id ";
            $query1  .= "where T1.iBdeType='2' ";
            $query1 .= "AND T1.intTp_ID = '$time_interval' ";
            $query1 .= "Order by T2.val  Desc ";

            $resultQuery = sqlsrv_query($conn,$query1);
            $data=[] ;
            $tableFound = 'false';
            if($resultQuery != false)
            {
                $data = queryDB($conn, $query1, "read");
                $tableFound = 'true';
            
            }
            $records['table_found'] = $tableFound; 
            $records['data']  = $data;

            //$data = queryDB($conn, $query1, "read");
            }
            else if($record_type_of_tile == 'energy'){
                $query1 = "SELECT T3.nameMST ,T1.mst_ID,T2.val ";
                $query1 .= "FROM interneMesswerteConfig as T1 ";
                $query1 .= "INNER JOIN ";
                $query1 .= "(SELECT T2.mst_ID as t2_mst_id , sum(cast(T2.val as int)) as val from masseneingabeSucheIMw as T2 ";
                $query1 .= "group by T2.mst_ID) T2 ";
                $query1 .= "ON T1.mst_ID = t2_mst_id ";
                $query1 .= "INNER JOIN ";
                $query1 .= "MessstellenAnlagen as T3 ";
                $query1 .= "ON T1.mst_ID = T3.mst_ID ";
                $query1 .= "Where T1.intTp_ID = '$time_interval' ";
                $query1 .= "Order by T2.val  Desc ";

                $resultQuery = sqlsrv_query($conn,$query1);
                $data=[] ;
                $tableFound = 'false';
                if($resultQuery != false)
                {
                    $data = queryDB($conn, $query1, "read");
                    $tableFound = 'true';
                
                }
                $records['table_found'] = $tableFound; 
                $records['data']  = $data;

                // $data = queryDB($conn, $query1, "read");
            }
            echo json_encode($records,JSON_INVALID_UTF8_IGNORE);
            die;
        }
        catch(Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }

    }

    // ---end--->

    // <----7-12-2021---
    public function getChartTimeIntervalRecordProduct(){
        try{
            global $conn;
            $record_type_of_tile = $_REQUEST['record_type_of_tile'];
            $data = '';
            $query1 = "SELECT * from produktionsAnlagenConfig as Mt ";
            $query1 .= "LEFT JOIN produkte as t2 ";
            $query1 .= "ON Mt.prd_iD = t2.prd_ID ";
            $query1 .= "WHERE iBdePrdktConf_ID  IN ( ";
            $query1 .= "SELECT max(t1.iBdePrdktConf_ID) FROM produktionsAnlagenConfig as t1 ";
            $query1 .= "where t1.iBdeType='1' AND t1.prd_id != '0' ";
            $query1 .= "GROUP BY t1.prd_id ";
            $query1 .= ") ";
            $query1 .= "order by Mt.iBdePrdktConf_ID desc ";

            $resultQuery = sqlsrv_query($conn,$query1);
            $data=[] ;
            $tableFound = 'false';
            if($resultQuery != false)
            {
                $data = queryDB($conn, $query1, "read");
                $tableFound = 'true';
            
            }
            $records['table_found'] = $tableFound; 
            $records['data']  = $data;
            
            // $data = queryDB($conn, $query1, "read");
            // echo $query1; die;
            echo json_encode($records,JSON_INVALID_UTF8_IGNORE);
            die;
        }
        catch(Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }

    }

    public function getChartSelectProductItem(){
        try{
            global $conn;
            $record_type_of_tile = $_REQUEST['record_type_of_tile'];
            $prd_id = $_POST['prd_id'];
            $data = '';
            $query1 = "SELECT  * FROM produktionsAnlagenConfig as t1 ";
            $query1 .="INNER join "; 
            $query1.="( ";
            $query1 .="select t2.id as table_2_id , t2.prd_id as table_2_prd_id  , t2.anl_id as table_2_anl_id , t2.anl_col as table_2_anl_col ";
            $query1 .="from produktionsAnlagenMoreOpt as t2 ";
            $query1.=") ";
            $query1 .="t2 ";
            $query1 .="on t1.prd_id = t2.table_2_prd_id AND t1.anl_id = t2.table_2_anl_id AND t1.anl_col = t2.table_2_anl_col ";
            $query1 .= "INNER join ";
            $query1 .= "( ";
            $query1 .= "select t3.prd_anl_ID as table_3_prd_anl_Id , sum(cast(t3.val as int)) as val ";
            $query1 .= "from masseneingabeSuchePrdIMw  as t3 group by t3.prd_anl_ID ";
            $query1 .= ") ";
            $query1 .= "t3 ";
            $query1 .= "on t2.table_2_id = t3.table_3_prd_anl_Id ";
            $query1 .= "INNER join anlagen as t4 on t1.anl_id = t4.anl_ID ";
            $query1 .= "where t1.iBdeType='1' AND t1.prd_ID = '$prd_id' ";
            $query1 .= "order by t3.val desc ";
            $data = queryDB($conn, $query1, "read");
            // echo $query1; die;
            echo json_encode($data,JSON_INVALID_UTF8_IGNORE);
            die;
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
            if($energy_type == "layer_modal"){
                $this->getLayerTableEnergyData();
                die;
            }
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
            $resultQuery = sqlsrv_query($conn,$queryTotalRecords);
            $totalRecordsValue = [];
            if($resultQuery != false)
            {
                $totalRecordsValue = queryDB($conn, $queryTotalRecords, "read");
            
            }            
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
            $resultQuery = sqlsrv_query($conn,$query1);
            $dataMesaurement =[] ;
            $tableFound = 'false';
            if($resultQuery != false)
            {
                $dataMesaurement = queryDB($conn, $query1, "read");
                $tableFound = 'true';
            
            }
            $records['table_found'] = $tableFound;     
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

    // <---17-12-2021---
    public function rowClickEnergyTableDataLayer(){
        try{
            global $conn;
            $valid_from = $_POST['valid_from'];
            $valid_to = $_POST['valid_to'];
            $click_row_array = $_POST['click_row_array'];

            $tableCallCount = $_POST['tableCallCount'];
            $offsetValue = ($tableCallCount - 1) * 100;
            $query1 = '';
            if($valid_from != '' && $valid_to != '')
            {
                $query1 = "SELECT * ";
                $query1 .= "FROM MessstellenEnergiedaten as T1 ";
                $query1 .= "Where convert(date, time) >= '$valid_from' AND convert(date, time) <= '$valid_to' ";
                $query1 .= "Order by mst_ID ";
                $query1 .= "offset $offsetValue rows FETCH NEXT 100 ROWS ONLY ";
            }
            else{
                $query1 = "SELECT * ";
                $query1 .= "FROM MessstellenEnergiedaten as T1 ";
                $query1 .= "Where convert(date, time) >= '$valid_from' ";
                $query1 .= "Order by mst_ID ";
                $query1 .= "offset $offsetValue rows FETCH NEXT 100 ROWS ONLY ";
            }
            //Query Check
            // echo $query1; die;
            $resultQuery = sqlsrv_query($conn,$query1);
            $tableFound = 'false';
            $dataMesaurement = [];
            // echo json_encode($resultQuery); die;
            if($resultQuery != false)
            {
                $dataMesaurement = queryDB($conn, $query1, "read");
                $tableFound = 'true';
            
            }
            $records['table_found'] = $tableFound;

            //Array Check
            $sum_value = '';
            if($dataMesaurement != '' && count($dataMesaurement) > 0)
            {
                $array_col = array_column($dataMesaurement,'Value');
                $sum_value = array_sum($array_col);
                // echo json_encode($val); die;
            }
            // echo $sum_value; die;
            $rowClickTable = 'true';
            $records['sum_value'] = $sum_value;
            $records['energy_header'] = $this->generateHtmlLayerTableEnergyDataHeader($rowClickTable);
            $records['energy_html'] = $this->generateRowClickHtmlLayerTableEnergyData($sum_value,$click_row_array);
            $records['pagination_html_energy'] =  $this->generatePaginationHtmlRowClickLayerEnergyData($sum_value);

            // <----21-01-2022--
            $arTable = json_decode($click_row_array);
            $queryName = "Select * from SchichtModelleAll where modellBez = '$arTable[0]' ";
            // --end--->
            
            // <--15-8-2021--
            $ar_page_val = isset($_POST['page_val']) ? $_POST['page_val'] : 1;
            $ar_number_records = isset($_POST['number_records']) ? $_POST['number_records'] : 5;
            $pagesCount = isset($_POST['pagesCount']) ? $_POST['pagesCount'] : 1;
            $ar = array('pages_count' => $pagesCount,'page_val' => $ar_page_val,'number_records' => $ar_number_records,'query1' => $queryName ,'queryMaxValue' => $query1,'row_click' => 'true', 'type' => 'Energy');
            $records['query_data'] = $ar;

            // $records['queryLastDate'] = $queryLastDateData;
            // --end-->
           
            echo json_encode($records,JSON_INVALID_UTF8_IGNORE);

           die;
        }
        catch(Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }

    public function generateRowClickHtmlLayerTableEnergyData($sum_value,$click_row_array){
        global $conn;
        $tr = '';
        $col_span = "colspan='50'";
        $data_table_other = "data-table-other='SchichtModelleAll'";
        if($sum_value != ''){
            $click_row_array_decode = json_decode($click_row_array);
            // echo $click_row_array_decode[0]; die;
            $tr .= "<tr sum_value=".$sum_value." data-type='1' $data_table_other>";
            for($i = 0; $i <= count($click_row_array_decode); $i++){
                if($i == count($click_row_array_decode))
                {
                    $tr.= "<td>".$sum_value."</td>";
                }
                else{
                    $tr.= "<td>$click_row_array_decode[$i]</td>";
                }
            }
            $tr.="</tr>";
        }else{
                $tr = "<tr><td $col_span class='text-center'>No Data</td></tr>";
        }
        return $tr;
        // $records['measurement_html'] = $tr;

    }
    // --end--->
    public function generatePaginationHtmlRowClickLayerEnergyData($sum_value){
        try{
            //Pagination Code HTML
            // echo $pagesCount; die;
            $paginationHTMl = '';
            if($sum_value != ''){
                $paginationHTMl="<div id='save_table_format' class='text-center'>
                                    <input type='button' id='energy_modal_open_button' tile-edit='false' class='btn btn-sm btn-success' value='Save & Preview'>
                                </div>";            
                
                // $records['pagination_html'] = $paginationHTMl;
            }
            return $paginationHTMl;

        }
        catch(Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    // --end--


    public function getEnergyRecordsTableHeader(){
        try{
            $energy_type = $_POST['energy_type'];
            $open_end_layer = $_POST['open_end_layer'];
            if($energy_type == "automatic")
            {
                $tr = "<tr>";
                $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Messstelle</th>";
                $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Datum</th>";
                $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Wert</th>";
                $tr .= "</tr>";

                $records['table_header'] = $tr;
                echo json_encode($records,JSON_INVALID_UTF8_IGNORE);
                die;
            }
            else if($energy_type == "manually"){
                $tr = "<tr>";
                $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Name</th>";
                $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Zeitintervall</th>";
                $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Erstellungsdatum</th>";
                $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Gesamteinheiten</th>";
                $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Status</th>";
                $tr .= "</tr>";

                $records['table_header'] = $tr;
                echo json_encode($records,JSON_INVALID_UTF8_IGNORE);
                die;

            }
            else if($energy_type == "layer_modal"){
                $tr = '<tr>';
                $tr .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Modal Name</th>';
                $tr .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Created Date</th>';
                $tr .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Property</th>';
                $tr .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Valid From</th>';
                
                if($open_end_layer == '0')
                {
                    $tr .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Date of Expiry</th>';
                }
                
                $tr .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Quantity</th>';
                $tr .= '</tr>';
                $records['table_header'] = $tr;
                echo json_encode($records,JSON_INVALID_UTF8_IGNORE);
                die;
                // return $tr;
            }   
            die;
        }
        catch(Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }

    public function rowClickEnergyRecordsTableHeader(){
        try{
            $energy_type = $_POST['energy_type'];
            if($energy_type == "automatic")
            {
                $tr = '<tr>';
                $tr .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Messstelle</th>';
                $tr .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Datum</th>';
                $tr .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Wert</th>';
                $tr .= '</tr>';
                $records['table_header'] = $tr;
                echo json_encode($records,JSON_INVALID_UTF8_IGNORE);
                die;
                // return $tr;
            }
            else if($energy_type == "manually"){
                $tr = '<tr>';
                $tr .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Name</th>';
                $tr .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Zeitintervall</th>';
                $tr .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Datum</th>';
                $tr .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Verbrauchte Einheiten</th>';
                $tr .= '</tr>';
                $records['table_header'] = $tr;
                echo json_encode($records,JSON_INVALID_UTF8_IGNORE);
                die;
                // return $tr;

            }   
            else if($energy_type == "layer_modal"){
                $tr = '<tr>';
                $tr .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Modal Name</th>';
                $tr .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Designation</th>';
                $tr .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Time From</th>';
                $tr .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Time To</th>';
                $tr .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Day From</th>';
                $tr .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Day To</th>';
                $tr .= '</tr>';
                $records['table_header'] = $tr;
                echo json_encode($records,JSON_INVALID_UTF8_IGNORE);
                die;
                // return $tr;
            }   
            
            die;
        }
        catch(Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }


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
                    $convertValue = $this->convertValueCommaSeperated($value['val']);
                    $tr.= "<td>".$convertValue.' '.$unit."</td>";
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


    public function getNumberRecordsEnergyAutomatic(){
        try{
            global $conn;
            $mst_id = $_POST['mst_id'];
            $input_val_week_day = $_POST['input_val_week_day'];
            $order_by = isset($_POST['order_by']) ?  $_POST['order_by'] : 'desc';
            $energy_measurement_text = $_POST['energy_measurement_text'];
            $thead = "<tr>";
            $thead .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Messstelle</th>";
            $thead .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Datum</th>";
            $thead .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Wert</th>";
            $thead .= "</tr>";

            $tbody = '';
            $checkQuery = '';

            $todayDate = date('Y-m-d');

            //SchichtModelleAll Table Check
            $tableCheckQuery = "select * from MessstellenEnergiedaten where mst_id = '$mst_id' ";
            $resultTableExistCheck = sqlsrv_query($conn,$tableCheckQuery);
            $table_found = 'false';
            if($resultTableExistCheck != false)
            {
                $table_found = 'true';
            }

            $dateCheck = date('Y-m-d', strtotime("-60 days"));
            $dateCheck = date($dateCheck, strtotime("-$input_val_week_day days"));
            $queryEnergy = '';
            if($table_found == 'true'){
                $queryEnergy = "Select convert(date,Time) as date ,sum(Value*ConvFactor) as value ";
                $queryEnergy .= "FROM  MessstellenEnergiedaten where mst_id = '$mst_id' AND ";
                $queryEnergy .= "convert(date,Time) > '$dateCheck' group by convert(date,Time) order by date $order_by ";
                $queryEnergyRecords = queryDB($conn, $queryEnergy, "read");
                // echo $queryEnergy; die;
                // echo json_encode($queryEnergyRecords); 

                if($queryEnergyRecords != '' && count($queryEnergyRecords))
                {
                    for($i = 0; $i < $input_val_week_day; $i++)
                    {
                        $dateDynamicVal =  date('Y-m-d', strtotime("-$i days"));
                        $result = $this->generateEnergyAutomaticTableHTML($queryEnergyRecords,$dateDynamicVal,$energy_measurement_text);
                        $tbody .= $result;
                    }
                    
                    // die;
                    // foreach($queryEnergyRecords as $key => $val){
                    //     $tbody .= '<tr class="row_click_energy" data-table-other="true">';
                    //     // $tbody .= '<td>'.$dayVal.'</td>';
                    //     $tbody.= "<td>".$energy_measurement_text."</td>";
                    //     $tbody.= "<td>".$val['date']->format('Y-m-d')."</td>";
                    //     $totalValue = $val['value'] > 0 ? $val['value'] / 4 : 0;
                    //     $totalValue = $this->convertValueCommaSeperated($totalValue);
                    //     $tbody.= "<td>".$totalValue."</td>";
                    //     $tbody .= '</tr>';
                    // }
                    $paginationHTMl="<div id='save_table_format' class='text-center'>
                    <input type='button' id='energy_modal_open_button' tile-edit='false' class='btn btn-sm btn-success' value='Save & Preview'>
                    </div>";
                    $records['pagination_html_energy'] =  $paginationHTMl;
                }
            }

            // <---07-2-2022--
            if($tbody == '')
            {
                $tbody .= '<tr>';
                $tbody .= '<td colspan="50" class="text-center">No Data Found</td>';
                $tbody .= '</tr>';
                $records['pagination_html_energy'] =  '';
            }
            // --end-->
            
            $records['energy_header'] = $thead;
            $records['energy_html'] = $tbody;
            $records['table_found'] = $table_found;
            $ar = array('pages_count' => '0','page_val' => '0','number_records' => '0' ,'query1' => $queryEnergy ,'queryMaxValue' => '','row_click' => 'false' , 'type' => 'Energy','mst_id' => $mst_id , 'input_val_week_day' => $input_val_week_day , 'name_val' => $energy_measurement_text);
            $records['query_data'] = $ar;
            echo json_encode($records,JSON_INVALID_UTF8_IGNORE);
            die;
        }
        catch(Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }

    public function generateEnergyAutomaticTableHTML($data,$dateVal,$energy_measurement_text){
        try{
            $flag = 0;
            for($i = 0; $i < count($data); $i++)
            {
                if($data[$i]['date']->format('Y-m-d') == $dateVal)
                {
                    $flag = 1;
                    break;
                }
            }
            if($flag == 1)
            {
                $tbody = '<tr class="row_click_energy" data-table-other="true">';
                $tbody .= "<td>".$energy_measurement_text."</td>";
                $tbody.= "<td>".$data[$i]['date']->format('Y-m-d')."</td>";
                $totalValue = $data[$i]['value'] > 0 ? $data[$i]['value'] / 4 : 0;
                $totalValue = $this->convertValueCommaSeperated($totalValue);
                $tbody.= "<td>".$totalValue."</td>";
                $tbody .= '</tr>';
                return $tbody;
            }
            else{
                $tbody = '<tr class="row_click_energy" data-table-other="true">';
                $tbody.= "<td>".$energy_measurement_text."</td>";
                $tbody.= "<td>".$dateVal."</td>";
                $tbody.= "<td>0</td>";
                $tbody .= '</tr>';
                return $tbody;
            }
        }
        catch(Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }

    // public function getNumberRecordsEnergyAutomatic(){
    //     try{
    //         global $conn;
    //         $mst_id = $_POST['mst_id'];
    //         $input_val_week_day = isset($_POST['input_val_week_day']) ? $_POST['input_val_week_day'] : 100 ;
    //         $order_by = isset($_POST['order_by']) ?  $_POST['order_by'] : 'asc';
    //         $energy_measurement_text = $_POST['energy_measurement_text'];
    //         $energy_type = $_POST['energy_type']
    //         $thead = "<tr>";
    //         $thead .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Messstelle</th>";
    //         $thead .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Datum</th>";
    //         $thead .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Wert</th>";
    //         $thead .= "</tr>";

    //         $tbody = '';
    //         $checkQuery = '';

    //         $todayDate = date('Y-m-d');

    //         //SchichtModelleAll Table Check
    //         $tableCheckQuery = "select * from MessstellenEnergiedaten where mst_id = '$mst_id' ";
    //         $resultTableExistCheck = sqlsrv_query($conn,$tableCheckQuery);
    //         $table_found = 'false';
    //         if($resultTableExistCheck != false)
    //         {
    //             $table_found = 'true';
    //         }


    //         $dateCheck = date('Y-m-d', strtotime("-$input_val_week_day days "));
    //         // $dateCheck = date('Y-m-d');
    //         if($table_found == 'true'){
    //             $queryEnergy = "Select convert(date,Time) as date ,sum(Value*ConvFactor) as value ";
    //             $queryEnergy .= "FROM  MessstellenEnergiedaten where mst_id = '$mst_id' AND ";
    //             $queryEnergy .= "convert(date,Time) > '$dateCheck' group by convert(date,Time) order by date $order_by ";
    //             $queryEnergyRecords = queryDB($conn, $queryEnergy, "read");
    //             // echo $queryEnergy; die;
    //             // echo json_encode($queryEnergyRecords); 
    //             // die;
    //             if($queryEnergyRecords != '' && count($queryEnergyRecords))
    //             {
    //                 foreach($queryEnergyRecords as $key => $val){
    //                     $tbody .= '<tr class="row_click_energy" data-table-other="true">';
    //                     // $tbody .= '<td>'.$dayVal.'</td>';
    //                     $tbody.= "<td>".$energy_measurement_text."</td>";
    //                     $tbody.= "<td>".$val['date']->format('Y-m-d')."</td>";
    //                     $totalValue = $val['value'] > 0 ? $val['value'] / 4 : 0;
    //                     $totalValue = $this->convertValueCommaSeperated($totalValue);
    //                     $tbody.= "<td>".$totalValue."</td>";
    //                     $tbody .= '</tr>';
    //                 }
    //                 $paginationHTMl="<div id='save_table_format' class='text-center'>
    //                 <input type='button' id='energy_modal_open_button' tile-edit='false' class='btn btn-sm btn-success' value='Save & Preview'>
    //                 </div>";
    //                 $records['pagination_html_energy'] =  $paginationHTMl;
    //             }
    //         }

    //         // <---07-2-2022--
    //         if($tbody == '')
    //         {
    //             $tbody .= '<tr>';
    //             $tbody .= '<td colspan="50" class="text-center">No Data Found</td>';
    //             $tbody .= '</tr>';
    //             $records['pagination_html_energy'] =  '';
    //         }
    //         // --end-->
            
    //         $records['energy_header'] = $thead;
    //         $records['energy_html'] = $tbody;
    //         $records['table_found'] = $table_found;
    //         $ar = array('pages_count' => '0','page_val' => '0','number_records' => '0' ,'query1' => $queryEnergy ,'queryMaxValue' => '','row_click' => 'false' , 'type' => 'Energy','mst_id' => $mst_id , 'input_val_week_day' => $input_val_week_day , 'name_val' => $energy_measurement_text);
    //         $records['query_data'] = $ar;
    //         echo json_encode($records,JSON_INVALID_UTF8_IGNORE);
    //         die;
    //     }
    //     catch(Exception $e) {
    //         echo 'Caught exception: ',  $e->getMessage(), "\n";
    //     }
    // }
    
    public function getAutomaticTableEnergyDataPrevious(){
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
            //$queryTotalRecords .= "(SELECT T2.mst_ID as table_2_mst_id, sum(convert(decimal(38,5), Value)) as val from ";
            // <---28-02-2022--
            $queryTotalRecords .= "(SELECT T2.mst_ID as table_2_mst_id, sum(Value * ConvFactor) as val from ";
            // -end--->
            $queryTotalRecords .= "berechneteEnergiedaten as T2 ";
            $queryTotalRecords .= "GROUP By T2.mst_id) ";
            $queryTotalRecords .= "T2 ";
            $queryTotalRecords .= "ON T1.mst_ID = T2.table_2_mst_id ";
            $queryTotalRecords .= $queryTotalRecordCondition;
            $queryTotalRecords .= $order_by_val;
            // echo $queryTotalRecords; die;
            $resultQuery = sqlsrv_query($conn,$queryTotalRecords);
            $totalRecordsValue = [];
            if($resultQuery != false)
            {
                $totalRecordsValue = queryDB($conn, $queryTotalRecords, "read");
            
            }


            // $totalRecordsValue = queryDB($conn, $queryTotalRecords, "read");
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
            //$query1 .= "(SELECT T2.mst_ID as table_2_mst_id, sum(convert(decimal(38,5), Value) * convert(decimal(10,5), ConvFactor)) as val from ";
            // <---28-02-2022--
            $query1 .= "(SELECT T2.mst_ID as table_2_mst_id, sum(Value * ConvFactor) as val from ";
            // -end--->
            $query1 .= "berechneteEnergiedaten as T2 ";
            $query1 .= "GROUP By T2.mst_id) ";
            $query1 .= "T2 ";
            $query1 .= "ON T1.mst_ID = T2.table_2_mst_id ";
            $query1 .= $queryMainCondition;
            $query1 .= $order_by_val;
            $query1 .= "offset $offSetVal rows FETCH NEXT $number_records ROWS ONLY ";  
            $resultQuery = sqlsrv_query($conn,$query1);
            $tableFound = 'false';
            $dataMesaurement = [];
            if($resultQuery != false)
            {
                $dataMesaurement = queryDB($conn, $query1, "read");
                $tableFound = 'true';
            
            }
            $records['table_found'] = $tableFound;
            
            // $dataMesaurement = queryDB($conn, $query1, "read");

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
        // echo json_encode($dataMesaurement); die;
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
                    // $tr.= "<td>".$queryResult[0]['ConvFactor']."</td>";
                    $valEnergy = 0;
                    if($value['val'] > 0)
                    {
                        $valEnergy = $value['val'] / 4;
                        $valEnergy = $this->convertValueCommaSeperated($valEnergy);
                    }
                    $tr.= "<td>".$valEnergy."</td>";
                }
                else{
                    $tr.= "<td>".$value['Time']."</td>";
                    // $tr.= "<td>".$value['ConvFactor']."</td>";
                    $valEnergy = 0;
                    if($value['Value'] > 0)
                    {
                        $valEnergy = ($value['Value'] * $value['ConvFactor'])  / 4;
                        $valEnergy = $this->convertValueCommaSeperated($valEnergy);
                    }
                    $tr.= "<td>".$valEnergy."</td>";
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


    // <----25-1-2022---
    public function getAllMeasurementEnergy()
    {
        try{
            global $conn;
            $queryMeasurement = "select mst_Id from MessstellenEnergiedaten group by mst_Id ";
            $resulTotalRecord = sqlsrv_query($conn,$queryMeasurement);
            $resultQuery = [];
            $tablefound = 'false';
            
            if($resulTotalRecord != false)
            {
                $resultQuery = queryDB($conn, $queryMeasurement, "read");
                $tablefound = 'true';
            }

            if($resultQuery != '' && count($resultQuery) > 0)
            {
                $ar_mst_id = array_column($resultQuery,'mst_Id');
                $str_mst_id = implode(',',$ar_mst_id);
                $nameQuery = "Select mst_id,nameMSt from messstellen where  mst_id in ($str_mst_id) ";
                $nameQueryResult = queryDB($conn, $nameQuery, "read");
                // echo json_encode($ar_mst_id); die;
                $select = "<option value=''>Please Select Measurement</option>";
                foreach($nameQueryResult as $key=>$val)
                {
                    $select .= "<option value=".$val["mst_id"].">".$val['nameMSt']."</option>";    
                }
                $result['measurement_html'] = $select;
            }
            else{
                $select = "<option value=''>No Data Found</option>";
                $result['measurement_html'] = $select;
            }
            $result['table_found'] = $tablefound;
            echo json_encode($result,JSON_INVALID_UTF8_IGNORE);
            die;
        }
        catch(Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    
    // --end---->


    // <----03-02-2022---
    public function getAllMeasurementEnergyAutomatic()
    {
        try{
            global $conn;
            $queryMeasurement = "select * from messstellen where messartMst = 'automatisch' ";
            $resulTotalRecord = sqlsrv_query($conn,$queryMeasurement);
            $resultQuery = [];
            $tablefound = 'false';
            
            if($resulTotalRecord != false)
            {
                $resultQuery = queryDB($conn, $queryMeasurement, "read");
                $tablefound = 'true';
            }

            if($resultQuery != '' && count($resultQuery) > 0)
            {
                $select = "<option value=''>Please Select Measurement</option>";
                
                foreach($resultQuery as $key=>$val)
                {
                    $select .= "<option value=".$val["mst_ID"].">".$val['nameMSt']."</option>";    
                }
                $result['measurement_html'] = $select;
            }
            else{
                $select = "<option value=''>No Data Found</option>";
                $result['measurement_html'] = $select;
            }
            $result['table_found'] = $tablefound;
            echo json_encode($result,JSON_INVALID_UTF8_IGNORE);
            die;
        }
        catch(Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    // --end-->


    // <---18-02-2022---
    public function getEnergyMeasurementChart()
    {
        try{
            global $conn;
            $queryMeasurement = "select mst_Id from MessstellenEnergiedaten group by mst_Id ";
            $resulTotalRecord = sqlsrv_query($conn,$queryMeasurement);
            $resultQuery = [];
            $tablefound = 'false';
            
            if($resulTotalRecord != false)
            {
                $resultQuery = queryDB($conn, $queryMeasurement, "read");
                $tablefound = 'true';
            }

            if($resultQuery != '' && count($resultQuery) > 0)
            {
                $ar_mst_id = array_column($resultQuery,'mst_Id');
                $str_mst_id = implode(',',$ar_mst_id);
                $nameQuery = "Select mst_id,nameMSt from messstellen where  mst_id in ($str_mst_id) ";
                $nameQueryResult = queryDB($conn, $nameQuery, "read");
                // echo json_encode($ar_mst_id); die;
                $select = "<option value=''>Please Select Measurement</option>";
                foreach($nameQueryResult as $key=>$val)
                {
                    $select .= "<option value=".$val["mst_id"].">".$val['nameMSt']."</option>";    
                }
                $result['measurement_html'] = $select;
            }
            else{
                $select = "<option value=''>No Data Found</option>";
                $result['measurement_html'] = $select;
            }
            $result['table_found'] = $tablefound;
            echo json_encode($result,JSON_INVALID_UTF8_IGNORE);
            die;
        }
        catch(Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    // --end--->


    // <-----07-3-2022---
    public function getEnergyMeasurementChartAutomatic()
    {
        try{
            global $conn;
            $queryMeasurement = "select * from messstellen where messartMst = 'automatisch' ";
            $resulTotalRecord = sqlsrv_query($conn,$queryMeasurement);
            $resultQuery = [];
            $tablefound = 'false';
            
            if($resulTotalRecord != false)
            {
                $resultQuery = queryDB($conn, $queryMeasurement, "read");
                $tablefound = 'true';
            }

            if($resultQuery != '' && count($resultQuery) > 0)
            {
                $select = "";
                foreach($resultQuery as $key=>$val)
                {
                    $select .= "<option value=".$val["mst_ID"].">".$val['nameMSt']."</option>";    
                }
                $result['measurement_html'] = $select;
                $result['data'] = $resultQuery;
            }
            else{
                $select = "<option value=''>No Data Found</option>";
                $result['measurement_html'] = $select;
                $result['data'] = $resultQuery;
            }
            $result['table_found'] = $tablefound;
            echo json_encode($result,JSON_INVALID_UTF8_IGNORE);
            die;
        }
        catch(Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    // --end--->

    //<---16-12-2021---
    public function getLayerTableEnergyData(){
        try{
            global $conn;
            // <----27-1-2021---e
            $mst_id = $_POST['mst_id'];
            $select_day_week = $_POST['select_day_week'];
            $input_val_week_day = $_POST['input_val_week_day'];
            // $date = '2022-02-01';
            if($select_day_week == 'day') 
            {   
                $thead = '<tr>';
                // $thead .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Day</th>';
                $thead .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Schichtname</th>';
                $thead .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Gültig ab</th>';
                $thead .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Gültig bis</th>';
                $thead .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Bezeichnung</th>';
                $thead .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Zeit von</th>';
                $thead .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Zeit zum</th>';
                $thead .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Energieverbrauch</th>';
                // $thead .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Date</th>';
                $thead .= '</tr>';
                $tbody = '';
                $checkQuery = '';

                $todayDate = date('Y-m-d');

                //SchichtModelleAll Table Check
                $tableCheckQuery = "select * from SchichtModelleAll ";
                $resultTableExistCheck = sqlsrv_query($conn,$tableCheckQuery);
                $table_found = 'false';
                if($resultTableExistCheck != false)
                {
                    $table_found = 'true';
                }

                if($table_found == 'true'){
                    // <---07-02-2022---
                    //*** Check No Shift Name Found Database */
                    $checkQuery .= "Select * from SchichtModelleAll ";
                    for($c = 0; $c < $input_val_week_day; $c++)
                    {
                        $dateVal = date('Y-m-d', strtotime("-$c days"));
                        if($c == 0)
                        {
                           $checkQuery .= "Where '$dateVal' between gueltigVon AND gueltigBis "; 
                        }
                        else{
                            $checkQuery .= "Or '$dateVal' between gueltigVon AND gueltigBis "; 
                        }
                    }
                    $resultShiftName = queryDB($conn, $checkQuery, "read");
                    // echo $checkQuery; die;
                    // echo json_encode($resultShiftName);
                    
                    // <----09-02-2022----
                    if($resultShiftName != '' && count($resultShiftName) > 0)
                    {
                        $ind = $input_val_week_day - 1;
                        $dateValCheck = date('Y-m-d', strtotime("-$ind days")); 
                        $fromDateCheck = '';
                        foreach($resultShiftName as $key => $val){
                            $fromDate=$val['gueltigVon']->format('Y-m-d');
                            // <----21-2-2022---
                            if($dateValCheck <= $val['gueltigVon']->format('Y-m-d'))
                            { 
                               $fromDateCheck = $val['gueltigVon']->format('Y-m-d');
                                 
                            }
                            else{
                               $fromDateCheck = $dateValCheck;
                            }

                            // --end-->
                            $toDate=$val['gueltigBis']->format('Y-m-d');
                            $fromTime=$val['uhrzeitVon']->format('H:i:s');
                            $toTime=$val['uhrzeitBis']->format('H:i:s');
                            $to=$toDate.'T'.$toTime;
                            $from=$fromDate.'T'.$fromTime;
                            //  $query1 = "Select Sum(Value*ConvFactor) as sum from MessstellenEnergiedaten where time between convert(datetime,'".$from."') AND  convert(datetime,'".$to."') AND mst_ID ='".$mst_id."'";
                            $query1 = "Select Sum(Value*ConvFactor) as sum  from MessstellenEnergiedaten where   convert(date,time) between '$fromDateCheck' AND '$toDate' AND convert(time,time) between '$fromTime' AND '$toTime' AND mst_ID = '$mst_id' ";
                            //echo $query1; die;
                            $resultEnergy = queryDB($conn, $query1, "read");
                            // echo json_encode($resultEnergy); die;
                            $totalEnergy = $resultEnergy[0]['sum'] != 0 ? $resultEnergy[0]['sum'] / 4 : 0;
                            $totalEnergy = $this->convertValueCommaSeperated($totalEnergy);
                            $tbody .= '<tr class="row_click_energy" data-table-other="SchichtModelleAll">';
                            // $tbody .= '<td>'.$dayVal.'</td>';
                            $tbody.= "<td>".$val['modellBez']."</td>";
                            $tbody.= "<td>".$val['gueltigVon']->format('Y-m-d')."</td>";
                            $tbody.= "<td>".$val['gueltigBis']->format('Y-m-d')."</td>";
                            $tbody.= "<td>".$val['bezeichnung']."</td>";
                            $tbody.= "<td>".$val['uhrzeitVon']->format('H:i:s')."</td>";    
                            $tbody.= "<td>".$val['uhrzeitBis']->format('H:i:s')."</td>";
                            $tbody.= "<td>".$totalEnergy."</td>";
                            // $tbody .= '<td>'.$dateVal.'</td>';
                            $tbody .= '</tr>';
                        }
                        $paginationHTMl="<div id='save_table_format' class='text-center'>
                        <input type='button' id='energy_modal_open_button' tile-edit='false' class='btn btn-sm btn-success' value='Save & Preview'>
                        </div>";
                        $records['pagination_html_energy'] =  $paginationHTMl;
                    }
                    // ---end--->

                    // if($resultShiftName != '' && count($resultShiftName) > 0){
                    //     for($i = 0; $i < $input_val_week_day; $i++)
                    //     {
                    //         $dateVal = date('Y-m-d', strtotime("-$i days"));
                    //         $dayVal = date('l', strtotime("-$i days"));
                            
                    //         // <---07-02-2022--
                    //         //Shift Name Get if result found then do energy calulcation
                    //         $shiftNameQueryDay = "Select * from SchichtModelleAll Where '$dateVal' between gueltigVon AND gueltigBis ";
                    //         $shfitNameResultDay = queryDB($conn, $shiftNameQueryDay, "read");

                    //         if($shfitNameResultDay != '' && count($shfitNameResultDay) > 0){
                    //             //Energy Consumed Check
                    //             $query1 = "Select * from MessstellenEnergiedaten where convert(date,time) = '$dateVal' AND mst_ID = '$mst_id' Order by time desc ";
                    //             // echo $query1; die;
                    //             $resultQuery = queryDB($conn, $query1, "read");
                    //             // echo json_encode($resultQuery); die;
                    //             if($resultQuery != '' && count($resultQuery) > 0)
                    //             {
                    //                 $energyConsumedValue = $this->calculateLayerEnergyConsumed($resultQuery,$dayVal,$dateVal);
                    //                 // $energyConsumedValue['tbody'] = str_replace($energyConsumedValue['inArrayTotalValue'],$energyConsumedValue['total_energy'],$energyConsumedValue['tbody']); 
                    //                 $tbody .= $energyConsumedValue['tbody'];
                    //                 $records['total_energy'] = $energyConsumedValue['total_energy'];
                    //                 $records['ar_value'] =  $energyConsumedValue['ar_value'];
                    //                 // $tbody .= $energyConsumedValue;
                    //                 //Save Button
                    //                 $paginationHTMl="<div id='save_table_format' class='text-center'>
                    //                 <input type='button' id='energy_modal_open_button' tile-edit='false' class='btn btn-sm btn-success' value='Save & Preview'>
                    //                 </div>";
                    //                 $records['pagination_html_energy'] =  $paginationHTMl;
                                    
                    //             }
                            
                    //             // else{
                    //             //     $tbody .= '<tr>';
                    //             //     $tbody .= '<td>'.$dayVal.'</td>';
                    //             //     $tbody .= '<td></td>';     //Model Name
                    //             //     $tbody .= '<td></td>';     //Vaild From
                    //             //     $tbody .= '<td></td>';     //Valid To
                    //             //     $tbody .= '<td></td>';    //Designation
                    //             //     $tbody .= '<td></td>';    //Time From 
                    //             //     $tbody .= '<td></td>';    //Time To
                    //             //     $tbody .= '<td></td>';    //Energy Consumed
                    //             //     $tbody .= '<td>'.$dateVal.'</td>';
                    //             //     $tbody .= '</tr>';
                    //             // }
                    //         }
                    //         // --end-->
                            
                    //     }
                    // }
                }
                

                // <---07-2-2022--
                if($tbody == '')
                {
                    $tbody .= '<tr>';
                    $tbody .= '<td colspan="50" class="text-center">No Data Found</td>';
                    $tbody .= '</tr>';
                    $records['pagination_html_energy'] =  $paginationHTMl;
                }
                // --end-->
                
                $records['energy_header'] = $thead;
                $records['energy_html'] = $tbody;
                $records['table_found'] = $table_found;

                $ar = array('pages_count' => '0','page_val' => '0','number_records' => '0' ,'query1' => $checkQuery ,'queryMaxValue' => '','row_click' => 'false' , 'type' => 'Energy','mst_id' => $mst_id , 'select_filter_day_week' => $select_day_week ,'input_val_week_day' => $input_val_week_day);
                $records['query_data'] = $ar;

                echo json_encode($records,JSON_INVALID_UTF8_IGNORE);
                die;
            }
            else if($select_day_week == 'week')
            {

                $thead = '<tr>';
                // $thead .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Day</th>';
                $thead .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Shift Name</th>';
                $thead .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Valid From</th>';
                $thead .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Valid To</th>';
                $thead .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Designation</th>';
                $thead .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Time From</th>';
                $thead .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Time To</th>';
                $thead .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Energy Consumed</th>';
                // $thead .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Date</th>';
                $thead .= '</tr>';
                $tbody = '';
                $checkShiftNameQuery = '';


                //SchichtModelleAll Table Check
                $tableCheckQuery = "select * from SchichtModelleAll ";
                $resultTableExistCheck = sqlsrv_query($conn,$tableCheckQuery);

                $table_found = 'false';
                if($resultTableExistCheck != false)
                {
                    $table_found = 'true';
                }

                if($table_found == 'true')
                {
                    $todayDate = date('Y-m-d');
                    $dateVal =  date('Y-m-d', strtotime("-$input_val_week_day week"));

                    // <----07-02-2022--
                    // ****Check Shift Name Exist 
                    $intervalDays = $input_val_week_day * 7; //Week;
                    $checkShiftNameQuery .= "Select * from SchichtModelleAll ";
                    for($interval = 0; $interval <= $intervalDays; $interval++)
                    {
                        $dateValShiftName =  date('Y-m-d', strtotime("-$interval Days"));
                        if($interval == 0)
                        {
                            $checkShiftNameQuery.= "Where '$dateValShiftName' between gueltigVon AND gueltigBis ";
                        }
                        else{
                            $checkShiftNameQuery.= "Or '$dateValShiftName' between gueltigVon AND gueltigBis ";
                        }

                    }
                    $resultShiftName = queryDB($conn, $checkShiftNameQuery, "read");
                    // echo json_encode($resultShiftName); die;
                    // --end--->
                    if($resultShiftName != '' && count($resultShiftName) > 0)
                    {
                        $weekInd = $input_val_week_day * 7; //Week;
                        $dateValCheck = date('Y-m-d', strtotime("-$weekInd Days"));
                        // echo $fromDateCheck; die;
                        $fromDateCheck = '';
                        foreach($resultShiftName as $key=>$val){

                            $fromDate=$val['gueltigVon']->format('Y-m-d');

                            if($dateValCheck <= $val['gueltigVon']->format('Y-m-d')){
                                $fromDateCheck  = $val['gueltigVon']->format('Y-m-d');
                            }
                            else{
                                $fromDateCheck  = $dateValCheck;
                            }
                            $toDate=$val['gueltigBis']->format('Y-m-d');
                            $fromTime=$val['uhrzeitVon']->format('H:i:s');
                            $toTime=$val['uhrzeitBis']->format('H:i:s');
                            $to=$toDate.'T'.$toTime;
                            $from=$fromDate.'T'.$fromTime;
                            // $query1 = "Select Sum(Value*ConvFactor) as sum from MessstellenEnergiedaten where time between convert(datetime,'".$from."') AND  convert(datetime,'".$to."') AND mst_ID ='".$mst_id."'";
                            $query1 = "Select Sum(Value*ConvFactor) as sum  from MessstellenEnergiedaten where   convert(date,time) between '$fromDateCheck' AND '$toDate' AND convert(time,time) between '$fromTime' AND '$toTime' AND mst_ID = '$mst_id' ";
                            
                            $resultEnergy = queryDB($conn, $query1, "read");
                            // echo json_encode($resultEnergy); die;
                            $totalEnergy = $resultEnergy[0]['sum'] != 0 ? $resultEnergy[0]['sum'] / 4 : 0;
                            $totalEnergy = $this->convertValueCommaSeperated($totalEnergy);
                            $tbody .= '<tr class="row_click_energy" data-table-other="SchichtModelleAll">';
                            $tbody.= "<td>".$val['modellBez']."</td>";
                            $tbody.= "<td>".$val['gueltigVon']->format('Y-m-d')."</td>";
                            $tbody.= "<td>".$val['gueltigBis']->format('Y-m-d')."</td>";
                            $tbody.= "<td>".$val['bezeichnung']."</td>";
                            $tbody.= "<td>".$val['uhrzeitVon']->format('H:i:s')."</td>";    
                            $tbody.= "<td>".$val['uhrzeitBis']->format('H:i:s')."</td>";
                            $tbody.= "<td>".$totalEnergy."</td>"; 
                            $tbody .= '</tr>';
                            // array_push($arr,($resultEnergy[0]['sum'])/4);
                        }
                        $paginationHTMl="<div id='save_table_format' class='text-center'>
                        <input type='button' id='energy_modal_open_button' tile-edit='false' class='btn btn-sm btn-success' value='Save & Preview'>
                        </div>";
                        $records['pagination_html_energy'] =  $paginationHTMl;
                    }
                    else{
                        $tbody .= '<tr>';
                        $tbody .= '<td colspan="50" class="text-center">No Data Found</td>';
                        $tbody .= '</tr>';
                    }
                    
                    $records['energy_header'] = $thead;
                    $records['energy_html'] = $tbody;
                    $records['table_found'] = $table_found;

                    $ar = array('pages_count' => '0','page_val' => '0','number_records' => '0' ,'query1' => $checkShiftNameQuery ,'queryMaxValue' => '','row_click' => 'false' , 'type' => 'Energy','mst_id' => $mst_id , 'select_filter_day_week' => $select_day_week ,'input_val_week_day' => $input_val_week_day);
                    $records['query_data'] = $ar;


                    echo json_encode($records,JSON_INVALID_UTF8_IGNORE);
                    die;

                    // <---Code Commet 8-2-2022---
                    // if($resultShiftName != '' && count($resultShiftName) > 0)
                    // {
                    //     //All Energy Consumed Acc. Week
                    //     $query1 = "Select * from MessstellenEnergiedaten where convert(date,time) >= '$dateVal' AND mst_ID = '$mst_id' Order by time desc ";
                    //     $resultEnergy = queryDB($conn, $query1, "read");
                    //     echo json_encode($resultEnergy); die;
                        
                    //     $shiftNameQuery = "Select * from SchichtModelleAll ";
                    //     $resultShiftName = queryDB($conn, $shiftNameQuery, "read");
                    //     // echo json_encode($resultShiftName); die;
                    //     //Get Week Data
                    //     $testTotalenergy = 0;
                    //     for($i = 1; $i <= $input_val_week_day; $i++)
                    //     {
                    //         if($resultEnergy != '' && count($resultEnergy) > 0){
                    //             //getEvery Week Day
                    //             $startWeekDate = date('Y-m-d', strtotime("-$i week"));
                    //             $endVal = $i - 1;
                    //             $endWeekDate = date('Y-m-d', strtotime("-$endVal week")); 
                    //             $testResult = $this->calculateLayerEnergyConsumedWeek($startWeekDate,$endWeekDate,$i,$resultEnergy,$resultShiftName);
                    //             $testTotalenergy += $testResult;
                    //         }
                    //     }
                    //     echo json_encode($testTotalenergy); 
                    // }
                    // die;
                    // ---end-->
                }
            }

            // ---end--->
            die;
        }
        catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        } 
    }

    // <---04-03-2022---
    public function rowClickEnergyAutomatic()
    {
        try{
            global $conn;
            $mst_id = $_POST['mst_id'];
            $name_val = $_POST['name_val'];
            $dateValue = $_POST['dateValue'];

            $thead = "<tr>";
            $thead .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Messstelle</th>";
            $thead .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Datum</th>";
            $thead .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Wert</th>";
            $thead .= "</tr>";;
            

            $queryMaxValue = "Select Sum(Value*ConvFactor) as sum  from MessstellenEnergiedaten where convert(date,time) = '$dateValue' AND mst_id = '$mst_id' ";
            // $resultQuery = queryDB($conn, $queryMaxValue, "read");
            $query1 =  "Select * from MessstellenEnergiedaten where convert(date,time) = '$dateValue' AND mst_ID = '$mst_id'  order by Time desc ";
            $resultQuery = queryDB($conn, $query1, "read");
            // echo $query1; die;
            // echo json_encode($resultQuery); die;
            $tbody = '';
            if($resultQuery != '' && count($resultQuery) > 0)
            {
                $sum=0;
                foreach($resultQuery as $key=>$val)
                {
                    $tbody .= '<tr data-table-other="true">';
                    $tbody.= "<td>".$name_val."</td>";
                    $tbody.= "<td>".$val['Time']->format('Y-m-d')."</td>";
                    $totalEnergy = $val['Value'] * $val['ConvFactor'];
                    $totalEnergy = $totalEnergy > 0 ? $totalEnergy / 4 : 0;
                    $convertValue = $this->convertValueCommaSeperated($totalEnergy);
                    $tbody.= "<td>".$convertValue."</td>";
                    $tbody .= '</tr>';
                    $sum+=$totalEnergy;
                }
                $sum = $this->convertValueCommaSeperated($sum);
                $tbody.= "<tr class='font-weight-bold'><td colspan='2'>Grand Total: </td><td>$sum</td></tr>";
                // print_r($sum);die;
                // $paginationHTMl="<div id='save_table_format' class='text-center'>
                // <input type='button' id='energy_modal_open_button' tile-edit='false' class='btn btn-sm btn-success' value='Save & Preview'>
                // </div>";
                // $records['pagination_html_energy'] =  $paginationHTMl;
            }
            else{
                $tbody .= '<tr>';
                $tbody .= '<td colspan="50" class="text-center">No Data Found</td>';
                $tbody .= '</tr>';
            }

            $records['energy_header'] = $thead;
            $records['energy_html'] = $tbody;

            $ar = array('pages_count' => '0','page_val' => '0','number_records' => '0' ,'query1' => $query1 ,'queryMaxValue' => $queryMaxValue,'row_click' => 'true' , 'type' => 'Energy', 'name_val' => $name_val);
            $records['query_data'] = $ar;
            echo json_encode($records,JSON_INVALID_UTF8_IGNORE); 
            die;
        }
        catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    // --end--->

    // <---15-2-2022--
    public function rowClickEnergyLayer()
    {
        try{
            global $conn;
            $mst_id = $_POST['mst_id'];
            $name_val = $_POST['name_val'];
            $valid_from = $_POST['valid_from'];
            $valid_to = $_POST['valid_to'];
            $time_from = $_POST['time_from'];
            $time_to = $_POST['time_to'];
            $input_val_week_day = $_POST['input_val_week_day'];
            $select_day_week = $_POST['select_day_week'];

            $ind = 0;
            if($select_day_week == 'day')
            {
                $ind = $input_val_week_day - 1;
            }
            else{
                $ind = $input_val_week_day * 7;
            }
            $dateValCheck = date('Y-m-d', strtotime("-$ind days"));
            $fromDateCheck = ''; 
            if($dateValCheck <= $valid_from){
                $fromDateCheck  = $valid_from;
            }
            else{
                $fromDateCheck  = $dateValCheck;
            }

            $thead = '<tr>';
            $thead .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Schichtname</th>';
            $thead .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Datum</th>';
            $thead .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Von Zeit</th>';
            $thead .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Zeit zum</th>';
            $thead .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Energieverbrauch</th>';
            $thead .= '</tr>';
            

            $queryMaxValue = "Select Sum(Value*ConvFactor) as sum  from MessstellenEnergiedaten where convert(date,time) between '$fromDateCheck' AND '$valid_to' AND convert(time,time) between '$time_from' AND '$time_to' AND mst_ID = '$mst_id' ";
            // $resultQuery = queryDB($conn, $queryMaxValue, "read");
            $query1 =  "Select * from MessstellenEnergiedaten where   convert(date,time) between '$fromDateCheck' AND '$valid_to' AND convert(time,time) between '$time_from' AND '$time_to' AND mst_ID = '$mst_id'  order by Time desc ";
            $resultQuery = queryDB($conn, $query1, "read");
            // echo json_encode($resultQuery); die;
            $tbody = '';
            if($resultQuery != '' && count($resultQuery) > 0)
            {
                $sum=0;
                $resultQuery=$this->getDateWiseScore($resultQuery);
                $currentDate = date('Y-m-d');
                // <---3-3-2021-- Check Shift Expire 
                if($valid_to < $currentDate)
                {
                    for($i = 0; $i < $input_val_week_day; $i++)
                    {
                        $dateShiftEnd = date('Y-m-d', strtotime("-$i days"));
                        if($valid_to < $dateShiftEnd)
                        {
                            $tbody .= '<tr data-table-other="SchichtModelleAll">';
                            $tbody.= "<td>".$name_val."</td>";
                            $tbody.= "<td>".$dateShiftEnd."</td>";
                            $tbody.= "<td>".$time_from."</td>";
                            $tbody.= "<td>".$time_to."</td>";
                            $tbody.= "<td>Shift Ended</td>";
                            $tbody .= '</tr>';
                        }

                    }
                }
                // --end-->
                else if(!array_key_exists($currentDate,$resultQuery)){
                    $tbody .= '<tr data-table-other="SchichtModelleAll">';
                    $tbody.= "<td>".$name_val."</td>";
                    $tbody.= "<td>".$currentDate."</td>";
                    $tbody.= "<td>".$time_from."</td>";
                    $tbody.= "<td>".$time_to."</td>";
                    $tbody.= "<td>In Progress</td>";
                    $tbody .= '</tr>';
                }
                // echo json_encode ($resultQuery); die;
                foreach($resultQuery as $key=>$val)
                {   
                    $tbody .= '<tr data-table-other="SchichtModelleAll">';
                    $tbody.= "<td>".$name_val."</td>";
                    $tbody.= "<td>".$val['date']."</td>";
                    $tbody.= "<td>".$time_from."</td>";
                    $tbody.= "<td>".$time_to."</td>";
                    $convertValue = $this->convertValueCommaSeperated($val['Value']);
                    $tbody.= "<td>".$convertValue."</td>";
                    $tbody .= '</tr>';
                    $sum+=$val['Value'];
                }
                $sum = $this->convertValueCommaSeperated($sum);
                $tbody.= "<tr class='font-weight-bold'><td colspan='4'>Grand Total: </td><td>$sum</td></tr>";
                // print_r($sum);die;
                $paginationHTMl="<div id='save_table_format' class='text-center'>
                <input type='button' id='energy_modal_open_button' tile-edit='false' class='btn btn-sm btn-success' value='Save & Preview'>
                </div>";
                $records['pagination_html_energy'] =  $paginationHTMl;
            }
            else{
                $tbody .= '<tr>';
                $tbody .= '<td colspan="50" class="text-center">No Data Found</td>';
                $tbody .= '</tr>';
            }

            $records['energy_header'] = $thead;
            $records['energy_html'] = $tbody;

            $ar = array('pages_count' => '0','page_val' => '0','number_records' => '0' ,'query1' => $query1 ,'queryMaxValue' => $queryMaxValue,'row_click' => 'true' , 'type' => 'Energy', 'name_val' => $name_val);
            $records['query_data'] = $ar;
            echo json_encode($records,JSON_INVALID_UTF8_IGNORE); 
            die;
        }
        catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    public function getDateWiseScore($data) {
        $groups = array();
        foreach ($data as $item) {
            $key = $item['Time']->format('Y-m-d');
            if (!array_key_exists($key, $groups)) {
                $groups[$key] = array(
                    'date' => $item['Time']->format('Y-m-d'),
                    'Value' =>  ($item['Value'] * $item['ConvFactor'])/4,
                );
            }else {
                $groups[$key]['Value'] = $groups[$key]['Value'] + (($item['Value']* $item['ConvFactor'])/4);
            }
        }
        return $groups;
    }
    // --end--->

    // <-----01-2-2022---
    public function calculateLayerEnergyConsumed($resultQuery,$dayVal,$dateVal){
        try{
            // echo json_encode($resultQuery); die;
            global $conn;
            $energyConsumed = '';
            if($resultQuery != '' && count($resultQuery) > 0)
            {
              $totalEnergy = 0;
              $todayDate = date('Y-m-d');
              $tbody = '';
              $arCheckExistName = [];
              $arValue = [];
              $inArrayTotalValue = 0;
              for($i = 0; $i < count($resultQuery); $i++)  
              {
                
                $timeEnergy = $resultQuery[$i]['Time']->format('H:i:s');
                $dateEnergy = $resultQuery[$i]['Time']->format('Y-m-d');
                $modelNameQuery = "Select * from SchichtModelleAll where '$dateEnergy' between gueltigVon AND gueltigBis  AND '$timeEnergy' between uhrzeitVon AND uhrzeitBis ";
                // $modelNameQuery = "Select * from SchichtModelleAll where  '2021-06-01' between gueltigVon AND gueltigBis AND '10:54:00' between uhrzeitVon ANd uhrzeitBis ";
                // echo $modelNameQuery;
                $modelNameResult = queryDB($conn, $modelNameQuery, "read");
                // echo json_encode($modelNameResult[0]['uhrzeitVon']->format('h:i:s')); die;

                $energyConsumed = ($resultQuery[$i]['Value'] * $resultQuery[$i]['ConvFactor']) / 4; 
                $totalEnergy += $energyConsumed; 

                if($modelNameResult != '' && count($modelNameResult) > 0)
                {
                    
                    for($j = 0; $j < count($modelNameResult); $j++)
                    {
                        $model_and_designation_name = $modelNameResult[$j]['modellBez'].$modelNameResult[$j]['bezeichnung'];
                        if(!in_array($model_and_designation_name,$arCheckExistName)){
                            array_push($arCheckExistName,$model_and_designation_name);
                            
                            array_push($arValue, $modelNameResult[$j]);
                            $indArValue = count($arValue) - 1;
                            // array_push($arValue[$indArValue]['value'], $energyConsumed);
                            $arValue[$indArValue]['value'] = $energyConsumed;
                        }
                        else{
                            if($arValue != '' && count($arValue) > 0)
                            {
                                for($k = 0; $k < count($arValue); $k++)
                                {
                                    if($arValue[$k]['modellBez'] == $modelNameResult[$j]['modellBez'] && $arValue[$k]['bezeichnung'] == $modelNameResult[$j]['bezeichnung'])
                                    {
                                        $energyConsumed = ($resultQuery[$i]['Value'] * $resultQuery[$i]['ConvFactor']) / 4; 
                                        $particularEnergyConsumed = $energyConsumed + $arValue[$k]['value'];
                                        // $tbody = str_replace($arValue[$k]['value'],$particularEnergyConsumed,$tbody);
                                        $arValue[$k]['value'] = $particularEnergyConsumed;
                                    }
                                }
                            }
                        }
                        
                    }

                }
                // else{
                //     $tbody .= '<tr>';
                //     $tbody .= '<td>'.$dayVal.'</td>';
                //     $tbody .= '<td></td>';     //Model Name
                //     $tbody .= '<td></td>';     //Vaild From
                //     $tbody .= '<td></td>';     //Valid To
                //     $tbody .= '<td></td>';    //Designation
                //     $tbody .= '<td></td>';    //Time From 
                //     $tbody .= '<td></td>';    //Time To 
                    
                //     $energyConsumed = ($resultQuery[$i]['Value'] * $resultQuery[$i]['ConvFactor']) / 4; 
                //     // $totalEnergy += $energyConsumed;
                //     $tbody.= "<td>".$energyConsumed."</td>";
                    
                //     $tbody .= '<td>'.$dateVal.'</td>';
                //     $tbody .= '</tr>';
                // }
              
              }
            // echo json_encode($arValue); die;
            if($i == count($resultQuery))
            {
                if($arValue != '' && count($arValue) > 0)
                {
                    for($j = 0; $j < count($arValue); $j++)
                    {
                        $tbody .= '<tr>';
                        $tbody .= '<td>'.$dayVal.'</td>';
                        $tbody.= "<td>".$arValue[$j]['modellBez']."</td>";
                        $tbody.= "<td>".$arValue[$j]['gueltigVon']->format('Y-m-d')."</td>";
                        $tbody.= "<td>".$arValue[$j]['gueltigBis']->format('Y-m-d')."</td>";
                        $tbody.= "<td>".$arValue[$j]['bezeichnung']."</td>";
                        $tbody.= "<td>".$arValue[$j]['uhrzeitVon']->format('H:i:s')."</td>";    
                        $tbody.= "<td>".$arValue[$j]['uhrzeitBis']->format('H:i:s')."</td>";
                        $tbody.= "<td>".$arValue[$j]['value']."</td>"; 
                        $tbody .= '<td>'.$dateVal.'</td>';
                        $tbody .= '</tr>';
                    }
                }
            }
            return array('tbody' => $tbody , 'total_energy' => $totalEnergy, 'inArrayTotalValue' => $inArrayTotalValue,'ar_value' => $arValue);
            // return $arCheckExistName;
            }
        }
        catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    // --end--->

    // <-----31-01-2022---
    public function calculateLayerEnergyConsumedWeek($startWeekDate,$endWeekDate,$indMainLoop,$resultEnergy,$resultShiftName){
        try{
            // echo json_encode($resultShiftName); die;
            if($resultEnergy != '' && count($resultEnergy) > 0)
            {
                $totalEnergy = 0;
                for($i = 0; $i < count($resultEnergy); $i++)  
                {
                    //calculate energy
                    $energyDate = $resultEnergy[$i]['Time']->format('Y-m-d');
                    $energyTime = $resultEnergy[$i]['Time']->format('H:i:s');
                    
                    if($indMainLoop == 1)
                    {
                        if($energyDate >= $startWeekDate && $energyDate <= $endWeekDate)
                        {
                            $energyConsumed = ($resultEnergy[$i]['Value'] * $resultEnergy[$i]['ConvFactor']) / 4; 
                            $totalEnergy += $energyConsumed;
                        }
                    }
                    else{
                        if($energyDate >= $startWeekDate && $energyDate < $endWeekDate)
                        {
                            $energyConsumed = ($resultEnergy[$i]['Value'] * $resultEnergy[$i]['ConvFactor']) / 4; 
                            $totalEnergy += $energyConsumed;
                        }
                    }
                    

                    
                    //Get Shift Name
                    // for($j = 0; $j < count($resultShiftName); $j++)
                    // {
                    //     if()
                    // }                       
                    //$energyConsumed = ($resultEnergy[$i]['Value'] * $resultEnergy[$i]['ConvFactor']) / 4; 
                    //$totalEnergy += $energyConsumed; 
                }
                // echo $totalEnergy; die;
                return $totalEnergy;
            }
        }
        catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    // --end--->

    // <---13-1-2022--
    public function generateHtmlLayerTableEnergyDataHeader($rowclickTable = false){
        try{
            $tr = '<tr>';
                $tr .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Modal Name</th>';
                $tr .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Designation</th>';
                $tr .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Valid From</th>';
                $tr .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Valid To</th>';
                $tr .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Time From</th>';
                $tr .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Time To</th>';
                $tr .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Day From</th>';
                $tr .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Day To</th>';
                if($rowclickTable == 'true')
                {
                    $tr .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Value</th>';
                }
                $tr .= '</tr>';
                return $tr;
        }
        catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        } 
    }
    // --end->

    public function generateHtmlLayerTableEnergyData($dataMesaurement,$rowclickTable = false){
        global $conn;
        $tr = '';
        $col_span = "colspan='60'";
        $data_table_other = "data-table-other='SchichtModelleAll'";
        if($dataMesaurement != '' && count($dataMesaurement) > 0){
            foreach($dataMesaurement as $key => $value){
                $style='';
                $class_val = '';
                $unit = '';

                if($rowclickTable == ""){
                    $class_val = 'class="row_click_energy"';
                }
                // else if($queryMaxVal != '' && $queryMaxVal == $value['Value']){
                //     $style="style='background-color: #f77171'";
                // }
                // echo $value['uhrzeitBis']->format('H:i'); die;
                $valid_to = '';
                if($value['gueltigBis'] != null)
                {
                    $valid_to = $value['gueltigBis']->format('Y-m-d');     
                }
                $tr .= "<tr $style $class_val valid_from=".$value['gueltigVon']->format('Y-m-d')." valid_to='$valid_to'  data-type='1' $data_table_other>";
                $tr.= "<td>".$value['modellBez']."</td>";
                $tr.= "<td>".$value['bezeichnung']."</td>";     //Desingnation
                $tr.= "<td>".$value['gueltigVon']->format('Y-m-d')."</td>";  //Vaid From
                $tr.= "<td>$valid_to</td>";     //vaild to
                $tr.= "<td>".$value['uhrzeitVon']->format('H:i')."</td>";     //Time From
                $tr.= "<td>".$value['uhrzeitBis']->format('H:i')."</td>";     //Time to
                $tr.= "<td>".$value['tagVon']."</td>";            //Day of 
                $tr.= "<td>".$value['tagBis']."</td>";            //Day to
                $tr.="</tr>";
            }
        }else{
                $tr = "<tr><td $col_span class='text-center'>No Data</td></tr>";
        }
        return $tr;
        // $records['measurement_html'] = $tr;

    }
    
    public function generatePaginationHtmlLayerEnergyData($dataMesaurement,$page_val,$pagesCount){
        try{
            //Pagination Code HTML
            // echo $page_val; die;
            // <---17-01-2022--
            if($page_val > 0 && $pagesCount > 0 && $dataMesaurement != '' && count($dataMesaurement) > 0){
                $style_background = '';
                $class_page_count_val = 'page_count_val_energy_layer';
                $style_background_end = '';
                $class_page_count_val_end = 'page_count_val_energy_layer';
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
                    <div class='pagination_items'>
                            <ul class='pagination'>
                                <li class='page-item $class_page_count_val' id='previous_pagination_val_energy_layer'>
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
                    $paginationHTMl.="<li style='$hide_style' class='page-item  $active '><input type='number' class='active_background pagination_input_val_energy_layer page-link' value='$i'></li>";

                    if($i == $pagesCount){
                        $paginationHTMl.="<li class='page-item'><a class='page-link' href='javascript:void(0);'>of</a></li>";
                        $paginationHTMl.="<li class='page-item'><a class='page-link ' readonly id='last_input_val_energy_layer' href='javascript:void(0);'>$i</a></li>";
                    }
                }
                $paginationHTMl.="<li class='page-item $class_page_count_val_end' id='next_pagination_val_energy_layer'>
                                        <a class='page-link' $style_background_end href='javascript:void(0);' aria-label='Next'>
                                            <span aria-hidden='true'>&raquo;</span>
                                            <span class='sr-only'>Next</span>
                                        </a>
                                    </li>";

                //Pagination Select Tag   
                
                $paginationHTMl.="<li class ='page-item'>
                                        <select class='page-link select_pagination' id='energy_number_record_layer'>
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
            // ----end--->


            // $paginationHTMl = '';
            // if($dataMesaurement != '' && count($dataMesaurement) > 0){
            //     $paginationHTMl="<div id='save_table_format' class='text-center'>
            //                         <input type='button' id='energy_modal_open_button' tile-edit='false' class='btn btn-sm btn-success' value='Save & Preview'>
            //                     </div>";            
                
            //     // $records['pagination_html'] = $paginationHTMl;
            // }
            // return $paginationHTMl;

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
            // $number_records = $_POST['number_records'];
            // <--26-11-2021--
            $page_val = isset($_POST['page_val']) ?  $_POST['page_val'] : 1;
            // $product_type = $_POST['product_type'];
            $number_records = 5;
            $pagesCount = '';
            $offSetVal = 0;
            // if($product_type == 'automatic')
            // {
            //     $this->getNumberRecordsProductAutomatic();
            // }


            // <----29-11-2021--
            $queryTotalRecord  = "SELECT t1.prd_id from produktionsAnlagenConfig as t1 ";
            $queryTotalRecord .= "where t1.iBdeType = 1 AND t1.prd_id != '0' ";
            $queryTotalRecord .= "GROUP BY t1.prd_id ";
            // --end-->
            $resultQuery = sqlsrv_query($conn,$queryTotalRecord);
            $totalRecordsValue = [];
            if($resultQuery != false)
            {
                $totalRecordsValue = queryDB($conn, $queryTotalRecord, "read");
            }
            // $records['table_found'] = $tableFound;
            
            // $totalRecordsValue = queryDB($conn, $queryTotalRecord, "read");

            $total_number_records = count($totalRecordsValue);

            if(count($totalRecordsValue) > 0){
               if($total_number_records <= $number_records){
                    $offSetVal = 0;
                    $number_records = $total_number_records;
                    $pagesCount = 1; 
                    $page_val = 1;
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
            // --end-->

            // <---old code
            // $query1 = "SELECT Top($number_records) * FROM produktionsAnlagenConfig as t1
            // left join produkte as t2 on t1.prd_ID = t2.prd_ID
            // left join anlagen as t3 on t1.anl_id = t3.anl_ID
            // where t1.iBdeType='1' order by t1.iBdePrdktConf_ID desc";
            //--end-->

            // <---29-11-2021---
            $query1 = "SELECT * from produktionsAnlagenConfig as Mt ";
            $query1 .= "LEFT JOIN produkte as t2 ";
            $query1 .= "ON Mt.prd_iD = t2.prd_ID ";
            $query1 .= "WHERE iBdePrdktConf_ID  IN ( ";
            $query1 .= "SELECT max(t1.iBdePrdktConf_ID) FROM produktionsAnlagenConfig as t1 ";
            $query1 .= "where t1.iBdeType='1' AND t1.prd_id != '0' ";
            $query1 .= "GROUP BY t1.prd_id ";
            $query1 .= "order by t1.prd_id desc ";
            $query1 .= "offset $offSetVal rows FETCH NEXT $number_records ROWS ONLY ";
            $query1 .= ") ";
            $query1 .= "order by Mt.iBdePrdktConf_ID desc ";
            // --end--
            $resultQuery = sqlsrv_query($conn,$query1);
            $tableFound = 'false';
            $dataProduct = [];
            if($resultQuery != false)
            {
                $dataProduct = queryDB($conn, $query1, "read");
                $tableFound = 'true';
            
            }
            $records['table_found'] = $tableFound;

            // $dataProduct = queryDB($conn, $query1, "read");
            // echo json_encode($dataProduct); die;
            // $dataProduct = '';
            $tr = $this->generateAllProductTableHTML($dataProduct);
            $pagination_html = $this->generateAllProductPaginationHTML($page_val,$pagesCount,$dataProduct);
            $records['product_html'] = $tr;
            $records['pagination_html'] = $pagination_html;
            echo json_encode($records,JSON_INVALID_UTF8_IGNORE);
            die;
            // <--OLd Code---
            // $query1 = "SELECT  * FROM produktionsAnlagenConfig as t1 ";
            // $query1 .="LEFT join "; 
            // $query1.="( ";
            // $query1 .="select t2.id as table_2_id , t2.prd_id as table_2_prd_id  , t2.anl_id as table_2_anl_id , t2.anl_col as table_2_anl_col ";
            // $query1 .="from produktionsAnlagenMoreOpt as t2 ";
            // $query1.=") ";
            // $query1 .="t2 ";
            // $query1 .="on t1.prd_id = t2.table_2_prd_id AND t1.anl_id = t2.table_2_anl_id AND t1.anl_col = t2.table_2_anl_col ";
            // $query1 .= "left join ";
            // $query1 .= "( ";
            // $query1 .= "select t3.prd_anl_ID as table_3_prd_anl_Id , max(cast(t3.val as int)) as val ";
            // $query1 .= "from masseneingabeSuchePrdIMw  as t3 group by t3.prd_anl_ID ";
            // $query1 .= ") ";
            // $query1 .= "t3 ";
            // $query1 .= "on t2.table_2_id = t3.table_3_prd_anl_Id ";
            // $query1 .= "left join produkte as t4 on t1.prd_iD = t4.prd_ID ";
            // $query1 .= "left join anlagen as t5 on t1.anl_id = t5.anl_ID ";
            // $query1 .= "where t1.iBdeType='1' ";
            // $query1 .= "order by t1.iBdePrdktConf_ID desc ";
            // $query1 .= "offset $offSetVal rows FETCH NEXT $number_records ROWS ONLY ";
            // -----end--->
        }
        catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }

    // <----13-12-201---
    public function getNumberRecordsProductAutomatic()
    {
        try{
            global $conn;
            $total_number_records = isset($_POST['total_number_records']) ? $_POST['total_number_records'] : 100 ;
            $page_val = isset($_POST['page_val']) ?  $_POST['page_val'] : 1;
            $product_type = $_POST['product_type'];
            $number_records = 5;
            $pagesCount = '';
            $offSetVal = 0;

            // <----22-12-2021---
            $tableProduct = $_POST['all_tables_product'];
            $columnsValue = $_POST['all_columns_product'];
            $columnsValue = str_replace('[','',$columnsValue);
            $columnsValue = str_replace(']','',$columnsValue);
            $columnsValue = str_replace('"','',$columnsValue);
            $queryTotalRecord  = "SELECT TOP($total_number_records) $columnsValue from $tableProduct as t1 ";
            $totalRecordsValue = queryDB($conn, $queryTotalRecord, "read");
            // echo json_encode($queryTotalRecord); die;
            
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
                    $pagesCount = ceil(count($totalRecordsValue) / $number_records);
                    $pagesCount = $pagesCount <= 0 ? 1 : $pagesCount;
                    $offSetVal = ($page_val - 1) * $number_records;
                    //Only Valid when User Click on Last page
                    if($page_val == $pagesCount){
                        $number_records = $total_number_records - $offSetVal;
                    }
               }

            }
            
            $allColumns= json_decode($_POST['all_columns_product']);
            $allColumnDataType= json_decode($_POST['columnDataType']);
            // echo $allColumnDataType[0]; die;
            $query1 = "SELECT $columnsValue from $tableProduct ";
            $query1 .= "Order by $allColumns[0] desc ";
            $query1 .= "offset $offSetVal rows FETCH NEXT $number_records ROWS ONLY ";
            // echo $query1; die;
            $dataProduct = queryDB($conn, $query1, "read");
            $tr = $this->generateAllItemAutomaticTableHTML($dataProduct,$allColumns,$allColumnDataType);
            $th = $this->generateAllItemAutomaticTableHeaderHTML($dataProduct,$allColumns);
            $pagination_html = $this->generateAllItemAutomaticPaginationHTML($page_val,$pagesCount,$dataProduct);
            $records['product_html'] = $tr;
            $records['product_table_header'] = $th;
            $records['pagination_html'] = $pagination_html;

            $ar = array('pages_count' => $pagesCount,'page_val' => $page_val,'number_records' => $number_records,'query1' => $query1 ,'queryMaxValue' => '','row_click' => 'false' , 'type' => 'Product');
            $records['query_data'] = $ar;

            echo json_encode($records,JSON_INVALID_UTF8_IGNORE);

            // echo json_encode($columnsValue); die;
            // ---end---->
            die;
            
        }
        catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }

    // <---21-12-2021--
    public function getAllProductTables()
    {
        try{
            global $conn;
            $product_type = $_POST['product_type'];
            $queryAllTables = "SELECT name from sys.Tables order by name asc ";
            $queryAllTablesRecord = queryDB($conn, $queryAllTables, "read");
            $records['all_tables'] = $queryAllTablesRecord;
            echo json_encode($records,JSON_INVALID_UTF8_IGNORE);
            die;
        }
        catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    // --end--->

    // <----22-12-2021---
    public function getAllColumnProductTables()
    {
        try{
            global $conn;
            $i_val = $_POST['i_val'];
            $table_name = $_POST['table_name'];
            $queryColumnTables  = "Select column_name,data_type from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME = '$table_name' ";
            $queryColumnTablesRecord = queryDB($conn, $queryColumnTables, "read");
            $records['all_columns'] = $queryColumnTablesRecord;
            echo json_encode($records,JSON_INVALID_UTF8_IGNORE);

            // $new_query = "select prd_all_columns_automatic from tableFormat where id = '$i_val'";
            // echo $new_query;
            // $query_result = queryDB($conn,  $new_query, "read");
            // $result =  ($query_result) ? unserialize($query_result[0]['prd_all_columns_automatic']) :'';
            // var_dump($result); die;
            // $records['all_columns'] = $result;
            // echo json_encode($records,JSON_INVALID_UTF8_IGNORE);
            die;
        }
        catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    // --end-->


    // <---14-12-2021---
    public function generateAllItemAutomaticTableHTML($dataProduct,$allColumns,$allColumnDataType)
    {
        try{
            // echo json_encode($dataProduct); die;
            global $conn;
            $tr = '';
            $col_span = 'colspan="50"';
            if($dataProduct != '' && count($dataProduct) > 0){
                for($i = 0; $i < count($dataProduct); $i++ )
                {
                    $tr.="<tr data-table-other='true'>";
                    for($j = 0; $j < count($allColumns); $j++)
                    {
                        $columnName = $allColumns[$j];
                        $columnDataType = $allColumnDataType[$j];
                        if($columnDataType == 'date' || $columnDataType == 'datetime')
                        {
                            $tr.= "<td>".$dataProduct[$i][$columnName]->format('Y-m-d')."</td>";    
                        }
                        else{
                            $tr.= "<td>".$dataProduct[$i][$columnName]."</td>";    
                        }
                    }
                    $tr .= "</tr>";
                }
            }else{
                 $tr = "<tr><td $col_span class='text-center'>No Data</td></tr>";
            }

            return $tr;
            // echo json_encode($records,JSON_INVALID_UTF8_IGNORE);
            die;
        }
        catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }

    public function generateAllItemAutomaticTableHeaderHTML($dataProduct,$allColumns){
        try{
            $tr = "<tr>";
            foreach($allColumns as $val)
            {
                $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>$val</th>";
            }
            $tr .= "</tr>"; 
            return $tr;
        }
        catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }

    public function generateAllItemAutomaticPaginationHTML($page_val,$pagesCount,$dataProduct,$prd_id = false ,$analgen_config_id = false ){
        try{
            if($page_val > 0 && $pagesCount > 0 && $dataProduct != '' && count($dataProduct) > 0){
                $style_background = '';
                $class_page_count_val = 'page_count_product_automatic';
                $style_background_end = '';
                $class_page_count_val_end = 'page_count_product_automatic';
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
                    <input type='hidden' id='prd_id_hidden' prd_id='$prd_id' analgen_config_id='$analgen_config_id'>
                    <div class='pagination_items'>
                            <ul class='pagination'>
                                <li class='page-item $class_page_count_val' prd_id='$prd_id' id='previous_pagination_val_product_automatic'>
                                    <a class='page-link'  $style_background href='javascript:void(0);' aria-label='Previous'>
                                        <span aria-hidden='true'>&laquo;</span>
                                        <span class='sr-only'>Previous</span>
                                    </a>
                                </li>";
                                
                for($i = 1; $i <= $pagesCount; $i++){
                    $active = $i == $page_val ? 'active' : '';
                    
                    // if($i == $page_val){
                    //     $paginationHTMl.="<li class='page-item'><a class='page-link' href='javascript:void(0);'>Page</a></li>";
                    // }

                    if($i == $page_val || $i == $pagesCount){
                        $paginationHTMl.="<li class='page-item  $active '><input type='button' class='pagination_input_val_product_automatic page-link' prd_id='$prd_id' value='$i'></li>";
                    }
                    else{
                        $paginationHTMl.="<li class='page-item'><input type='button' class='pagination_input_val_product_automatic page-link' prd_id='$prd_id' value='$i'></li>";
                    }
                    // if($i == $pagesCount){
                    //     $paginationHTMl.="<li class='page-item'><a class='page-link' href='javascript:void(0);'>of</a></li>";
                    //     $paginationHTMl.="<li class='page-item'><a class='page-link ' readonly id='last_input_val_all_product' href='javascript:void(0);'>$i</a></li>";
                    // }
                }
                $paginationHTMl.="<li class='page-item $class_page_count_val_end' prd_id='$prd_id' id='next_pagination_product_automatic'>
                                        <a class='page-link' $style_background_end href='javascript:void(0);' aria-label='Next'>
                                            <span aria-hidden='true'>&raquo;</span>
                                            <span class='sr-only'>Next</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </nav>";

                //ScreenShot Code
                $paginationHTMl.="<div id='save_table_format_product' class='text-center'>
                                    <input type='button' id='product_modal_open_button' tile-edit='false' class='btn btn-sm btn-success' value='Save & Preview'>
                                </div>";
                      
                return $paginationHTMl;
                // $records['pagination_html'] = $paginationHTMl;
            }
            
        }
        catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    
    // --end--->

    // <-----26-11-2021---
    public function generateAllProductTableHTML($dataProduct)
    {
        try{
            // echo json_encode($dataProduct); die;
            $tr = '';
            if($dataProduct != '' && count($dataProduct) > 0){
                foreach($dataProduct as $key => $value){
                    $val_prd_ID = $value['prd_ID'];
                    $prd_name = $value['namePrd'];

                    $tr .= '<tr class="all_product_table_row_click" prd_id="'.$val_prd_ID.'" prd_name="'.$prd_name.'">';
                    $tr.= "<td>".$value['namePrd']."</td>";
                    // $tr.= "<td>".$value['bezeichnungAnl']."</td>";
                    // if($value['intTp_ID'] == "1"){
                    //     $tr.= "<td>Days</td>";
                    // }
                    // else if($value['intTp_ID'] == "2"){
                    //     $tr.= "<td>Weeks</td>";
                    // }
                    // else if($value['intTp_ID'] == "3"){
                    //     $tr.= "<td>Months</td>";
                    // }
                    // else if($value['intTp_ID'] == "4"){
                    //     $tr.= "<td>Years</td>";
                    // }
                    // else{
                    //     $tr.= "<td></td>";
                    // }
                    // tr+= "<td class='text-danger'>"+28.76+ "<i class='ti-arrow-down'></i></td>";
                    if($value['intTp_ID'] == "2" && $value['startWeek'] != ''){
                        $tr.= "<td>".$value['startWeek'].'-'.$value['startDate']."</td>";
                    }
                    else{
                        $tr.= "<td>".$value['startDate']."</td>";
                    }
                    // if($value['val'] == null){
                    //     $tr.= "<td><label class='badge badge-danger'>Pending </label></td>";
                    // }
                    // else{
                    //     $tr.= "<td><label class='badge badge-success'>Active </label></td>";
                    // }
                    
                    $tr.="</tr>";
                }
            }else{
                 $tr = "<tr><td colspan='4' class='text-center all_product_table_row_click'>No Data</td></tr>";
            }

            return $tr;
            // echo json_encode($records,JSON_INVALID_UTF8_IGNORE);
            die;
        }
        catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }

    public function generateAllProductPaginationHTML($page_val,$pagesCount,$dataProduct,$data_type = false ,$mst_id = false){
        try{
            if($page_val > 0 && $pagesCount > 0 && $dataProduct != '' && count($dataProduct) > 0){
                $style_background = '';
                $class_page_count_val = 'page_count_val_all_product';
                $style_background_end = '';
                $class_page_count_val_end = 'page_count_val_all_product';
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
                    <div class=''>
                            <ul class='pagination'>
                                <li class='page-item $class_page_count_val' data_type='$data_type' data_mst='$mst_id' id='previous_pagination_val_all_product'>
                                    <a class='page-link'  $style_background href='javascript:void(0);' aria-label='Previous'>
                                        <span aria-hidden='true'>&laquo;</span>
                                        <span class='sr-only'>Previous</span>
                                    </a>
                                </li>";
                                
                for($i = 1; $i <= $pagesCount; $i++){
                    $active = $i == $page_val ? 'active' : '';
                    
                    // if($i == $page_val){
                    //     $paginationHTMl.="<li class='page-item'><a class='page-link' href='javascript:void(0);'>Page</a></li>";
                    // }

                    if($i == $page_val || $i == $pagesCount){
                        $paginationHTMl.="<li class='page-item  $active '><input type='button' class='pagination_input_val_all_product page-link' data_type='$data_type' data_mst='$mst_id' value='$i'></li>";
                    }
                    else{
                        $paginationHTMl.="<li class='page-item'><input type='button' class='pagination_input_val_all_product page-link' data_type='$data_type' data_mst='$mst_id' value='$i'></li>";
                    }
                    // if($i == $pagesCount){
                    //     $paginationHTMl.="<li class='page-item'><a class='page-link' href='javascript:void(0);'>of</a></li>";
                    //     $paginationHTMl.="<li class='page-item'><a class='page-link ' readonly id='last_input_val_all_product' href='javascript:void(0);'>$i</a></li>";
                    // }
                }
                $paginationHTMl.="<li class='page-item $class_page_count_val_end' data_type='$data_type' data_mst='$mst_id' id='next_pagination_val_all_product'>
                                        <a class='page-link' $style_background_end href='javascript:void(0);' aria-label='Next'>
                                            <span aria-hidden='true'>&raquo;</span>
                                            <span class='sr-only'>Next</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </nav>";
    
                return $paginationHTMl;
                // $records['pagination_html'] = $paginationHTMl;
            }
            
        }
        catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    // ---end--->

    // <---30-11-2021---
    public function getAllProductClickTable()
    {
        try{
            global $conn;

            $prd_id = $_POST['prd_id'];
            $page_val = isset($_POST['page_val']) ?  $_POST['page_val'] : 1;
            $number_records = 5;
            $pagesCount = '';
            $offSetVal = 0;
            $order_condition = $_POST['order_by'];

            $queryTotalRecord = "SELECT  * FROM produktionsAnlagenConfig as t1 ";
            $queryTotalRecord .="LEFT join "; 
            $queryTotalRecord.="( ";
            $queryTotalRecord .="select t2.id as table_2_id , t2.prd_id as table_2_prd_id  , t2.anl_id as table_2_anl_id , t2.anl_col as table_2_anl_col ";
            $queryTotalRecord .="from produktionsAnlagenMoreOpt as t2 ";
            $queryTotalRecord.=") ";
            $queryTotalRecord .="t2 ";
            $queryTotalRecord .="on t1.prd_id = t2.table_2_prd_id AND t1.anl_id = t2.table_2_anl_id AND t1.anl_col = t2.table_2_anl_col ";
            $queryTotalRecord .= "left join ";
            $queryTotalRecord .= "( ";
            $queryTotalRecord .= "select t3.prd_anl_ID as table_3_prd_anl_Id , sum(cast(t3.val as int)) as val ";
            $queryTotalRecord .= "from masseneingabeSuchePrdIMw  as t3 group by t3.prd_anl_ID ";
            $queryTotalRecord .= ") ";
            $queryTotalRecord .= "t3 ";
            $queryTotalRecord .= "on t2.table_2_id = t3.table_3_prd_anl_Id ";
            $queryTotalRecord .= "left join produkte as t4 on t1.prd_iD = t4.prd_ID ";
            $queryTotalRecord .= "left join anlagen as t5 on t1.anl_id = t5.anl_ID ";
            $queryTotalRecord .= "where t1.iBdeType='1' ";
            $queryTotalRecord .= "AND t1.prd_iD = '$prd_id' ";
            $queryTotalRecord .= "order by t1.iBdePrdktConf_ID desc ";
            $totalRecordsValue = queryDB($conn, $queryTotalRecord, "read");

            $total_number_records = count($totalRecordsValue);

            if(count($totalRecordsValue) > 0){
               if($total_number_records <= $number_records){
                    $offSetVal = 0;
                    $number_records = $total_number_records;
                    $pagesCount = 1; 
                    $page_val = 1;
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
            // --end-->

            $query1 = "SELECT  * FROM produktionsAnlagenConfig as t1 ";
            $query1 .="LEFT join "; 
            $query1.="( ";
            $query1 .="select t2.id as table_2_id , t2.prd_id as table_2_prd_id  , t2.anl_id as table_2_anl_id , t2.anl_col as table_2_anl_col ";
            $query1 .="from produktionsAnlagenMoreOpt as t2 ";
            $query1.=") ";
            $query1 .="t2 ";
            $query1 .="on t1.prd_id = t2.table_2_prd_id AND t1.anl_id = t2.table_2_anl_id AND t1.anl_col = t2.table_2_anl_col ";
            $query1 .= "left join ";
            $query1 .= "( ";
            $query1 .= "select t3.prd_anl_ID as table_3_prd_anl_Id , sum(cast(t3.val as int)) as val ";
            $query1 .= "from masseneingabeSuchePrdIMw  as t3 group by t3.prd_anl_ID ";
            $query1 .= ") ";
            $query1 .= "t3 ";
            $query1 .= "on t2.table_2_id = t3.table_3_prd_anl_Id ";
            $query1 .= "left join produkte as t4 on t1.prd_iD = t4.prd_ID ";
            $query1 .= "left join anlagen as t5 on t1.anl_id = t5.anl_ID ";
            $query1 .= "where t1.iBdeType='1' AND t1.prd_ID = '$prd_id' ";
            $query1 .= "order by t3.val $order_condition ";
            $query1 .= "offset $offSetVal rows FETCH NEXT $number_records ROWS ONLY ";
            // echo $query1; die;
            $dataProduct = queryDB($conn, $query1, "read");
            // echo json_encode($dataProduct); die;
            $tr = $this->getAllProductClickTableHTML($dataProduct);
            $th = $this->getAllProductClickTableHeaderHTML();
            $pagination_html = $this->getAllProductClickTablePagination($page_val,$pagesCount,$dataProduct,$prd_id);
            $records['product_html'] = $tr;
            $records['product_table_header'] = $th;
            $records['pagination_html'] = $pagination_html;

            $ar = array('pages_count' => $pagesCount,'page_val' => $page_val,'number_records' => $number_records,'query1' => $query1 ,'queryMaxValue' => '','row_click' => 'false' , 'type' => 'Product');
            $records['query_data'] = $ar;

            echo json_encode($records,JSON_INVALID_UTF8_IGNORE);
            die;
        }
        catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }

     // <---1-12-2021---
     public function rowClickParticularProductEntry(){
        try{
            global $conn;
            $analgen_config_id = $_POST['analgen_config_id'];
            $page_val = isset($_POST['page_val']) ?  $_POST['page_val'] : 1;
            $number_records = 5;
            $pagesCount = '';
            $offSetVal = 0;
            $order_condition = $_POST['order_by'];

            $queryTotalRecord = "SELECT  * FROM produktionsAnlagenConfig as t1 ";
            $queryTotalRecord .="INNER join "; 
            $queryTotalRecord.="( ";
            $queryTotalRecord .="select t2.id as table_2_id , t2.prd_id as table_2_prd_id  , t2.anl_id as table_2_anl_id , t2.anl_col as table_2_anl_col ";
            $queryTotalRecord .="from produktionsAnlagenMoreOpt as t2 ";
            $queryTotalRecord.=") ";
            $queryTotalRecord .="t2 ";
            $queryTotalRecord .="on t1.prd_id = t2.table_2_prd_id AND t1.anl_id = t2.table_2_anl_id AND t1.anl_col = t2.table_2_anl_col ";
            $queryTotalRecord .= "INNER join ";
            $queryTotalRecord .= "( ";
            $queryTotalRecord .= "select t3.prd_anl_ID as table_3_prd_anl_Id , cast(t3.val as int) as val ";
            $queryTotalRecord .= "from masseneingabeSuchePrdIMw  as t3 ";
            $queryTotalRecord .= ") ";
            $queryTotalRecord .= "t3 ";
            $queryTotalRecord .= "on t2.table_2_id = t3.table_3_prd_anl_Id ";
            $queryTotalRecord .= "left join anlagen as t5 on t1.anl_id = t5.anl_ID ";
            $queryTotalRecord .= "where t1.iBdeType='1' ";
            $queryTotalRecord .= "AND t1.iBdePrdktConf_ID = '$analgen_config_id' ";
            $queryTotalRecord .= "order by t3.val $order_condition ";
            $totalRecordsValue = queryDB($conn, $queryTotalRecord, "read");
            // echo json_encode($totalRecordsValue);die;
            $total_number_records = count($totalRecordsValue);

            if(count($totalRecordsValue) > 0){
               if($total_number_records <= $number_records){
                    $offSetVal = 0;
                    $number_records = $total_number_records;
                    $pagesCount = 1; 
                    $page_val = 1;
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
            // --end-->

            $queryMaxValue = "SELECT  * FROM produktionsAnlagenConfig as t1 ";
            $queryMaxValue .="INNER join "; 
            $queryMaxValue.="( ";
            $queryMaxValue .="select t2.id as table_2_id , t2.prd_id as table_2_prd_id  , t2.anl_id as table_2_anl_id , t2.anl_col as table_2_anl_col ";
            $queryMaxValue .="from produktionsAnlagenMoreOpt as t2 ";
            $queryMaxValue.=") ";
            $queryMaxValue .="t2 ";
            $queryMaxValue .="on t1.prd_id = t2.table_2_prd_id AND t1.anl_id = t2.table_2_anl_id AND t1.anl_col = t2.table_2_anl_col ";
            $queryMaxValue .= "INNER join ";
            $queryMaxValue .= "( ";
            $queryMaxValue .= "select t3.prd_anl_ID as table_3_prd_anl_Id , max(cast(t3.val as int)) as val ";
            $queryMaxValue .= "from masseneingabeSuchePrdIMw  as t3 group by t3.prd_anl_ID ";
            $queryMaxValue .= ") ";
            $queryMaxValue .= "t3 ";
            $queryMaxValue .= "on t2.table_2_id = t3.table_3_prd_anl_Id ";
            $queryMaxValue .= "left join anlagen as t5 on t1.anl_id = t5.anl_ID ";
            $queryMaxValue .= "where t1.iBdeType='1' AND t1.iBdePrdktConf_ID = '$analgen_config_id' ";
            $queryMaxValue .= "order by t3.val $order_condition ";
            // $queryMaxValue .= "offset $offSetVal rows FETCH NEXT $number_records ROWS ONLY ";

            $queryMaximum = $queryMaxValue;
            // --end-->
            $queryMaxValue = queryDB($conn, $queryMaxValue, "read");
            // echo json_encode($queryMaxValue); die;
            $queryMaxVal = count($queryMaxValue) > 0 ? $queryMaxValue[0]['val'] : '';

            

            $query1 = "SELECT  * FROM produktionsAnlagenConfig as t1 ";
            $query1 .="INNER join "; 
            $query1.="( ";
            $query1 .="select t2.id as table_2_id , t2.prd_id as table_2_prd_id  , t2.anl_id as table_2_anl_id , t2.anl_col as table_2_anl_col ";
            $query1 .="from produktionsAnlagenMoreOpt as t2 ";
            $query1.=") ";
            $query1 .="t2 ";
            $query1 .="on t1.prd_id = t2.table_2_prd_id AND t1.anl_id = t2.table_2_anl_id AND t1.anl_col = t2.table_2_anl_col ";
            $query1 .= "INNER join ";
            $query1 .= "( ";
            $query1 .= "select t3.prd_anl_ID as table_3_prd_anl_Id , cast(t3.val as int) as val , t3.on_date, t3.on_week ";
            $query1 .= "from masseneingabeSuchePrdIMw  as t3 ";
            $query1 .= ") ";
            $query1 .= "t3 ";
            $query1 .= "on t2.table_2_id = t3.table_3_prd_anl_Id ";
            $query1 .= "left join anlagen as t5 on t1.anl_id = t5.anl_ID ";
            $query1 .= "where t1.iBdeType='1' AND t1.iBdePrdktConf_ID = '$analgen_config_id' ";
            $query1 .= "order by t3.val $order_condition ";
            $query1 .= "offset $offSetVal rows FETCH NEXT $number_records ROWS ONLY ";
            // echo $query1; die;
            $dataProduct = queryDB($conn, $query1, "read");
            // echo json_encode($dataProduct); die;
            $tr = $this->getAllProductClickTableHTML($dataProduct,$queryMaxVal);
            $th = $this->rowClickParticularProductHeaderHtml();
            $pagination_html = $this->getAllProductClickTablePagination($page_val,$pagesCount,$dataProduct,'',$analgen_config_id);
            $records['product_html'] = $tr;
            $records['product_table_header'] = $th;
            $records['pagination_html'] = $pagination_html;

            $ar = array('pages_count' => $pagesCount,'page_val' => $page_val,'number_records' => $number_records,'query1' => $query1 ,'queryMaxValue' => $queryMaximum,'row_click' => 'true', 'type' => 'Product');
            $records['query_data'] = $ar;


            $queryLastDate = "SELECT  TOP(1)* FROM produktionsAnlagenConfig as t1 ";
            $queryLastDate .="INNER join "; 
            $queryLastDate.="( ";
            $queryLastDate .="select t2.id as table_2_id , t2.prd_id as table_2_prd_id  , t2.anl_id as table_2_anl_id , t2.anl_col as table_2_anl_col ";
            $queryLastDate .="from produktionsAnlagenMoreOpt as t2 ";
            $queryLastDate.=") ";
            $queryLastDate .="t2 ";
            $queryLastDate .="on t1.prd_id = t2.table_2_prd_id AND t1.anl_id = t2.table_2_anl_id AND t1.anl_col = t2.table_2_anl_col ";
            $queryLastDate .= "INNER join ";
            $queryLastDate .= "( ";
            $queryLastDate .= "select t3.prd_anl_ID as table_3_prd_anl_Id , t3.type, t3.val ,t3.id, t3.on_date, t3.on_week ";
            $queryLastDate .= "from masseneingabeSuchePrdIMw  as t3 ";
            $queryLastDate .= ") ";
            $queryLastDate .= "t3 ";
            $queryLastDate .= "on t2.table_2_id = t3.table_3_prd_anl_Id ";
            $queryLastDate .= "where t1.iBdeType='1' AND t1.iBdePrdktConf_ID = '$analgen_config_id' ";
            $queryLastDate .= "order by t3.id  desc ";
            $queryLastDateResult = queryDB($conn, $queryLastDate, "read");
            // echo json_encode($queryLastDateResult); die;
            $records['queryLastDate'] = $queryLastDateResult;
            // --end--->

            echo json_encode($records,JSON_INVALID_UTF8_IGNORE);
            die;
        }
        catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }

    }
    // -end--->

    public function getAllProductClickTableHeaderHTML(){
        try{
            $tr = "<tr>";
            $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Artikelname</th>";
            $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Zeitintervall Datum</th>";
            $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Datiert erstellen </th>";
            $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Gesamteinheiten</th>";
            $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Status</th>";
            $tr .= "</tr>";
            return $tr;
        }
        catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }

    public function rowClickParticularProductHeaderHtml(){
        try{
            $tr = "<tr>";
            $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Artikelname</th>";
            $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Zeitintervall Datum</th>";
            $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Datum</th>";
            $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Verbrauchte Einheiten</th>";
            $tr .= "</tr>";
            return $tr;
        }
        catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }

    public function getAllProductClickTableHTML($dataProduct,$queryMaxVal = false)
    {
        try{
            // echo json_encode($dataProduct); die;
            $tr = '';
            $col_span = '';
            if($queryMaxVal == ""){
                $col_span = "colspan='5'";
            }
            else if($queryMaxVal != ''){
                $col_span = "colspan='4'";
            }

            if($dataProduct != '' && count($dataProduct) > 0){
                foreach($dataProduct as $key => $value){

                    $class_val='';
                    $style ='';
                    $attr = '';
                    if($queryMaxVal == ""){
                        $class_val = 'class="row_click_particular_product_entry"';
                    }
                    else if($queryMaxVal != '' && $queryMaxVal == $value['val']){
                        $style="style='background-color: #f77171'";
                        $attr = 'data-max-row="true"';
                    }
                    
                    $val_prd_ID = '';
                    $prd_name = '';
                    if($queryMaxVal == '')
                    {
                        $val_prd_ID = $value['prd_ID'];
                        $prd_name = $value['namePrd'];
                    }

                    $tr .= "<tr $style $class_val $attr prd_id='$val_prd_ID' analgen_config_id=".$value['iBdePrdktConf_ID']." data-table-other='false' prd_name='$prd_name'>";
                    // $tr.= "<td>".$value['namePrd']."</td>";
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

                    //Units Checks
                    $unit='';
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
                        if($queryMaxVal == ''){
                            $tr.= "<td><label class='badge badge-danger'>Pending </label></td>";
                        }
                    }
                    else{
                        $tr.= "<td>".$value['val'].' '.$unit."</td>";
                        if($queryMaxVal == ''){
                            $tr.= "<td><label class='badge badge-success'>Active </label></td>";
                        }
                    }
                    $tr.="</tr>";
                }
            }else{
                 $tr = "<tr><td $col_span class='text-center'>No Data</td></tr>";
            }

            return $tr;
            // echo json_encode($records,JSON_INVALID_UTF8_IGNORE);
            die;
        }
        catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }

    public function getAllProductClickTablePagination($page_val,$pagesCount,$dataProduct,$prd_id = false ,$analgen_config_id = false ){
        try{
            if($page_val > 0 && $pagesCount > 0 && $dataProduct != '' && count($dataProduct) > 0){
                $style_background = '';
                $class_page_count_val = 'page_count_val_particluar_product';
                $style_background_end = '';
                $class_page_count_val_end = 'page_count_val_particluar_product';
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
                    <input type='hidden' id='prd_id_hidden' prd_id='$prd_id' analgen_config_id='$analgen_config_id'>
                    <div class='pagination_items'>
                            <ul class='pagination'>
                                <li class='page-item $class_page_count_val' prd_id='$prd_id' id='previous_pagination_val_particular_product'>
                                    <a class='page-link'  $style_background href='javascript:void(0);' aria-label='Previous'>
                                        <span aria-hidden='true'>&laquo;</span>
                                        <span class='sr-only'>Previous</span>
                                    </a>
                                </li>";
                                
                for($i = 1; $i <= $pagesCount; $i++){
                    $active = $i == $page_val ? 'active' : '';
                    
                    // if($i == $page_val){
                    //     $paginationHTMl.="<li class='page-item'><a class='page-link' href='javascript:void(0);'>Page</a></li>";
                    // }

                    if($i == $page_val || $i == $pagesCount){
                        $paginationHTMl.="<li class='page-item  $active '><input type='button' class='pagination_input_val_particular_product page-link' prd_id='$prd_id' value='$i'></li>";
                    }
                    else{
                        $paginationHTMl.="<li class='page-item'><input type='button' class='pagination_input_val_particular_product page-link' prd_id='$prd_id' value='$i'></li>";
                    }
                    // if($i == $pagesCount){
                    //     $paginationHTMl.="<li class='page-item'><a class='page-link' href='javascript:void(0);'>of</a></li>";
                    //     $paginationHTMl.="<li class='page-item'><a class='page-link ' readonly id='last_input_val_all_product' href='javascript:void(0);'>$i</a></li>";
                    // }
                }
                $paginationHTMl.="<li class='page-item $class_page_count_val_end' prd_id='$prd_id' id='next_pagination_val_particular_product'>
                                        <a class='page-link' $style_background_end href='javascript:void(0);' aria-label='Next'>
                                            <span aria-hidden='true'>&raquo;</span>
                                            <span class='sr-only'>Next</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </nav>";

                //ScreenShot Code
                $paginationHTMl.="<div id='save_table_format_product' class='text-center'>
                                    <input type='button' id='product_modal_open_button' tile-edit='false' class='btn btn-sm btn-success' value='Save & Preview'>
                                </div>";
                      
                return $paginationHTMl;
                // $records['pagination_html'] = $paginationHTMl;
            }
            
        }
        catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    // --end-->


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

        $classPrdAutomatic = $_POST['classPrdAutomatic'];
        $conn = '';
        if($classPrdAutomatic == 'true')
        {
            $conn = connectToDB('gipscomm');
        }
        else{
            $nameDB = $_POST['nameDB'];
            $conn = connectToDB($nameDB);
        }
        
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

            $totalSum = '';
            $resultUnit = '';
            if($getResult[0]['type'] == 'Measurement'){
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
            }
            else if($getResult[0]['type'] == 'Energy'){
                $queryTotalSum = "SELECT sum(cast(t2.val as int)) as total_value from interneMesswerteConfig  as t1 ";
                $queryTotalSum .= "INNER JOIN masseneingabeSucheIMw as t2 ";
                $queryTotalSum .= "ON t1.mst_ID = t2.mst_ID ";
                $queryTotalSum .=  "INNER JOIN ";
                $queryTotalSum .= "MessstellenAnlagen  as T3 ";
                $queryTotalSum .= "ON T1.mst_ID = T3.mst_ID ";
                $queryTotalSum .= "Where t1.mst_ID = $mst_id ";
                $totalSum = queryDB($conn, $queryTotalSum, "read");
                $totalSum = $totalSum[0]['total_value'] != null ?  $totalSum[0]['total_value'] : '';

                $queryUnit = "SELECT unt_ID,nameMST FROM interneMesswerteConfig as t1 ";
                $queryUnit .= "INNER JOIN masseneingabeSucheIMw as t2 ";
                $queryUnit .= "ON t1.mst_ID = t2.mst_ID ";
                $queryUnit .=  "INNER JOIN ";
                $queryUnit .= "MessstellenAnlagen  as T3 ";
                $queryUnit .= "ON T1.mst_ID = T3.mst_ID ";
                $queryUnit .= "where t1.mst_ID = $mst_id ";
                $resultUnit = queryDB($conn, $queryUnit, "read");
                $record['name_value'] = $resultUnit[0]['nameMST'];

            }
            else if($getResult[0]['type'] == 'Product'){
                $analgen_config_id = $getResult[0]['prd_anlagen_config_id'];

                $queryTotalSum = "SELECT  * FROM produktionsAnlagenConfig as t1 ";
                $queryTotalSum .="INNER join "; 
                $queryTotalSum.="( ";
                $queryTotalSum .="select t2.id as table_2_id , t2.prd_id as table_2_prd_id  , t2.anl_id as table_2_anl_id , t2.anl_col as table_2_anl_col ";
                $queryTotalSum .="from produktionsAnlagenMoreOpt as t2 ";
                $queryTotalSum.=") ";
                $queryTotalSum .="t2 ";
                $queryTotalSum .="on t1.prd_id = t2.table_2_prd_id AND t1.anl_id = t2.table_2_anl_id AND t1.anl_col = t2.table_2_anl_col ";
                $queryTotalSum .= "INNER join ";
                $queryTotalSum .= "( ";
                $queryTotalSum .= "select t3.prd_anl_ID as table_3_prd_anl_Id , sum(cast(t3.val as int)) as total_value ";
                $queryTotalSum .= "from masseneingabeSuchePrdIMw  as t3 group by t3.prd_anl_ID ";
                $queryTotalSum .= ") ";
                $queryTotalSum .= "t3 ";
                $queryTotalSum .= "on t2.table_2_id = t3.table_3_prd_anl_Id ";
                $queryTotalSum .= "left join anlagen as t5 on t1.anl_id = t5.anl_ID ";
                $queryTotalSum .= "where t1.iBdeType='1' AND t1.iBdePrdktConf_ID = '$analgen_config_id' ";
                $totalSum = queryDB($conn, $queryTotalSum, "read");
                $totalSum = $totalSum[0]['total_value'] != null ?  $totalSum[0]['total_value'] : '';

                $queryUnit = "SELECT t1.unt_ID, t2.bezeichnungAnl,t3.namePrd FROM produktionsAnlagenConfig as t1 ";
                $queryUnit .= "INNER JOIN anlagen as t2 ";
                $queryUnit .= "ON t1.anl_id = t2.anl_Id ";
                $queryUnit .= "INNER JOIN produkte as t3 ";
                $queryUnit .= "ON t1.prd_Id = t3.prd_Id ";
                $queryUnit .= "where t1.iBdePrdktConf_ID = $analgen_config_id ";
                $resultUnit = queryDB($conn, $queryUnit, "read");
                
                $record['name_value'] = $resultUnit[0]['bezeichnungAnl'];
                $record['prd_name'] = $resultUnit[0]['namePrd'];

            }
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
            $getResult = "SELECT * from tableFormat WHERE username = '$username' AND id = $id ";
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
                        $firstPostionQuery= substr_replace($dataResult[0]['query_data_records'],$attachment,$firstPostion );
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
                    // echo json_encode($dataMeasurement); die;
                    if($dataResult[0]['table_other'] == 'false'){
                        if($dataResult[0]['type'] == 'Energy')
                        {
                            // echo json_encode($dataMeasurement); die;
                            $dashboardMeasurementHtml = $this->dashboardEnergyHtml($dataMeasurement);
                        }
                        else if($dataResult[0]['type'] == 'Measurement'){
                            $dashboardMeasurementHtml = $this->dashboardMeasurementHtml($dataMeasurement);
                        }
                        else if($dataResult[0]['type'] == 'Product'){
                            $dashboardMeasurementHtml = $this->dashboardProductHtml($dataMeasurement);
                        }
                    }
                    else if($dataResult[0]['table_other'] == 'schichtModelle')
                    {
                        $dashboardMeasurementHtml = $this->dashboardEnergyLayerHtmlChecked($dataMeasurement);
                    }
                    elseif($dataResult[0]['table_other'] == 'schichtModelleHist'){
                        $dashboardMeasurementHtml = $this->dashboardEnergyLayerHtml($dataMeasurement);
                    }
                    else{
                        $dashboardMeasurementHtml = $this->dashboardMeasurementHtmlAutomatic($dataMeasurement);
                    }
                    // --end-->
                    $records['dashboardMeasurementHtml'] = $dashboardMeasurementHtml;

                    echo json_encode($records, JSON_INVALID_UTF8_IGNORE);  die;
                }
                else if($dataResult[0]['row_click'] == 'true' && ($dataResult[0]['table_other'] == 'schichtModelle' || $dataResult[0]['table_other'] == 'schichtModelleHist') ){
                    $dataMeasurement = queryDB($conn, $dataResult[0]['query_data_records'], "read");
                    
                    $dashboardMeasurementHtml = $this->dashboardRowClickEnergyLayerHtml($dataMeasurement);
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
                            if($dataResult[0]['type'] == 'Energy')
                            {
                                $dashboardMeasurementHtml = $this->dashboardEnergyHtml($dataMeasurement,$queryMaxVal);
                            }
                            else if($dataResult[0]['type'] == 'Measurement'){
                                $dashboardMeasurementHtml = $this->dashboardMeasurementHtml($dataMeasurement,$queryMaxVal);
                            }
                            else if($dataResult[0]['type'] == 'Product'){
                                $dashboardMeasurementHtml = $this->dashboardProductHtml($dataMeasurement,$queryMaxVal);
                            }
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

    // <----20-12-2021--

    public function dashboardEnergyLayerHtmlChecked($dataMesaurement){
        global $conn;
        $tr = '<thead>';
        $tr .= '<tr>';
        $tr .= '<th>Modal Name</th>';
        $tr .= '<th>Created Date</th>';
        $tr .= '<th>Property</th>';
        $tr .= '<th>Valid From</th>';
        $tr .= '<th>Quantity</th>';
        $tr .= '</tr>';
        $tr .= "</thead>";
        $col_span = "6";
        if($dataMesaurement != '' && count($dataMesaurement) > 0){
            $tr .= "<tbody>";
            foreach($dataMesaurement as $key => $value){
                $tr .= "<tr>";
                $tr.= "<td>".$value['modellBez']."</td>";
                $tr.= "<td>".$value['datum']->format('Y-m-d h:i:s')."</td>";
                $tr.= "<td>".$value['nameLieg']."</td>";
                $tr.= "<td>".$value['gueltigVon']->format('Y-m-d')."</td>";
                $tr.= "<td>".$value['anzahl']."</td>";
                $tr.="</tr>";
            }
            $tr .= "</tbody>";
        }else{
            $tr .= "<tbody><tr><td $col_span class='text-center'>No Data</td></tbody></tr>";
        }
        return $tr;
        // $records['measurement_html'] = $tr;

    }


    public function dashboardEnergyLayerHtml($dataMesaurement){
        global $conn;
        $tr = '<thead>';
        $tr .= '<tr>';
        $tr .= '<th>Modal Name</th>';
        $tr .= '<th>Created Date</th>';
        $tr .= '<th>Property</th>';
        $tr .= '<th>Valid From</th>';
        $tr .= '<th>Date of Expiry</th>';
        $tr .= '<th>Quantity</th>';
        $tr .= '</tr>';
        $tr .= "</thead>";
        $col_span = "6";
        if($dataMesaurement != '' && count($dataMesaurement) > 0){
            $tr .= "<tbody>";
            foreach($dataMesaurement as $key => $value){
                $tr .= "<tr>";
                $tr.= "<td>".$value['modellBez']."</td>";
                $tr.= "<td>".$value['datum']->format('Y-m-d h:i:s')."</td>";
                $tr.= "<td>".$value['nameLieg']."</td>";
                $tr.= "<td>".$value['gueltigVon']->format('Y-m-d')."</td>";
                $tr.= "<td>".$value['gueltigBis']->format('Y-m-d')."</td>";
                $tr.= "<td>".$value['anzahl']."</td>";
                $tr.="</tr>";
            }
            $tr .= "</tbody>";
        }else{
            $tr .= "<tbody><tr><td $col_span class='text-center'>No Data</td></tr></tbody>";
        }
        return $tr;
        // $records['measurement_html'] = $tr;

    }


    public function dashboardRowClickEnergyLayerHtml($dataMesaurement){
        global $conn;
        // echo json_encode($dataMesaurement); die;
        $tr = '<thead>';
        $tr .= '<tr>';
        $tr .= '<th>Modal Name</th>';
        $tr .= '<th>Designation</th>';
        $tr .= '<th>Time From</th>';
        $tr .= '<th>Time To</th>';
        $tr .= '<th>Day From</th>';
        $tr .= '<th>Day To</th>';
        $tr .= '</tr>';
        $tr .= "</thead>";
        $col_span = "colspan='8'";
        $data_table_other = '';
        if($dataMesaurement != '' && count($dataMesaurement) > 0){
            $tr .= "<tbody>";
            foreach($dataMesaurement as $key => $value){
                $style='';
                $class_val = '';
                $unit = '';
                $tr .= "<tr $style $class_val data-type='1' $data_table_other>";
                $tr.= "<td>".$value['modellBez']."</td>";
                $tr.= "<td>".$value['bezeichnung']."</td>";
                $tr.= "<td>".$value['uhrzeitVon']->format('h:i:s')."</td>";
                $tr.= "<td>".$value['uhrzeitBis']->format('h:i:s')."</td>";
                $tr.= "<td>".ucfirst($value['tagVon'])."</td>";
                $tr.= "<td>".ucfirst($value['tagBis'])."</td>";
                $tr.="</tr>";
            }
            $tr .= "</tbody>";
        }else{
            $tr .= "<tbody><tr><td $col_span class='text-center'>No Data</td></tr></tbody>";
        }
        return $tr;
        // $records['measurement_html'] = $tr;

    }
    // --end-->

    // <----16-02-2022--
    public function getTableDashboardDataEnergyLayer()
    {
        try{
            global $conn;
            $id = $_POST['id'];
            $selectQuery = "select * from tableFormat where id = '$id' ";
            $result = queryDB($conn, $selectQuery, "read");
            // echo json_encode($result); die;
            $tbody = '';
            if($result != '' && count($result) > 0){
                if($result[0]['row_click'] == 'false')
                {
                    $tbody = '<thead>';
                    $tbody .= '<tr>';
                    // $thead .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Day</th>';
                    $tbody .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Schichtname</th>';
                    $tbody .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Gültig ab</th>';
                    $tbody .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Gültig bis</th>';
                    $tbody .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Bezeichnung</th>';
                    $tbody .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Zeit von</th>';
                    $tbody .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Zeit zum</th>';
                    $tbody .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Energieverbrauch</th>';
                    // $thead .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Date</th>';
                    $tbody .= '</tr>';
                    $tbody .= '</thead>';
                    
                    // $getQuery = $result[0]['query_data_records'];
                    // $getQuery = str_replace('Where ',"Where '",$getQuery);
                    // $getQuery = str_replace(" between","' between", $getQuery);
                    // $getQuery = str_replace("Or ","Or '", $getQuery);
                    // // echo $getQuery; die;
                    // // $resultQuery = queryDB($conn, $getQuery, "read");
                    // echo json_encode($resultQuery); die;
                    // <---23-02-2022--
                    $input_val_week_day = $result[0]['energy_layer_range'];
                    $checkQuery = '';
                    if($result[0]['energy_layer_filter'] == 'day')
                    {
                        $checkQuery .= "Select * from SchichtModelleAll ";
                        for($c = 0; $c < $input_val_week_day; $c++)
                        {
                            $dateVal = date('Y-m-d', strtotime("-$c days"));
                            if($c == 0)
                            {
                                $checkQuery .= "Where '$dateVal' between gueltigVon AND gueltigBis "; 
                            }
                            else{
                                $checkQuery .= "Or '$dateVal' between gueltigVon AND gueltigBis "; 
                            }
                        }
                    }
                    else{
                        $intervalDays = $input_val_week_day * 7; //Week;
                        $checkQuery .= "Select * from SchichtModelleAll ";
                        for($interval = 0; $interval <= $intervalDays; $interval++)
                        {
                            $dateValShiftName =  date('Y-m-d', strtotime("-$interval Days"));
                            if($interval == 0)
                            {
                                $checkQuery.= "Where '$dateValShiftName' between gueltigVon AND gueltigBis ";
                            }
                            else{
                                $checkQuery.= "Or '$dateValShiftName' between gueltigVon AND gueltigBis ";
                            }
                        }
                        $resultShiftName = queryDB($conn, $checkQuery, "read");
                    }
                    $resultQuery = queryDB($conn, $checkQuery, "read");
                    // echo json_encode($resultQuery); 
                    // --end-->
                    if($resultQuery != '' && count($resultQuery) > 0){
                        $tbody .= "<tbody>";
                        $mst_id = $result[0]['mst_id'];
                        $energy_layer_filter = $result[0]['energy_layer_filter'];
                        $dateValCheck='';
                        if($energy_layer_filter == 'day')
                        {
                            $ind = $input_val_week_day - 1;
                            $dateValCheck = date('Y-m-d', strtotime("-$ind days")); 
                        }
                        else{
                            $ind = $input_val_week_day * 7;
                            $dateValCheck = date('Y-m-d', strtotime("-$ind days")); 
                        }
                        $fromDateCheck = '';
                        foreach($resultQuery as $key=>$val)
                        {   
                            $fromDate=$val['gueltigVon']->format('Y-m-d');

                            if($dateValCheck <= $val['gueltigVon']->format('Y-m-d'))
                            { 
                               $fromDateCheck = $val['gueltigVon']->format('Y-m-d');
                                 
                            }
                            else{
                               $fromDateCheck = $dateValCheck;
                            }

                            $toDate=$val['gueltigBis']->format('Y-m-d');
                            $fromTime=$val['uhrzeitVon']->format('H:i:s');
                            $toTime=$val['uhrzeitBis']->format('H:i:s');
                            $to=$toDate.'T'.$toTime;
                            $from=$fromDate.'T'.$fromTime;
                            // $query1 = "Select Sum(Value*ConvFactor) as sum from MessstellenEnergiedaten where time between convert(datetime,'".$from."') AND  convert(datetime,'".$to."') AND mst_ID ='".$mst_id."'";
                            $query1 = "Select Sum(Value*ConvFactor) as sum  from MessstellenEnergiedaten where   convert(date,time) between '$fromDateCheck' AND '$toDate' AND convert(time,time) between '$fromTime' AND '$toTime' AND mst_ID = '$mst_id' ";
                            
                            $resultEnergy = queryDB($conn, $query1, "read");
                            // echo json_encode($resultEnergy); die;
                            $totalEnergy = $resultEnergy[0]['sum'] > 0 ? $resultEnergy[0]['sum'] / 4 : 0; 
                            $totalEnergy = $this->convertValueCommaSeperated($totalEnergy);

                            $tbody .= "<tr tile_id='$id' class='energy_layer_row_click' mst_id='$mst_id' energy_layer_filter='$energy_layer_filter' input_val_week_day='$input_val_week_day'>";
                            $tbody.= "<td>".$val['modellBez']."</td>";
                            $tbody.= "<td>".$val['gueltigVon']->format('Y-m-d')."</td>";
                            $tbody.= "<td>".$val['gueltigBis']->format('Y-m-d')."</td>";
                            $tbody.= "<td>".$val['bezeichnung']."</td>";
                            $tbody.= "<td>".$val['uhrzeitVon']->format('H:i:s')."</td>";    
                            $tbody.= "<td>".$val['uhrzeitBis']->format('H:i:s')."</td>";
                            $tbody.= "<td>".$totalEnergy."</td>"; 
                            $tbody .= '</tr>';
                        }
                        $tbody .= "</tbody>";
                    }
                    else{
                        $tbody .= "<tbody>";
                        $tbody .= '<tr>';
                        $tbody .= '<td colspan="50" class="text-center">No Data Found</td>';
                        $tbody .= '</tr>';
                        $tbody .= "</tbody>";
                    }

                    $records['dashboardMeasurementHtml'] = $tbody;

                    echo json_encode($records, JSON_INVALID_UTF8_IGNORE);  die;
                    die;

                }
                else{
                    $tbody .= "<thead>";
                    $tbody .= '<tr>';
                    $tbody .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Shift Name</th>';
                    $tbody .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Date</th>';
                    // $tbody .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Time From</th>';
                    // $tbody .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Time To</th>';
                    $tbody .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Energy Consumed</th>';
                    $tbody .= '</tr>';
                    $tbody .= "</thead>";
                    $getQuery = $result[0]['query_data_records'];
                    $getQuery = str_replace("between ","between '", $getQuery);
                    $getQuery = str_replace(" AND ","' AND '", $getQuery);
                    $getQuery = str_replace("'convert","convert", $getQuery);
                    $getQuery = str_replace("'mst_ID","mst_ID", $getQuery);
                    $resultQuery = queryDB($conn, $getQuery, "read");
                    // echo json_encode($result);die;
                    $name_val = $result[0]['energy_layer_model_name'];
                    if($resultQuery != '' && count($resultQuery) > 0){
                        $tbody .= "<tbody>";
                        // foreach($resultQuery as $key=>$val)
                        // {   
                        //     $tbody .= '<tr>';
                        //     $tbody.= "<td>".$name_val."</td>";
                        //     $tbody.= "<td>".$val['Time']->format('Y-m-d')."</td>";
                        //     $tbody.= "<td>".$val['Time']->format('H:i:s')."</td>";
                        //     $addVal = $val['Value'] * $val['ConvFactor'];
                        //     $totalEnergy = $addVal / 4;
                        //     $tbody.= "<td>".$totalEnergy."</td>"; 
                        //     $tbody .= '</tr>';
                        // }
                        $sum = 0;
                        $resultQuery=$this->getDateWiseScore($resultQuery);
                        foreach($resultQuery as $key=>$val)
                        {   
                            $tbody .= '<tr data-table-other="SchichtModelleAll">';
                            $tbody.= "<td>".$name_val."</td>";
                            $tbody.= "<td>".$val['date']."</td>";
                            // $tbody.= "<td>".$time_from."</td>";
                            // $tbody.= "<td>".$time_to."</td>";
                            $tbody.= "<td>".$val['Value']."</td>";
                            $tbody .= '</tr>';
                            $sum+=$val['Value'];
                        }
                        $tbody.= "<tr class='font-weight-bold'><td colspan='2'>Grand Total: </td><td>$sum</td></tr>";

                        $tbody .= "</tbody>";
                    }
                    else{
                        $tbody .= "<tbody>";
                        $tbody .= '<tr>';
                        $tbody .= '<td colspan="50" class="text-center">No Data Found</td>';
                        $tbody .= '</tr>';
                        $tbody .= "</tbody>";
                    }

                    $records['dashboardMeasurementHtml'] = $tbody;

                    echo json_encode($records, JSON_INVALID_UTF8_IGNORE);  die;
                    die;
                    // if($resu)
                }
            }
            die;
        }
        catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        } 
    }
    // --end--->


    // <----04-3-2022---
    public function getTableDashboardDataEnergyAutomatic()
    {
        try{
            global $conn;
            $id = $_POST['id'];
            // $expand_view = $_POST['expand_view'];
            $selectQuery = "select * from tableFormat where id = '$id' ";
            $result = queryDB($conn, $selectQuery, "read");
            // echo json_encode($result); die;
            if($result[0]['row_click'] == 'false')
            {
                $mst_id = $result[0]['mst_id'];
                $input_val_week_day = $result[0]['energy_layer_range'];
                $energy_measurement_text = $result[0]['energy_layer_model_name'];
                $tbody = "<thead>";
                $tbody .= "<tr>";
                $tbody .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Messstelle</th>";
                $tbody .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Datum</th>";
                $tbody .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Wert</th>";
                $tbody .= "</tr>";
                $tbody .= "</thead>";
                
                $dateCheck = date('Y-m-d', strtotime("-$input_val_week_day days"));
                
                $queryEnergy = "Select convert(date,Time) as date ,sum(Value*ConvFactor) as value ";
                $queryEnergy .= "FROM  MessstellenEnergiedaten where mst_id = '$mst_id' AND ";
                $queryEnergy .= "convert(date,Time) > '$dateCheck' group by convert(date,Time) order by date desc ";
                $queryEnergyRecords = queryDB($conn, $queryEnergy, "read");
                // echo json_encode($queryEnergyRecords); 
                // die;
                if($queryEnergyRecords != '' && count($queryEnergyRecords))
                {
                    $tbody .= "<tbody>";
                    foreach($queryEnergyRecords as  $val1){
                        $totalValue = $val1['value'] > 0 ? $val1['value'] / 4 : 0;
                        $totalValue = $this->convertValueCommaSeperated($totalValue);
                        $tbody .= "<tr tile_id='$id' mst_id='$mst_id'  class='energy_automatic_row_click'>
                        <td>".$energy_measurement_text."</td>
                        <td>".$val1['date']->format('Y-m-d')."</td><td>".$totalValue."</td>
                        </tr>";
                    }
                    $tbody .= "</tbody>";
                }
                else{
                    $tbody .= "<tbody";
                    $tbody .= '<tr>';
                    $tbody .= '<td colspan="50" class="text-center">No Data Found</td>';
                    $tbody .= '</tr>';
                    $tbody .= "</tbody";
                }
                $records['dashboardMeasurementHtml'] = $tbody;
                echo json_encode($records, JSON_INVALID_UTF8_IGNORE);  
                die;
            }
            die;
        }
        catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        } 
    }
    // --end--->

    // <---15-12-2021
    public function getTableDashboardDataProductAutomatic(){
        try{
            // $conn = connectToDB('gipscomm');
            global $conn;
            $id = $_REQUEST['id'];
            $username = $_SESSION['username']; 
            $selectQuery = "SELECT * from tableFormat where username = '$username' AND id = $id ";
            $result = queryDB($conn, $selectQuery, "read");
            // echo json_encode($result[0]['database_name']); die;

            $conn = connectToDB($result[0]['database_name']);
            $dataProduct = queryDB($conn, $result[0]['query_data_records'], "read");
            $columnHeader = unserialize($result[0]['prd_all_columns_automatic']);
            $columnType = unserialize($result[0]['prd_all_columns_type_automatic']);
            // echo json_encode($dataProduct); die;
            // echo  $result[0]['query_data_records']; die;


            // $queryDataRecords = $_POST['queryDataRecords'];
            // $firstPosition =  strpos($queryDataRecords,'=');
            // $firstPosition = $firstPosition + 1;
            // $firstPositionQuery= substr_replace($queryDataRecords,"'",$firstPosition );
            
            // $lastPosition = strpos($firstPositionQuery,'order BY t1.anl_Id desc');
            // $lastPosition = $lastPosition - 1;
            // $lastPositionQuery= substr_replace($firstPositionQuery,"'",$lastPosition );
            // // echo $lastPositionQuery; die;
            // $dataProduct = queryDB($conn, $lastPositionQuery, "read");
            // // echo json_encode($dataProduct); die;
            
            $dashboardMeasurementHtml = $this->generateDashboardAllItemAutomaticTableHTML($dataProduct,$columnHeader,$columnType);
            $records['dashboardMeasurementHtml'] = $dashboardMeasurementHtml;

            echo json_encode($records, JSON_INVALID_UTF8_IGNORE);  die;

            // echo $lastPositionQuery; die;
        }
        catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        } 
    }

    // <---14-12-2021---
    public function generateDashboardAllItemAutomaticTableHTML($dataProduct,$columnHeader,$columnDataTypeAr)
    {
        try{
            // echo json_encode($dataProduct); die;
            $tr = '';
            if($columnHeader  != '' && count($columnHeader) > 0 )
            {
                $tr = "<thead>";
                $tr .= "<tr>";
                foreach($columnHeader as $val)
                {
                    $tr .= "<th>".ucfirst($val)."</th>";
                }
                $tr .= "</tr>";
                $tr .= "</thead>";
            }

            if($dataProduct != '' && count($dataProduct) > 0){
                $tr .="<tbody>";
                for($i = 0; $i < count($dataProduct); $i++ )
                {
                    $tr.="<tr>";
                    for($j = 0; $j < count($columnHeader); $j++)
                    {
                        $columnName = $columnHeader[$j];
                        $columnDataType = $columnDataTypeAr[$j];
                        // echo $columnName; die;
                        if($columnDataType == 'date' || $columnDataType == 'datetime')
                        {
                            $tr.= "<td>".$dataProduct[$i][$columnName]->format('Y-m-d')."</td>";    
                        }
                        else{
                            // echo $dataProduct[$i][$columnName]; die;
                            $tr.= "<td>".$dataProduct[$i][$columnName]."</td>";    
                        }
                    }
                    $tr .= "</tr>";
                }
                $tr .="</tbody>";
            }else{
                 $tr = "<tbody><tr><td $col_span class='text-center'>No Data</td></tbody></tr>";
            }
            // echo $tr; die;
            return $tr;
            // echo json_encode($records,JSON_INVALID_UTF8_IGNORE);
            die;
        }
        catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    // ---end-->

    // <---24-11-2021---
    public function getChartRecordFilterEnergy(){
        try{
            global $conn;
            $record_type_of_tile = $_POST['record_type_of_tile'];
            $filter_val = $_POST['filterVal'];
            $type = $_POST['type'];
            $mst_id = $_POST['mst_id'];
            $chart_outer_table_limit_column = $_POST['chart_outer_table_limit_column'] != '' ? $_POST['chart_outer_table_limit_column'] : 1;
            if($record_type_of_tile == 'energy')
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
                echo json_encode($records, JSON_INVALID_UTF8_IGNORE); 
                die;
                
            }
            die;

        }
        catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        } 
    }
    // --end-->

    // <--07-12-2021--
    public function getChartRecordFilterProduct(){
        try{
            global $conn;
            $record_type_of_tile = $_POST['record_type_of_tile'];
            $analgen_config_id = $_POST['analgen_config_id'];
            $filter_val = $_POST['filterVal'];
            $chart_outer_table_limit_column = $_POST['chart_outer_table_limit_column'] != '' ? $_POST['chart_outer_table_limit_column'] : 1;
            if($record_type_of_tile == 'product')
            {
                $queryOverAllCount = "SELECT  * FROM produktionsAnlagenConfig as t1 ";
                $queryOverAllCount .="INNER join "; 
                $queryOverAllCount.="( ";
                $queryOverAllCount .="select t2.id as table_2_id , t2.prd_id as table_2_prd_id  , t2.anl_id as table_2_anl_id , t2.anl_col as table_2_anl_col ";
                $queryOverAllCount .="from produktionsAnlagenMoreOpt as t2 ";
                $queryOverAllCount.=") ";
                $queryOverAllCount .="t2 ";
                $queryOverAllCount .="on t1.prd_id = t2.table_2_prd_id AND t1.anl_id = t2.table_2_anl_id AND t1.anl_col = t2.table_2_anl_col ";
                $queryOverAllCount .= "INNER join ";
                $queryOverAllCount .= "( ";
                $queryOverAllCount .= "select t3.id as t3_id , t3.prd_anl_ID as table_3_prd_anl_Id , cast(t3.val as int) as val ";
                $queryOverAllCount .= "from masseneingabeSuchePrdIMw  as t3 ";
                $queryOverAllCount .= ") ";
                $queryOverAllCount .= "t3 ";
                $queryOverAllCount .= "on t2.table_2_id = t3.table_3_prd_anl_Id ";
                $queryOverAllCount .= "left join anlagen as t4 on t1.anl_id = t4.anl_ID ";
                $queryOverAllCount .= "where t1.iBdeType='1' ";
                $queryOverAllCount .= "AND t1.iBdePrdktConf_ID = '$analgen_config_id' ";
                $queryOverAllCount .= "order by t3.t3_id asc ";
                $resultOverallCount = queryDB($conn, $queryOverAllCount, "read");
                // echo json_encode($resultOverallCount); die;
                $overallCount = count($resultOverallCount);

                if($filter_val == 10){
                    $ar_days = [];
                    $ar_value = [];
                    $countSum = '';
                    $loopCount = '';
                    $preVal = 0;
                    for($i = 1; $i <= 10; $i++){
                        if($i <= $overallCount){
                            $indexCount = $i - 1;
                            $preVal += $resultOverallCount[$indexCount]['val'];
                            $result[0]['val'] = $preVal;
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
                    // echo json_encode($ar_value); die;
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
                        
                        $queryOutsideTable = "SELECT  * FROM produktionsAnlagenConfig as t1 ";
                        $queryOutsideTable .="INNER join "; 
                        $queryOutsideTable.="( ";
                        $queryOutsideTable .="select t2.id as table_2_id , t2.prd_id as table_2_prd_id  , t2.anl_id as table_2_anl_id , t2.anl_col as table_2_anl_col ";
                        $queryOutsideTable .="from produktionsAnlagenMoreOpt as t2 ";
                        $queryOutsideTable.=") ";
                        $queryOutsideTable .="t2 ";
                        $queryOutsideTable .="on t1.prd_id = t2.table_2_prd_id AND t1.anl_id = t2.table_2_anl_id AND t1.anl_col = t2.table_2_anl_col ";
                        $queryOutsideTable .= "INNER join ";
                        $queryOutsideTable .= "( ";
                        $queryOutsideTable .= "select t3.id as t3_id , t3.type , t3.on_week , t3.on_date ,t3.prd_anl_ID as table_3_prd_anl_Id , cast(t3.val as int) as val ";
                        $queryOutsideTable .= "from masseneingabeSuchePrdIMw  as t3 ";
                        $queryOutsideTable .= ") ";
                        $queryOutsideTable .= "t3 ";
                        $queryOutsideTable .= "on t2.table_2_id = t3.table_3_prd_anl_Id ";
                        $queryOutsideTable .= "left join anlagen as t4 on t1.anl_id = t4.anl_ID ";
                        $queryOutsideTable .= "where t1.iBdeType='1' ";
                        $queryOutsideTable .= "AND t1.iBdePrdktConf_ID = '$analgen_config_id' ";
                        $queryOutsideTable .= "order by t3.t3_id DESC ";
                        $queryOutsideTable .= "offset $offsetLoopVal rows FETCH NEXT $chart_outer_table_limit_column ROWS ONLY ";
                        // echo $queryOutsideTable; die;
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
                    $preVal = 0;
                    for($i = 1; $i <= 20; $i++){
                        if($i <= $overallCount){
                            $indexCount = $i - 1;
                            $preVal += $resultOverallCount[$indexCount]['val'];
                            $result[0]['val'] = $preVal;
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
                        
                        $queryOutsideTable = "SELECT  * FROM produktionsAnlagenConfig as t1 ";
                        $queryOutsideTable .="INNER join "; 
                        $queryOutsideTable.="( ";
                        $queryOutsideTable .="select t2.id as table_2_id , t2.prd_id as table_2_prd_id  , t2.anl_id as table_2_anl_id , t2.anl_col as table_2_anl_col ";
                        $queryOutsideTable .="from produktionsAnlagenMoreOpt as t2 ";
                        $queryOutsideTable.=") ";
                        $queryOutsideTable .="t2 ";
                        $queryOutsideTable .="on t1.prd_id = t2.table_2_prd_id AND t1.anl_id = t2.table_2_anl_id AND t1.anl_col = t2.table_2_anl_col ";
                        $queryOutsideTable .= "INNER join ";
                        $queryOutsideTable .= "( ";
                        $queryOutsideTable .= "select t3.id as t3_id , t3.type , t3.on_week , t3.on_date ,t3.prd_anl_ID as table_3_prd_anl_Id , cast(t3.val as int) as val ";
                        $queryOutsideTable .= "from masseneingabeSuchePrdIMw  as t3 ";
                        $queryOutsideTable .= ") ";
                        $queryOutsideTable .= "t3 ";
                        $queryOutsideTable .= "on t2.table_2_id = t3.table_3_prd_anl_Id ";
                        $queryOutsideTable .= "left join anlagen as t4 on t1.anl_id = t4.anl_ID ";
                        $queryOutsideTable .= "where t1.iBdeType='1' ";
                        $queryOutsideTable .= "AND t1.iBdePrdktConf_ID = '$analgen_config_id' ";
                        $queryOutsideTable .= "order by t3.t3_id DESC ";
                        $queryOutsideTable .= "offset $offsetLoopVal rows FETCH NEXT $chart_outer_table_limit_column ROWS ONLY ";
                        // echo $queryOutsideTable; die;
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
                    $preVal = 0;
                    for($i = 1; $i <= 30; $i++){
                        if($i <= $overallCount){
                            $indexCount = $i - 1;
                            $preVal += $resultOverallCount[$indexCount]['val'];
                            $result[0]['val'] = $preVal;
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
                        
                        $queryOutsideTable = "SELECT  * FROM produktionsAnlagenConfig as t1 ";
                        $queryOutsideTable .="INNER join "; 
                        $queryOutsideTable.="( ";
                        $queryOutsideTable .="select t2.id as table_2_id , t2.prd_id as table_2_prd_id  , t2.anl_id as table_2_anl_id , t2.anl_col as table_2_anl_col ";
                        $queryOutsideTable .="from produktionsAnlagenMoreOpt as t2 ";
                        $queryOutsideTable.=") ";
                        $queryOutsideTable .="t2 ";
                        $queryOutsideTable .="on t1.prd_id = t2.table_2_prd_id AND t1.anl_id = t2.table_2_anl_id AND t1.anl_col = t2.table_2_anl_col ";
                        $queryOutsideTable .= "INNER join ";
                        $queryOutsideTable .= "( ";
                        $queryOutsideTable .= "select t3.id as t3_id , t3.type , t3.on_week , t3.on_date ,t3.prd_anl_ID as table_3_prd_anl_Id , cast(t3.val as int) as val ";
                        $queryOutsideTable .= "from masseneingabeSuchePrdIMw  as t3 ";
                        $queryOutsideTable .= ") ";
                        $queryOutsideTable .= "t3 ";
                        $queryOutsideTable .= "on t2.table_2_id = t3.table_3_prd_anl_Id ";
                        $queryOutsideTable .= "left join anlagen as t4 on t1.anl_id = t4.anl_ID ";
                        $queryOutsideTable .= "where t1.iBdeType='1' ";
                        $queryOutsideTable .= "AND t1.iBdePrdktConf_ID = '$analgen_config_id' ";
                        $queryOutsideTable .= "order by t3.t3_id DESC ";
                        $queryOutsideTable .= "offset $offsetLoopVal rows FETCH NEXT $chart_outer_table_limit_column ROWS ONLY ";
                        // echo $queryOutsideTable; die;
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
                    $preVal = 0;
                    for($i = 1; $i <= 50; $i++){
                        if($i <= $overallCount){
                            $indexCount = $i - 1;
                            $preVal += $resultOverallCount[$indexCount]['val'];
                            $result[0]['val'] = $preVal;
                            
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
                        
                        $queryOutsideTable = "SELECT  * FROM produktionsAnlagenConfig as t1 ";
                        $queryOutsideTable .="INNER join "; 
                        $queryOutsideTable.="( ";
                        $queryOutsideTable .="select t2.id as table_2_id , t2.prd_id as table_2_prd_id  , t2.anl_id as table_2_anl_id , t2.anl_col as table_2_anl_col ";
                        $queryOutsideTable .="from produktionsAnlagenMoreOpt as t2 ";
                        $queryOutsideTable.=") ";
                        $queryOutsideTable .="t2 ";
                        $queryOutsideTable .="on t1.prd_id = t2.table_2_prd_id AND t1.anl_id = t2.table_2_anl_id AND t1.anl_col = t2.table_2_anl_col ";
                        $queryOutsideTable .= "INNER join ";
                        $queryOutsideTable .= "( ";
                        $queryOutsideTable .= "select t3.id as t3_id , t3.type , t3.on_week , t3.on_date ,t3.prd_anl_ID as table_3_prd_anl_Id , cast(t3.val as int) as val ";
                        $queryOutsideTable .= "from masseneingabeSuchePrdIMw  as t3 ";
                        $queryOutsideTable .= ") ";
                        $queryOutsideTable .= "t3 ";
                        $queryOutsideTable .= "on t2.table_2_id = t3.table_3_prd_anl_Id ";
                        $queryOutsideTable .= "left join anlagen as t4 on t1.anl_id = t4.anl_ID ";
                        $queryOutsideTable .= "where t1.iBdeType='1' ";
                        $queryOutsideTable .= "AND t1.iBdePrdktConf_ID = '$analgen_config_id' ";
                        $queryOutsideTable .= "order by t3.t3_id DESC ";
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
                    $records['count_val'] = $ar_value;
                    $records['count_days'] = $ar_days;
                    $records['count_sum'] = $countSum;
                    echo json_encode($records, JSON_INVALID_UTF8_IGNORE);  
                    die;
                    
                }

                $records = ['status'=>400,'message'=>'Data Not found'];
                echo json_encode($records, JSON_INVALID_UTF8_IGNORE); 
                die;
                
            }
            die;

        }
        catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        } 
    }
    // ---end-->


    // <---21-2-2022--
    public function getChartRecordFilterEnergyLayer(){
        try{
            global $conn;
            $record_type_of_tile = $_POST['record_type_of_tile'];
            $chart_outer_table_limit_column = $_POST['chart_outer_table_limit_column'] != '' ? $_POST['chart_outer_table_limit_column'] : 1;
            if($record_type_of_tile == 'energy')
            {
                $mst_id = $_POST['mst_id'];
                $select_day_week = $_POST['energy_chart_layer_filter'];
                $input_val_week_day = $_POST['energy_chart_layer_range'];
                if($select_day_week == 'day')
                {
                    $checkQuery = '';
                    $todayDate = date('Y-m-d');

                    //SchichtModelleAll Table Check
                    $tableCheckQuery = "select * from SchichtModelleAll ";
                    $resultTableExistCheck = sqlsrv_query($conn,$tableCheckQuery);
                    $table_found = 'false';
                    if($resultTableExistCheck != false)
                    {
                        $table_found = 'true';
                    }
                    $tableOutsideHTML = '';
                    if($table_found == 'true'){
                        // <---07-02-2022---
                        //*** Check No Shift Name Found Database */
                        $checkQuery .= "Select * from SchichtModelleAll ";
                        for($c = 0; $c < $input_val_week_day; $c++)
                        {
                            $dateVal = date('Y-m-d', strtotime("-$c days"));
                            if($c == 0)
                            {
                            $checkQuery .= "Where '$dateVal' between gueltigVon AND gueltigBis ";
                            }
                            else{
                                $checkQuery .= "Or '$dateVal' between gueltigVon AND gueltigBis ";
                            }
                        }
                        $resultShiftName = queryDB($conn, $checkQuery, "read");
                        if($resultShiftName != '' && count($resultShiftName) > 0)
                        {
                            $ind = $input_val_week_day - 1; //Get last Date
                            $dateValCheck = date('Y-m-d', strtotime("-$ind days"));
                            $fromDateCheck = '';
                            $ar_value = [];
                            $ar_names = [];

                            //Outer Table Check
                            $outerTableLimit = 0;
                            $modelNameQueryCount = count($resultShiftName);
                            $i = 0;
                            foreach($resultShiftName as $key => $val){
                                $fromDate=$val['gueltigVon']->format('Y-m-d');
                                // <----21-2-2022---
                                if($dateValCheck <= $val['gueltigVon']->format('Y-m-d'))
                                {
                                    $fromDateCheck = $val['gueltigVon']->format('Y-m-d');
                                }
                                else{
                                    $fromDateCheck = $dateValCheck;
                                }
                                // echo $fromDateCheck; die;
                                // --end-->
                                $toDate=$val['gueltigBis']->format('Y-m-d');
                                $fromTime=$val['uhrzeitVon']->format('H:i:s');
                                $toTime=$val['uhrzeitBis']->format('H:i:s');
                                $to=$toDate.'T'.$toTime;
                                $from=$fromDate.'T'.$fromTime;
                                //  $query1 = "Select Sum(Value*ConvFactor) as sum from MessstellenEnergiedaten where time between convert(datetime,'".$from."') AND  convert(datetime,'".$to."') AND mst_ID ='".$mst_id."'";
                                $query1 = "Select Sum(Value*ConvFactor) as sum  from MessstellenEnergiedaten where   convert(date,time) between '$fromDateCheck' AND '$toDate' AND convert(time,time) between '$fromTime' AND '$toTime' AND mst_ID = '$mst_id' ";
                                //echo $query1; die;
                                $resultEnergy = queryDB($conn, $query1, "read");
                                // echo json_encode($resultEnergy); die;
                                $totalEnergy = $resultEnergy[0]['sum'] != 0 ? $resultEnergy[0]['sum'] / 4 : 0;
                                array_push($ar_value,$totalEnergy);
                                $model_name_layer_name = $val['modellBez'].'('.$val['bezeichnung'].')';
                                array_push($ar_names,$model_name_layer_name);

                                //Outer Table HTML Get Last Records
                                if($chart_outer_table_limit_column == $modelNameQueryCount || $chart_outer_table_limit_column > $modelNameQueryCount)
                                {
                                    $outerTableLimit = $modelNameQueryCount - 1; // -1 for Array Index
                                    if($i <= $outerTableLimit)
                                    {
                                        $tableOutsideHTML .= "<tr>";
                                        $tableOutsideHTML.= "<td>".$model_name_layer_name."</td>";
                                        $tableOutsideHTML .= "<td>".$totalEnergy."</td>";
                                        $tableOutsideHTML .= "</tr>";
                                    }
                                }
                                else if($chart_outer_table_limit_column < $modelNameQueryCount)
                                {
                                    $outerTableLimit = $chart_outer_table_limit_column - 1;
                                    if($i <= $outerTableLimit)
                                    {
                                        $tableOutsideHTML .= "<tr>";
                                        $tableOutsideHTML.= "<td>".$model_name_layer_name."</td>";
                                        $tableOutsideHTML .= "<td>".$totalEnergy."</td>";
                                        $tableOutsideHTML .= "</tr>";
                                    }
                                }
                                $i++;
                            }
                            // echo $i; die;
                            $records['count_val'] = $ar_value;
                            $records['count_days'] = $ar_names;
                            $records['count_sum'] = '';
                        }
                    }
                    $records['outer_table_html'] = $tableOutsideHTML;
                    // --end-->
                    $records['table_found'] = $table_found;
                    echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
                    die;
                }
                else if($select_day_week == 'week')
                {
                    //SchichtModelleAll Table Check
                    $tableCheckQuery = "select * from SchichtModelleAll ";
                    $resultTableExistCheck = sqlsrv_query($conn,$tableCheckQuery);

                    $table_found = 'false';
                    if($resultTableExistCheck != false)
                    {
                        $table_found = 'true';
                    }

                    $tableOutsideHTML = '';
                    if($table_found == 'true')
                    {
                        $todayDate = date('Y-m-d');
                        $dateVal =  date('Y-m-d', strtotime("-$input_val_week_day week"));

                        // <----07-02-2022--
                        // ****Check Shift Name Exist
                        $intervalDays = $input_val_week_day * 7; //Week;
                        $checkShiftNameQuery = "Select * from SchichtModelleAll ";
                        for($interval = 0; $interval <= $intervalDays; $interval++)
                        {
                            $dateValShiftName =  date('Y-m-d', strtotime("-$interval Days"));
                            if($interval == 0)
                            {
                                $checkShiftNameQuery.= "Where '$dateValShiftName' between gueltigVon AND gueltigBis ";
                            }
                            else{
                                $checkShiftNameQuery.= "Or '$dateValShiftName' between gueltigVon AND gueltigBis ";
                            }

                        }
                        $resultShiftName = queryDB($conn, $checkShiftNameQuery, "read");
                        // echo json_encode($resultShiftName); die;
                        // --end--->
                        if($resultShiftName != '' && count($resultShiftName) > 0)
                        {
                            $weekInd = $input_val_week_day * 7; //Week;
                            $dateValCheck = date('Y-m-d', strtotime("-$weekInd Days"));
                            // echo $fromDateCheck; die;
                            $fromDateCheck = '';
                            $ar_value = [];
                            $ar_names = [];

                            //Outer Table Check
                            $outerTableLimit = 0;
                            $modelNameQueryCount = count($resultShiftName);
                            $i = 0;
                            foreach($resultShiftName as $key=>$val){

                                $fromDate=$val['gueltigVon']->format('Y-m-d');
                                if($dateValCheck <= $val['gueltigVon']->format('Y-m-d')){
                                    $fromDateCheck  = $val['gueltigVon']->format('Y-m-d');
                                }
                                else{
                                    $fromDateCheck  = $dateValCheck;
                                }
                                $toDate=$val['gueltigBis']->format('Y-m-d');
                                $fromTime=$val['uhrzeitVon']->format('H:i:s');
                                $toTime=$val['uhrzeitBis']->format('H:i:s');
                                $to=$toDate.'T'.$toTime;
                                $from=$fromDate.'T'.$fromTime;
                                // $query1 = "Select Sum(Value*ConvFactor) as sum from MessstellenEnergiedaten where time between convert(datetime,'".$from."') AND  convert(datetime,'".$to."') AND mst_ID ='".$mst_id."'";
                                $query1 = "Select Sum(Value*ConvFactor) as sum  from MessstellenEnergiedaten where   convert(date,time) between '$fromDateCheck' AND '$toDate' AND convert(time,time) between '$fromTime' AND '$toTime' AND mst_ID = '$mst_id' ";

                                $resultEnergy = queryDB($conn, $query1, "read");
                                // echo json_encode($resultEnergy); die;
                                // $totalEnergy = $resultEnergy[0]['sum'] / 4;

                                // echo json_encode($resultEnergy); die;
                                $totalEnergy = $resultEnergy[0]['sum'] != 0 ? $resultEnergy[0]['sum'] / 4 : 0;
                                array_push($ar_value,$totalEnergy);
                                $model_name_layer_name = $val['modellBez'].'('.$val['bezeichnung'].')';
                                array_push($ar_names,$model_name_layer_name);

                                //Outer Table HTML Get Last Records
                                if($chart_outer_table_limit_column == $modelNameQueryCount || $chart_outer_table_limit_column > $modelNameQueryCount)
                                {
                                    $outerTableLimit = $modelNameQueryCount - 1; // -1 for Array Index
                                    if($i <= $outerTableLimit)
                                    {
                                        $tableOutsideHTML .= "<tr>";
                                        $tableOutsideHTML.= "<td>".$model_name_layer_name."</td>";
                                        $tableOutsideHTML .= "<td>".$totalEnergy."</td>";
                                        $tableOutsideHTML .= "</tr>";
                                    }
                                }
                                else if($chart_outer_table_limit_column < $modelNameQueryCount)
                                {
                                    $outerTableLimit = $chart_outer_table_limit_column - 1;
                                    if($i <= $outerTableLimit)
                                    {
                                        $tableOutsideHTML .= "<tr>";
                                        $tableOutsideHTML.= "<td>".$model_name_layer_name."</td>";
                                        $tableOutsideHTML .= "<td>".$totalEnergy."</td>";
                                        $tableOutsideHTML .= "</tr>";
                                    }
                                }
                                $i++;

                            }

                            $records['count_val'] = $ar_value;
                            $records['count_days'] = $ar_names;
                            $records['count_sum'] = '';
                        }
                    }
                    $records['outer_table_html'] = $tableOutsideHTML;
                    $records['table_found'] = $table_found;
                    echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
                    die;
                }
            }
            // ---end--->
            die;
        }
        catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    // --end--->


    public function getChartRecordFilterEnergyAutomatic(){
        try{
            global $conn;
            // print_r($_POST['mst_id']);
            // die;
            $mst_id = $_POST['mst_id'];
             // print_r($_POST['mst_id']);
            // die;
            $input_val_week_day = $_POST['energy_chart_layer_range'];
            $chart_outer_table_limit_column  = $_POST['chart_outer_table_limit_column'];
            $checkQuery = '';
            //SchichtModelleAll Table Check
            $tableCheckQuery = "select * from MessstellenEnergiedaten where mst_id = '$mst_id[0]' ";
            $resultTableExistCheck = sqlsrv_query($conn,$tableCheckQuery);
            $table_found = 'false';
            if($resultTableExistCheck != false)
            {
                $table_found = 'true';
            }
            $dateCheck = date('Y-m-d', strtotime("-$input_val_week_day days"));
            $tableOutsideHTML = '';
            if($table_found == 'true'){

                if(count($mst_id) > 1)
                {
                    $result = '';
                    $arTotalVal = [];
                    $arCountDays = [];
                    foreach($mst_id as $val)
                    {
                       $result =  $this->getChartRecordFilterEnergyAutomaticMstId($dateCheck,$val);
                       array_push($arTotalVal,$result);
                    }
                    
                    //Count Days
                    for($j = 0; $j < $input_val_week_day; $j++)
                    {
                        $dateVal = date('Y-m-d', strtotime("-$j days"));
                        array_push($arCountDays,$dateVal);
                    }

                    $records['count_val'] = $arTotalVal;
                    $records['count_days'] = array_reverse($arCountDays); //For ASCENDING

                    //MST Name
                    $strMstId = implode(",",$mst_id);
                    $queryName = "select nameMst from messstellen where mst_ID in($strMstId) ";
                    $resulMstName = queryDB($conn, $queryName, "read");
                    $records['mstName'] = $resulMstName;

                    echo json_encode($records,JSON_INVALID_UTF8_IGNORE);
                    die;
                }
                $queryEnergy = "Select convert(date,Time) as date ,sum(Value*ConvFactor) as value ";
                $queryEnergy .= "FROM  MessstellenEnergiedaten where mst_id = '$mst_id[0]' AND ";
                $queryEnergy .= "convert(date,Time) > '$dateCheck' group by convert(date,Time) order by date asc ";
                $queryEnergyRecords = queryDB($conn, $queryEnergy, "read");
                // echo $queryEnergy; die;
                // echo json_encode($queryEnergyRecords); 
                // die;
                $ar_value = [];
                $ar_names = [];
                if($queryEnergyRecords != '' && count($queryEnergyRecords))
                {
                    $i = 0;
                    $modelNameQueryCount = count($queryEnergyRecords);
                    // echo json_encode($queryEnergyRecords); die;
                    foreach($queryEnergyRecords as $key => $val){
                        $totalValue = $val['value'] > 0 ? $val['value'] / 4 : 0;
                        // $totalValue = $this->convertValueCommaSeperated($totalValue);
                        array_push($ar_value,$totalValue);
                        array_push($ar_names,$val['date']->format('Y-m-d'));
                        if($chart_outer_table_limit_column == $modelNameQueryCount || $chart_outer_table_limit_column > $modelNameQueryCount)
                        {
                            $outerTableLimit = $modelNameQueryCount - 1; // -1 for Array Index
                            if($i <= $outerTableLimit)
                            {
                                $tableOutsideHTML .= "<tr>";
                                $tableOutsideHTML.= "<td>".$val['date']->format('Y-m-d')."</td>";
                                $tableOutsideHTML .= "<td>".$totalValue."</td>";
                                $tableOutsideHTML .= "</tr>";
                            }
                        }
                        else if($chart_outer_table_limit_column < $modelNameQueryCount)
                        {
                            $outerTableLimit = $chart_outer_table_limit_column - 1;
                            if($i <= $outerTableLimit)
                            {
                                $tableOutsideHTML .= "<tr>";
                                $tableOutsideHTML.= "<td>".$val['date']->format('Y-m-d')."</td>";
                                $tableOutsideHTML .= "<td>".$totalValue."</td>";
                                $tableOutsideHTML .= "</tr>";
                            }
                        }
                        $i++;
                    }
                    $records['count_val'] = $ar_value;
                    $records['count_days'] = $ar_names;
                    $records['count_sum'] = '';
                }
            }
            $records['outer_table_html'] = $tableOutsideHTML;
            $records['table_found'] = $table_found;
            echo json_encode($records,JSON_INVALID_UTF8_IGNORE);
            die;
        }
        catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }

    public function getChartRecordFilterEnergyAutomaticMstId($dateCheck,$mst_id)
    {
        try{
            global $conn;
            $queryEnergy = "Select convert(date,Time) as date ,sum(Value*ConvFactor) as value ";
            $queryEnergy .= "FROM  MessstellenEnergiedaten where mst_id = '$mst_id' AND ";
            $queryEnergy .= "convert(date,Time) > '$dateCheck' group by convert(date,Time) order by date asc ";
            $queryEnergyRecords = queryDB($conn, $queryEnergy, "read");
            $ar_value = [];
            $ar_names = [];
            // echo $queryEnergy; die;
            // echo json_encode($queryEnergyRecords); die;
            if($queryEnergyRecords != '' && count($queryEnergyRecords))
            {
                
                foreach($queryEnergyRecords as $key => $val){
                    $totalValue = $val['value'] > 0 ? $val['value'] / 4 : 0;
                    // $totalValue = $this->convertValueCommaSeperated($totalValue);
                    array_push($ar_value,$totalValue);
                    array_push($ar_names,$val['date']->format('Y-m-d'));
                }
                return $ar_value;
                // return array($ar_value, $as_names);
            }
            // die;
            // echo ($totalValue);
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
            if($record_type_of_tile == 'energy'){
                $this->getChartRecordFilterEnergy();
                die;
            }
            else if($record_type_of_tile == 'measurement')
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
            $queryTotalRecords .= "(SELECT T2.mst_ID as table_2_mst_id, sum(Value * ConvFactor) as val from ";
            $queryTotalRecords .= "berechneteEnergiedaten as T2 ";
            $queryTotalRecords .= "GROUP By T2.mst_id) ";
            $queryTotalRecords .= "T2 ";
            $queryTotalRecords .= "ON T1.mst_ID = T2.table_2_mst_id ";
            $queryTotalRecords .= $queryTotalRecordCondition;
            $queryTotalRecords .= $order_by_val;
            // echo $queryTotalRecords; die;

            $resultQuery = sqlsrv_query($conn,$queryTotalRecords);
            $totalRecordsValue=[] ;
            if($resultQuery != false)
            {
                $totalRecordsValue = queryDB($conn, $queryTotalRecords, "read");
            }


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
            //$query1 .= "(SELECT T2.mst_ID as table_2_mst_id, sum(convert(decimal(38,5), Value)) as val from ";
            $query1 .= "(SELECT T2.mst_ID as table_2_mst_id, sum(Value * ConvFactor) as val from ";
            $query1 .= "berechneteEnergiedaten as T2 ";
            $query1 .= "GROUP By T2.mst_id) ";
            $query1 .= "T2 ";
            $query1 .= "ON T1.mst_ID = T2.table_2_mst_id ";
            $query1 .= $queryMainCondition;
            $query1 .= $order_by_val;
            $query1 .= "offset $offSetVal rows FETCH NEXT $number_records ROWS ONLY ";  
            // echo $query1; die; 
            
            $resultQuery = sqlsrv_query($conn,$query1);
            $dataMesaurement=[] ;
            $tableFound = 'false';
            if($resultQuery != false)
            {
                $dataMesaurement = queryDB($conn, $query1, "read");
                $tableFound = 'true';
            }
            $records['table_found'] = $tableFound;

            // $dataMesaurement = queryDB($conn, $query1, "read");

            $records['measurement_html'] = $this->generateHtmlAutomaticTableMeasurementData($dataMesaurement);
            $records['table_header'] = $this->getNumberRecordsMesurementHeader($measurement_type);

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
            $records['table_header'] = $this->getNumberRecordsMesurementHeader($measurement_type);
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
                    // $tr.= "<td>".$queryResult[0]['ConvFactor']."</td>";
                    $calulateVal = 0;
                    if($value['val'] > 0)
                    {
                        $calulateVal = $value['val'] / 4;
                    }
                    $calulateVal = $this->convertValueCommaSeperated($calulateVal);
                    $tr.= "<td>".$calulateVal."</td>";
                }
                else{
                    $tr.= "<td>".$value['Time']."</td>";
                    // $tr.= "<td>".$value['ConvFactor']."</td>";
                    $calulateVal = 0;
                    if($value['Value'] > 0)
                    {
                        $calulateVal = ($value['Value'] * $value['ConvFactor']) / 4;
                    }
                    $calulateVal = $this->convertValueCommaSeperated($calulateVal);
                    $tr.= "<td>".$calulateVal."</td>";
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
                $tr .= "<th>Messstelle</th>";
                $tr .= "<th>Datum</th>";
                $tr .= "<th>Wert</th>";
                $tr .= "</tr>";
                $tr .= "</thead>";
            }
            else if($queryMaxVal != ''){
                $col_span = "colspan='4'";
                $tr = "<thead style='background-color: #c5c8d2'>";
                $tr .= "<tr>";
                $tr .= "<th>Messstelle</th>";
                $tr .= "<th>Datum</th>";
                $tr .= "<th>Wert</th>";
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
                        $valueEnergy = 0;
                        if($value['val'] > 0){
                            $valueEnergy = $value['val'] / 4;
                        }
                        $valueEnergy = $this->convertValueCommaSeperated($valueEnergy);
                        $tr.= "<td>".$valueEnergy."</td>";
                    }
                    else{
                        $tr.= "<td>".$value['Time']."</td>";
                        $valueEnergy = 0;
                        if($value['Value'] > 0){
                            $valueEnergy = ($value['Value'] * $value['ConvFactor']) / 4;
                        }
                        $valueEnergy = $this->convertValueCommaSeperated($valueEnergy);
                        $tr.= "<td>".$valueEnergy."</td>";
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
            $queryTotalSum = "SELECT sum(Value * ConvFactor) as val from berechneteEnergiedaten  as t1 ";
            $queryTotalSum .= "Where t1.mst_ID = $mst_id ";
            $totalSum = queryDB($conn, $queryTotalSum, "read");
            $totalSumVal = $totalSum[0]['val'] != null && $totalSum[0]['val'] != 0 ?  $totalSum[0]['val'] / 4 : '0';
            $totalSumVal = $this->convertValueCommaSeperated($totalSumVal);

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
            if($record_type_of_tile == 'measurement' || $record_type_of_tile == 'energy')
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

    // <----8-12-2021---
    public function getClickDashboardChartProduct(){
        try{
            global $conn;
            $record_type_of_tile = $_POST['record_type_of_tile'];
            $filter_val = $_POST['chart_filter_value'];
            $analgen_config_id = $_POST['analgen_config_id'];
            if($record_type_of_tile == 'product')
            {
                $queryOverAllCount = "SELECT  * FROM produktionsAnlagenConfig as t1 ";
                $queryOverAllCount .="INNER join "; 
                $queryOverAllCount.="( ";
                $queryOverAllCount .="select t2.id as table_2_id , t2.prd_id as table_2_prd_id  , t2.anl_id as table_2_anl_id , t2.anl_col as table_2_anl_col ";
                $queryOverAllCount .="from produktionsAnlagenMoreOpt as t2 ";
                $queryOverAllCount.=") ";
                $queryOverAllCount .="t2 ";
                $queryOverAllCount .="on t1.prd_id = t2.table_2_prd_id AND t1.anl_id = t2.table_2_anl_id AND t1.anl_col = t2.table_2_anl_col ";
                $queryOverAllCount .= "INNER join ";
                $queryOverAllCount .= "( ";
                $queryOverAllCount .= "select t3.id as t3_id , t3.prd_anl_ID as table_3_prd_anl_Id , cast(t3.val as int) as val ";
                $queryOverAllCount .= "from masseneingabeSuchePrdIMw  as t3 ";
                $queryOverAllCount .= ") ";
                $queryOverAllCount .= "t3 ";
                $queryOverAllCount .= "on t2.table_2_id = t3.table_3_prd_anl_Id ";
                $queryOverAllCount .= "left join anlagen as t4 on t1.anl_id = t4.anl_ID ";
                $queryOverAllCount .= "where t1.iBdeType='1' ";
                $queryOverAllCount .= "AND t1.iBdePrdktConf_ID = '$analgen_config_id' ";
                $queryOverAllCount .= "order by t3.t3_id asc ";
                $resultOverallCount = queryDB($conn, $queryOverAllCount, "read");
                $overallCount = count($resultOverallCount);
                if($filter_val == 10){
                    $ar_days = [];
                    $ar_value = [];
                    $preVal = 0;
                    for($i = 1; $i <= 10; $i++){
                        if($i <= $overallCount){
                            $indexCount = $i - 1;
                            $preVal += $resultOverallCount[$indexCount]['val'];
                            $result[0]['val'] = $preVal;
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
                    $preVal = 0;
                    for($i = 1; $i <= 20; $i++){
                        if($i <= $overallCount){
                            $indexCount = $i - 1;
                            $preVal += $resultOverallCount[$indexCount]['val'];
                            $result[0]['val'] = $preVal;
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
                    $preVal = 0;
                    for($i = 1; $i <= 30; $i++){
                        if($i <= $overallCount){
                            $indexCount = $i - 1;
                            $preVal += $resultOverallCount[$indexCount]['val'];
                            $result[0]['val'] = $preVal;
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
                    $preVal = 0;
                    for($i = 1; $i <= 50; $i++){
                        if($i <= $overallCount){
                            $indexCount = $i - 1;
                            $preVal += $resultOverallCount[$indexCount]['val'];
                            $result[0]['val'] = $preVal;
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
    // --end-->

    // <---23-2-2022----
    public function getClickDashboardChartEnergyLayer(){
        try{
            global $conn;
            $record_type_of_tile = $_POST['record_type_of_tile'];
            $chart_outer_table_limit_column = $_POST['chart_outer_table_limit_column'] != '' ? $_POST['chart_outer_table_limit_column'] : 1;
            if($record_type_of_tile == 'energy')
            {
                $mst_id = $_POST['mst_id'];
                $select_day_week = $_POST['energy_chart_layer_filter'];
                $input_val_week_day = $_POST['energy_chart_layer_range'];
                if($select_day_week == 'day')
                {
                    $checkQuery = '';
                    $todayDate = date('Y-m-d');

                    //SchichtModelleAll Table Check
                    $tableCheckQuery = "select * from SchichtModelleAll ";
                    $resultTableExistCheck = sqlsrv_query($conn,$tableCheckQuery);
                    $table_found = 'false';
                    if($resultTableExistCheck != false)
                    {
                        $table_found = 'true';
                    }
                    $tableOutsideHTML = '';
                    if($table_found == 'true'){
                        // <---07-02-2022---
                        //*** Check No Shift Name Found Database */
                        $checkQuery .= "Select * from SchichtModelleAll ";
                        for($c = 0; $c < $input_val_week_day; $c++)
                        {
                            $dateVal = date('Y-m-d', strtotime("-$c days"));
                            if($c == 0)
                            {
                            $checkQuery .= "Where '$dateVal' between gueltigVon AND gueltigBis ";
                            }
                            else{
                                $checkQuery .= "Or '$dateVal' between gueltigVon AND gueltigBis ";
                            }
                        }
                        $resultShiftName = queryDB($conn, $checkQuery, "read");
                        if($resultShiftName != '' && count($resultShiftName) > 0)
                        {
                            $ind = $input_val_week_day - 1; //Get last Date
                            $dateValCheck = date('Y-m-d', strtotime("-$ind days"));
                            $fromDateCheck = '';
                            $ar_value = [];
                            $ar_names = [];

                            //Outer Table Check
                            $outerTableLimit = 0;
                            $modelNameQueryCount = count($resultShiftName);
                            $i = 0;
                            foreach($resultShiftName as $key => $val){
                                $fromDate=$val['gueltigVon']->format('Y-m-d');
                                // <----21-2-2022---
                                if($dateValCheck <= $val['gueltigVon']->format('Y-m-d'))
                                {
                                    $fromDateCheck = $val['gueltigVon']->format('Y-m-d');
                                }
                                else{
                                    $fromDateCheck = $dateValCheck;
                                }
                                // echo $fromDateCheck; die;
                                // --end-->
                                $toDate=$val['gueltigBis']->format('Y-m-d');
                                $fromTime=$val['uhrzeitVon']->format('H:i:s');
                                $toTime=$val['uhrzeitBis']->format('H:i:s');
                                $to=$toDate.'T'.$toTime;
                                $from=$fromDate.'T'.$fromTime;
                                //  $query1 = "Select Sum(Value*ConvFactor) as sum from MessstellenEnergiedaten where time between convert(datetime,'".$from."') AND  convert(datetime,'".$to."') AND mst_ID ='".$mst_id."'";
                                $query1 = "Select Sum(Value*ConvFactor) as sum  from MessstellenEnergiedaten where   convert(date,time) between '$fromDateCheck' AND '$toDate' AND convert(time,time) between '$fromTime' AND '$toTime' AND mst_ID = '$mst_id' ";
                                //echo $query1; die;
                                $resultEnergy = queryDB($conn, $query1, "read");
                                // echo json_encode($resultEnergy); die;
                                $totalEnergy = $resultEnergy[0]['sum'] != 0 ? $resultEnergy[0]['sum'] / 4 : 0;
                                array_push($ar_value,$totalEnergy);
                                $model_name_layer_name = $val['modellBez'].'('.$val['bezeichnung'].')';
                                array_push($ar_names,$model_name_layer_name);

                                //Outer Table HTML Get Last Records
                                if($chart_outer_table_limit_column == $modelNameQueryCount || $chart_outer_table_limit_column > $modelNameQueryCount)
                                {
                                    $outerTableLimit = $modelNameQueryCount - 1; // -1 for Array Index
                                    if($i <= $outerTableLimit)
                                    {
                                        $tableOutsideHTML .= "<tr>";
                                        $tableOutsideHTML.= "<td>".$model_name_layer_name."</td>";
                                        $tableOutsideHTML .= "<td>".$totalEnergy."</td>";
                                        $tableOutsideHTML .= "</tr>";
                                    }
                                }
                                else if($chart_outer_table_limit_column < $modelNameQueryCount)
                                {
                                    $outerTableLimit = $chart_outer_table_limit_column - 1;
                                    if($i <= $outerTableLimit)
                                    {
                                        $tableOutsideHTML .= "<tr>";
                                        $tableOutsideHTML.= "<td>".$model_name_layer_name."</td>";
                                        $tableOutsideHTML .= "<td>".$totalEnergy."</td>";
                                        $tableOutsideHTML .= "</tr>";
                                    }
                                }
                                $i++;
                            }
                            // echo $i; die;
                            $records['count_val'] = $ar_value;
                            $records['count_days'] = $ar_names;
                            $records['count_sum'] = '';
                        }
                    }
                    $records['outer_table_html'] = $tableOutsideHTML;
                    // --end-->
                    $records['table_found'] = $table_found;
                    echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
                    die;
                }
                else if($select_day_week == 'week')
                {
                    //SchichtModelleAll Table Check
                    $tableCheckQuery = "select * from SchichtModelleAll ";
                    $resultTableExistCheck = sqlsrv_query($conn,$tableCheckQuery);

                    $table_found = 'false';
                    if($resultTableExistCheck != false)
                    {
                        $table_found = 'true';
                    }

                    $tableOutsideHTML = '';
                    if($table_found == 'true')
                    {
                        $todayDate = date('Y-m-d');
                        $dateVal =  date('Y-m-d', strtotime("-$input_val_week_day week"));

                        // <----07-02-2022--
                        // ****Check Shift Name Exist
                        $intervalDays = $input_val_week_day * 7; //Week;
                        $checkShiftNameQuery = "Select * from SchichtModelleAll ";
                        for($interval = 0; $interval <= $intervalDays; $interval++)
                        {
                            $dateValShiftName =  date('Y-m-d', strtotime("-$interval Days"));
                            if($interval == 0)
                            {
                                $checkShiftNameQuery.= "Where '$dateValShiftName' between gueltigVon AND gueltigBis ";
                            }
                            else{
                                $checkShiftNameQuery.= "Or '$dateValShiftName' between gueltigVon AND gueltigBis ";
                            }

                        }
                        $resultShiftName = queryDB($conn, $checkShiftNameQuery, "read");
                        // echo json_encode($resultShiftName); die;
                        // --end--->
                        if($resultShiftName != '' && count($resultShiftName) > 0)
                        {
                            $weekInd = $input_val_week_day * 7; //Week;
                            $dateValCheck = date('Y-m-d', strtotime("-$weekInd Days"));
                            // echo $fromDateCheck; die;
                            $fromDateCheck = '';
                            $ar_value = [];
                            $ar_names = [];

                            //Outer Table Check
                            $outerTableLimit = 0;
                            $modelNameQueryCount = count($resultShiftName);
                            $i = 0;
                            foreach($resultShiftName as $key=>$val){

                                $fromDate=$val['gueltigVon']->format('Y-m-d');
                                if($dateValCheck <= $val['gueltigVon']->format('Y-m-d')){
                                    $fromDateCheck  = $val['gueltigVon']->format('Y-m-d');
                                }
                                else{
                                    $fromDateCheck  = $dateValCheck;
                                }
                                $toDate=$val['gueltigBis']->format('Y-m-d');
                                $fromTime=$val['uhrzeitVon']->format('H:i:s');
                                $toTime=$val['uhrzeitBis']->format('H:i:s');
                                $to=$toDate.'T'.$toTime;
                                $from=$fromDate.'T'.$fromTime;
                                // $query1 = "Select Sum(Value*ConvFactor) as sum from MessstellenEnergiedaten where time between convert(datetime,'".$from."') AND  convert(datetime,'".$to."') AND mst_ID ='".$mst_id."'";
                                $query1 = "Select Sum(Value*ConvFactor) as sum  from MessstellenEnergiedaten where   convert(date,time) between '$fromDateCheck' AND '$toDate' AND convert(time,time) between '$fromTime' AND '$toTime' AND mst_ID = '$mst_id' ";

                                $resultEnergy = queryDB($conn, $query1, "read");
                                // echo json_encode($resultEnergy); die;
                                $totalEnergy = $resultEnergy[0]['sum'] != 0 ? $resultEnergy[0]['sum'] / 4 : 0;
                                array_push($ar_value,$totalEnergy);
                                $model_name_layer_name = $val['modellBez'].'('.$val['bezeichnung'].')';
                                array_push($ar_names,$model_name_layer_name);

                                //Outer Table HTML Get Last Records
                                if($chart_outer_table_limit_column == $modelNameQueryCount || $chart_outer_table_limit_column > $modelNameQueryCount)
                                {
                                    $outerTableLimit = $modelNameQueryCount - 1; // -1 for Array Index
                                    if($i <= $outerTableLimit)
                                    {
                                        $tableOutsideHTML .= "<tr>";
                                        $tableOutsideHTML.= "<td>".$model_name_layer_name."</td>";
                                        $tableOutsideHTML .= "<td>".$totalEnergy."</td>";
                                        $tableOutsideHTML .= "</tr>";
                                    }
                                }
                                else if($chart_outer_table_limit_column < $modelNameQueryCount)
                                {
                                    $outerTableLimit = $chart_outer_table_limit_column - 1;
                                    if($i <= $outerTableLimit)
                                    {
                                        $tableOutsideHTML .= "<tr>";
                                        $tableOutsideHTML.= "<td>".$model_name_layer_name."</td>";
                                        $tableOutsideHTML .= "<td>".$totalEnergy."</td>";
                                        $tableOutsideHTML .= "</tr>";
                                    }
                                }
                                $i++;

                            }

                            $records['count_val'] = $ar_value;
                            $records['count_days'] = $ar_names;
                            $records['count_sum'] = '';
                        }
                    }
                    $records['outer_table_html'] = $tableOutsideHTML;
                    $records['table_found'] = $table_found;
                    echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
                    die;
                }
            }
            die;
        }
        catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    // --end--->

    // <----08-03-2022--
    public function getClickDashboardChartEnergyAutomatic(){
        try{
            global $conn;
            $mst_id = $_POST['chart_type'] == 'line_chart' ? unserialize($_POST['mst_id']) : $_POST['mst_id'];
            $input_val_week_day = $_POST['energy_chart_layer_range'];
            $chart_outer_table_limit_column  = $_POST['chart_outer_table_limit_column'];
            $checkQuery = '';
            //SchichtModelleAll Table Check
            $tableCheckQuery = "select * from MessstellenEnergiedaten where mst_id = '$mst_id[0]' ";
            $resultTableExistCheck = sqlsrv_query($conn,$tableCheckQuery);
            $table_found = 'false';
            if($resultTableExistCheck != false)
            {
                $table_found = 'true';
            }
            $dateCheck = date('Y-m-d', strtotime("-$input_val_week_day week"));
            $tableOutsideHTML = '';
            if($table_found == 'true'){
                if($_POST['chart_type'] == 'line_chart')
                {
                    if(count($mst_id) > 1)
                    {
                        $result = '';
                        $arTotalVal = [];
                        $arCountDays = [];
                        foreach($mst_id as $val)
                        {
                            $result =  $this->getChartRecordFilterEnergyAutomaticMstId($dateCheck,$val);
                            array_push($arTotalVal,$result);
                        }
                        
                        //Count Days
                        for($j = 0; $j < $input_val_week_day; $j++)
                        {
                            $dateVal = date('Y-m-d', strtotime("-$j week"));
                            array_push($arCountDays,$dateVal);
                        }

                        $records['count_val'] = $arTotalVal;
                        $records['count_days'] = array_reverse($arCountDays); //For ASCENDING

                        
                        $strMstId = implode(",",$mst_id);
                        $queryName = "select nameMst from messstellen where mst_ID in($strMstId) ";
                        $resulMstName = queryDB($conn, $queryName, "read");
                        $records['mstName'] = $resulMstName;
                        
                        $records['mst_id'] = $mst_id;
                        echo json_encode($records,JSON_INVALID_UTF8_IGNORE);
                        die;
                    }
                    else{
                        $mstArray = 1;
                        $this->getClickDashboardChartEnergyAutomaticSingleMST($mstArray = 1); 
                    }
                }
                $this->getClickDashboardChartEnergyAutomaticSingleMST();
                die;


                $queryEnergy = "Select convert(date,Time) as date ,sum(Value*ConvFactor) as value ";
                $queryEnergy .= "FROM  MessstellenEnergiedaten where mst_id = '$mst_id' AND ";
                $queryEnergy .= "convert(date,Time) > '$dateCheck' group by convert(date,Time) order by date asc ";
                $queryEnergyRecords = queryDB($conn, $queryEnergy, "read");
                // echo $queryEnergy; die;
                // echo json_encode($queryEnergyRecords); 
                // die;
                $ar_value = [];
                $ar_names = [];
                if($queryEnergyRecords != '' && count($queryEnergyRecords))
                {
                    $i = 0;
                    $modelNameQueryCount = count($queryEnergyRecords);
                    // echo json_encode($queryEnergyRecords); die;
                    foreach($queryEnergyRecords as $key => $val){
                        $totalValue = $val['value'] > 0 ? $val['value'] / 4 : 0;
                        // $totalValue = $this->convertValueCommaSeperated($totalValue);
                        array_push($ar_value,$totalValue);
                        array_push($ar_names,$val['date']->format('Y-m-d'));
                        if($chart_outer_table_limit_column == $modelNameQueryCount || $chart_outer_table_limit_column > $modelNameQueryCount)
                        {
                            $outerTableLimit = $modelNameQueryCount - 1; // -1 for Array Index
                            if($i <= $outerTableLimit)
                            {
                                $tableOutsideHTML .= "<tr>";
                                $tableOutsideHTML.= "<td>".$val['date']->format('Y-m-d')."</td>";
                                $tableOutsideHTML .= "<td>".$totalValue."</td>";
                                $tableOutsideHTML .= "</tr>";
                            }
                        }
                        else if($chart_outer_table_limit_column < $modelNameQueryCount)
                        {
                            $outerTableLimit = $chart_outer_table_limit_column - 1;
                            if($i <= $outerTableLimit)
                            {
                                $tableOutsideHTML .= "<tr>";
                                $tableOutsideHTML.= "<td>".$val['date']->format('Y-m-d')."</td>";
                                $tableOutsideHTML .= "<td>".$totalValue."</td>";
                                $tableOutsideHTML .= "</tr>";
                            }
                        }
                        $i++;
                    }
                    $records['count_val'] = $ar_value;
                    $records['count_days'] = $ar_names;
                    $records['count_sum'] = '';
                }
            }
            $records['outer_table_html'] = $tableOutsideHTML;
            $records['table_found'] = $table_found;
            //To Make Again in Array
            $records['mst_id'] = $_POST['chart_type'] == 'line_chart' ? unserialize($_POST['mst_id']) : $_POST['mst_id'];
            echo json_encode($records,JSON_INVALID_UTF8_IGNORE);
            die;
        }
        catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    // --end-->

    public function getClickDashboardChartEnergyAutomaticSingleMST($mstArray = false)
    {
        try{
            global $conn;
            $mst_id = $_POST['chart_type'] == 'line_chart' ? unserialize($_POST['mst_id']) : $_POST['mst_id'];
            if($mstArray == 1)
            {
                $mst_id = $mst_id[0];
            }
            $input_val_week_day = $_POST['energy_chart_layer_range'];
            $chart_outer_table_limit_column  = $_POST['chart_outer_table_limit_column'];
            $checkQuery = '';
            //SchichtModelleAll Table Check
            $tableCheckQuery = "select * from MessstellenEnergiedaten where mst_id = '$mst_id' ";
            $resultTableExistCheck = sqlsrv_query($conn,$tableCheckQuery);
            $table_found = 'false';
            if($resultTableExistCheck != false)
            {
                $table_found = 'true';
            }
            $dateCheck = date('Y-m-d', strtotime("-$input_val_week_day days"));
            $tableOutsideHTML = '';
            if($table_found == 'true'){
                $queryEnergy = "Select convert(date,Time) as date ,sum(Value*ConvFactor) as value ";
                $queryEnergy .= "FROM  MessstellenEnergiedaten where mst_id = '$mst_id' AND ";
                $queryEnergy .= "convert(date,Time) > '$dateCheck' group by convert(date,Time) order by date asc ";
                $queryEnergyRecords = queryDB($conn, $queryEnergy, "read");
                // echo $queryEnergy; die;
                // echo json_encode($queryEnergyRecords); 
                // die;
                $ar_value = [];
                $ar_names = [];
                if($queryEnergyRecords != '' && count($queryEnergyRecords))
                {
                    $i = 0;
                    $modelNameQueryCount = count($queryEnergyRecords);
                    // echo json_encode($queryEnergyRecords); die;
                    foreach($queryEnergyRecords as $key => $val){
                        $totalValue = $val['value'] > 0 ? $val['value'] / 4 : 0;
                        // $totalValue = $this->convertValueCommaSeperated($totalValue);
                        array_push($ar_value,$totalValue);
                        array_push($ar_names,$val['date']->format('Y-m-d'));
                        if($chart_outer_table_limit_column == $modelNameQueryCount || $chart_outer_table_limit_column > $modelNameQueryCount)
                        {
                            $outerTableLimit = $modelNameQueryCount - 1; // -1 for Array Index
                            if($i <= $outerTableLimit)
                            {
                                $tableOutsideHTML .= "<tr>";
                                $tableOutsideHTML.= "<td>".$val['date']->format('Y-m-d')."</td>";
                                $tableOutsideHTML .= "<td>".$totalValue."</td>";
                                $tableOutsideHTML .= "</tr>";
                            }
                        }
                        else if($chart_outer_table_limit_column < $modelNameQueryCount)
                        {
                            $outerTableLimit = $chart_outer_table_limit_column - 1;
                            if($i <= $outerTableLimit)
                            {
                                $tableOutsideHTML .= "<tr>";
                                $tableOutsideHTML.= "<td>".$val['date']->format('Y-m-d')."</td>";
                                $tableOutsideHTML .= "<td>".$totalValue."</td>";
                                $tableOutsideHTML .= "</tr>";
                            }
                        }
                        $i++;
                    }
                    $records['count_val'] = $ar_value;
                    $records['count_days'] = $ar_names;
                    $records['count_sum'] = '';
                }
            }
            $records['outer_table_html'] = $tableOutsideHTML;
            $records['table_found'] = $table_found;
            //To Make Again in Array
            $records['mst_id'] = $_POST['chart_type'] == 'line_chart' ? unserialize($_POST['mst_id']) : $_POST['mst_id'];
            echo json_encode($records,JSON_INVALID_UTF8_IGNORE);
            die;
        }
        catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    } 

    // <----02-03-2022--
    public function convertValueCommaSeperated($value)
    {
        try{
            $value=round($value,3);
            return str_replace('.',',',$value);
        }
        catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        } 
    }


    public function storeDBValueSession()
    {
        try{
           $nameDB = isset($_POST['nameDB']) ? $_POST['nameDB'] : '';
           $_SESSION["nameDB"] = $nameDB;
           die;
        }
        catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        } 
    }


    public function logout()
    {
        try{
            session_destroy();
            return ['destroy' => 'true'];
           die;
        }
        catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        } 
    }


    

    // ---end--->
  
}
$obj = new dashboardController();

?>