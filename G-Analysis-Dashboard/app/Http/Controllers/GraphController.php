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

    public function historicGraph() 
    {
        return View::make("historicCharts");
    }

    /**
     * @param Request $request
     * @return \Illuminate\Support\Collection
     */
    public function getChartsData(Request $request) {
        $measuringPoint = $request['measuringPoint'];
        $limit = $request['limit'];
        $data = DB::table('MessstellenEnergiedaten')->where('MessstellenEnergiedaten.mst_ID',$measuringPoint)
            ->select('MessstellenEnergiedaten.Time', 'MessstellenEnergiedaten.Value')
            ->orderby('MessstellenEnergiedaten.Time','asc')->get();
        return $this->getlineChartData($data, $measuringPoint);
    }

    /**
     * @param $data
     * @param $id
     * @return array
     */
    public function getlineChartData($data, $id) {
        $recordData = $data->IsNotEmpty() ? true: false;
        $label = $data->reverse()->pluck('Time')->toArray();
        $valData = $data->reverse()->pluck('Value')->toArray();
        $amData = [];
        
        foreach($data as $key=>$value){
            $timeData = explode('.',$value->Time);
            array_push($amData, ['date'=>(strtotime($timeData[0]) * 1000), 'value'=>floatval($value->Value), 'time'=>$value->Time,'convertedTime'=>'']);
        }
        return [ 'label'=> $label,'data'=>$valData,'amData'=>$amData, 'id'=>$id , 'record'=>$recordData];
    }

    public function historicData(Request $request) {
        $graphPoints = isset($request->graphPoints)?$request->graphPoints:null;
        $periodFilter = $request->periodFilter;
        if (!empty($request->graphPoints)) {
            $graphArray = explode(',',$graphPoints);
            $graphData = [];
            foreach($graphArray as $val) {
                switch ($periodFilter) {
                    case 'year':
                        $year = $request->yearFilter;
                        $data = DB::table('MessstellenEnergiedaten')->where('MessstellenEnergiedaten.mst_ID',$val)
                        ->select('MessstellenEnergiedaten.Time', 'MessstellenEnergiedaten.Value')
                        ->whereYear('MessstellenEnergiedaten.Time', '=', $year)
                        ->orderby('MessstellenEnergiedaten.Time','desc')->limit(1000)->get();
                        break;
                    case 'month':
                        $month = $request->monthFilter;
                        $data = DB::table('MessstellenEnergiedaten')->where('MessstellenEnergiedaten.mst_ID',$val)
                        ->select('MessstellenEnergiedaten.Time', 'MessstellenEnergiedaten.Value')
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
                        ->select('MessstellenEnergiedaten.Time', 'MessstellenEnergiedaten.Value')
                        ->whereDate('MessstellenEnergiedaten.Time', '>=',$start)
                        ->whereDate('MessstellenEnergiedaten.Time', '<=',$end)
                        ->orderby('MessstellenEnergiedaten.Time','asc')->limit(1000)->get();
                        break;
                    default:
                        return ['code'=>400, 'msg' => 'no record found'];
                }
                $pointData =$this->getlineChartData($data, $val);
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
}
