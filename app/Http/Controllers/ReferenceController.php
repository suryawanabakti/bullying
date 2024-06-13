<?php

namespace App\Http\Controllers;

use App\Models\Siswa;
use Illuminate\Http\Request;

class ReferenceController extends Controller
{
    public function getSiswa(Request $request)
    {
        return Siswa::where('name', 'LIKE', "%$request->term%")->get()->map(function ($siswa) {
            return [
                "value" => $siswa->id,
                "label" => $siswa->nama,
            ];
        });
    }
}
