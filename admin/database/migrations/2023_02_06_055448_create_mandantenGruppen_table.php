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
        Schema::create('mandantenGruppen', function (Blueprint $table) {
            $table->integer('manGrp_ID')->nullable(false)->primary();
            $table->string('name')->nullable();
            $table->string('kurz')->nullable();
            $table->string('notiz')->nullable();
            $table->integer('betrGrp_ID')->nullable();
            $table->string('mandantenIDs')->nullable();
            $table->integer('deleted')->nullable();
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
        Schema::dropIfExists('mandantenGruppen');
    }
};
