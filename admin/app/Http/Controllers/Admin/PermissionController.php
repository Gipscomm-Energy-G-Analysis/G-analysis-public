<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\DashboardUsers;
use App\Models\Permission;
use Illuminate\Support\Facades\DB; 
class PermissionController extends Controller
{
    
    public function userDetails(Request $request){
       
        $data = DashboardUsers::select('name')->get();
        $permission = Permission::select('name')->get();
        // $data = [
        //     'user' => $dataa,
        //     'permission' => $permission
        // ];
        return view('admin.users.permission')->with('data', $data)->with('permission', $permission);
        //return view('admin.users.permission',['data'=>$data] );
    }
     
}
