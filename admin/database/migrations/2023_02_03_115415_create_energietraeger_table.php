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
        Schema::create('energietraeger', function (Blueprint $table) {
            $table->integer('ent_ID')->nullable(false)->primary();
            $table->string('nameEnt')->nullable(false);
            $table->string('kuerzelEnt')->nullable();
            $table->string('notizEnt')->nullable();
            $table->string('einheit1Ent')->nullable();
            $table->string('einheit2Ent')->nullable();
            $table->string('einheit3Ent')->nullable();
            $table->decimal('entEinh1FaktorKwh', 10, 2)->nullable();
            $table->decimal('entEinh2FaktorKwh', 10, 2)->nullable();
            $table->decimal('entEinh3FaktorKwh', 10, 2)->nullable();
            $table->decimal('entEinh1FaktorCO2', 10, 2)->nullable();
            $table->decimal('entEinh2FaktorCO2', 10, 2)->nullable();
            $table->decimal('entEinh3FaktorCO2', 10, 2)->nullable();
            $table->string('lblEntEinh1FaktorX1')->nullable();
            $table->string('lblEntEinh2FaktorX1')->nullable();
            $table->string('lblEntEinh3FaktorX1')->nullable();
            $table->decimal('entEinh1FaktorX1', 10, 2)->nullable();
            $table->decimal('entEinh2FaktorX1', 10, 2)->nullable();
            $table->decimal('entEinh3FaktorX1', 10, 2)->nullable();
            $table->string('lblEntEinh1FaktorX2')->nullable();
            $table->string('lblEntEinh2FaktorX2')->nullable();
            $table->string('lblEntEinh3FaktorX2')->nullable();
            $table->decimal('entEinh1FaktorX2', 10, 2)->nullable();
            $table->decimal('entEinh2FaktorX2', 10, 2)->nullable();
            $table->decimal('entEinh3FaktorX2', 10, 2)->nullable();
            $table->string('lblEntEinh1FaktorX3')->nullable();
            $table->string('lblEntEinh2FaktorX3')->nullable();
            $table->string('lblEntEinh3FaktorX3')->nullable();
            $table->decimal('entEinh1FaktorX3', 10, 2)->nullable();
            $table->decimal('entEinh2FaktorX3', 10, 2)->nullable();
            $table->decimal('entEinh3FaktorX3', 10, 2)->nullable();
            $table->integer('aktivEnt')->nullable();
            $table->string('gueltigVomEnt')->nullable();
            $table->string('gueltigBisEnt')->nullable();
            $table->string('versorgerEnt')->nullable();
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
        Schema::dropIfExists('energietraeger');
    }
};
