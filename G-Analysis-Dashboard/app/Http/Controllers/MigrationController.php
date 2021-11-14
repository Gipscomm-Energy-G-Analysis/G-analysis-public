<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use DB;
use Illuminate\Database\Schema\Blueprint;

class MigrationController extends Controller
{
    public static function runMigrations() {
        self::createSubGroupConfigurationTable();
        self::createDashboardProduktionConfigTable();
        self::createMachineTableConfigurations();
        self::createSubGroupOptionTable();
        self::createMachinePriorityTable();
        self::createGraphConfigurationTable();
        return;
    }


    public static function createSubGroupConfigurationTable() {
        $table_exits = DB::getSchemaBuilder()->hasTable('SubGroupConfiguration');
        if (!$table_exits) {
            Schema::create('SubGroupConfiguration', function (Blueprint $table) {
                $table->id();
                $table->bigInteger('group_id');
                $table->bigInteger('sub_group_id');
                $table->bigInteger('user_id')->nullable();
                $table->string('username')->nullable();
                $table->string('table_name');
                $table->string('column_name');
                $table->string('label_name');
                $table->string('primary_key');
                $table->string('foreign_key');
                $table->enum('status',['0','1']);
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
                $table->bigInteger('user_id')->nullable();
                $table->string('username');
                $table->string('dbName');
                $table->string('label_name');
                $table->string('table_name');
                $table->string('column_name');
                $table->string('primary_key');
                $table->string('foreign_key');
                $table->enum('status',['0','1']);
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
                $table->bigInteger('user_id')->nullable();
                $table->string('username')->nullable();
                $table->string('column_name')->nullable();
                $table->string('label_name')->nullable();
                $table->enum('status',['0','1','2']);
                $table->string('table_name')->nullable();
                $table->timestamps();
            });
        }
        return;
    }

    public static function createSubGroupOptionTable() {
        $table_exits = DB::getSchemaBuilder()->hasTable('subGroupOptions');
        if (!$table_exits) {
            Schema::create('subGroupOptions', function (Blueprint $table) {
                $table->id();
                $table->bigInteger('user_id')->nullable();
                $table->string('username')->nullable();
                $table->string('option_name');
                $table->string('group_id');
                $table->enum('status',['0','1']);
                $table->timestamps();
            });
        }
        return;
    }

    public static function createMachinePriorityTable() {
        $table_exits = DB::getSchemaBuilder()->hasTable('machine_priority');
        if (!$table_exits) {
            Schema::create('machine_priority', function (Blueprint $table) {
                $table->id();
                $table->bigInteger('user_id')->nullable();
                $table->string('username')->nullable();
                $table->text('machines');
                $table->string('order')->nullable();
                $table->integer('limit')->nullable();
                $table->timestamps();
            });
        }
        return;
    }

    public static function createGraphConfigurationTable() {
        $table_exits = DB::getSchemaBuilder()->hasTable('graph_configurations');
        if (!$table_exits) {
            Schema::create('graph_configurations', function (Blueprint $table) {
                $table->id();
                $table->bigInteger('user_id')->nullable();
                $table->string('username')->nullable();
                $table->string('graph_name')->nullable();
                $table->string('table_name')->nullable();
                $table->string('primary_key')->nullable();
                $table->string('foreign_key')->nullable();
                $table->string('label')->nullable();
                $table->string('data')->nullable();
                $table->string('type')->nullable();
                $table->string('is_open')->nullable();
                $table->string('limit')->nullable();
                $table->enum('status',['0','1']);
                $table->timestamps();
            });
        }
        return;
    }

}
