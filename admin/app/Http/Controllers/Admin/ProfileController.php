<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Admins;
use App\Models\benutzer;
use App\Models\SuperAdmins;
use App\Models\Mandanten;
use Illuminate\Support\Facades\DB;

class ProfileController extends Controller
{
    public function dashboard(){
        $data=[
            'title'=>'Dashboard'
        ];
        $Users   = benutzer::where('deleted', '=', 0)->count();
        $Admins   = Admins::where('deleted', '=', 0)->count();
        $SuperAdmins   = SuperAdmins::where('deleted', '=', 0)->count();
        $Company   = Mandanten::count();
        return view('admin.dashboard')->with('data', $data)->with('Users', $Users)->with('Admins', $Admins)->with('SuperAdmins', $SuperAdmins)->with('Company', $Company);
    }

    public function logout(){
        auth()->logout();
        return redirect()->route('getLogin')->with('success','You have been successfully logged out');
    }
}
