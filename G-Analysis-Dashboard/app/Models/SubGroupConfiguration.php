<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubGroupConfiguration extends Model
{
    use HasFactory;
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $fillable = ['group_id', 'sub_group_id', 'user_id', 'username','table_name','column_name', 'label_name', 'primary_key', 'foreign_key','created_at','updated_at','status','is_graph'];
    protected $table = 'SubGroupConfiguration';
    public $timestamps = false;
}
