<?php

namespace App\Http\Controllers;

use App\Models\Lapor;
use Illuminate\Http\Request;

class LaporController extends Controller
{
    public function index()
    {
        $lapor = Lapor::orderBy('created_at', 'desc')->get();
        return inertia("Admin/Laporan/Index", [
            "lapor" => $lapor
        ]);
    }

    public function terima(Lapor $lapor)
    {
        $lapor->update(["status" => "terima"]);
        return back();
    }

    public function selesai(Lapor $lapor)
    {
        $lapor->update(["status" => "selesai"]);
        return back();
    }
}
