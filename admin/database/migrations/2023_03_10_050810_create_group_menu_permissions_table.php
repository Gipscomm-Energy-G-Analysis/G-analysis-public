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
        Schema::create('group_menu_permissions', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id')->nullable();
            $table->integer('group_id')->nullable();   
            $table->string('menu_permission_id')->nullable();
            $table->integer('add')->nullable();
            $table->integer('edit')->nullable();
            $table->integer('delete')->nullable();
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
        Schema::dropIfExists('group_menu_permissions');
    }
};
