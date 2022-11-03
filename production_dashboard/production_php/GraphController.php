 <?php
// include_once('dbConnection.php');
error_reporting ( -1 ) ;
ini_set ( 'display_errors', 'On' ) ;
require '..\..\/php/DbOperations.php';
session_start () ;
$nameDB = isset($_REQUEST['nameDB']) && !empty($_REQUEST['nameDB']) ? $_REQUEST['nameDB'] : 'g002_badber';
$conn = connectToDB($nameDB);
class GraphController {

    public function __construct() {
        global $conn;
        $this->conn = $conn;
        $action = $_REQUEST['action'];
        $this->username = $_SESSION['username'];
        echo json_encode($this->$action());
    }

    public function getPointsData() 
    {
        $limit = $_REQUEST['limit'];
        $points = explode(',', $_REQUEST['points']);
        $data = [];
        foreach($points as $key=>$value) {
            $chartsData = $this->getChartsData($value, $limit, 'messstelle'.($key+1).'IDAnl');
            array_push($data, $chartsData);
        }
        return ['code'=>200, 'graphData' => $data];
    }


    /**
     * @param Request $request
     * @return \Illuminate\Support\Collection
     */
    public function getChartsData($points, $limit, $name) {
        try {
            session_write_close();
            $measuringPoint = $points;     
            $query = "SELECT TOP ".$limit." MessstellenEnergiedaten.Time, MessstellenEnergiedaten.Value, MessstellenEnergiedaten.ConvFactor FROM MessstellenEnergiedaten WHERE MessstellenEnergiedaten.mst_ID = ".$measuringPoint." ORDER BY MessstellenEnergiedaten.Time asc";
            $data = queryDB ( $this->conn, $query, "read");
            return $this->getlineChartData($data, $measuringPoint, $name);
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }

    /**
     * @param $data
     * @param $id
     * @return array
     */
    public function getlineChartData($data, $id, $name) {
     //   print_r($data);die;
        $recordData = !empty($data) ? true: false;
        $label = [];
        $valData = [];
        $amData = [];
        foreach($data as $key=>$value){
        //    print_r( );die;
            $timeData = $value['Time']->format('Y-m-d H:i:s');
            array_push($amData, ['date'=>(strtotime($timeData) * 1000), 'value'=>floatval(($value['Value']*$value['ConvFactor'])/4), 'time'=>$timeData,'convertedTime'=>'']);
            $value['Value'] = floatval(($value['Value']*$value['ConvFactor'])/4);
            $data[$key]['Time'] = $timeData;
            array_push($valData, $value['Value']);
        }
        return [ 'label'=> $label,'data'=>$valData,'amData'=>$amData, 'id'=>$id , 'record'=>$recordData, 'name'=>$name, 'tableData' =>$data ];
    }

    public function historicData() {
        $graphPoints = isset($_REQUEST['graphPoints']) && !empty($_REQUEST['graphPoints'])?$_REQUEST['graphPoints']:null;
        $periodFilter = $_REQUEST['periodFilter'];

        if (!empty($graphPoints)) {
            $graphArray = explode(',',$graphPoints);
            $graphData = [];
            foreach($graphArray as $key=>$val) {
                switch ($periodFilter) {
                    case 'year':
                        $year = $_REQUEST['yearFilter'];
                        if(empty($year)) {
                            return ['code'=>400, 'msg' => 'No record found!'];
                        }
                        $query = "SELECT TOP 1000 MessstellenEnergiedaten.Time, MessstellenEnergiedaten.Value, MessstellenEnergiedaten.ConvFactor FROM MessstellenEnergiedaten 
                        WHERE MessstellenEnergiedaten.mst_ID = ".$val." AND YEAR(MessstellenEnergiedaten.Time) = ".$year." ORDER BY MessstellenEnergiedaten.Time desc";
                        break;
                    case 'month':
                        $month = $_REQUEST['monthFilter'];
                        $year = $_REQUEST['yearFilter'];
                        if(empty($month)) {
                            return ['code'=>400, 'msg' => 'No record found!'];
                        }
                        if(empty($year)) {
                            return ['code'=>400, 'msg' => 'No record found!'];
                        }
                        $query = "SELECT TOP 1000 MessstellenEnergiedaten.Time, MessstellenEnergiedaten.Value, MessstellenEnergiedaten.ConvFactor FROM MessstellenEnergiedaten 
                        WHERE  MessstellenEnergiedaten.mst_ID = ".$val." AND YEAR(MessstellenEnergiedaten.Time) = ".$year." AND MONTH(MessstellenEnergiedaten.Time) = ".$month." ORDER BY MessstellenEnergiedaten.Time desc";
                        break;
                    case 'custom':
                        $start = date_create($_REQUEST['startDate']);
                        $start = date_format($start,"Y-m-d");
                        $end = date_create($_REQUEST['endDate']);
                        $end = date_format($end,"Y-m-d");
                        $query = "SELECT TOP 1000 MessstellenEnergiedaten.Time, MessstellenEnergiedaten.Value, MessstellenEnergiedaten.ConvFactor FROM MessstellenEnergiedaten 
                        WHERE MessstellenEnergiedaten.mst_ID = ".$val." AND cast (MessstellenEnergiedaten.Time as date) >= '".$start."' AND cast (MessstellenEnergiedaten.Time as date) <= '".$end."' ORDER BY MessstellenEnergiedaten.Time desc";
                        break;
                    default:
                        return ['code'=>400, 'msg' => 'No record found!'];
                }
                // $data = $this->conn->query($query)->fetchAll();
                $data = queryDB ( $this->conn, $query, "read");
                $name = 'messstelle'.($key+1).'IDAnl';
                $pointData =$this->getlineChartData($data, $val, $name);
                array_push($graphData, $pointData);
            }
            if (empty($graphData)) {
                return ['code'=>400, 'graphData' => $graphData, 'msg' => 'no record found'];
            }
            return ['code'=>200, 'graphData' => $graphData];
        }
        return ['code'=>400, 'msg' => 'no record found'];
    }

    public function getGraphConfiguration(){
        try {
            $username = $_SESSION['username'];
            $machineId = $machineId = isset($_POST['id']) && !empty($_POST['id'])?$_POST['id']:$this->getMachineId();
            $selectQuery = "SELECT * FROM graph_configurations WHERE username= '$username'";
            $record = queryDB ( $this->conn, $selectQuery, "read");
            
            if(!empty($record)) {
                $prodDataRecords = $this->makeProductGraphData(5, $record, $machineId);
                return ['status' => 'success', 'code' => 200, 'graphData' => $prodDataRecords['data'], 'message' => 'Configuration Data Fetched.'];
            }
            return ['status' => 'warning', 'code' => 400, 'data' => [], 'message' => 'No Record Found!'];
        }catch (Exception $e) {
            return ['status' => 'error', 'code' => 500, 'message' => $e->getMessage()];
        }
    }
    
    public function makeProductGraphData($limit, $record, $machineID) {
        try {
            $prodGraphPoints = [];
            foreach($record as $value) {
                $selectQuery = "SELECT TOP $limit ".$value['label']." as value, zeitstempel as Time FROM ProdData_ WHERE anl_ID='$machineID' ORDER BY zeitstempel desc";
                $prodData = queryDB ( $this->conn, $selectQuery, "read");
                if(!empty($prodData)) {
                    $getProductionDataPoints = $this->getProductionChartData($prodData, $machineID, $value['graph_name']);
                    array_push($prodGraphPoints, $getProductionDataPoints);
                }

            }
            return ['status' => 'success', 'code' => 200, 'data' => $prodGraphPoints, 'message' => 'Configuration Data Fetched.'];
        } catch (Exception $e) {
            return ['status' => 'error', 'code' => 500, 'message' => $e->getMessage()];
        }
    }
    
    /**
     * @param $data
     * @param $id
     * @return array
     */
    public function getProductionChartData($data, $id, $name) {
        $recordData = !empty($data) ? true: false;
        $label = [];
        $valData = [];
        $amData = [];
        foreach($data as $key=>$value){
            $timeData = $value['Time']->format('Y-m-d H:i:s');
            array_push($amData, ['date'=>(strtotime($timeData) * 1000), 'value'=>floatval($value['value']), 'time'=>$timeData,'convertedTime'=>'']);
            $value['value'] = floatval($value['value']);
            array_push($valData, $value['value']);
        }
        return [ 'label'=> $label,'data'=>$valData,'amData'=>$amData, 'id'=>$id , 'record'=>$recordData, 'name'=>$name, 'tableData' =>$data ];
    }

    public function historicDataProduction() {
        $username = $_SESSION['username'];
        $dataArray = isset($_POST['dataResult']) && !empty($_POST['dataResult'])?$_POST['dataResult']:null;
        $dataIndex = isset($_POST['machineIndex']) && !empty($_POST['machineIndex'])?$_POST['machineIndex']:null;
        $graphType = isset($_POST['graphType'])?$_POST['graphType']:'production';
      //  $machineID = isset($_POST['id']) && !empty($_POST['id'])?$_POST['id']:$dataArray[$dataIndex];

        $selectQuery = "SELECT label, graph_name, graph_text FROM graph_configurations WHERE username= '$username'";
        $record = queryDB ( $this->conn, $selectQuery, "read");
        $productionArray = [];
        $prodGraphPoints = [];
        $columnString = '';
        foreach($record as $value) {
            $columnString .= 'ProdData.'.$value['label'].',';
            array_push($productionArray, ['name'=>$value['graph_name'], 'label'=>$value['label']]);
        }
        $columnString = $this->str_lreplace(',', '', $columnString);
        $periodFilter = $_REQUEST['periodFilter'];
        $limit = isset($_POST['limit']) && !empty($_POST['limit'])?$_POST['limit']:5;
        if (!empty($record)) {
            $graphData = [];
            switch ($periodFilter) {
                case 'year':
                    $year = $_REQUEST['yearFilter'];
                    if(empty($year)) {
                        return ['code'=>400, 'msg' => 'No record found!'];
                    }
                    // $query = "SELECT TOP 1000 ".$value['label']." as value, zeitstempel as Time FROM ProdData_ WHERE anl_ID='$machineID' 
                    // AND YEAR(zeitstempel) = ".$year." ORDER BY zeitstempel desc";
                    $query = "SELECT TOP 1000 ".$columnString.", ProdData.timeUnlock, ProdData.timeClose, ProdData.auftrag, produkte.namePrd, ProdData.artikelnummer, ProdData.verbrauchAuftrag FROM ProdData LEFT JOIN produkte ON ProdData.artikelnummer=produkte.artikelNrPrd WHERE ProdData.anl_ID='265' AND YEAR(ProdData.timeUnlock) = ".$year." ORDER BY ProdData.timeUnlock ASC";
                    break;
                case 'month':
                    $month = $_REQUEST['monthFilter'];
                    $year = $_REQUEST['yearFilter'];
                    if(empty($month)) {
                        return ['code'=>400, 'msg' => 'No record found!'];
                    }
                    if(empty($year)) {
                        return ['code'=>400, 'msg' => 'No record found!'];
                    }
                    $query = "SELECT TOP 1000 ".$columnString.", ProdData.timeUnlock, ProdData.timeClose, ProdData.auftrag, produkte.namePrd, ProdData.artikelnummer, ProdData.verbrauchAuftrag FROM ProdData LEFT JOIN produkte ON ProdData.artikelnummer=produkte.artikelNrPrd WHERE ProdData.anl_ID='265' AND YEAR(ProdData.timeUnlock) = ".$year." AND MONTH(ProdData.timeUnlock) = ".$month." ORDER BY ProdData.timeUnlock ASC";
                    break;
                case 'custom':
                    $start = date_create($_REQUEST['startDate']);
                    $start = date_format($start,"Y-m-d");
                    $end = date_create($_REQUEST['endDate']);
                    $end = date_format($end,"Y-m-d");
                    $query = "SELECT TOP 1000 ".$columnString.", ProdData.timeUnlock, ProdData.timeClose, ProdData.auftrag, produkte.namePrd, ProdData.artikelnummer, ProdData.verbrauchAuftrag FROM ProdData LEFT JOIN produkte ON ProdData.artikelnummer=produkte.artikelNrPrd WHERE ProdData.anl_ID='265' AND cast (ProdData.timeUnlock as date) >= '".$start."' AND cast (ProdData.timeUnlock as date) <= '".$end."' ORDER BY ProdData.timeUnlock ASC";
                    break;
                default:
                    return ['code'=>400, 'msg' => 'no record found'];
            }
            // $data = $this->conn->query($query)->fetchAll();
            $data = queryDB ( $this->conn, $query, "read");
            foreach($productionArray as $key=>$value){
                $getProductionDataPoints = $this->makeProductionGraphData($data, $key, $value['name'], $value['label'], $graphType);
                array_push($prodGraphPoints, $getProductionDataPoints);
            }
            //print_r($prodGraphPoints);die;
            if (empty($prodGraphPoints)) {
                return ['code'=>400, 'graphData' => $prodGraphPoints, 'msg' => 'no record found'];
            }
            return ['code'=>200, 'graphData' => $prodGraphPoints];
        }
        return ['code'=>400, 'msg' => 'no record found'];
    }

    public function saveGraphConfigurations(Request $request) {
        $columnData = [
            "graph_name" =>  $request->graph_name,
            "username" => $this->username
        ];
       
        $data=array(
            "is_open" =>  $request->accordion_setting,
            "label"   =>  $request->label_name,
            "status"  =>  '1');
        GraphConfiguration::updateOrCreate($columnData, $data);
        return ['status'=> 200 , 
        'msg' => 'Graph configurations saved successfully.'];
    }

    public function getOtherGraphData() {
        $database = DB::table('graph_configuration')->where('username', $this->username)->get()->toArray();
        return ['status'=> 200 , 'data' => $database];
    }

    public function deleteOtherGraphData(Request $request) {
        $id = $request->id;
        $database = DB::table('graph_configurations')->where('id', $id)->delete();
        $graph = DB::table('graph_configurations')->where('username', $this->username)->get()->toArray();
        return ['status'=> 200 , 'data' => $graph];
    }

    public function getDynamicFilterData() {
        $database = DB::connection('sqlsrvSuperAdmin')->table('prodDashFilterTimeInterval')->get()->toArray();
        return ['status'=> 200 , 'data' => $database];
    }

    public function pluckDatafromArray($data, $varIndex) {
        $data_var = [];
        if(!empty($data)) {
            foreach($data as $value) { 
                array_push($data_var, $value[$varIndex]);
            }
        }
        return $data_var;
    }

    public function getProdDataInfo() {
        try {
            $username = $_SESSION['username'];
            $selectQuery = "SELECT label, graph_name, graph_text FROM graph_configurations WHERE username= '$username'";
            $record = queryDB ( $this->conn, $selectQuery, "read");
            $graphType = isset($_POST['graphType'])?$_POST['graphType']:null;
            $productionArray = [];
            $limit = isset($_POST['limit'])?$_POST['limit']:5;
            $columnString = '';
            $energy_point_exits = false; 
            foreach($record as $value) {
                $columnString .= 'ProdData.'.$value['label'].',';
                if($value['label'] == 'verbrauchAuftrag') {
                    $energy_point_exits = true; 
                }
                array_push($productionArray, ['name'=>$value['graph_name'], 'label'=>$value['label']]);
            }
            $columnString = $this->str_lreplace(',', '', $columnString);
            $machine_ID = 23;
            $prodGraphPoints = [];

            if($graphType == 'energy') {
                if($energy_point_exits){
                    $query = "SELECT TOP $limit ".$columnString.", ProdData.timeUnlock, ProdData.timeClose, ProdData.auftrag, produkte.namePrd, ProdData.artikelnummer FROM ProdData LEFT JOIN produkte ON ProdData.artikelnummer=produkte.artikelNrPrd WHERE ProdData.anl_ID='265' ORDER BY ProdData.timeUnlock ASC";
                } else {
                    array_push($productionArray, ['name'=>'Energy Data', 'label'=>'verbrauchAuftrag']);
                    $query = "SELECT TOP $limit ".$columnString.", ProdData.timeUnlock, ProdData.timeClose, ProdData.verbrauchAuftrag, ProdData.auftrag, produkte.namePrd, ProdData.artikelnummer FROM ProdData LEFT JOIN produkte ON ProdData.artikelnummer=produkte.artikelNrPrd WHERE ProdData.anl_ID='265' ORDER BY ProdData.timeUnlock ASC";
                } 
            } else {
                $query = "SELECT TOP $limit ".$columnString.", ProdData.timeUnlock, ProdData.timeClose, ProdData.auftrag, produkte.namePrd, ProdData.artikelnummer FROM ProdData LEFT JOIN produkte ON ProdData.artikelnummer=produkte.artikelNrPrd WHERE ProdData.anl_ID='265' ORDER BY ProdData.timeUnlock ASC";
            }
            
            $data = queryDB ( $this->conn, $query, "read");
            
            foreach($productionArray as $key=>$value){
                $getProductionDataPoints = $this->makeProductionGraphData($data, $key, $value['name'], $value['label'], $graphType);
                array_push($prodGraphPoints, $getProductionDataPoints);
            }
            return ['status' => 'success', 'code' => 200, 'graphData' => $prodGraphPoints, 'message' => 'Configuration Data Fetched.'];
        } catch(Exception $e) {
            return ['code' => 'error', 'code' => 500, 'message' => $e->getMessage()];
        }
    }
    
    /**
     * @param $data
     * @param $id
     * @return array
     */
    public function makeProductionGraphData($data, $id, $name, $textLable, $graphType='production') {
        
        $recordData = !empty($data) ? true: false;
        $label = [];
        $valData = [];
        $amData = [];
        $energyData = [];
        $minValue = isset($data[0]['auftrag'])?(int)$data[0]['auftrag']:0;
        $maxValue = isset($data[0]['auftrag'])?(int)$data[0]['auftrag']:0;
        $productInfo = [];
        
        foreach ($data as $key=>$value) {
            $timeData =  (int) $value['auftrag'];
            //array_push($productInfo, [$value['namePrd'] => $value['artikelnummer']]);
            $productInfo[$value['artikelnummer']] = $value['namePrd'].'('.$value['artikelnummer'].')';
            if ($timeData < $minValue) {
                $minValue = $timeData;
            } elseif($timeData > $maxValue ) {
                $maxValue = $timeData;
            }

            //print_r($value);die;
            foreach ($value as $key2 => $prodGraps) {
                //print_r($prodGraps);die;
                if($key2 == $textLable) {
                    if($graphType == 'energy') {
                        array_push($amData, ['x'=>trim($value['auftrag']),'y'=>floatval($prodGraps),'date'=>trim($value['auftrag']), 'value'=>floatval($prodGraps), 'value2'=>floatval($value['verbrauchAuftrag']), 'time'=>$timeData,'convertedTime'=>'']);
                        array_push($energyData, ['x'=>trim($value['auftrag']),'y'=>floatval($value['verbrauchAuftrag']),'date'=>trim($value['auftrag']), 'value'=>floatval($prodGraps), 'value2'=>floatval($value['verbrauchAuftrag']), 'time'=>$timeData,'convertedTime'=>'']);
                    } else {
                        array_push($amData, ['x'=>trim($value['auftrag']),'y'=>floatval($prodGraps),'date'=>trim($value['auftrag']), 'value'=>floatval($prodGraps), 'time'=>$timeData,'convertedTime'=>'']);
                    }
                    
                    $value[$key2] = floatval($prodGraps);
                    array_push($valData, $prodGraps);
                }
            }
        }
        //print_r($productInfo);die;
        return [ 'label'=> $label,'data'=>$valData,'energyData' =>$energyData ,'amData'=>$amData, 'id'=>$id , 'record'=>$recordData, 'name'=>$name, 'tableData' =>$data, 'minValue' => $minValue, 'maxValue' => $maxValue, 'prodInfo' => array_unique($productInfo) ];
    }

    public function str_lreplace($search, $replace, $subject)
    {
        $pos = strrpos($subject, $search);
        if($pos !== false)
        {
            $subject = substr_replace($subject, $replace, $pos, strlen($search));
        }
        return $subject;
    }

    public function getFormulas() {
        try {
            
        } catch(Exception $e) {
            return ['code' => 'error', 'code' => 500, 'message' => $e->getMessage()];
        }
    }

 }
$obj = new GraphController();