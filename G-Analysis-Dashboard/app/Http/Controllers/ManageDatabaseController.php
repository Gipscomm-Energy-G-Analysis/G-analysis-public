<?php

namespace App\Http\Controllers;

use App\Models\Organisation;
use App\Models\Product;
use App\Models\ProductData;
use App\Models\UsersDatabases;
use Illuminate\Http\Request;
use DB;
use Config;
use View;

class ManageDatabaseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
   
    public function switchDatabase($database)
    {
       // $database = $request->input('database');
        if(!empty($database)){
            DB::disconnect('sqlsrv');
            Config::set("database.connections.sqlsrv.database", $database);
            $purge = DB::purge('sqlsrv');
            $selectedDatabase = Config::get("database.connections.sqlsrv.database");
            return ['code'=>200,'database'=>$selectedDatabase];
        }
        return ['code'=>401];
    }

    public function checkDB($database){
        $database = $_SESSION['nameDB'];
        $username = $_SESSION['username'];
        if($_SESSION['nameDB'] == 'gipscomm'){
            $result = $this->switchDatabase($database);
            $dBname = DB::table("Users")->select('nameDB')
                     ->where('username',$username)->first();
            $dBname   = (array)$dBname;
            $database = $dBname['nameDB'];
        }
        return $database;
    }



    public function changeDB(Request $request){
        $_SESSION['nameDB'] = $request->dbname;
        $data = $this->checkDB($request->dbname);
        return ['code'=>200,'result'=>$data, 'msg' =>'Database changed successfully!'];
    }

    public function getDatabases() {
        $database = DB::connection('sqlsrvSuperAdmin')->table('mandanten')
            ->orderBy('nameMan','asc')->get()->toArray();
        return $database;
    }

    public function getOtherGraphData($username) {
        $database = DB::table('graph_configurations')->where('username', $username)->get()->toArray();
        return $database;
    }

    public function checkDBTables($tableArray, $databases, $selectedDB) {
        foreach ($tableArray as $table) {
            $table_exits = DB::getSchemaBuilder()->hasTable($table);
            if(!$table_exits) {
                return ['tableCheck' => true , 'message'=>"No Data Found in $table!", 'databases' => $databases, 'selectedDatabase' => $selectedDB];
            }
        }
        return false;
    }
    
}
