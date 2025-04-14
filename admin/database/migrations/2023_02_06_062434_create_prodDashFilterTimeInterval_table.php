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
        Schema::create('prodDashFilterTimeInterval', function (Blueprint $table) {
            $table->integer('prdDash_ID')->nullable(false)->primary();
            $table->string('value')->nullable();
            $table->integer('active')->nullable(false);
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
        Schema::dropIfExists('prodDashFilterTimeInterval');
    }
};
