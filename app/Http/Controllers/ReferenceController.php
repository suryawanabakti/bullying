<?php

namespace App\Http\Controllers;

use App\Models\Siswa;
use App\Models\User;
use Illuminate\Http\Request;

class ReferenceController extends Controller
{
    public function getSiswa(Request $request)
    {
        return User::with('kelas', 'jurusan')->where('name', 'LIKE', "%{$request->term}%")->get()->map(function ($siswa) {
            return [
                "value" => $siswa->id,
                "label" => "$siswa->name - {$siswa->kelas->nama} - {$siswa->jurusan->nama}",
            ];
        });
    }
}
