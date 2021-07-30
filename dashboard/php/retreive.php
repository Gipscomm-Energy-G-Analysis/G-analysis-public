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
            $number_records = $_POST['number_records'];
            $time_interval = $_POST['time_interval'];
            //$query1 = "SELECT Top($number_records) * FROM produktionsAnlagenConfig where iBdeType='2'  order by iBdePrdktConf_ID desc";
            $query1 = "SELECT Top($number_records) * ";
            $query1 .= "FROM produktionsAnlagenConfig as T1 ";
            $query1 .= "LEFT JOIN ";
            $query1 .= "(SELECT T2.mst_ID as table_2_mst_id, sum(cast(val as int)) as val from ";
            $query1 .= "masseneingabeSucheIMw as T2 ";
            $query1 .= "GROUP By T2.mst_id) ";
            $query1 .= "T2 ";
            $query1 .= "ON T1.mst_ID = T2.table_2_mst_id ";
            $query1  .= "where T1.iBdeType='2' ";
            $query1 .= "AND T1.intTp_ID = '$time_interval' ";
            $query1 .= "order by T1.iBdePrdktConf_ID desc";
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
                    
                    if($value['val'] == null){
                        $tr.= "<td> - </td>";
                        $tr.= "<td><label class='badge badge-danger'>Pending </label></td>";
                    }
                    else{
                        $tr.= "<td>".$value['val']."</td>";
                        $tr.= "<td><label class='badge badge-success'>Active </label></td>";
                    }
                    $tr.="</tr>";
                }
            }else{
                 $tr = "<tr><td colspan='4' class='text-center'>No Data</td></tr>";
            }
            $records['measurement_html'] = $tr;

            echo json_encode($records,JSON_INVALID_UTF8_IGNORE);
            die;
        }
        catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }

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