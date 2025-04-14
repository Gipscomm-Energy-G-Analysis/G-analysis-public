<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Hash; 
use DataTables;
use App\Models\Company;
use App\Models\Mandanten;
use Illuminate\Support\Facades\DB;

class CompanyController extends Controller
{
    public function index(){
        $data=[
            'title'=>'Company'
        ];
        return view('admin.users.company-form',['data' => $data]);
    }

    public function createCompanyForm(Request $request){
        $tempName="g0";
        $dbName= Mandanten::select('dbName','man_ID')->where('dbName', 'LIKE', '%'.$tempName.'%')->orderBy('dbName', 'desc')->first();
        if(!empty($dbName->dbName)){
            $subDbName= substr($dbName->dbName, 2, 2);
            $companyNameDb= "g0".($subDbName+1)."_".str_replace(' ', '', $request->companyName);
            $man_ID= Mandanten::select('man_ID')->orderBy('dbName', 'desc')->first();
            $man_ID= $man_ID->man_ID+1;
        }
        $request->validate([
            'title' => 'required',
            'surname' => 'required',
            'first_name' => 'required',
            'email' => 'required',
            'phone' => 'required',
            'fax' => 'required',
            'mobile' => 'required',
            'user_name' => 'required',
            'companyName' => 'required'
        ]);  
        $data = new Mandanten;
        $data->datumAdm = date("Y-m-d");
        $data->titelAdm = $request->title;
        $data->nameAdm = $request->surname;
        $data->vornameAdm = $request->first_name;
        $data->emailAdm = $request->email;
        $data->telefonAdm = $request->phone;
        $data->faxAdm = $request->fax;
        $data->mobiltelefonAdm = $request->mobile;
        $data->benutzernameAdm = $request->user_name;
        $data->nameMan = $request->companyName;
        $data->dbName = $companyNameDb;
        $data->man_ID = $man_ID;
        $data->save();
        DB::statement("EXEC copyProcedure '".$companyNameDb."'");
        toastr()->success('Das Unternehmen wurde erfolgreich gespeichert!');
        return redirect()->route('dashboard');
    }

    public function companiesList(Request $request){
        if ($request->ajax()) {
            $data = Mandanten::get();
            return Datatables::of($data)
            ->addIndexColumn()
            ->make(true);
        }
        return view('admin.users.companies-list');
    }
}