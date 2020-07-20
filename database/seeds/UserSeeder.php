<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name' => 'Admin',
            'email' => 'admin@test.com',
            'password' => Hash::make('password'),
            'roles' => [\App\Role\UserRole::ROLE_ADMIN]
        ]);

        User::create([
            'name' => 'Support',
            'email' => 'support@test.com',
            'password' => Hash::make('password'),
            'roles' => [\App\Role\UserRole::ROLE_SUPPORT]
        ]);
    }
}
