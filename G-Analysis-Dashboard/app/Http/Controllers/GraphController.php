<?php

namespace App\Http\Controllers;

use View;
use Config;
use DB;
use App\Models\UsersDatabases;
use Illuminate\Http\Request;
use App\Http\Controllers\UtilityController;
use App\Http\Controllers\ManageDatabaseController;

class GraphController extends Controller
{
    public function __construct()
    {
        $this->database = (new ManageDatabaseController)->checkDB($_SESSION['nameDB']);
        $this->database_result = (new ManageDatabaseController)->switchDatabase($this->database);
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
            ->orderby('MessstellenEnergiedaten.Time','desc')->limit($limit)->get();
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
        $data = $data->reverse()->pluck('Value')->toArray();
        return ['label'=>$label, 'data'=>$data, 'id'=>$id , 'record'=>$recordData];
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
                        ->orderby('MessstellenEnergiedaten.Time','desc')->limit(10)->get();
                        break;
                    case 'month':
                        $month = $request->monthFilter;
                        $data = DB::table('MessstellenEnergiedaten')->where('MessstellenEnergiedaten.mst_ID',$val)
                        ->select('MessstellenEnergiedaten.Time', 'MessstellenEnergiedaten.Value')
                        ->whereYear('MessstellenEnergiedaten.Time', '=', date('Y'))
                        ->whereMonth('MessstellenEnergiedaten.Time', '=', $month)
                        ->orderby('MessstellenEnergiedaten.Time','desc')->limit(10)->get();
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
                        ->orderby('MessstellenEnergiedaten.Time','asc')->limit(100)->get();
                        break;
                    default:
                        return ['code'=>400, 'msg' => 'no record found'];
                }
                $pointData =$this->getlineChartData($data, $val);
                array_push($graphData, $pointData);
            }
            return ['code'=>200, 'graphData' => $graphData];
        }
        return ['code'=>400, 'msg' => 'no record found'];
    }
}
