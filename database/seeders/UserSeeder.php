<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $password = bcrypt('123123123');

        User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@test.com',
            'password' => $password,
        ]);
    }
}
