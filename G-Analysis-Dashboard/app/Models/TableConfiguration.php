<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TableConfiguration extends Model
{
    use HasFactory;
    protected $fillable = ['column_name', 'status', 'table_name', 'label_name'];
    protected $table = 'machine_table_config';
    public $timestamps = false;
}
