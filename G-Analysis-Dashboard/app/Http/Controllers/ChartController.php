<?php

namespace App\Http\Controllers;

use App\Models\ProductData;
use Illuminate\Http\Request;
use Carbon\Carbon;
use View;

class ChartController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return View::make("charts");
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getEnergyConsumptionPerMachine()
    {
        $machineData = ProductData::all()->groupBy('maschinenID')
            ->map(function ($machines) {
                return $machines->reduce(function ($carry, $item) {
                    if($carry){
                        return floatval($carry) + floatval($item['verbrauchAuftrag']);
                    } else {
                        return floatval($item['verbrauchAuftrag']);
                    }
                });
            });

        $label = $machineData->keys()->all();
        $energyValues = $machineData->flatten()->all();
        return ['labels'=>$label,'values'=>$energyValues];
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getGoodsBarCharts()
    {
        $goodsData = ProductData::where("timeUnlock", ">", Carbon::now()->subMonths(6))->get()
            ->map(function ($goods) {
                return ['Produced Goods' => $goods['gutmenge'], 'Month' => date('F', strtotime($goods['timeUnlock']))];
            })->groupBy('Month');
        $TotalGoodsByMonth = $goodsData->map(function ($goodsData) {
            return $goodsData->reduce(function ($carry, $item) {
                if ($carry) {
                    return floatval($carry) + floatval($item['Produced Goods']);
                } else {
                    return floatval($item['Produced Goods']);
                }
            });
        });
        $Months = $TotalGoodsByMonth->keys()->all();
        $goodsProduced = $TotalGoodsByMonth->flatten()->all();
        return ['labels'=>$Months,'values'=>$goodsProduced];
    }
}
