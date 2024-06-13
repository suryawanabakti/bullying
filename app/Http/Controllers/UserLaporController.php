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
            "jenis_kasus" => $request->jenis_kasus,
            "siswa_id" => $request->siswa_id,
            "deskripsi" => $request->deskripsi,
            "bukti" => $request->file('gambar')->store('bukti')
        ]);

        return back();
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
