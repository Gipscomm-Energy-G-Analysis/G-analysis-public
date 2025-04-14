<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('subGroupConfiguration', function (Blueprint $table) {
            $table->id();
            $table->integer('group_id')->nullable();
            $table->integer('sub_group_id')->nullable();
            $table->integer('user_id')->nullable();
            $table->string('username')->nullable();
            $table->string('table_name')->nullable();
            $table->string('column_name')->nullable();
            $table->string('label_name')->nullable();
            $table->string('primary_key')->nullable();
            $table->string('foreign_key')->nullable();
            $table->string('status')->nullable(false);  
            $table->string('is_graph')->nullable(false);  
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('subGroupConfiguration');
    }
};
