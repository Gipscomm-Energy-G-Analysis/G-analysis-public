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
        Schema::create('superAdmins', function (Blueprint $table) {
            $table->string('titelSAdm')->nullable();     
            $table->string('nameSAdm')->nullable();     
            $table->string('vornameSAdm')->nullable();     
            $table->string('emailSAdm')->nullable();      
            $table->string('telefonSAdm')->nullable();      
            $table->string('faxSAdm')->nullable();      
            $table->string('mobiltelefonSAdm')->nullable();      
            $table->string('username')->nullable();     
            $table->string('nameDbSAdm')->nullable();      
            $table->integer('sAdm_ID')->nullable(false)->primary();      
            $table->integer('betrGrp_ID')->nullable();     
            $table->string('passHash')->nullable();      
            $table->string('position')->nullable();     
            $table->integer('manGrp_ID')->nullable();     
            $table->integer('man_ID')->nullable();     
            $table->integer('deleted')->nullable();      
            $table->string('rechteTreeView')->nullable();      
            $table->string('rechteMenu')->nullable();      
            $table->string('rechteEdit')->nullable();      
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
        Schema::dropIfExists('superAdmins');
    }
};
