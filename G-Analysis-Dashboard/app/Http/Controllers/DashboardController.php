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
use App\Http\Controllers\GraphController;
use App\Models\GraphConfiguration;

class DashboardController extends Controller
{
    public function __construct()
    {
        $this->database = isset($this->database)?$this->database:(new ManageDatabaseController)->checkDB($_SESSION['nameDB']);
        $this->database_result = isset($this->database_result)?$this->database:(new ManageDatabaseController)->switchDatabase($this->database);
        $this->graphController = isset($this->graphController)?$this->graphController:new GraphController();
        $this->username = $_SESSION['username'];
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
        $databases = (new ManageDatabaseController)->getDatabases();
        if(!empty($this->database_result)){
            MigrationController::runMigrations();
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
                        if($data['code'] == 401) {
                           return  View::make("404", ['message'=>$data['message'], 'databases' => $databases, 'selectedDatabase' => $this->database]);
                        }
                        return View::make("product", ["data"=>$data['data'], 'otherGraphTable'=>$data['otherGraphTable'], 'otherGraph'=>$data['otherGraph'], "org"=>$org["org"], "message"=>$data['message'], "tables"=>$table, "dynamic_fields"=>$res, 'groups'=>$groupData, "subGroupConfig"=>$data['subGroupConfig'], 'dynamicData' => $data['dynamicData'], 'databases' => $databases, 'selectedDatabase' => $this->database]);
                    } else {
                        return View::make("404", ['message'=>'Data Not Found in Anlagen Table!', 'databases' => $databases, 'selectedDatabase' => $this->database]);
                    }
                }
            } else {
                
                return View::make("404", ['message'=>'Data Not Found in Organisation Table!', 'databases' => $databases, 'selectedDatabase' => $this->database]);
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
                    $msGraphData = [];
                    for ($i=1; $i <= 4; $i++){
                        $string = 'messstelle'.$i.'IDAnl';
                        if(!empty($machineData->$string)) {
                            $shards++;
                            $measuringPoint['messstelle'.$i.'IDAnl'] = $machineData->$string;
                            $request = Request::create( '/dashboard/machine', 'POST', ['measuringPoint'=>31, 'limit' => 5]);
                            $chartsData->put($string.$i,$this->graphController->getChartsData( $request));
                            array_push($msGraphData, 31);
                        }
                    }
                    $otherGraphData = $this->getGraphConfigurations($machineData);
                    $msGraphData = implode(',',$msGraphData);
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
                        'chartsData' => $chartsData,
                        'msGraphData' => $msGraphData,
                        'otherGraph' => $otherGraphData
                    ];

                    $customDataMerge = array_merge($dynamicData, $this->getCustomFieldData($machineData));
                    $customColumns = $this->splitArray($customDataMerge, true);
                    $otherGraphTable = (new ManageDatabaseController)->getOtherGraphData($this->username);
                //    dd($customColumns);
                //    dd($customColumns);
                 //   array_push($prodData, $prod);
                   // if(!empty($primary_key)) {
                      //  $primary_key = $machineData->$primary_key;
                     //   $subGroupConfig = $this->getSubgroupData($subGroupId , $primary_key);
                        $subGroupConfig = $this->getSubgroupData('6', '2');
                  //  }
                    
                    $mergeArray = $this->splitArray(array_merge(array_merge($subGroupConfig, $customColumns['extra']['odd']), $customColumns['extra']['even']));
                    
                   // dd($otherGraphData);
                    return ['code'=>200, 'otherGraph'=>$customDataMerge, 'otherGraphTable'=>$otherGraphTable, 'data' =>$prodData, 'dynamicData' => $customColumns ,'anl_ID'=>$machineData->anl_ID, 'subGroupConfig' => $mergeArray, 'message'=>'Data Retrived Successfully.'];
                } else{
                    return ['code'=>401, 'message'=>'No Record Found in TWP_PROD_OVERVIEW Table!'];
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
            // DashboardProduktionConfig::where('username', $this->username)
            // ->update(array('status' => '0'));
            $columnData = [
                "table_name" =>  $tableName,
                "column_name" =>  $columnName,
                "username" => $this->username
            ];
            $data=array(
                "anl_ID"        =>  $anl_ID,
                "dbName"        =>  $dbName,
                "label_name"    =>  $label,
                "status"        =>  '1',
                "primary_key"   =>  $primaryKey,
                "foreign_key"   =>  $foreignKey);
            DashboardProduktionConfig::updateOrCreate($columnData, $data);
        }
        return ['status'=>200, 'msg' => 'Record Inserted Successfully.'];
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
            if ($table_check == 1) {
                $result1 = subGroupOptions::get()->toArray();
                if (count($result1)>0) {
                    $result = DB::table('ErweiterungenAnlagen')
                            ->join('subGroupOptions', 'ErweiterungenAnlagen.eAnl_ID', '=', 'subGroupOptions.group_id')
                            ->get()
                            ->toArray();
                    if(count($result)>0){
                        $groupData = $result;
                    }  
                } else {
                    $result = ErweiterungenAnlagen::get()->toArray();
                    foreach($result as $option){
                        $groupId = $option['eAnl_ID'];
                        $options = explode(',', $option['optionen']);
                        foreach($options as $stringOptions){
                            $data=array(
                            "option_name"=>$stringOptions, 
                            "group_id"=>$groupId,
                            "username"=>$this->username,
                            "status"        =>  '1');
                            subGroupOptions::updateOrCreate($data);
                        }
                    }
                    $result = subGroupOptions::get()->toArray();
                    $msg = "Record inserted successfully.";
                    if (count($result)>0) {
                        $groupData = $result;
                    }
                }
                return ['groupData'=>$groupData];       
            } else {
                $groupData = "ErweiterungenAnlagen Table not found";
                return ['groupData'=>[], 'msg'=>$groupData]; 
            }
            
        }
    }


    public function saveGroupOptions(Request $request)
    { 
        
        $group_id     = $request['group_id'];
        $option_name  = $request['sub_group_name'];
        $msg = '';
        $data = [];
        if(!empty($this->database_result)){
            foreach($option_name as $option){
                $columnData = [
                    "option_name" => $option,
                    "group_id" => $group_id,
                    "username"=>$this->username,
                    "status"        =>  '1'
                ];
                subGroupOptions::updateOrCreate($columnData);
            }
            $msg = "Record updated successfully.";
            $data = subGroupOptions::where('group_id',$group_id)
                    ->get()->toArray();
            return ['status' => 200, 'msg' =>$msg, 'data'=>$data];
        } else {
            return ['status' => 400, 'msg' =>'Error occured while inserting record.'];
        }
    }

    public function getSubgroupData($option , $where) {
        $data = DB::table('SubGroupConfiguration')->where('sub_group_id', $option)
        ->where('username', $this->username)
        ->where('status', '1')
        ->get()->toArray();
        $queryData = UtilityController::createCustomQuery($data, $where);
        
        if($queryData['status'] == 200){
            $data = DB::table($queryData['table'])
             ->select(DB::raw($queryData['rawSelect']))
             ->where($queryData['foreign_key'], $where)
             ->first();
            return (array) $data;
        }
        return [];
    }

    public function getSubGroupid($option) {
        if(empty($option)) return null;
        $data = DB::table('subGroupOptions')->where('option_name', $option)->first();
        return isset($data->id)?$data->id:null;
    }

    public function getPrimaryKey($option) {
        if(empty($option)) return null;
        $data = DB::table('SubGroupConfiguration')->select('primary_key')->where('sub_group_id',$option)->first();
        return isset($data->primary_key)?$data->primary_key:null;
    }

    public function splitArray($data, $customData=false) {
        $odd = array();
        $even = array();
        $extraOdd = array();
        $extraEven = array();
        $i = 0;
        if(!empty($data)) {
            foreach ($data as $k => $v) {
                if ($i > 11 && $customData) {
                    if ($i % 2 == 0) {
                        $extraEven[$k] = $v;
                    }
                    else {
                        $extraOdd[$k] = $v;
                    }
                } else {
                    if ($i % 2 == 0) {
                        $even[$k] = $v;
                    }
                    else {
                        $odd[$k] = $v;
                    }
                }
                $i++;
            }
        }
        return ['main' => ['odd'=>$odd, 'even' =>$even], 'extra' =>['odd'=>$extraOdd, 'even' =>$extraEven]];
    }

    public function getCustomFieldData($machineData, $selected=null) {
        if(!empty($selected)) {
            $data = DB::table('dashboardProduktionConfig');
            foreach($selected as $name){
                $data->orWhere('column_name', $name);
            }
            $data = $data->get()->toArray();
        } else {
            $data = DB::table('dashboardProduktionConfig')->get()->toArray();
        }
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

    public function getCustomTable(Request $request) {
        //find the total number of results stored in the database 
        $columnData = DB::table('machine_table_config')->where('username', $this->username)->Where('status', '!=', '0')->get()->toArray();
        $priorityData = DB::table('machine_priority')->select('machines')->where('username', $this->username)->first();
        $selectedMachines = '';
        if (!empty($priorityData)) {
            $selectedMachines = json_decode($priorityData->machines);
        }
        if(empty($columnData)){
            $postRequest = Request::create( '/dashboard/getMachineTableData', 'POST', ['pageIndex'=>$request['pageIndex'], 'pageSize'=>$request['pageSize']]);
            return $this->getMachineTableData($postRequest);
        }
        $machineDataQuery = Anlagen::whereNotNull('datumAnl')->where('deleted',0);
        $number_of_result = $machineDataQuery->count();  
        $pageIndex = $request['pageIndex'];
       // dd($pageIndex);
        $limit = $request['pageSize'];
        $totalRecords = Anlagen::whereNotNull('datumAnl')->where('deleted',0)->count();
        $totalPages = ceil($totalRecords / $limit);
        $start = $limit * $pageIndex - $limit; // do not put $limit*($page - 1)
        if($start < 0) $start = 0;
        $defaultString = $this->makeDefaultColumnQuery($columnData);
        $priorityMachineData = [];
        if($pageIndex == 1) {
            $priorityArray = count($selectedMachines);
            $limit = $priorityArray >10?10:$limit-$priorityArray;
            $start = $limit * $pageIndex - $limit;
            $machineData = $machineDataQuery->limit($limit)->offset($start)->get()->toArray();
            $priorityMachineData = $machineDataQuery->whereIn('anl_ID', $selectedMachines)->get()->toArray();
        } else {
            $machineData = $machineData->limit($limit)->offset($start)->get()->toArray();
        }
        $machineData = array_merge($priorityMachineData, $machineData);
        $machineDataCustom = [];
        if(!empty($machineData)){
            $machineDataCustom = $this->getListingData($machineData, $machineDataCustom , $defaultString);
            return [ 'data'=> $machineDataCustom, 'itemsCount'=> $totalRecords];
        } else {
            return ['status' => 400 , 'msg' => 'No record found!'];
        }
        
    }

    public function getCustomColumnName() {
        $columnData = DB::table('machine_table_config')->where('username', $this->username)->Where('status', '!=', '0')->get()->toArray();
        $columns = [
            ['name' =>'anl_ID', 'type' => 'number', 'title' =>'anl_ID', 'align'=> 'center','visible'=>false]
        ];
        if(!empty($columnData)) {
            foreach($columnData as $value) {
                array_push($columns, ['name' =>$value->column_name, 'type' => 'number', 'title' =>$value->column_name, 'align'=> 'center']);
            }
        } else {
            $columns = [
                ['name' =>'anl_ID', 'type' => 'number', 'title' =>'anl_ID', 'align'=> 'center'],
                ['name' =>'datumAnl', 'type' => 'string', 'title' =>'datumAnl', 'align'=> 'center'],
                ['name' =>'nummerAnl', 'type' => 'string', 'title' =>'nummerAnl', 'align'=> 'center'],
                ['name' =>'bezeichnungAnl', 'type' => 'string', 'title' =>'bezeichnungAnl', 'align'=> 'center']
            ];
        }
        return $columns;
    }

    public function makeDefaultColumnQuery($column) {
        $string = null;
        $customData = [];
        if(!empty($column)) {
            foreach($column as $tableData) {
                if($tableData->status == '2'){
                    $string .= "RTRIM( LTRIM(".$tableData->label_name.")) AS '".$tableData->column_name."', ";
                } else if($tableData->status == '1') {
                    array_push($customData, $tableData->column_name);
                }
            }
        }
        $string = rtrim($string, ", ");
        return ['string'=>$string, 'customData'=>$customData];
    }

    public function getListingData($machineData, $machineDataCustom , $defaultString) {
        foreach($machineData as $machine) {
            $subGroupId = $this->getSubGroupid($machine['custom1Anl']);
            $primary_key = $this->getPrimaryKey($subGroupId);
            $machineName = explode ( '-' ,$machine['nummerAnl']);
            $machineName = $machineName[0];
            $subGroupConfig = [];
            if(!empty($defaultString['string'])) {
                $prodData = DB::table('TWP_PROD_OVERVIEW')
                ->select(DB::raw($defaultString['string']))
                ->where('MANAME',$machineName)->orderBy('id', 'desc')->first();
                if(!empty($prodData)){
                    $prodData = (array) $prodData;
                    $prodData['anl_ID'] = $machine['anl_ID'];
                } else {
                    continue;
                }
            } else {
                continue;
            }
            if(!empty($defaultString['customData'])){
                $customColumns = array_merge($prodData, $this->getCustomFieldData($machine, $defaultString['customData']));
            } else {
                $customColumns = $prodData;
            }
            array_push($machineDataCustom, $customColumns);
        }
        return $machineDataCustom;
    }

    public function getGraphConfigurations($machineData) {
        $graph_data = GraphConfiguration::where('username',$this->username)->get();
        $graphJsData = [];
        $label = '';
        if (!empty($graph_data)) {
            foreach($graph_data as $gdata) {
                $configData = DashboardProduktionConfig::where('label_name',$gdata->label)->where('username',$this->username)->first();
                if (!empty($configData)) {
                    $label = $configData->column_name;
                    $query = DB::table($configData->table_name)->where($configData->foreign_key, $machineData->$primary_key);
                } else {
                    $tableConfigData = DB::table('machine_table_config')->where('label_name',$gdata->label)->where('username', $this->username)->Where('status', '2')->first();
                    if (!empty($tableConfigData)) {
                        $label = $tableConfigData->column_name;
                        $machineName = explode (   '-' ,$machineData->nummerAnl);
                        $machineName = $machineName[0];
                        $query = DB::table('TWP_PROD_OVERVIEW')->where('MANAME',$machineName);
                    }
                }
                if(isset($query)) {
                    $label = $query->pluck($label)->limit(10)->toArray();
                    $data = $query->pluck('servertime')->limit(10)->toArray();
                    $dataJs = ['name' =>$gdata->graph_name, 'label' => $label, 'data'=>$data];
                    array_push($graphJsData, $dataJs);
                } 
            }
        }
        return $graphJsData;
    }

    
}
