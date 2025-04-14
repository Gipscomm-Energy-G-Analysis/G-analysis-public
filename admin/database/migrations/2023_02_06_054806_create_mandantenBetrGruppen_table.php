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
        Schema::create('mandantenBetrGruppen', function (Blueprint $table) {
            $table->integer('manBetrGrp_ID')->nullable(false)->primary();
            $table->string('betrGrp_ID')->nullable();
            $table->string('mandantenIDs')->nullable();           
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
        Schema::dropIfExists('mandantenBetrGruppen');
    }
};
