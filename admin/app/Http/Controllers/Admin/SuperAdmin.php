<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\benutzer;
use App\Models\SuperAdmins;
use App\Models\BetreuerGruppen;
use Hash; 
use App\Models\GipscommMenu;
use App\Models\Role;
use App\Models\Mandanten;
use App\Models\UserMenuPermissions;
use Illuminate\Support\Facades\DB;

class SuperAdmin extends Controller
{
    public function index(){
        $data=[
            'title'=>'Super Admin'
        ];
        $role   = Role::select('id','role_name')->where('status', '=', 0)->where('id', '=', 3)->get();
        $mandanten   = Mandanten::select('nameMan','dbName','man_ID','betrGrp_ID')->get();
        return view('admin.users.super-admin',['data' => $data,'role' =>$role,'mandanten' =>$mandanten]);
    }

    public function superAdminForm(Request $request){
        $request->validate([
            'company' => 'required',
            'address' => 'required',
            'e_mail' => 'required',
            'number_of_employees' => 'required',
            'chief_executive_officer' => 'required',
            'postcode' => 'required',
            'town' => 'required',
            'sphone' => 'required',
            'note' => 'required',
            'title' => 'required',
            'surname' => 'required',
            'first_name' => 'required',
            'email' => 'required',
            'phone' => 'required',
            'fax' => 'required',
            'mobile' => 'required',
            'user_name' => 'required',
            'password' => 'required',
            'user_role' => 'required',
            'confirm_password' => 'required|same:password'
        ]);

        $betreuer_gruppen = new BetreuerGruppen;
        $betreuer_gruppen->firma = $request->company;
        $betreuer_gruppen->anschrift = $request->address;
        $betreuer_gruppen->eMail = $request->e_mail;
        $betreuer_gruppen->anzahlMitarbeiter = $request->number_of_employees;
        $betreuer_gruppen->geschaeftsfuehrer = $request->chief_executive_officer;
        $betreuer_gruppen->plz = $request->postcode;
        $betreuer_gruppen->ort = $request->town;
        $betreuer_gruppen->telefon = $request->sphone;
        $betreuer_gruppen->notiz = $request->note;
        $betreuer_gruppen->deleted = 0;
        if(!empty($request->man_ID)){
            $betreuer_gruppen->mandantenIDs = implode(',',$request->man_ID);
        }
        $betreuer_gruppen->save();

        $data = new SuperAdmins;
        $data->betrGrp_ID = $betreuer_gruppen->id;
        $data->titelSAdm = $request->title;
        $data->vornameSAdm = $request->surname;
        $data->nameSAdm = $request->first_name;
        $data->emailSAdm = $request->email;
        $data->telefonSAdm = $request->phone;
        $data->faxSAdm = $request->fax;
        $data->mobiltelefonSAdm = $request->mobile;
        $data->username = $request->user_name;
        $data->passHash = hash('sha256', $request->password);
        $data->position = 'sAdm';
        $data->man_ID = '1';
        $data->role = $request->user_role;
        $data->deleted = 0;
        $data->save();
        $user_id = $data->id;
        if(!empty($request->rolePermissionIds)){
            $rolePermissionIds=explode(',', $request->rolePermissionIds);
            $permissionIds = array();
            foreach($rolePermissionIds as $rolePermissionId){
                if(!empty($rolePermissionId)){
                    $permissionIds[] =[
                        'menu_permission_id' => $rolePermissionId,
                        'user_id' => $user_id,
                    ];                 
                }
            }
            UserMenuPermissions::insert($permissionIds);
        }
        toastr()->success('Der Benutzer wurde erfolgreich gespeichert!');
        return redirect()->route('user-details');
    }

