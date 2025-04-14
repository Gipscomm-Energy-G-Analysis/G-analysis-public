<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Hash;
//use Spatie\Permission\Models\Role;
use App\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Role::create([
        //     'name' => 'Admin',
        //     'guard_name' => 'web',
        // ]);

        // Role::create([
        //     'name' => 'User',
        //     'guard_name' => 'web',
        // ]);
           Role::insert([
            ['role_name' => 'Admin','status' => 0],
            ['role_name' => 'User','status' => 0],
            ['role_name' => 'Super Admin','status' => 0]
        ]);
    }
}
