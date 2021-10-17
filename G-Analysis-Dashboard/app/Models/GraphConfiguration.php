<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GraphConfiguration extends Model
{
    use HasFactory;
    protected $fillable = ['user_id', 'username', 'label', 'data','type','status'];
    protected $table = 'graph_configurations';
    public $timestamps = false;
}
