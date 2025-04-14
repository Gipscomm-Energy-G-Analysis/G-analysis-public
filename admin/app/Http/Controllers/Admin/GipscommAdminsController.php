<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use DataTables; 
use App\Models\User;
use App\Models\GipscommAdmins;
use Hash; 

class GipscommAdminsController extends Controller
{
    public function index(){
        $data=[
            'title'=>'Gipscomm Admins List'
        ];
        return view('admin.users.gipscomm-admins-list',['data'=> $data]);
    }

    public function gipscommAdminsList(Request $request){
        if ($request->ajax()) {
            $data = GipscommAdmins::where('deleted', '=', 0)->get();
            return Datatables::of($data)
            ->addColumn('position', function ($row) {
                if($row->position=="gipsAdm"){
                    $roleName = "Gipscomm Admin";
                }
                return $roleName;
            })
            ->addIndexColumn()
            ->make(true);
        }
        return view('admin.users.gipscomm-admins-list');
    }
}
