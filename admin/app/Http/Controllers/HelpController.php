<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Hash;
use Session;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
class HelpController extends Controller
{
    public function index()
    {
        return view('auth.login');
    }     
    
    public function help()
    {
        if(Auth::check()){
            return view('help');
        }
  
        return redirect("login")->withSuccess('You are not allowed to access');
    }

}