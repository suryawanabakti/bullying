<?php

namespace App\Http\Controllers;

use App\Models\Lapor;
use App\Http\Requests\StoreLaporRequest;
use App\Http\Requests\UpdateLaporRequest;
use App\Models\Siswa;
use App\Models\User;
use App\Service\FonnteService;

class UserLaporController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $lapor = Lapor::with('siswa', 'user', 'siswa.jurusan', 'siswa.kelas')->where('user_id', auth()->id())->orderBy('created_at', 'desc')->get();
        return inertia("User/Lapor/Index", [
            "lapor" => $lapor
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("User/Lapor/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLaporRequest $request)
    {
        $path = $request->file('video')->store('videos');
        Lapor::create([
            "user_id" => auth()->id(),
            "jenis_kasus" => $request->jenis_kasus,
            "pelaku_id" => $request->siswa_id,
            "deskripsi" => $request->deskripsi,
            "bukti" => $request->file('gambar')->store('bukti'),
            "video" => $path,
        ]);

        $nama = auth()->user()->name;
        $nis = auth()->user()->email;

        $user = User::where('id', $request->siswa_id)->first();
        FonnteService::sendWa(env('WA_BK'), "Laporan Masuk\n\nPelapor \nNama : {$nama} \nNis : {$nis} \n\nPelaku \nNama : {$user->name}\nNis : {$user->email}\nKelas : {$user->kelas->nama}\nJurusan : {$user->jurusan->nama}\n\nDeskripsi \n{$request->deskripsi}");
        return redirect()->route("user.lapor.index");
    }

    /**
     * Display the specified resource.
     */
    public function show(Lapor $lapor)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Lapor $lapor)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLaporRequest $request, Lapor $lapor)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Lapor $lapor)
    {
        //
    }
}
