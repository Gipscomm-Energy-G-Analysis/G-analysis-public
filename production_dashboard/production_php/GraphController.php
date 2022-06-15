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
            $measuringPoint = $points;
            global $conn;      
            $query = "SELECT TOP ".$limit." MessstellenEnergiedaten.Time, MessstellenEnergiedaten.Value, MessstellenEnergiedaten.ConvFactor FROM MessstellenEnergiedaten WHERE MessstellenEnergiedaten.mst_ID = ".$measuringPoint." ORDER BY MessstellenEnergiedaten.Time asc";
            
            // $data = $this->conn->query($query)->fetchAll();
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
                        $query = "SELECT TOP 1 MessstellenEnergiedaten.Time, MessstellenEnergiedaten.Value, MessstellenEnergiedaten.ConvFactor FROM MessstellenEnergiedaten 
                        WHERE MessstellenEnergiedaten.mst_ID = ".$val." AND YEAR(MessstellenEnergiedaten.Time) = ".date('Y')." ORDER BY MessstellenEnergiedaten.Time desc";
                        break;
                    case 'month':
                        $month = $_REQUEST['monthFilter'];
                        $query = "SELECT TOP 1000 Messstellmst_ID = ".$val." AND YEAR(MenEnergiedaten.Time, MessstellenEnergiedaten.Value, MessstellenEnergiedaten.ConvFactor FROM MessstellenEnergiedaten 
                        WHERE MessstellenEnergiedaten.essstellenEnergiedaten.Time) = ".date('Y')." AND MessstellenEnergiedaten.Time = ".$month." ORDER BY MessstellenEnergiedaten.Time desc";
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
                        return ['code'=>400, 'msg' => 'no record found'];
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

    public function saveGraphConfigurations(Request $request) {
        $columnData = [
            "graph_name" =>  $request->graph_name,
            "username" => $this->username
        ];
       
        $data=array(
            "is_open"   =>  $request->accordion_setting,
            "label"     =>  $request->label_name,
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
 }
$obj = new GraphController();