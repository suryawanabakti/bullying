<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\User::factory(50)->create()->each(function ($user) {
            $user->assignRole('user');
        });

        \App\Models\User::create([
            'name' => 'Super',
            'email' => 'super@super',
            'password' => Hash::make("password"),
            'gender' => 'male',
            'date_of_birth' => now()->format('Y-m-d'),
        ])->assignRole('super');

        \App\Models\User::create([
            'name' => 'Admin',
            'email' => 'admin@admin',
            'password' => Hash::make("password"),
            'gender' => 'male',
            'date_of_birth' => now()->format('Y-m-d'),
        ])->assignRole('admin');
    }
}
