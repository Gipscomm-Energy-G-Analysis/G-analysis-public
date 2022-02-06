<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use App\Http\Controllers\ManageDatabaseController;
use App\Http\Controllers\MigrationController;
use App\Models\TableConfiguration;
use App\Models\MachinePriority;

class MachineConfigurationController extends Controller
{
    public function __construct()
    {
        $this->database = isset($this->database)?$this->database:(new ManageDatabaseController)->checkDB($_SESSION['nameDB']);
        $this->database_result = isset($this->database_result)?$this->database:(new ManageDatabaseController)->switchDatabase($this->database);
        $this->username = $_SESSION['username'];
    }

    public function getMachineConfigurations(Request $request) {
        MigrationController::createMachineTableConfigurations();
        $columnData = DB::table('machine_table_config')->where('username', $this->username)->Where('status','!=' ,'0')->pluck('column_name')->toArray();
        $columns = ['anlage', 'auftragsmenge', 'programm', 'zeit_zyklus', 'bestellung', 'werkzeug', 'artikel', 'kavitäten',
             'gutmenge', 'letzte_störung', 'ausschuss', 'bisher_produziert'];
        $customData = DB::table('dashboardProduktionConfig')->pluck('column_name')->toArray();
        $combinedData = array_merge($columns, $customData);
        $machinePriorityData = $this->getPriorityMachineData();
        if(empty($columnData)){
            return ['status' => 200, 'data' => $this->addSelectedOption($combinedData,'') , 'machinePriorityData' => $machinePriorityData];
        }
        $combinedData = array_merge($this->addSelectedOption(array_diff($combinedData,$columnData),''), $this->addSelectedOption($columnData,'selected'));
        return ['status'=>'200', 'data' => $combinedData , 'machinePriorityData' => $machinePriorityData];
    }

    public function addSelectedOption($data, $option) {
        $selectedData = [
            'anlage' => 'maschine', 
            'auftragsmenge' => 'sollmenge', 
            'programm' => 'maschinentyp', 
            'zeit_zyklus' => 'zykluszeit', 
            'bestellung' => 'artikelnummer', 
            'werkzeug' => 'werkzeug', 
            'artikel' => 'auftrag', 
            'kavitäten' => 'nester', 
            'gutmenge' => 'gutmenge', 
            'letzte_störung' => 'zeitstempel', 
            'ausschuss' => 'ausschuss', 
            'bisher_produziert' => 'gutmenge'];
        $columnData = [];
        if(!empty($data)) {
            foreach($data as $value){
                $label = null;
                if($option == '2'){
                    $label = isset($selectedData[$value])?$selectedData[$value]:null;
                }
                array_push($columnData,['column' => $value, 'option' => $option, 'label' => $label]);
            }
        }
        return $columnData;
    }

    public function saveMachineConfigurations(Request $request) {
        $columns = ['anlage', 'auftragsmenge', 'programm', 'zeit_zyklus', 'bestellung', 'werkzeug', 'artikel', 'kavitäten',
             'gutmenge', 'letzte_störung', 'ausschuss', 'bisher_produziert'];
        $selectedColumns = $request->column;
        $defaultColumns = $this->addSelectedOption(array_intersect($columns,$selectedColumns), '2');
        $customColumns = $this->addSelectedOption(array_diff($selectedColumns,$columns), '1');
        $selecteData = array_merge($defaultColumns, $customColumns);
        $this->savePriorityList($request->priorityMachines);
        if(!empty($selecteData)) {
            DB::table('machine_table_config')->where('username', $this->username)->update(array('status' => '0'));
            foreach($selecteData as $value){
                if($value['option'] == 2){
                    $table = 'ProdData';
                } else {
                    $table = null;
                }
                $columnData = [
                    "column_name" =>  $value['column'],
                    "username" => $this->username
                ];
                $data=array(
                    "status"      =>  $value['option'],
                    "label_name"      =>  $value['label'],
                    "table_name"  =>  $table);
                TableConfiguration::updateOrCreate($columnData, $data);
            }
        }
        return ['status'=> 200 , 'msg' => 'Table configurations saved successfully.'];
    }

    public function getPriorityMachineData() {
        $columnData = DB::table('machine_priority')->select('machines')->where('username', $this->username)->first();
        
        $selectedMachines = [];
        if(!empty($columnData)) {
            $selectedMachines = json_decode($columnData->machines);
        }
        $allMachines = DB::table('anlagen')->select('anl_ID','nummerAnl')->where('nummerAnl', '!=','')->get();
        return ['selected' => $selectedMachines, 'allMachines'  => $allMachines];
    }

    public function savePriorityList($data) {
        if(!empty($data)) {
            $columnData = [
                "username" => $this->username
            ];
            $data=array(
                "machines"      =>  json_encode($data));
            MachinePriority::updateOrCreate($columnData, $data);
        }
        return;
    }
}

