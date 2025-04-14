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
        Schema::create('subGroupOptions', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id')->nullable();   
            $table->string('username')->nullable();  
            $table->string('option_name')->nullable();  
            $table->string('group_id')->nullable();  
            $table->string('status')->nullable(false);
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
        Schema::dropIfExists('subGroupOptions');
    }
};
