<?php

namespace Database\Seeders;

use App\Models\Jurusan;
use App\Models\Kelas;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Kelas::create([
            'nama' => 'Kelas 10'
        ]);
        Kelas::create([
            'nama' => 'Kelas 11'
        ]);
        Kelas::create([
            'nama' => 'Kelas 12'
        ]);

        Jurusan::create([
            'nama' => 'Tekhnik Komputer dan jaringan'
        ]);
        Jurusan::create([
            'nama' => 'Tekhnik Kendaraan ringan'
        ]);
        Jurusan::create([
            'nama' => 'Tekhnik dan bisni sepeda motor'
        ]);
        Jurusan::create([
            'nama' => 'Tekhnik Permesinan'
        ]);
        Jurusan::create([
            'nama' => 'Tekhnik Instalasi Tenaga Listrik'
        ]);
        Jurusan::create([
            'nama' => 'Rekaya Perangkat Lunak'
        ]);
        Jurusan::create([
            'nama' => 'Multimedia'
        ]);
        Jurusan::create([
            'nama' => 'Tekhnik Audio Video'
        ]);

        $this->call([
            SiswaSeeder::class,
            RoleSeeder::class,
            UserSeeder::class,
        ]);
    }
}
