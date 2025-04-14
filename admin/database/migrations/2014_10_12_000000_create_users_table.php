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
        Schema::create('dashboardUsers', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('firstname')->nullable();
            $table->string('lastname')->nullable();
            $table->string('email')->unique();
            $table->string('username')->nullable();
            $table->string('phone_no')->nullable();
            $table->string('position')->nullable();
            $table->integer('status')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->boolean('is_admin')->nullable();
            $table->integer('role_id')->default(2)->comment('1=admin, 2=user');
            $table->string('password');
            $table->rememberToken();
            $table->timestamp('deleted_at')->nullable();
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
        Schema::dropIfExists('dashboardUsers');
    }
};
