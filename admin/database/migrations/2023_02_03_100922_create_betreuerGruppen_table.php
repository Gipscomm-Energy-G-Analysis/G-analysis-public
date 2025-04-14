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
        Schema::create('betreuerGruppen', function (Blueprint $table) {
            $table->integer('betrGrp_ID')->nullable(false)->primary();
            $table->string('firma')->nullable();
            $table->integer('anzahlMitarbeiter')->nullable();
            $table->string('anschrift')->nullable();
            $table->string('plz')->nullable();
            $table->string('ort')->nullable();
            $table->string('geschaeftsfuehrer')->nullable();
            $table->string('telefon')->nullable();
            $table->string('eMail')->nullable();
            $table->string('notiz')->nullable();
            $table->integer('deleted')->nullable();
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
        Schema::dropIfExists('betreuerGruppen');
    }
};
