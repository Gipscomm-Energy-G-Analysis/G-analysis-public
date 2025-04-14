<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Hash;
use Session;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
class ProductionController extends Controller
{
    public function index()
    {
        return view('auth.login');
    }     
    
    public function production()
    {
        if(Auth::check()){
            return view('production');
        }
  
        return redirect("login")->withSuccess('You are not allowed to access');
    }

}