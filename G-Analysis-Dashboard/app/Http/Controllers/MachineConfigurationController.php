<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use App\Http\Controllers\ManageDatabaseController;
use App\Http\Controllers\MigrationController;


class MachineConfigurationController extends Controller
{
    public function __construct()
    {
        $this->database = (new ManageDatabaseController)->checkDB($_SESSION['nameDB']);
        $this->database_result = (new ManageDatabaseController)->switchDatabase($this->database);
    }

    public function getMachineConfigurations(Request $request) {
        MigrationController::createMachineTableConfigurations();
        $columnData = DB::table('machine_table_config')->where('status', ['1','3'])->pluck('column_name')->toArray();
        $columns = ['anlage', 'auftragsmenge', 'programm', 'zeit_zyklus', 'bestellung', 'werkzeug', 'artikel', 'kavitäten',
             'gutmenge', 'letzte_störung', 'ausschuss', 'bisher_produziert'];
        $customData = DB::table('dashboardProduktionConfig')->pluck('column_name')->toArray();
        $combinedData = $this->addSelectedOption(array_merge($columns, $customData),'');
        if(empty($columnData)){
            return ['status' => 200, 'data' => $combinedData];
        }
        $combinedData = array_merge($this->addSelectedOption(array_diff($combinedData,$columnData),''), $this->addSelectedOption($columnData,'selected'));
        return ['status'=>'200', 'data' => $combinedData];
    }

    public function addSelectedOption($data, $option) {
        $columnData = [];
        if(!empty($data)) {
            foreach($data as $value){
                array_push($columnData,['column' => $value, 'option' => $option]);
            }
        }
        return $columnData;
    }

    public function saveMachineConfigurations(Request $request) {
        dd($request->all());
    }
}

