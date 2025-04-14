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
        Schema::create('phpscriptstoexecute', function (Blueprint $table) {
            $table->integer('phpPath_ID')->nullable(false)->primary();
            $table->timestamp('dateCreated')->nullable();
            $table->string('pathScript')->nullable(false);
            $table->timestamp('dateExec')->nullable();
            $table->integer('executed')->nullable();
            $table->string('mode')->nullable();
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
        Schema::dropIfExists('phpscriptstoexecute');
    }
};
