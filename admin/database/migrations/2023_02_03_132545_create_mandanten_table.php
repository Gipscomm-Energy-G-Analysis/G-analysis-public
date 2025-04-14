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
        Schema::create('mandanten', function (Blueprint $table) {
            $table->date('datumAdm')->nullable(false);
            $table->string('titelAdm')->nullable();
            $table->string('nameAdm')->nullable();
            $table->string('vornameAdm')->nullable();
            $table->string('emailAdm')->nullable();  
            $table->string('telefonAdm')->nullable();
            $table->string('faxAdm')->nullable();
            $table->string('mobiltelefonAdm')->nullable();
            $table->string('benutzernameAdm')->nullable();
            $table->string('nameMan')->nullable();  
            $table->string('holdingstruktur')->nullable();
            $table->string('liegenschaften')->nullable();
            $table->string('dbName')->nullable();  
            $table->string('mehrbenutzer')->nullable();
            $table->integer('betrGrp_ID')->nullable();
            $table->integer('man_ID')->nullable(false)->primary();
            $table->string('notiz')->nullable();
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
        Schema::dropIfExists('mandanten');
    }
};
