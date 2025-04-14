<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Hash; 
use DataTables;
use App\Models\GipscommMenu;
use App\Models\Role;
use App\Models\Groups;
use App\Models\GroupMenuPermissions;
use Illuminate\Support\Facades\DB;

class GroupsController extends Controller
{
    public function index(){
        $data=[
            'title'=>'Groups'
        ];
        $groupMenuPermission   = GipscommMenu::select('id as Id','name as Title','parent_id as ParentId')->get();
        return view('admin.users.create-group-form',['data' => $data,'groupMenuPermission' => $groupMenuPermission]);
    }

    public function createGroupForm(Request $request){
        $request->validate([
            'name' => 'required',
            'description' => 'required'
        ]);
        $data = new Groups;
        $data->name = $request->name;
        $data->description = $request->description;
        $data->save();
        $group_id = $data->id;
        if(!empty($request->rolePermissionIds)){
            $rolePermissionIds=explode(',', $request->rolePermissionIds);
            $rolePermissionAddIds=explode(',', $request->rolePermissionAddIds);
            $rolePermissionEditIds=explode(',', $request->rolePermissionEditIds);
            $rolePermissionDeleteIds=explode(',', $request->rolePermissionDeleteIds);
            $permissionIds = array();
            foreach($rolePermissionIds as $rolePermissionId){
                if(!empty($rolePermissionId)){
                    $add="0";$edit="0";$delete="0";
                    if(in_array($rolePermissionId,$rolePermissionAddIds)){
                        $add="1";
                    }else{
                        $add="0";
                    }
                    if(in_array($rolePermissionId,$rolePermissionEditIds)){
                        $edit="1";
                    }else{
                        $edit="0";
                    }
                    if(in_array($rolePermissionId,$rolePermissionDeleteIds)){
                        $delete="1";
                    }else{
                        $delete="0";
                    }

                    $permissionIds[] =[
                        'menu_permission_id' => $rolePermissionId,
                        'group_id' => $group_id,
                        'add' => $add,
                        'edit' => $edit,
                        'delete' => $delete,
                    ];                 
                }
            }
            GroupMenuPermissions::insert($permissionIds);
        }
        toastr()->success('Die Gruppe wurde erfolgreich gespeichert!');
        return redirect()->route('group-list');
    }

    public function editGroup($id)
    {
        $data= Groups::findorFail($id);
        $GroupMenuPermissions= GroupMenuPermissions::select('menu_permission_id')->where('group_id', '=', $id)->get(); 
        $GroupMenuPermissions = collect($GroupMenuPermissions)->pluck('menu_permission_id')->implode(',');

        $addGroupMenuPermissions= GroupMenuPermissions::select('menu_permission_id')->where('group_id', '=', $id)->where('add', '=', 1)->get(); 
        $addGroupMenuPermissions = collect($addGroupMenuPermissions)->pluck('menu_permission_id')->implode(',');

        $editGroupMenuPermissions= GroupMenuPermissions::select('menu_permission_id')->where('group_id', '=', $id)->where('edit', '=', 1)->get(); 
        $editGroupMenuPermissions = collect($editGroupMenuPermissions)->pluck('menu_permission_id')->implode(',');

        $deleteGroupMenuPermissions= GroupMenuPermissions::select('menu_permission_id')->where('group_id', '=', $id)->where('delete', '=', 1)->get(); 
        $deleteGroupMenuPermissions = collect($deleteGroupMenuPermissions)->pluck('menu_permission_id')->implode(',');
        
        $treeGroupMenuPermission   = GipscommMenu::select('id as Id','name as Title','parent_id as ParentId')->get(); 
        return view('admin.users.edit-group',['data'=>$data,'GroupMenuPermissions'=>$GroupMenuPermissions,'treeGroupMenuPermission'=>$treeGroupMenuPermission,'addGroupMenuPermissions'=>$addGroupMenuPermissions,'editGroupMenuPermissions'=>$editGroupMenuPermissions,'deleteGroupMenuPermissions'=>$deleteGroupMenuPermissions]);
    }

    public function updateGroup(Request $request){
        $request->validate([
            'name' => 'required',
            'description' => 'required'
        ]);
        $data= Groups::findorFail($request->id); 
        $data->name = $request->name;
        $data->description = $request->description; 
        $data->save();
        $group_id = $data->id;
        if(!empty($request->rolePermissionIds)){
            $rolePermissionIds=explode(',', $request->rolePermissionIds);
            $rolePermissionAddIds=explode(',', $request->rolePermissionAddIds);
            $rolePermissionEditIds=explode(',', $request->rolePermissionEditIds);
            $rolePermissionDeleteIds=explode(',', $request->rolePermissionDeleteIds);
            $permissionIds = array();
            foreach($rolePermissionIds as $rolePermissionId){
                if(!empty($rolePermissionId)){
                    $add="0";$edit="0";$delete="0";
                    if(in_array($rolePermissionId,$rolePermissionAddIds)){
                        $add="1";
                    }else{
                        $add="0";
                    }
                    if(in_array($rolePermissionId,$rolePermissionEditIds)){
                        $edit="1";
                    }else{
                        $edit="0";
                    }
                    if(in_array($rolePermissionId,$rolePermissionDeleteIds)){
                        $delete="1";
                    }else{
                        $delete="0";
                    }

                    $permissionIds[] =[
                        'menu_permission_id' => $rolePermissionId,
                        'group_id' => $group_id,
                        'add' => $add,
                        'edit' => $edit,
                        'delete' => $delete,
                    ];                 
                }
            }
        }
        GroupMenuPermissions::where('group_id', '=', $group_id)->delete(); 
        if(!empty($permissionIds)){ 
            GroupMenuPermissions::insert($permissionIds);
        }
        toastr()->success('Die Gruppe wurde erfolgreich aktualisiert!');
        return redirect()->route('group-list');
    }

    public function groupList(Request $request){
        if ($request->ajax()) {
            $data = Groups::get();
            return Datatables::of($data)
                    ->addIndexColumn()
                    ->addColumn('action', function($row){
                            $actionButton = '<a class="btn btn-info btn-sm" href="edit-group/'.$row->id.'">
                            <i class="fas fa-edit"></i> bearbeiten</a>
                        <a class="btn btn-danger confirmation-del btn-sm" href="delete-group/'.$row->id.'">
                            <i class="fa fa-trash"></i> löschen</a>';    
                            return $actionButton;
                    })
                    ->rawColumns(['action'])
                    ->make(true);
        }
        return view('admin.users.group-list');
    }

    public function deleteGroup($id)
    {
        $data= Groups::destroy($id);
        GroupMenuPermissions::where('group_id', '=', $id)->delete(); 
        toastr()->success('Gruppe erfolgreich gelöscht!'); 
        return redirect()->route('group-list');
    }

    public function getGroupPermissionMenu(){
        $menuPermission   = GipscommMenu::select('id as Id','name as Title','parent_id as ParentId')->get();
        return $menuPermission;
    }
}