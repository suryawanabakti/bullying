<?php

namespace App\Http\Controllers;

use App\Models\Lapor;
use App\Http\Requests\StoreLaporRequest;
use App\Http\Requests\UpdateLaporRequest;
use App\Models\Siswa;

class UserLaporController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $lapor = Lapor::with('siswa', 'user')->orderBy('created_at', 'desc')->get();
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

        Lapor::create([
            "user_id" => auth()->id(),
            "jenis_kasus" => $request->jenis_kasus,
            "pelaku_id" => $request->siswa_id,
            "deskripsi" => $request->deskripsi,
            "bukti" => $request->file('gambar')->store('bukti')
        ]);

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
