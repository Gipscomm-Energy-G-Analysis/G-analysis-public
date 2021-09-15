<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use App\Http\Controllers\ManageDatabaseController;
use App\Http\Controllers\MigrationController;
use App\Models\TableConfiguration;


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
        $columnData = DB::table('machine_table_config')->where('username', $this->username)->orWhere('status', ['1','2'])->pluck('column_name')->toArray();
        $columns = ['anlage', 'auftragsmenge', 'programm', 'zeit_zyklus', 'bestellung', 'werkzeug', 'artikel', 'kavitäten',
             'gutmenge', 'letzte_störung', 'ausschuss', 'bisher_produziert'];
        $customData = DB::table('dashboardProduktionConfig')->pluck('column_name')->toArray();
        $combinedData = array_merge($columns, $customData);
        if(empty($columnData)){
            return ['status' => 200, 'data' => $this->addSelectedOption($combinedData,'')];
        }
        $combinedData = array_merge($this->addSelectedOption(array_diff($combinedData,$columnData),''), $this->addSelectedOption($columnData,'selected'));
        return ['status'=>'200', 'data' => $combinedData];
    }

    public function addSelectedOption($data, $option) {
        $selectedData = [
            'anlage' => 'MANAME', 
            'auftragsmenge' => 'AMOUNT_REQUEST', 
            'programm' => 'STATETEXT', 
            'zeit_zyklus' => 'CYCLETIME', 
            'bestellung' => 'MPSNAME', 
            'werkzeug' => 'TOOLNAME', 
            'artikel' => 'MAORDER', 
            'kavitäten' => 'CAVITY', 
            'gutmenge' => 'AMOUNT_GOOD', 
            'letzte_störung' => 'LASTUPDATE', 
            'ausschuss' => 'AMOUNT_BAD', 
            'bisher_produziert' => 'AMOUNT_GOOD'];
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
        if(!empty($selecteData)) {
            DB::table('machine_table_config')->where('username', $this->username)->update(array('status' => '0'));
            foreach($selecteData as $value){
                if($value['option'] == 2){
                    $table = 'TWP_PROD_OVERVIEW';
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

    public function sortDefaultColumns() {

    }
}

