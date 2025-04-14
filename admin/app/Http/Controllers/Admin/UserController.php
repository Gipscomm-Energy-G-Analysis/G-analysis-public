<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Admins;
use App\Models\benutzer;
use App\Models\SuperAdmins;
use Hash;
use DataTables; 
use App\Models\Groups;
use App\Models\GipscommMenu;
use App\Models\BetreuerGruppen;
use App\Models\MandantenGruppen;
use App\Models\Role;
use App\Models\UserMenuPermissions;
use Illuminate\Support\Facades\DB;
class UserController extends Controller
{
    public function index(){
        $data=[
            'title'=>'Users'
        ];
        $groups   = BetreuerGruppen::select('betrGrp_ID','firma')->where('deleted', '=', 0)->get();
		$mandantenGruppen = MandantenGruppen::where('deleted', '=', 0)->orderBy('name')->get();
        $role   = Role::select('id','role_name')->where('status', '=', 0)->where('id', '!=', 3)->get();
        return view('admin.users.index',['data' => $data,'groups' =>$groups,'mandantenGruppen' =>$mandantenGruppen,'role' =>$role]);
    }

    public function submitForm(Request $request){
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
            'user_role' => 'required',
            'confirm_password' => 'required|same:password'
        ]);
        if($request->user_role==='1'){
            $data = new Admins;
            $position='adm';
        }elseif($request->user_role==='2'){
            $data = new benutzer;
            $position='ben';
        }
        $data->titel = $request->title;
        $data->vorname = $request->surname;
        $data->name = $request->first_name;
        $data->eMail = $request->email;
        $data->telefon = $request->phone;
        $data->fax = $request->fax;
        $data->mobiltelefon = $request->mobile;
        $data->username = $request->user_name;
        $data->passHash = hash('sha256', $request->password);
        $data->position = $position;
        $data->man_ID = '1';
        $data->deleted = 0;
        $data->role = $request->user_role; 
        $data->betrGrp_ID = $request->groups;
		$data->manGrp_ID = $request->mandantenGruppen;
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

    public function formDetails(Request $request){
        if ($request->ajax()) {
            // $SuperAdmins = DB::table('SuperAdmins')
            // ->select('titelSAdm as titel','nameSAdm as name','vornameSAdm as vorname','emailSAdm as eMail','telefonSAdm as telefon','faxSAdm as fax','mobiltelefonSAdm as mobiltelefon','username','sAdm_ID as id','man_ID','betrGrp_ID','position','role');
            // $benutzer = DB::table('benutzer')
            // ->select('titel','name','vorname','eMail','telefon','fax','mobiltelefon','username','ben_ID as id','man_ID','betrGrp_ID','position','role');
            // $result  = DB::table('Admins')
            // ->select('titel','name','vorname','eMail','telefon','fax','mobiltelefon','username','adm_ID as id','man_ID','betrGrp_ID','position','role')
            // ->unionAll($SuperAdmins)
            // ->unionAll($benutzer)
            // ->get();
            $result= DB::query()->fromSub(DB::table('SuperAdmins')
            ->select('titelSAdm as titel','nameSAdm as name','vornameSAdm as vorname','emailSAdm as eMail','telefonSAdm as telefon','faxSAdm as fax','mobiltelefonSAdm as mobiltelefon','username','sAdm_ID as id','man_ID','betrGrp_ID','position','role','deleted')
            ->union(DB::table('benutzer')->select('titel','name','vorname','eMail','telefon','fax','mobiltelefon','username','ben_ID as id','man_ID','betrGrp_ID','position','role','deleted'))
            ->union(DB::table('Admins')->select('titel','name','vorname','eMail','telefon','fax','mobiltelefon','username','adm_ID as id','man_ID','betrGrp_ID','position','role','deleted')),'users')
            ->leftJoin('role', 'users.role', '=', 'role.id')
            ->select(['users.*', 'role.id as role','role.role_name'])
            ->where('users.deleted', '=', 0)
            ->get();   
            $data = $result;
            return Datatables::of($data)
                    ->addIndexColumn()
                    ->addColumn('role', function ($row) {
                            $roleName = $row->role_name;
                                    return $roleName;
                    })
                    ->addColumn('action', function($row){
                        if($row->role ==1){
                            $actionButton = '<a class="btn btn-info btn-sm" href="edit/'.$row->id.'/'.$row->role.'">
                            <i class="fas fa-edit"></i> bearbeiten</a>
                        <a class="btn btn-danger confirmation-del btn-sm" href="delete/'.$row->id.'/'.$row->role.'">
                            <i class="fa fa-trash"></i> Löschen</a>';                            
                        }elseif($row->role ==2){
                            $actionButton = '<a class="btn btn-info btn-sm" href="edit/'.$row->id.'/'.$row->role.'">
                            <i class="fas fa-edit"></i> bearbeiten</a>
                        <a class="btn btn-danger confirmation-del btn-sm" href="delete/'.$row->id.'/'.$row->role.'">
                            <i class="fa fa-trash"></i> Löschen</a>';
                        }else{
                            $actionButton = '<a class="btn btn-info btn-sm" href="edit-super-admin/'.$row->id.'">
                            <i class="fas fa-edit"></i> bearbeiten</a>
                        <a class="btn btn-danger confirmation-del btn-sm" href="delete-super-admin/'.$row->id.'">
                            <i class="fa fa-trash"></i> Löschen</a>';
                        }     
                            return $actionButton;
                    })
                    ->rawColumns(['action'])
                    ->make(true);
        }
        return view('admin.users.user-details');
    }
    
    public function edit($id,$role)
    {
        if($role==='1'){
            $data= Admins::where('adm_ID', '=', $id)->first();
        }elseif($role==='2'){
            $data= benutzer::where('ben_ID', '=', $id)->first();
        }
        $UserMenuPermissions= UserMenuPermissions::select('menu_permission_id')->where('user_id', '=', $id)->get(); 
        $UserMenuPermissions = collect($UserMenuPermissions)->pluck('menu_permission_id')->implode(',');
        $groups = BetreuerGruppen::select('betrGrp_ID','firma')->where('deleted', '=', 0)->get();
		$mandantenGruppen = MandantenGruppen::where('deleted', '=', 0)->orderBy('name')->get();
        $role = Role::select('id','role_name')->where('status', '=', 0)->where('id', '=', $data->role)->get(); 
        return view('admin.users.edit',['data'=>$data,'UserMenuPermissions'=>$UserMenuPermissions,'groups' =>$groups,'mandantenGruppen' =>$mandantenGruppen,'role' =>$role]);
    }

    public function update(Request $request){
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
        if($request->user_role==='1'){
            $data= Admins::where('adm_ID', $request->adm_ID)->update([
                'titel' => $request->title,
                'vorname' => $request->surname,
                'name' => $request->first_name,
                'eMail' => $request->email,
                'telefon' => $request->phone,
                'fax' => $request->fax,
                'mobiltelefon' => $request->mobile,
                'username' => $request->user_name,
                'passHash' => hash('sha256', $request->password),
                'role' => $request->user_role,
                'betrGrp_ID' => $request->groups,
				'manGrp_ID' => $request->mandantenGruppen
            ]); 
            $user_id = $request->adm_ID;
        }elseif($request->user_role==='2'){
            $data= benutzer::where('ben_ID', $request->ben_ID)->update([
                'titel' => $request->title,
                'vorname' => $request->surname,
                'name' => $request->first_name,
                'eMail' => $request->email,
                'telefon' => $request->phone,
                'fax' => $request->fax,
                'mobiltelefon' => $request->mobile,
                'username' => $request->user_name,
                'passHash' => hash('sha256', $request->password),
                'role' => $request->user_role,
                'betrGrp_ID' => $request->groups,
				'manGrp_ID' => $request->mandantenGruppen
            ]); 
            $user_id = $request->ben_ID;
        }
       
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

    public function delete($id,$role)
    {
        if($role==='1'){
            $data= Admins::where('adm_ID', $id)->update(['deleted' => 1]);
        }elseif($role==='2'){
            $data= benutzer::where('ben_ID', $id)->update(['deleted' => 1]);
        }
        UserMenuPermissions::where('user_id', '=', $id)->delete(); 
        toastr()->success('Benutzer erfolgreich gelöscht!'); 
        return redirect()->route('user-details');
    }

    public function getPermissionMenu(){
        $menuPermission   = GipscommMenu::select('id','parent_id as parent', 'name as text')->get();
        // $getChildOf = function ($parent) use (&$getChildOf) {

        //         $menuPermission   = GipscommMenu::whereRaw(" parent_id = " . $parent)->get();
        //         $permissionData = [];
                
        //         if ($menuPermission->isNotEmpty()) {
        //             $permissionData = array();
        
        //             foreach ($menuPermission as $single_company) {
        //                // dd($single_company);
        //                 $permissionData[] = array(
        //                     'Number'        => $single_company->id,
        //                     'Name' => $single_company->name,
        //                     'Children'     => $getChildOf($single_company->id),
        //                 );
        //             }
        //         }
        
        //         return $permissionData;
        // };
        // $data = $getChildOf(0);
        return $menuPermission;
    }
    public function getBetreuerGruppen(){
        $BetreuerGruppen   = BetreuerGruppen::select('firma')->where('deleted', '=', 0)->get();
        return View::make("admin/betreuergruppen", compact($BetreuerGruppen));
    }

}