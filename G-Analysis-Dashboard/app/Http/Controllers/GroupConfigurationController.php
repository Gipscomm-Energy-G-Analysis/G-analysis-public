<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\MigrationController;
use DB;
use App\Http\Controllers\ManageDatabaseController;

class GroupConfigurationController extends Controller
{
    public function __construct()
    {
        $this->database = (new ManageDatabaseController)->checkDB($_SESSION['nameDB']);
        $this->database_result = (new ManageDatabaseController)->switchDatabase($this->database);
    }

    public function getTableColumns($table) {
        return DB::getSchemaBuilder()->getColumnListing($table);
    }

    public function getConfigurationData(Request $request){
        $subGroupId = $request->grosubGroupId;
        $table = $request->table;
        MigrationController::createSubGroupConfigurationTable();
        $table_data = DB::table('SubGroupConfiguration')->where('sub_group_id', $subGroupId)->where('table_name', $table)->get()->toArray();
        $primary_key_data = $this->getTableColumns('anlagen');
        $foreign_key_data = $this->getTableColumns($table);
        $selected_primary_key = isset($table_data[0])?$table_data[0]->primary_key:null;
        $selected_foreign_key = isset($table_data[0])?$table_data[0]->foreign_key:null;
        $lagacy = true;
        if (count($table_data) == 0) {
            $table_data = $this->getTableColumns($table);
            $lagacy = false;
        }
        return ['status'=>200, 
                'table_data' => $table_data,
                'primary_key' => $primary_key_data,
                'foreign_key' => $foreign_key_data,
                'selected_primary_key' => $selected_primary_key,
                'selected_foreign_key' => $selected_foreign_key,
                'legacy' => $lagacy];
    }

    public function saveConfigurationData(Request $request) {
        $table = $request->table;
        $subGroupId = $request->group_id;
        $column = $request->column;
        $label = $request->label;
        $groupId = $this->getGroupId($subGroupId);
        $foreign_key = $request->foreign_key;
        $primary_key = $request->primary_key;
        //delete previous records
        $this->deleteConfigurations($subGroupId, $table);
      // dd($column);
        for($i=0;$i<count($column);$i++) {
            DB::table('SubGroupConfiguration')->insert([
                [
                'group_id' => $groupId->group_id,
                'sub_group_id' => $subGroupId,
                'user_id' => 1,
                'table_name' => $table,
                'column_name' => $column[$i],
                'label_name' => $label[$i],
                'primary_key' => $primary_key,
                'foreign_key' => $foreign_key,
                'created_at' => DB::raw('CURRENT_TIMESTAMP'),
                'updated_at' => DB::raw('CURRENT_TIMESTAMP')]
            ]);
        }
        return ['status' => 200, 'msg' => 'Record Inserted Sucessfully'];
    }

    public function getGroupId($group_id) {
        return DB::table('subGroupOptions')->select('group_id')->where('id', $group_id)->first();
    }

    public function deleteConfigurations($group_id, $table) {
        return DB::table('SubGroupConfiguration')->where('sub_group_id', $group_id)->delete();
    }
    
    public function getSelectedConfigurationData(Request $request) {
        $subGroupId = $request->subGroupId;
        $table = DB::table('SubGroupConfiguration')->select('table_name')->where('sub_group_id', $subGroupId)->first();
        return isset($table->table_name)?$table->table_name:'';
    }

    public function getSameTypeColumn(Request $request) {
        $column = $request->column;
        $foreign_key_table = $request->foreign_key_table;
        $getSelectedColumnType =DB::getDoctrineColumn('anlagen', $column)->getType();
        $getForeignTableData = $this->getTableColumns($foreign_key_table);
        $getColumnType = DB::getDoctrineSchemaManager()->listTableColumns($foreign_key_table);
        $foreignKeyData = $this->getAllSameTypeColumns($getColumnType, $getSelectedColumnType);
        return ['status' => 200, 'data' => $foreignKeyData];
    }

    public function getAllSameTypeColumns($data , $type) {
        $columns = [];
        if(!empty($data)) {
            foreach($data as $value) {
                if($value->getType() == $type) {
                    array_push($columns , $value->getName());
                }
            }
        }
        return $columns;
    }
}
