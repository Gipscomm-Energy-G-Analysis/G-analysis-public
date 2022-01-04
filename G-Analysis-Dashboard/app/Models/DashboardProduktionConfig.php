<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DashboardProduktionConfig extends Model
{
    use HasFactory;
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $fillable = ['table_name', 'column_name', 'username', 'anl_ID','dbName','label_name', 'status', 'primary_key', 'foreign_key','is_graph'];
    protected $table = 'dashboardProduktionConfig';
    public $timestamps = false;
}
