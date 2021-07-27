<?php

namespace App\Http\Controllers;

use App\Models\UsersDatabases;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\ProductData;
use App\Models\Organisation;
use App\Models\ProductOverview;
use App\Models\Anlagen;
use App\Models\Messstellen;
use App\Models\Messmittel;
use App\Models\DataValue15m;
use App\Models\Liegenschaften;
use Illuminate\Support\Str;
use App\Http\Controllers\ManageDatabaseController;

use View;
use Config;
use DB;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $database = $_SESSION['nameDB'];
        $username = $_SESSION['username'];
        if($_SESSION['nameDB'] == 'gipscomm'){
            $result = (new ManageDatabaseController)->switchDatabase($database);
            $dBname = DB::table("Users")->select('nameDB')
                     ->where('username',$username)->first();
            $dBname   = (array)$dBname;
            $database = $dBname['nameDB'];
        }
        $result = (new ManageDatabaseController)->switchDatabase($database);
        if(!empty($result['database'])){
            $org= $this->getOrganisations($database);
            $org = (array)$org;
            $request = Request::create( '/dashboard/machine', 'POST', ['orgId'=>$org['org'][0]['org_ID'], 'dbName'=>$database]);
            $property = $this->getPropertyData($request);
            if(!empty($org)){
                $machines = DB::table("Anlagen")
                    ->whereNotNull('datumAnl')
                    ->where('lieg_ID',$property[0])
                    ->where('deleted',0)->first();
                $machines=(array)$machines;
                if(!empty($machines)){
                    $request = Request::create( '/dashboard/machine', 'POST', ['id'=>$machines['anl_ID'], 'type'=>'current','prop_id'=>'']);
                    $data = $this->getMachineDetail($request);
                    $tables = $this->getAllTables();
                    $table= $tables['table'];
                    $table = json_decode(json_encode($table), true);
                    return View::make("product", ["data"=>$data['data'],"org"=>$org["org"],"message"=>$data['message'],"tables"=>$table]);
                }
                else{
                    return View::make("product", ["data"=>"",'message'=>'Data Not Found in Anlagen Table!']);
                }
            }
        }

    }
    public function getMachineDetail(Request $request)
    {
        $id = $request['id'];
        $type = $request['type'];
        $lieg_ID = $request['prop_id'];
        $machineData = null;
        $prodData = [];
        if(($lieg_ID!='')){
            switch ($type) {
                case 'first':
                    $machineData = Anlagen::whereNotNull('datumAnl')->where('deleted',0)->where('lieg_ID',$lieg_ID)->first();
                    break;
                case 'next':
                    $machineData = Anlagen::whereNotNull('datumAnl')->where('deleted',0)->where('lieg_ID',$lieg_ID)->where('anl_ID', '>', $id)->orderBy('anl_ID')->first();
                    break;
                case 'prev':
                    $machineData = Anlagen::whereNotNull('datumAnl')->where('deleted',0)->where('lieg_ID',$lieg_ID)->where('anl_ID', '<', $id)->orderBy('anl_ID','desc')->first();
                    break;
                case 'last':
                    $machineData = Anlagen::whereNotNull('datumAnl')->where('deleted',0)->where('lieg_ID',$lieg_ID)->orderBy('anl_ID','desc')->first();
                    break;
                case 'current':
                    $machineData = Anlagen::whereNotNull('datumAnl')->where('deleted',0)->where('lieg_ID',$lieg_ID)->where('anl_ID', $id)->first();
                    break;
                default:
                    break;
            }
        }
        else{
            switch ($type) {
                case 'first':
                    $machineData = Anlagen::whereNotNull('datumAnl')->where('deleted',0)->first();
                    break;
                case 'next':
                    $machineData = Anlagen::whereNotNull('datumAnl')->where('deleted',0)->where('anl_ID', '>', $id)->orderBy('anl_ID')->first();
                    break;
                case 'prev':
                    $machineData = Anlagen::whereNotNull('datumAnl')->where('deleted',0)->where('anl_ID', '<', $id)->orderBy('anl_ID','desc')->first();
                    break;
                case 'last':
                    $machineData = Anlagen::whereNotNull('datumAnl')->where('deleted',0)->orderBy('anl_ID','desc')->first();
                    break;
                case 'current':
                    $machineData = Anlagen::whereNotNull('datumAnl')->where('deleted',0)->where('anl_ID', $id)->first();
                    break;
                default:
                    break;
            }
        }

        if(!empty($machineData)){
            $machineName = explode (   '-' ,$machineData['nummerAnl'] );
            $machineName = $machineName[0];
            $table_check= DB::getSchemaBuilder()->hasTable('TWP_PROD_OVERVIEW');
            if($table_check==1){
                $prodData = ProductOverview::where('MANAME',$machineName)->orderBy('id', 'desc')->first();
                if(!empty($prodData)){
                    $shards = 0;
                    $chartsData = collect();
                    $measuringPoint = [];
                    for ($i=1;$i <= 4;$i++){
                        if(!empty($machineData['messstelle'.$i.'IDAnl'])) {
                            $shards++;
                            $measuringPoint['messstelle'.$i.'IDAnl'] = $machineData['messstelle'.$i.'IDAnl'];
                            $request = Request::create( '/dashboard/machine', 'POST', ['measuringPoint'=>$machineData['messstelle'.$i.'IDAnl'], 'limit' => 5]);
                            $chartsData->put('messstelle'.$i.'IDAnl',$this->getChartsData( $request));
                        }
                    }
                    $prodData =[
                        'anlage' => Str::of($prodData['MANAME'])->trim(),
                        'programm' => Str::of($prodData['STATETEXT'])->trim(),
                        'artikel' => Str::of($prodData['MAORDER'])->trim(),
                        'bestellung' =>  Str::of($prodData['MPSNAME'])->trim(),
                        'bisher_produziert' => (int)($prodData['AMOUNT_GOOD']),
                        'auftragsmenge' => (int)($prodData['AMOUNT_REQUEST']),
                        'gutmenge' => (int)($prodData['AMOUNT_GOOD']),
                        'ausschuss' => (int)($prodData['AMOUNT_BAD']),
                        'zeit_zyklus' => number_format($prodData['CYCLETIME'], 2),
                        'letzte_störung' => Str::of($prodData['LASTUPDATE'])->trim(),
                        'werkzeug' => Str::of($prodData['TOOLNAME'])->trim(),
                        'kavitäten' =>(int)$prodData['CAVITY'],
                        'anl_ID' => $machineData['anl_ID'],
                        'bildAnl' => $machineData['bildAnl'],
                        'shards' => $shards,
                        'machineshards' => $measuringPoint,
                        'shardsData' => $measuringPoint,
                        'chartsData' => $chartsData
                    ];

                    return ['code'=>200, 'data' =>$prodData, 'anl_ID'=>$machineData['anl_ID'], 'message'=>'Data Retrived Successfully.'];
                } else{
                    return ['code'=>401, 'data' =>$prodData, 'anl_ID'=>$machineData['anl_ID'], 'message'=>'No Record Found in TWP_PROD_OVERVIEW Table!'];
                }
            }
            else{
                return ['code'=>401, 'data' =>$prodData, 'message'=>'TWP_PROD_OVERVIEW Table Not Found'];
            }
        } else {
            return ['code'=>401, 'data' =>"", 'message'=>'No Record Found!'];
        }
    }

    public function getMachineTableData(Request $request) {
        $pageIndex = $request['pageIndex'];
        $limit = $request['pageSize'];
        $totalRecords = Anlagen::whereNotNull('datumAnl')->where('deleted',0)->count();
        $totalPages = ceil($totalRecords / $limit);

        $start = $limit * $pageIndex - $limit; // do not put $limit*($page - 1)
        if($start < 0) $start = 0;
        $data = Anlagen::select('anl_ID', 'datumAnl', 'nummerAnl', 'bezeichnungAnl')->whereNotNull('datumAnl')->where('deleted',0)->limit($limit)->offset($start)->get();
        return [ 'data'=> $data, 'itemsCount'=> $totalRecords];
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

    /**
     * @param $database
     * @return array
     */
    public function getOrganisations($database) {
        $result = (new ManageDatabaseController)->switchDatabase($database);
        if(!empty($result['database'])){
            $org  = Organisation::get()->toArray();
            return ['org'=>$org];
        }
    }

    /**
     * @param Request $request
     * @return mixed
     */
    public function getPropertyData(Request $request) {
        $orgId = $request['orgId'];
        $dbName = $request['dbName'];
        $result = (new ManageDatabaseController)->switchDatabase($dbName);
        if(!empty($result['database'])){
            $prop  = Liegenschaften::where('org_ID',$orgId)->get()->toArray();
            return $prop;
        }
    }

    /**
     * @return mixed
    */
    public function getAllTables()
    {
        $database = $_SESSION["nameDB"];
        $result = (new ManageDatabaseController)->switchDatabase($database);
        if(!empty($result['database'])){
            $tables = DB::select("SELECT TABLE_NAME FROM information_schema.tables where table_type='Base Table' order by table_name asc");
            return ['table'=>$tables];
        }
    }
    /**
     * @param Request $request
     * @return mixed
    */
    public function getTableColumns(Request $request)
    { 
        $table = $request['table'];
        $dbName = $request['dbName'];
        $result = (new ManageDatabaseController)->switchDatabase($dbName);
        if(!empty($result['database'])){
            return DB::getSchemaBuilder()->getColumnListing($table);
        }
    }
}
