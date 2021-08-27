<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use DB;
use Illuminate\Database\Schema\Blueprint;

class MigrationController extends Controller
{
    public static function createSubGroupConfigurationTable() {
        $table_exits = DB::getSchemaBuilder()->hasTable('SubGroupConfiguration');
        if (!$table_exits) {
            Schema::create('SubGroupConfiguration', function (Blueprint $table) {
                $table->id();
                $table->bigInteger('group_id');
                $table->bigInteger('sub_group_id');
                $table->bigInteger('user_id');
                $table->string('table_name');
                $table->string('column_name');
                $table->string('label_name');
                $table->string('primary_key');
                $table->string('foreign_key');
                $table->timestamps();
            });
        }
        return;
    }

    public static function createDashboardProduktionConfigTable() {
        $table_exits = DB::getSchemaBuilder()->hasTable('dashboardProduktionConfig');
        if (!$table_exits) {
            Schema::create('dashboardProduktionConfig', function (Blueprint $table) {
                $table->id();
                $table->integer('anl_ID');
                $table->string('username');
                $table->string('dbName');
                $table->string('label_name');
                $table->string('table_name');
                $table->string('column_name');
                $table->string('primary_key');
                $table->string('foreign_key');
                $table->timestamps();
            });
        }
        return;
    }

    public static function createMachineTableConfigurations() {
        $table_exits = DB::getSchemaBuilder()->hasTable('machine_table_config');
        if (!$table_exits) {
            Schema::create('machine_table_config', function (Blueprint $table) {
                $table->id();
                $table->integer('column_name');
                $table->enum('status',['0','1','2']);
                $table->string('table_name')->nullable();
                $table->timestamps();
            });
        }
        return;
    }

}
