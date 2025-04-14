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
        Schema::create('benutzer', function (Blueprint $table) {
            $table->integer('man_ID')->nullable();
            $table->string('name')->nullable(false);
            $table->string('vorname')->nullable(false);
            $table->string('username')->nullable();
            $table->string('titel')->nullable();
            $table->string('eMail')->nullable();
            $table->string('telefon')->nullable();
            $table->string('fax')->nullable();
            $table->string('mobiltelefon')->nullable();
            $table->integer('manGrp_ID')->nullable();
            $table->integer('ben_ID')->nullable(false)->primary();
            $table->string('passHash')->nullable();
            $table->integer('betrGrp_ID')->nullable();
            $table->string('position')->nullable();
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
        Schema::dropIfExists('benutzer');
    }
};
