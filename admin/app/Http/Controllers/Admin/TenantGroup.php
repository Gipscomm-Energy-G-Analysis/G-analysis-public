<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\BetreuerGruppen;
use Illuminate\Support\Facades\DB;
use DataTables; 
use App\Models\User;
use App\Models\Groups;
use App\Models\benutzer;
use App\Models\Mandanten;
use App\Models\MandantenGruppen;
use Hash; 

class TenantGroup extends Controller
{
    public function index(){
        $data=[
            'title'=>'Tenant Group'
        ];
        $groups = BetreuerGruppen::select('betrGrp_ID','firma')->where('deleted', '=', 0)->get();
        $mandanten   = Mandanten::select('nameMan','dbName','man_ID','betrGrp_ID')->get();
        return view('admin.users.tenant',['data'=> $data,'groups' =>$groups,'mandanten' =>$mandanten]);
    }

    public function tenantGroupForm(Request $request){
        $request->validate([
            'groups' => 'required',
            'surname' => 'required',
            'abbreviation' => 'required'
        ]);
        $data = new MandantenGruppen;
        $data->name = $request->surname;
        $data->kurz = $request->abbreviation;
        $data->notiz = $request->note;
        $data->betrGrp_ID = $request->groups;
        $data->deleted = 0;
        if(!empty($request->man_ID)){
            $data->mandantenIDs = implode(',',$request->man_ID);
        }
        $data->save();
        toastr()->success('Mietergruppe erfolgreich hinzugefügt!');
        return redirect()->route('tenant-group-list');
    }

    public function tenantGroupList(Request $request){
        if ($request->ajax()) {
            $data = MandantenGruppen::where('deleted', '=', 0)->get();
            return Datatables::of($data)
                    ->addIndexColumn()
                    ->addColumn('action', function($row){
                            $actionButton = '<a class="btn btn-info btn-sm" href="edit-tenant-group/'.$row->manGrp_ID.'">
                            <i class="fas fa-edit"></i> bearbeiten</a>
                        <a class="btn btn-danger confirmation-del btn-sm" href="delete-tenant-group/'.$row->manGrp_ID.'">
                            <i class="fa fa-trash"></i>löschen</a>';  
                            return $actionButton;
                    })
                    ->rawColumns(['action'])
                    ->make(true);
        }
        return view('admin.users.tenant-group-list');
    }

    public function editTenantGroup($id)
    {
        $data= MandantenGruppen::where('manGrp_ID', '=', $id)->first();
        $groups = BetreuerGruppen::select('betrGrp_ID','firma')->where('deleted', '=', 0)->get();
        $mandanten   = Mandanten::select('nameMan','dbName','man_ID','betrGrp_ID')->whereNotIn('man_ID', explode(',', $data['mandantenIDs']))->get(); 
        if(!empty($data['mandantenIDs'])){
            $editMandanten = Mandanten::select('nameMan','dbName','man_ID','betrGrp_ID')->whereIn('man_ID', explode(',', $data['mandantenIDs']))->get();
        }else{
            $editMandanten = [];
        }
        return view('admin.users.edit-tenant-group',['data'=>$data,'groups'=>$groups,'mandanten'=>(!empty($mandanten))?($mandanten):[''],'editMandanten'=>$editMandanten]);
    }

    public function updateTenantGroupForm(Request $request){
        $request->validate([
            'groups' => 'required',
            'surname' => 'required',
            'abbreviation' => 'required'
        ]);
        if(!empty($request->man_ID)){
            $mandantenIDs = implode(',',$request->man_ID);
        }else{
            $mandantenIDs='';
        }
        $data= MandantenGruppen::where('manGrp_ID', $request->id)->update([
            'name' => $request->surname,
            'kurz' => $request->abbreviation,
            'notiz' => $request->note,
            'betrGrp_ID' => $request->groups,
            'deleted' => 0,
            'mandantenIDs' => $mandantenIDs
        ]);
        toastr()->success('Die Mietergruppe wurde erfolgreich aktualisiert!');
        return redirect()->route('tenant-group-list');
    }

    public function delete($id)
    {
        $data= MandantenGruppen::where('manGrp_ID', $id)->update(['deleted' => 1]);
        toastr()->success('Mandantengruppe erfolgreich gelöscht!'); 
        return redirect()->route('tenant-group-list');
    }
}
