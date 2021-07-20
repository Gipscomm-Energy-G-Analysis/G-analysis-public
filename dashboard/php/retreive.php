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
            $eneryConsumed = "SELECT SUM(cast(T2.val as int)) FROM interneBetriebsdatenHistorie As T1 ";
            $eneryConsumed .= "LEFT JOIN masseneingabeSucheIMw as T2 ";
            $eneryConsumed .= "ON T1.mstID = T2.mst_ID ";
            $eneryConsumed .= "WHERE T1.created_on >= convert(datetime,'$date_diff',101) ";
            $eneryConsumed .= "AND T1.deleted <> 'true' ";
            $eneryConsumed.= "AND T1.archiviert ='true' ";
            // echo  $eneryConsumed; die;
            $records['energy_consumed'] = queryDB($conn, $eneryConsumed, "read");
            // echo json_encode($eneryConsumed); die;

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
            //$query1 = "SELECT Top($number_records) * FROM produktionsAnlagenConfig where iBdeType='2'  order by iBdePrdktConf_ID desc";
            $query1 = "SELECT Top($number_records) * ";
            $query1 .= "FROM produktionsAnlagenConfig as T1 ";
            $query1 .= "LEFT JOIN ";
            $query1 .= "(SELECT T2.mst_ID as table_2_mst_id, max(cast(val as int)) as val from ";
            $query1 .= "masseneingabeSucheIMw as T2 ";
            $query1 .= "GROUP By T2.mst_id) ";
            $query1 .= "T2 ";
            $query1 .= "ON T1.mst_ID = T2.table_2_mst_id ";
            $query1  .= "where T1.iBdeType='2'  order by T1.iBdePrdktConf_ID desc";
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
            $query1 = "SELECT  * ";
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
                    if($value['min_val'] == null  || $value['max_val'] == null ){
                        $tr.= "<td><label class='text-danger'>Min and Max Value Empty</label></td>";
                    }
                    else{
                        $tr.= "<td><label class='badge badge-danger'>NA </label></td>";
                    }
                    $tr.="</tr>";
                }
            }else{
                 $tr = "<tr><td colspan='4' class='text-center'>No Data</td></tr>";
            }
            $records['alerts_min_max_null_mesurement_tables'] = $tr;


            //Product Tale Entries
            $query1 = "SELECT * FROM produktionsAnlagenConfig as t1 ";
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
                    if($value['min_val'] == null  || $value['max_val'] == null ){
                        $tr.= "<td><label class='text-danger'>Min and Max Value Empty</label></td>";
                    }
                    else{
                        $tr.= "<td><label class='badge badge-danger'>NA </label></td>";
                    }

                    $tr.="</tr>";
                }
            }else{
                $tr = "<tr><td colspan='5' class='text-center'>No Data</td></tr>";
            }

            $records['alerts_min_max_null_product_tables'] = $tr;

            echo json_encode($records,JSON_INVALID_UTF8_IGNORE);
            die;

        }
        catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }   

    }
}
$obj = new dashboardController();

?>