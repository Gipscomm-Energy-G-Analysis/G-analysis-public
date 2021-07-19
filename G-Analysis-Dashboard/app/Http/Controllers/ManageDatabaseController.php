<?php

namespace App\Http\Controllers;

use App\Models\Organisation;
use App\Models\Product;
use App\Models\ProductData;
use App\Models\UsersDatabases;
use Illuminate\Http\Request;
use DB;
use Config;

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
}
