<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class subGroupOptions extends Model
{
    use HasFactory;
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $fillable = ['option_name', 'group_id', 'user_id', 'status','username','created_at','updated_at'];
    protected $table = 'subGroupOptions';
    public $timestamps = false;
}
