<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class UtilityController extends Controller
{
    public static function createCustomQuery($data, $id) {
        $numItems = count($data);
        if($numItems == 0) return ['status' => 400, 'query' => null];
        $query = '';
        $table = $data['0']->table_name;
        $foreign_key = $data['0']->foreign_key;
        $i = 0;
        foreach($data as $value) {
            if(++$i === $numItems) {
                $query .= $value->column_name.' AS "'.$value->label_name.'" ';
            } else {
                $query .= $value->column_name.' AS "'.$value->label_name.'", ';
            }
        }

        return ['status' => 200, 'rawSelect' => $query, 'table' =>$table, 'foreign_key' => $foreign_key];
    }

    public static function createMultiTableQuery($data) {
        $numItems = count($data);
        if($numItems == 0) return ['status' => 400, 'query' => null];
        $query = [];
        $i = 0;
        foreach($data as $value) {
            if(++$i === $numItems) {
                if(isset($query[$value->foreign_key])){
                    $query[$value->foreign_key]['query'] .= $value->column_name.' AS "'.$value->label_name.'" ';
                } else {
                    $query[$value->foreign_key]['query'] = $value->column_name.' AS "'.$value->label_name.'" ';
                }
            } else {
                if(isset($query[$value->foreign_key])){
                    $query[$value->foreign_key]['query'] .= $value->column_name.' AS :'.$value->label_name.'", ';
                } else {
                    $query[$value->foreign_key]['query'] = $value->column_name.' AS "'.$value->label_name.'", ';
                }
            }
            $query[$value->foreign_key]['foreign_key'] = $value->foreign_key;
            $query[$value->foreign_key]['table'] = $value->table_name;
            $query[$value->foreign_key]['primary_key'] = $value->primary_key;
        }
        return ['status' => 200, 'rawSelect' => $query];
    }

}
