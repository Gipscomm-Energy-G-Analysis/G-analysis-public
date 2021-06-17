<?php

namespace App\Http\Controllers;

use App\Models\UsersDatabases;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\ProductData;
use App\Models\Organisation;
use App\Models\ProductOverview;
use App\Models\Anlagen;
use Illuminate\Support\Str;
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
        $machines = Anlagen::whereNotNull('datumAnl')
            ->where('deleted',0)->first();
        $request = Request::create( '/dashboard/machine', 'POST', ['id'=>$machines['anl_ID'], 'type'=>'current']);
        $data = $this->getMachineDetail($request);
        return View::make("product", ["data"=>$data['data']]);
    }


    public function getMachineDetail(Request $request)
    {
        $id = $request['id'];
        $type = $request['type'];
        $machineData = null;
        $prodData = [];
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
        if(!empty($machineData)) {
            $machineName = explode (   '-' ,$machineData['nummerAnl'] );
            $machineName = $machineName[0];
            $prodData = ProductOverview::where('MANAME',$machineName)->orderBy('id', 'desc')->first();
            if(!empty($prodData)){
                $prodData =[
                    'anlage' => Str::of($prodData['MANAME'])->trim(),
                    'programm' => Str::of($prodData['STATETEXT'])->trim(),
                    'artikel' => Str::of($prodData['MAORDER'])->trim(),
                    'bestellung' =>  Str::of($prodData['MPSNAME'])->trim(),
                    'bisher_produziert' => (int)($prodData['AMOUNT_GOOD']),
                    'auftragsmenge' => (int)($prodData['AMOUNT_REQUEST']),
                    'gutmenge' => (int)($prodData['AMOUNT_GOOD']),
                    'ausschuss' => (int)($prodData['AMOUNT_BAD']),                    
                    'zeit_zyklus' => Str::of($prodData['CYCLETIME'])->trim(),
                    'letzte_störung' => Str::of($prodData['LASTUPDATE'])->trim(),
                    'werkzeug' => Str::of($prodData['TOOLNAME'])->trim(),
                    'kavitäten' =>(int)$prodData['CAVITY'],
                    'anl_ID' => $machineData['anl_ID'],
                    'bildAnl' => $machineData['bildAnl'],
                ];
                return ['code'=>200, 'data' =>$prodData, 'anl_ID'=>$machineData['anl_ID'], 'message'=>'Data Retrived Successfully.'];
            } else{
                return ['code'=>401, 'data' =>$prodData, 'anl_ID'=>$machineData['anl_ID'], 'message'=>'No Record Found!'];
            }
        } else {
            return ['code'=>401, 'data' =>$prodData, 'message'=>'No Record Found!'];
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
}
