<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MachinePriority extends Model
{
    use HasFactory;
    protected $fillable = ['user_id', 'username', 'machines', 'order','limit'];
    protected $table = 'machine_priority';
    public $timestamps = false;
}
