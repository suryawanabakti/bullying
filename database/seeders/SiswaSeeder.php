<?php

namespace Database\Seeders;

use App\Models\Siswa;
use Database\Factories\SiswaFactory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SiswaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Siswa::factory(50)->create();
    }
}
