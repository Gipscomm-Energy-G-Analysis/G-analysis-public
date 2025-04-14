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
        Schema::create('admins', function (Blueprint $table) {
            $table->integer('adm_ID')->nullable(false)->primary();
            $table->integer('manGrp_ID')->nullable();
            $table->string('titel')->nullable();
            $table->string('name')->nullable();
            $table->string('vorname')->nullable();
            $table->string('email')->nullable();
            $table->string('telefon')->nullable();
            $table->string('fax')->nullable();
            $table->string('mobiltelefon')->nullable();
            $table->string('username')->nullable();
            $table->integer('man_ID')->nullable();
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
        Schema::dropIfExists('admins');
    }
};
