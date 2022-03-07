<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use View;
use function MongoDB\BSON\toJSON;

class TableController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return View::make("tables");
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getProductDataTable()
    {
        $products = Product::select('prd_ID', 'org_ID', 'namePrd', 'datum', 'artikelNrPrd' )->get();
        return $products->toArray();
    }
}
