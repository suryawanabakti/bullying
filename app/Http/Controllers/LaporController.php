<?php

namespace App\Http\Controllers;

use App\Models\Lapor;
use App\Service\FonnteService;
use Illuminate\Http\Request;

class LaporController extends Controller
{
    public function index()
    {
        $lapor = Lapor::with('siswa', 'user.kelas', 'user.jurusan', 'siswa.kelas', 'siswa.jurusan')->orderBy('created_at', 'desc')->get();
        return inertia("Admin/Laporan/Index", [
            "lapor" => $lapor
        ]);
    }

    public function terima(Lapor $lapor)
    {
        FonnteService::sendWa($lapor->siswa->no_wa, "Yth. Bpk/Ibu Orangtua Siswa bernama {$lapor->siswa->nama} \n\nUntuk menjalin komunikasi yang baik antara Orangtua siswa/i dan Pihak Sekolah dalam mendidik dan melatih anak ke arah yang lebih baik, maka kami mohon kehadiran Bapak/Ibu besok di sekolah pukul 09.00 WITA.\nDemikian Pemberitahuan ini kami sampaikan ke orangtua siswa/i.Terima kasih atas perhatian dan kerja samanya.");
        $lapor->update(["status" => "terima"]);
        return back();
    }

    public function tolak(Lapor $lapor)
    {
        $lapor->update(["status" => "tolak"]);
        return back();
    }

    public function selesai(Lapor $lapor, Request $request)
    {

        $lapor->update(["status" => "selesai", "keterangan" => $request->keterangan]);
        return back();
    }

    public function destroy(Lapor $lapor)
    {
        $lapor->delete();
        return back();
    }
}
