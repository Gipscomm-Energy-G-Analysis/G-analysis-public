<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Anlagen;
use Config;
use DB;

class UploadImageController extends Controller
{
    public function imageUpload(Request $request)
    {
        //  dd($request->all());
    	$data = $request->file('file');
        $imageName = time().'.'.$request->file('file')->extension();
        $anl_ID = $request->anl_ID;
        try {
            $query = DB::table('Anlagen')
              ->where('anl_ID', $anl_ID)
              ->update(['bildAnl' => $request->file('file')->move('images',$imageName)]);
              echo "success";
        } catch (Illuminate\Database\QueryException $e) {
            dd($e);
          
        } catch (PDOException $e) {
            dd($e);
        } 
    }
}
