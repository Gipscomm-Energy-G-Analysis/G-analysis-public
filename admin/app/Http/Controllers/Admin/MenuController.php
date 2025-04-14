<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Hash; 
use DataTables;
use App\Models\GipscommMenu;
use Illuminate\Support\Facades\DB;

class MenuController extends Controller
{
    public function index(){
        $data=[
            'title'=>'Menus'
        ];
        $GipscommMenu   = GipscommMenu::select()->get();
        return view('admin.users.menu-form',['data' => $data,'GipscommMenu' => $GipscommMenu]);
    }

    public function createMenuForm(Request $request){
        $request->validate([
            'name' => 'required',
            'parent_id' => 'required'
        ]);
        $data = new GipscommMenu;
        $data->name = $request->name;
        $data->parent_id = $request->parent_id;
        $data->save();
        toastr()->success('Das Menü wurde erfolgreich gespeichert!');
        return redirect()->route('menu-list');
    }

    public function editMenu($id)
    {
        $data= GipscommMenu::findorFail($id); 
        $GipscommMenu   = GipscommMenu::select()->get();
        return view('admin.users.edit-menu',['data'=>$data,'GipscommMenu' => $GipscommMenu]);
    }

    public function updateMenu(Request $request){
        $request->validate([
            'name' => 'required',
            'parent_id' => 'required'
        ]);
        $data= GipscommMenu::findorFail($request->id); 
        $data->name = $request->name;
        $data->parent_id = $request->parent_id; 
        $data->save();
        toastr()->success('Das Menü wurde erfolgreich aktualisiert!');
        return redirect()->route('menu-list');
    }

    public function menuList(Request $request){
        if ($request->ajax()) {
            $data = GipscommMenu::get();
            return Datatables::of($data)
                    ->addIndexColumn()
                    ->addColumn('action', function($row){
                            $actionButton = '<a class="btn btn-info btn-sm" href="edit-menu/'.$row->id.'">
                            <i class="fas fa-edit"></i> bearbeiten</a>
                        <a class="btn btn-danger confirmation-del btn-sm" href="delete-menu/'.$row->id.'">
                            <i class="fa fa-trash"></i> löschen</a>';    
                            return $actionButton;
                    })
                    ->rawColumns(['action'])
                    ->make(true);
        }
        return view('admin.users.menu-list');
    }

    public function deleteMenu($id)
    {
        $ids= DB::table('gipscomm_menu')->select('id','parent_id')->get();
        $idsArray=[];
        foreach ($ids as $key => $idarr){
            $idsArray[$idarr->id]=['parent_id'=> $idarr->parent_id];
        }
        function search(array $idsArray, int $parentId): array {
          $keys = array_keys(array_filter($idsArray, fn($value) => $value['parent_id'] == $parentId));
          foreach ($keys as $key) {
            $keys = array_merge($keys, search($idsArray, $key));
          }
          return $keys;
        }
        $menuIds = search($idsArray, $id);
        if(!empty($menuIds)){
            DB::table('gipscomm_menu')->whereIn('id',$menuIds)->delete();
        }
        DB::table('gipscomm_menu')->where('id',$id)->delete();
        toastr()->success('Menü erfolgreich gelöscht!'); 
        return redirect()->route('menu-list');
    }
}