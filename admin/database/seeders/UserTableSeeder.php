<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Hash;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // User::factory()
        //     ->count(50)
        //     ->create();

        DB::table('users')->insert([
            [
            'name'    => 'Deepak Kumar',
            'username'     => 'deepak',
            'email'         =>  'deepak@yopmail.com',
            'password'      =>  Hash::make('mind@123'),
            'role_id'       => 2,
            'is_admin'      =>1
            ],
        ]);
    }
}
