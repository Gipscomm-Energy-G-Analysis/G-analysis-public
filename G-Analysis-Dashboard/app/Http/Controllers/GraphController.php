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

    public function historicGraph(Request $request) {
        dd($request->all());
    }
}
