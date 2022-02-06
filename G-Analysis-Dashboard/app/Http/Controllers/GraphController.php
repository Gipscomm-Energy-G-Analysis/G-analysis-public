<?php

namespace App\Http\Controllers;

use View;
use Config;
use DB;
use App\Models\UsersDatabases;
use Illuminate\Http\Request;
use App\Http\Controllers\UtilityController;
use App\Http\Controllers\ManageDatabaseController;
use App\Models\GraphConfiguration;

class GraphController extends Controller
{
    public function __construct()
    {
        
        $this->database = (new ManageDatabaseController)->checkDB($_SESSION['nameDB']);
        $this->database_result = (new ManageDatabaseController)->switchDatabase($this->database);
        $this->username = $_SESSION['username'];
    }

    public function showGraph($graph, $limit=null) 
    {
        $limit = !empty($limit)?$limit:5;
        $request = Request::create( '/dashboard/machine', 'POST', ['measuringPoint'=>$graph, 'limit' => $limit]);
        $chartsData = $this->getChartsData( $request);
        $chartData['id'] = $graph;
        return View::make("charts", ["chartData"=>$chartsData]);
    }

    public function getPointsData(Request $request) 
    {
        
        $limit = $request->limit;
        $points = explode(',', $request->points);
        $data = [];
        foreach($points as $key=>$value) {
            $request = Request::create( '/dashboard/machine', 'POST', ['measuringPoint'=>$value, 'limit' => $limit, 'name' => 'messstelle'.($key+1).'IDAnl']);
            $chartsData = $this->getChartsData($request);
            array_push($data, $chartsData);
        }
        return ['code'=>200, 'graphData' => $data];
    }

    public function historicGraph() 
    {
        $databases = (new ManageDatabaseController)->getDatabases();
        return View::make("historicCharts", ['databases' => $databases, 'selectedDatabase' => $this->database]);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Support\Collection
     */
    public function getChartsData(Request $request) {
        $measuringPoint = $request['measuringPoint'];
        $limit = $request['limit'];
        $name = $request['name'];
        $data = DB::table('MessstellenEnergiedaten')->where('MessstellenEnergiedaten.mst_ID',$measuringPoint)
            ->select('MessstellenEnergiedaten.Time', 'MessstellenEnergiedaten.Value', 'MessstellenEnergiedaten.ConvFactor')->limit($limit)
            ->orderby('MessstellenEnergiedaten.Time','asc')->get();
        return $this->getlineChartData($data, $measuringPoint, $name);
    }

    /**
     * @param $data
     * @param $id
     * @return array
     */
    public function getlineChartData($data, $id, $name) {
        $recordData = $data->IsNotEmpty() ? true: false;
        $label = $data->reverse()->pluck('Time')->toArray();
        $valData = $data->reverse()->pluck('Value')->toArray();
        $amData = [];
        
        foreach($data as $key=>$value){
            $timeData = explode('.',$value->Time);
            array_push($amData, ['date'=>(strtotime($timeData[0]) * 1000), 'value'=>floatval(($value->Value*$value->ConvFactor)/4), 'time'=>$value->Time,'convertedTime'=>'']);
            $value->Value = floatval(($value->Value*$value->ConvFactor)/4);
        }
        return [ 'label'=> $label,'data'=>$valData,'amData'=>$amData, 'id'=>$id , 'record'=>$recordData, 'name'=>$name, 'tableData' =>$data ];
    }

    public function historicData(Request $request) {
        $graphPoints = isset($request->graphPoints)?$request->graphPoints:null;
        $periodFilter = $request->periodFilter;
        if (!empty($request->graphPoints)) {
            $graphArray = explode(',',$graphPoints);
            $graphData = [];
            foreach($graphArray as $key=>$val) {
                switch ($periodFilter) {
                    case 'year':
                        $year = $request->yearFilter;
                        $data = DB::table('MessstellenEnergiedaten')->where('MessstellenEnergiedaten.mst_ID',$val)
                        ->select('MessstellenEnergiedaten.Time', 'MessstellenEnergiedaten.Value', 'MessstellenEnergiedaten.ConvFactor')
                        ->whereYear('MessstellenEnergiedaten.Time', '=', $year)
                        ->orderby('MessstellenEnergiedaten.Time','desc')->limit(1000)->get();
                        break;
                    case 'month':
                        $month = $request->monthFilter;
                        $data = DB::table('MessstellenEnergiedaten')->where('MessstellenEnergiedaten.mst_ID',$val)
                        ->select('MessstellenEnergiedaten.Time', 'MessstellenEnergiedaten.Value', 'MessstellenEnergiedaten.ConvFactor')
                        ->whereYear('MessstellenEnergiedaten.Time', '=', date('Y'))
                        ->whereMonth('MessstellenEnergiedaten.Time', '=', $month)
                        ->orderby('MessstellenEnergiedaten.Time','desc')->limit(1000)->get();
                        break;
                    case 'custom':
                        $start = date_create($request->startDate);
                        $start = date_format($start,"Y-m-d H:i:s.u");
                        $end = date_create($request->endDate);
                        $end = date_format($end,"Y-m-d H:i:s.u");
                        $data = DB::table('MessstellenEnergiedaten')->where('MessstellenEnergiedaten.mst_ID',$val)
                        ->select('MessstellenEnergiedaten.Time', 'MessstellenEnergiedaten.Value', 'MessstellenEnergiedaten.ConvFactor')
                        ->whereDate('MessstellenEnergiedaten.Time', '>=',$start)
                        ->whereDate('MessstellenEnergiedaten.Time', '<=',$end)
                        ->orderby('MessstellenEnergiedaten.Time','asc')->limit(1000)->get();
                        break;
                    default:
                        return ['code'=>400, 'msg' => 'no record found'];
                }
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
        return ['status'=> 200 , 'msg' => 'Graph configurations saved successfully.'];
    }

    public function getOtherGraphData() {
        $database = DB::table('graph_configurations')->where('username', $this->username)->get()->toArray();
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
}
