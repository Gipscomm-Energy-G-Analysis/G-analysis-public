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
use App\Models\DashboardProduktionConfig;
use App\Models\ErweiterungenAnlagen;
use App\Models\subGroupOptions;
use App\Http\Controllers\ManageDatabaseController;
use Illuminate\Support\Str;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use View;
use Config;
use DB;
use App\Http\Controllers\MigrationController;
use App\Http\Controllers\UtilityController;

class DashboardController extends Controller
{
    public function __construct()
    {
        $this->database = (new ManageDatabaseController)->checkDB($_SESSION['nameDB']);
        $this->database_result = (new ManageDatabaseController)->switchDatabase($this->database);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $username = $_SESSION['username'];
        $res =[];
        $column = [];
        $groupData =[];
        if(!empty($this->database_result)){
            $org= $this->getOrganisations($this->database);
            if(!empty($org)){
                $org = (array)$org;
                $request = Request::create( '/dashboard/machine', 'POST', ['orgId'=>$org['org'][0]['org_ID'], 'dbName'=>$this->database]);
                $property = $this->getPropertyData($request);
                if (!empty($org)) {
                    $machines = DB::table("Anlagen")
                        ->whereNotNull('datumAnl')
                        ->where('lieg_ID',$property[0])
                        ->where('deleted',0)->first();
                    $machines=(array)$machines;
                    if (!empty($machines)) {
                        $tables = $this->getAllTables();
                        $table= $tables['table'];
                        $table = json_decode(json_encode($table), true);
                        $groupData = $this->getGroup();
                        $request = Request::create( '/dashboard/machine', 'POST', ['id'=>$machines['anl_ID'], 'type'=>'current','prop_id'=>'']);
                        $data = $this->getMachineDetail($request);
    
                        return View::make("product", ["data"=>$data['data'], "org"=>$org["org"], "message"=>$data['message'], "tables"=>$table, "dynamic_fields"=>$res, 'groupData'=>$groupData, "subGroupConfig"=>$data['subGroupConfig'], 'dynamicData' => $data['dynamicData']]);
                    } else {
                        return View::make("product", ["data"=>"",'message'=>'Data Not Found in Anlagen Table!']);
                    }
                }
            } else {
                return View::make("product", ["data"=>"",'message'=>'Data Not Found in Organisation Table!']);
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
        $colData =[];
        $prod = [];
        $customColumns = [];
        if(($lieg_ID!='')){
            switch ($type) {
                case 'first':
                    $machineData = DB::table('anlagen')->whereNotNull('datumAnl')->where('deleted',0)->where('lieg_ID',$lieg_ID)->first();
                    break;
                case 'next':
                    $machineData = DB::table('anlagen')->whereNotNull('datumAnl')->where('deleted',0)->where('lieg_ID',$lieg_ID)->where('anl_ID', '>', $id)->orderBy('anl_ID')->first();
                    break;
                case 'prev':
                    $machineData = DB::table('anlagen')->whereNotNull('datumAnl')->where('deleted',0)->where('lieg_ID',$lieg_ID)->where('anl_ID', '<', $id)->orderBy('anl_ID','desc')->first();
                    break;
                case 'last':
                    $machineData = DB::table('anlagen')->whereNotNull('datumAnl')->where('deleted',0)->where('lieg_ID',$lieg_ID)->orderBy('anl_ID','desc')->first();
                    break;
                case 'current':
                    $machineData = DB::table('anlagen')->whereNotNull('datumAnl')->where('deleted',0)->where('lieg_ID',$lieg_ID)->where('anl_ID', $id)->first();
                    break;
                default:
                    break;
            }
        }
        else{
            switch ($type) {
                case 'first':
                    $machineData = DB::table('anlagen')->whereNotNull('datumAnl')->where('deleted',0)->first();
                    break;
                case 'next':
                    $machineData = DB::table('anlagen')->whereNotNull('datumAnl')->where('deleted',0)->where('anl_ID', '>', $id)->orderBy('anl_ID')->first();
                    break;
                case 'prev':
                    $machineData = DB::table('anlagen')->whereNotNull('datumAnl')->where('deleted',0)->where('anl_ID', '<', $id)->orderBy('anl_ID','desc')->first();
                    break;
                case 'last':
                    $machineData = DB::table('anlagen')->whereNotNull('datumAnl')->where('deleted',0)->orderBy('anl_ID','desc')->first();
                    break;
                case 'current':
                    $machineData = DB::table('anlagen')->whereNotNull('datumAnl')->where('deleted',0)->where('anl_ID', $id)->first();
                    break;
                default:
                    break;
            }
        }
        if(!empty($machineData) > 0){
            $subGroupId = $this->getSubGroupid($machineData->custom1Anl);
            $primary_key = $this->getPrimaryKey($subGroupId);
            $machineName = explode (   '-' ,$machineData->nummerAnl);
            $machineName = $machineName[0];
            $table_check= DB::getSchemaBuilder()->hasTable('TWP_PROD_OVERVIEW');
            $subGroupConfig = [];
            if($table_check==1){
                $prodData = DB::table('TWP_PROD_OVERVIEW')->where('MANAME',$machineName)->orderBy('id', 'desc')->first();
                if(!empty($prodData)){
                    $shards = 0;
                    $chartsData = collect();
                    $measuringPoint = [];
                    for ($i=1; $i <= 4; $i++){
                        $string = 'messstelle'.$i.'IDAnl';
                        if(!empty($machineData->$string)) {
                            $shards++;
                            $measuringPoint['messstelle'.$i.'IDAnl'] = $machineData->$string;
                            $request = Request::create( '/dashboard/machine', 'POST', ['measuringPoint'=>$machineData->$string, 'limit' => 5]);
                            $chartsData->put($string,$this->getChartsData( $request));
                        }
                    }
                    
                    $dynamicData  = [
                        'anlage' => Str::of($prodData->MANAME)->trim(),
                        'auftragsmenge' => (int)($prodData->AMOUNT_REQUEST),
                        'programm' => Str::of($prodData->STATETEXT)->trim(),
                        'zeit_zyklus' => number_format($prodData->CYCLETIME, 2),
                        'bestellung' =>  Str::of($prodData->MPSNAME)->trim(),
                        'werkzeug' => Str::of($prodData->TOOLNAME)->trim(),
                        'artikel' => Str::of($prodData->MAORDER)->trim(),
                        'kavitäten' =>(int)$prodData->CAVITY,
                        'gutmenge' => (int)($prodData->AMOUNT_GOOD),
                        'letzte_störung' => Str::of($prodData->LASTUPDATE)->trim(),
                        'ausschuss' => (int)($prodData->AMOUNT_BAD),
                        'bisher_produziert' => (int)($prodData->AMOUNT_GOOD),
                    ];

                    $prodData =[
                        'anl_ID' => $machineData->anl_ID,
                        'bildAnl' => $machineData->bildAnl,
                        'shards' => $shards,
                        'machineshards' => $measuringPoint,
                        'shardsData' => $measuringPoint,
                        'chartsData' => $chartsData
                    ];

                    

                    $customColumns = $this->splitArray(array_merge($dynamicData, $this->getCustomFieldData($machineData)));
                //    dd($customColumns);
                 //   array_push($prodData, $prod);
                   // if(!empty($primary_key)) {
                      //  $primary_key = $machineData->$primary_key;
                     //   $subGroupConfig = $this->getSubgroupData($subGroupId , $primary_key);
                        $subGroupConfig = $this->getSubgroupData('194', '2');
                  //  }
                    
                    return ['code'=>200, 'data' =>$prodData, 'dynamicData' => $customColumns ,'anl_ID'=>$machineData->anl_ID, 'subGroupConfig' => $subGroupConfig, 'message'=>'Data Retrived Successfully.'];
                } else{
                    return ['code'=>401, 'data' =>$prodData, 'dynamicData' => $customColumns , 'anl_ID'=>$machineData->anl_ID, 'subGroupConfig' => $subGroupConfig, 'message'=>'No Record Found in TWP_PROD_OVERVIEW Table!'];
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
        $data = Anlagen::select('anl_ID', 'datumAnl', 'nummerAnl', 'bezeichnungAnl')
        ->whereNotNull('datumAnl')
        ->where('deleted',0)
        ->limit($limit)
        ->offset($start)
        ->get();
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
        if(!empty($this->database_result)){
            $org  = Organisation::get()->toArray();
            if(count($org) > 0){
                return ['org'=>$org];
            }
        }
    }

    /**
     * @param Request $request
     * @return mixed
     */
    public function getPropertyData(Request $request) {
        $orgId = $request['orgId'];
        $dbName = $request['dbName'];
        if(!empty($this->database_result)){
            $prop  = Liegenschaften::where('org_ID',$orgId)->get()->toArray();
            return $prop;
        }
    }

    /**
     * @return mixed
    */
    public function getAllTables(){
        if(!empty($this->database_result)){
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
        if(!empty($this->database_result)){
            return DB::getSchemaBuilder()->getColumnListing($table);
        }
    }
    /**
     * @param Request $request
     * @return mixed
    */
    public function saveFields(Request $request){ 
        $anl_ID     = $request['anl_ID'];
        $dbName     = $request['dbName'];
        $username   = $request['username'];
        $label      = $request['label'];
        $tableName  = $request['tableName'];
        $columnName = $request['columnName'];
        $primaryKey = $request['primaryKey'];
        $foreignKey = $request['foreignKey'];
        if(!empty($this->database_result)){
            $table_check= DB::getSchemaBuilder()->hasTable('dashboardProduktionConfig');
            if(!$table_check == 1){
                MigrationController::createDashboardProduktionConfigTable();
                $data=array(
                    "anl_ID"        =>  $anl_ID,
                    "username"      =>  $username,
                    "dbName"        =>  $dbName,
                    "label_name"    =>  $label,
                    "table_name"    =>  $tableName,
                    "column_name"   =>  $columnName,
                    "primary_key"   =>  $primaryKey,
                    "foreign_key"   =>  $foreignKey);
                DashboardProduktionConfig::insert($data);
                $msg = "Record inserted successfully.";
            } else {
                $data = DashboardProduktionConfig::where('table_name',$tableName)
                        ->where('column_name',$columnName)
                        ->where('username',$username)
                        ->where('anl_ID',$anl_ID)
                        ->count();
               if ($data < 1) {
                    $data=array(
                        'anl_ID'        =>  $anl_ID,
                        'username'      =>  $username,
                        "dbName"        =>  $dbName,
                        'label_name'         =>  $label,
                        "table_name"     =>  $tableName,
                        "column_name"    =>  $columnName,
                        "primary_key"   =>  $primaryKey,
                        "foreign_key"   =>  $foreignKey);
                    DashboardProduktionConfig::insert($data);
                    $msg = "Record inserted successfully.";
               } else {
                    $data = DashboardProduktionConfig::where('table_name',$tableName)
                    ->where('anl_ID',$anl_ID)
                    ->where('column_name',$columnName)
                    ->where('username',$username)
                    ->update(['label_name' => $label, 'primary_key' => $primaryKey, 'foreign_key' => $foreignKey]);
                    $msg = "Record Updated Successfully";
               }
            }
        }
        return ['status'=>200, 'msg' => $msg];
    }

    public function checkDB($database){
        $database = $_SESSION['nameDB'];
        $username = $_SESSION['username'];
        if($_SESSION['nameDB'] == 'gipscomm'){
            $result = (new ManageDatabaseController)->switchDatabase($database);
            $dBname = DB::table("Users")->select('nameDB')
                     ->where('username',$username)->first();
            $dBname   = (array)$dBname;
            $database = $dBname['nameDB'];
        }
        return $database;
    }
    
    public function getGroup(){
        $groupData=[];
        if(!empty($this->database_result)){
            $table_check= DB::getSchemaBuilder()->hasTable('ErweiterungenAnlagen');
            if($table_check == 1){
                $table_check2= DB::getSchemaBuilder()->hasTable('subGroupOptions');
                if($table_check2 == 1){
                    $result1 = subGroupOptions::get()->toArray();
                    if(count($result1)>0){
                        $result = DB::table('ErweiterungenAnlagen')
                                ->join('subGroupOptions', 'ErweiterungenAnlagen.eAnl_ID', '=', 'subGroupOptions.group_id')
                                ->get()
                                ->toArray();
                        if(count($result)>0){
                            $groupData = $result;
                        }  
                    }
                    else{
                        $result = ErweiterungenAnlagen::get()->toArray();
                        if(count($result)>0){
                            $groupData = $result;
                        }
                    }  
                } else {
                    $result = ErweiterungenAnlagen::get()->toArray();
                    Schema::create('subGroupOptions', function (Blueprint $table) {
                        $table->id();
                        $table->string('option_name');
                        $table->string('group_id');
                        //$table->timestamps();
                    });
                    foreach($result as $option){
                        $groupId = $option['eAnl_ID'];
                        $options = explode(',', $option['optionen']);
                        foreach($options as $stringOptions){
                            $data=array('option_name'=>$stringOptions, "group_id"=>$groupId);
                            subGroupOptions::insert($data);
                        }
                    }
                    $result = subGroupOptions::get()->toArray();
                    $msg = "Record inserted successfully.";

                    if(count($result)>0){
                        $groupData = $result;
                    }
                }                
            }else{
                $groupData = "ErweiterungenAnlagen Table not found";
            }
            return ['groupData'=>$groupData];
        }
    }


    public function saveGroupOptions(Request $request)
    { 
        $group_id     = $request['group_id'];
        $option_name  = $request['sub_group_name'];
        $msg = '';
        $data = [];
        if(!empty($this->database_result)){
            $table_check= DB::getSchemaBuilder()->hasTable('subGroupOptions');
            if(!$table_check == 1){
                Schema::create('subGroupOptions', function (Blueprint $table) {
                    $table->id();
                    $table->string('option_name');
                    $table->string('group_id');
                    //$table->timestamps();
                });
                    foreach($option_name as $option){
                        $data=array('option_name'=>$option,"group_id"=>$group_id);
                        subGroupOptions::insert($data);
                    }
                    $data = subGroupOptions::where('group_id', $group_id)->get()->toArray();
                    $msg = "Record inserted successfully.";
            }
            else{
                $data = subGroupOptions::where('group_id',$group_id)
                        ->count();
               if($data < 1){
                    foreach($option_name as $option){
                        $out=array('option_name'=>$option,"group_id"=>$group_id);
                        subGroupOptions::insert($out);
                    }
                    $msg = "Record inserted successfully.";
               }
               else{
                subGroupOptions::where('group_id', $group_id)->delete();
                foreach($option_name as $option){
                    $out=array('option_name'=>$option,"group_id"=>$group_id);
                    subGroupOptions::insert($out);
                }
                $msg = "Record updated successfully.";

               }
               $data = subGroupOptions::where('group_id',$group_id)
                        ->get()->toArray();
            }
            return ['status' => 200, 'msg' =>$msg, 'data'=>$data];
        } else {
            return ['status' => 400, 'msg' =>'Error occured while inserting record.'];
        }
        
    }

    public function getSubgroupData($option , $where) {
        $data = DB::table('SubGroupConfiguration')->where('sub_group_id', $option)->get()->toArray();
        $queryData = UtilityController::createCustomQuery($data, $where);
        if($queryData['status'] == 200){
            $data = DB::table($queryData['table'])
             ->select(DB::raw($queryData['rawSelect']))
             ->where($queryData['foreign_key'], $where)
             ->first();
             
            return $this->splitArray($data);
        }
        return false;
    }

    public function getSubGroupid($option) {
        if(empty($option)) return null;
        $data = DB::table('subGroupOptions')->where('option_name', $option)->first();
        return isset($data->option_name)?$data->option_name:null;
    }

    public function getPrimaryKey($option) {
        if(empty($option)) return null;
        $data = DB::table('SubGroupConfiguration')->select('primary_key')->where('sub_group_id',$option)->first();
        return isset($data->primary_key)?$data->primary_key:null;
    }

    public function splitArray($data) {
        $odd = array();
        $even = array();
        $i = 0;
        if(!empty($data)) {
            foreach ($data as $k => $v) {
                if ($i % 2 == 0) {
                    $even[$k] = $v;
                }
                else {
                    $odd[$k] = $v;
                }
                $i++;
            }
        }
        return ['odd'=>$odd, 'even' =>$even];
    }

    public function getCustomFieldData($machineData) {
        $data = DB::table('dashboardProduktionConfig')->get()->toArray();
        $columnData = [];
        if (!empty($data)) {
            foreach($data as $tableData) {

                $primary_key = $tableData->primary_key;   
                $data = DB::table($tableData->table_name)
                ->select(DB::raw($tableData->column_name.' AS "'.$tableData->label_name.'"'))
                ->where($tableData->foreign_key, $machineData->$primary_key)
                ->first();
                $columnData[$tableData->label_name] = isset($data->label_name)?$data->label_name:null;    
            }
        }
        return $columnData;
    }

    public function getCustomTable() {
        $machineData = Anlagen::whereNotNull('datumAnl')->where('deleted',0)->limit(5)->get();
        $machineDataCustom = [];
        if(!empty($machineData)){
            
            foreach($machineData as $machine) {
                $subGroupId = $this->getSubGroupid($machine->custom1Anl);
                $primary_key = $this->getPrimaryKey($subGroupId);
                $machineName = explode ( '-' ,$machine->nummerAnl);
                $machineName = $machineName[0];
                $subGroupConfig = [];
                $prodData = DB::table('TWP_PROD_OVERVIEW')->where('MANAME',$machineName)->orderBy('id', 'desc')->first();
                if(!empty($prodData)){                    
                    $dynamicData  = [
                        'anlage' => Str::of($prodData->MANAME)->trim(),
                        'auftragsmenge' => (int)($prodData->AMOUNT_REQUEST),
                        'programm' => Str::of($prodData->STATETEXT)->trim(),
                        'zeit_zyklus' => number_format($prodData->CYCLETIME, 2),
                        'bestellung' =>  Str::of($prodData->MPSNAME)->trim(),
                        'werkzeug' => Str::of($prodData->TOOLNAME)->trim(),
                        'artikel' => Str::of($prodData->MAORDER)->trim(),
                        'kavitäten' =>(int)$prodData->CAVITY,
                        'gutmenge' => (int)($prodData->AMOUNT_GOOD),
                        'letzte_störung' => Str::of($prodData->LASTUPDATE)->trim(),
                        'ausschuss' => (int)($prodData->AMOUNT_BAD),
                        'bisher_produziert' => (int)($prodData->AMOUNT_GOOD),
                    ];
                    $customColumns = array_merge($dynamicData, $this->getCustomFieldData($machine));
                    array_push($machineDataCustom, $customColumns);
                }
            }
            $theadData = array_keys($machineDataCustom[0]);
            return ['status' => 200 , 'thead' => $theadData , 'tbody' => $machineDataCustom];
        } else {
            return ['status' => 400 , 'msg' => 'No record found!'];
        }
        
    }
}
