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
        Schema::create('energieformen', function (Blueprint $table) {
            $table->integer('enf_ID')->nullable(false)->primary();
            $table->string('nameEnf')->nullable();
            $table->string('kuerzelEnf')->nullable();
            $table->string('notizEnf')->nullable();
            $table->string('einheit1Enf')->nullable();
            $table->string('einheit2Enf')->nullable();
            $table->string('einheit3Enf')->nullable();
            $table->decimal('enfEinh1FaktorKwh', 10, 2)->nullable();
            $table->decimal('enfEinh2FaktorKwh', 10, 2)->nullable();
            $table->decimal('enfEinh3FaktorKwh', 10, 2)->nullable();
            $table->decimal('enfEinh1FaktorCO2', 10, 2)->nullable();
            $table->decimal('enfEinh2FaktorCO2', 10, 2)->nullable();
            $table->decimal('enfEinh3FaktorCO2', 10, 2)->nullable();
            $table->string('lblEnfEinh1FaktorX1')->nullable();
            $table->string('lblEnfEinh2FaktorX1')->nullable();
            $table->string('lblEnfEinh3FaktorX1')->nullable();
            $table->decimal('enfEinh1FaktorX1', 10, 2)->nullable();
            $table->decimal('enfEinh2FaktorX1', 10, 2)->nullable();
            $table->decimal('enfEinh3FaktorX1', 10, 2)->nullable();
            $table->string('lblEnfEinh1FaktorX2')->nullable();
            $table->string('lblEnfEinh2FaktorX2')->nullable();
            $table->string('lblEnfEinh3FaktorX2')->nullable();
            $table->decimal('enfEinh1FaktorX2', 10, 2)->nullable();
            $table->decimal('enfEinh2FaktorX2', 10, 2)->nullable();
            $table->decimal('enfEinh3FaktorX2', 10, 2)->nullable();
            $table->string('lblEnfEinh1FaktorX3')->nullable();
            $table->string('lblEnfEinh2FaktorX3')->nullable();
            $table->string('lblEnfEinh3FaktorX3')->nullable();
            $table->decimal('enfEinh1FaktorX3', 10, 2)->nullable();
            $table->decimal('enfEinh2FaktorX3', 10, 2)->nullable();
            $table->decimal('enfEinh3FaktorX3', 10, 2)->nullable();
            $table->integer('aktivEnf')->nullable();
            $table->string('gueltigVomEnf')->nullable();
            $table->string('gueltigBisEnf')->nullable();
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
        Schema::dropIfExists('energieformen');
    }
};
