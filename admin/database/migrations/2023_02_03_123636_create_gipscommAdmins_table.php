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
        Schema::create('gipscommAdmins', function (Blueprint $table) {
            $table->integer('gipsAdm_ID')->nullable(false)->primary();
            $table->string('username')->nullable();
            $table->integer('betrGrp_ID')->nullable();
            $table->string('passHash')->nullable();
            $table->string('position')->nullable();
            $table->integer('manGrp_ID')->nullable();
            $table->integer('man_ID')->nullable();
            $table->string('deleted')->nullable();
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
        Schema::dropIfExists('gipscommAdmins');
    }
};