    public function editSuperAdmin($id)
    {
        $data= SuperAdmins::where('sAdm_ID', '=', $id)->first();
        $UserMenuPermissions= UserMenuPermissions::select('menu_permission_id')->where('user_id', '=', $id)->get();
        $BetreuerGruppen= BetreuerGruppen::select()->where('betrGrp_ID', '=', $data['betrGrp_ID'])->first(); 
        $UserMenuPermissions = collect($UserMenuPermissions)->pluck('menu_permission_id')->implode(',');
        $role   = Role::select('id','role_name')->where('status', '=', 0)->where('id', '=', 3)->get();
        $mandanten   = Mandanten::select('nameMan','dbName','man_ID','betrGrp_ID')->whereNotIn('man_ID', explode(',', $BetreuerGruppen['mandantenIDs']))->get(); 
        if(!empty($BetreuerGruppen['mandantenIDs'])){
            $editMandanten = Mandanten::select('nameMan','dbName','man_ID','betrGrp_ID')->whereIn('man_ID', explode(',', $BetreuerGruppen['mandantenIDs']))->get();
        }else{
            $editMandanten = [];
        }
        return view('admin.users.edit-super-admin',['data'=>$data,'UserMenuPermissions'=>$UserMenuPermissions,'BetreuerGruppen'=>$BetreuerGruppen,'role' =>$role,'mandanten'=>(!empty($mandanten))?($mandanten):[''],'editMandanten'=>$editMandanten]);
    }

    public function updateSuperAdminForm(Request $request){
        $request->validate([
            'title' => 'required',
            'surname' => 'required',
            'first_name' => 'required',
            'email' => 'required',
            'phone' => 'required',
            'fax' => 'required',
            'mobile' => 'required',
            'user_name' => 'required',
            'password' => 'required',
            'confirm_password' => 'required|same:password',
            'user_role' => 'required'
        ]);
        if(!empty($request->man_ID)){
            $mandantenIDs = implode(',',$request->man_ID);
        }else{
            $mandantenIDs = ''; 
        }
        $betrGrp_ID= SuperAdmins::select('betrGrp_ID')->where('sAdm_ID', '=', $request->id)->first();
        $betreuer_gruppen = BetreuerGruppen::where('betrGrp_ID', '=', $betrGrp_ID['betrGrp_ID'])->update([ 
        'firma' => $request->company,
        'anschrift' => $request->address,
        'eMail' => $request->e_mail,
        'anzahlMitarbeiter' => $request->number_of_employees,
        'geschaeftsfuehrer' => $request->chief_executive_officer,
        'plz' => $request->postcode,
        'ort' => $request->town,
        'telefon' => $request->sphone,
        'notiz' => $request->note,
        'mandantenIDs' => $mandantenIDs,
        ]);

        $data= SuperAdmins::where('sAdm_ID', $request->id)->update([ 
        'titelSAdm' => $request->title,
        'vornameSAdm' => $request->surname,
        'nameSAdm' => $request->first_name,
        'emailSAdm' => $request->email,
        'telefonSAdm' => $request->phone,
        'faxSAdm' => $request->fax,
        'mobiltelefonSAdm' => $request->mobile,
        'username' => $request->user_name,
        'passHash' => hash('sha256', $request->password),
        ]); 
        $user_id = $request->id;
        if(!empty($request->rolePermissionIds)){
            $rolePermissionIds=explode(',', $request->rolePermissionIds);
            $permissionIds = array();
            foreach($rolePermissionIds as $rolePermissionId){
                if(!empty($rolePermissionId)){
                    $permissionIds[] =[
                        'menu_permission_id' => $rolePermissionId,
                        'user_id' => $user_id,
                    ];                 
                }
            }
        }
        UserMenuPermissions::where('user_id', '=', $user_id)->delete();
        if(!empty($permissionIds)){ 
            UserMenuPermissions::insert($permissionIds);
        }
        toastr()->success('Der Benutzer wurde erfolgreich aktualisiert!');
        return redirect()->route('user-details');
    }

    public function deleteSuperAdmin($id)
    {
        $betrGrp_ID= SuperAdmins::select('betrGrp_ID')->where('sAdm_ID', '=', $id)->first();
        $betrGrp_ID = $betrGrp_ID['betrGrp_ID'];
        $data= SuperAdmins::where('sAdm_ID', $id)->update(['deleted' => 1]);
        BetreuerGruppen::where('betrGrp_ID', $betrGrp_ID)->update(['deleted' => 1]);
        UserMenuPermissions::where('user_id', '=', $id)->delete();  
        toastr()->success('Benutzer erfolgreich gelöscht!'); 
        return redirect()->route('user-details');
    }
}
