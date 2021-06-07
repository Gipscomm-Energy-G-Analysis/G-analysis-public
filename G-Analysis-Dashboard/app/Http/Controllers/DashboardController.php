<?php

namespace App\Http\Controllers;

use App\Models\UsersDatabases;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\ProductData;
use App\Models\Organisation;
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

//        $totalMachines = ProductData::all()->groupBy('maschinenID')->count();
//        dd($totalMachines);
        $totalMachines = DB::table('ProdData')->distinct('maschinenID')->count();
        $totalOrder = ProductData::all()->groupBy('auftrag')->count();
        $totalOrganisation = Organisation::all()->count();
        $databases = UsersDatabases::select('dbName')->get();
        $selectedDatabase = Config::get("database.connections.sqlsrv.database");
        $cardData = [
            'productCount' => count(Product::all()),
            'machineTotal' => $totalMachines,
            'orderTotal' => $totalOrder,
            'organisationTotal' => $totalOrganisation,
            'databases' => $databases,
            'selectedDatabase' => $selectedDatabase
        ];
        return View::make("dashboard", ['data' => $cardData]);
    }




}
