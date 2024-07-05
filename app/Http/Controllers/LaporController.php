<?php

namespace App\Http\Controllers;

use App\Models\Lapor;
use App\Models\User;
use App\Notifications\TerimaNotification;
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

    public function terima(Lapor $lapor, Request $request)
    {
        FonnteService::sendWa($lapor->siswa->no_wa, "Yth. Bpk/Ibu Orangtua Siswa bernama {$lapor->siswa->name} \n\nKami dari Bimbingan Konseling (BK) SMK Kartika XX-1 Makassar mengundang bapak/ibu untuk menjalin komunikasi yang baik antara Orangtua siswa/i dan Pihak Sekolah dalam mendidik dan melatih anak ke arah yang lebih baik, maka kami mohon kehadiran Bapak/Ibu besok di sekolah pukul {$request->waktu} WITA.
Demikian Pemberitahuan ini kami sampaikan ke orangtua siswa/i.Terima kasih atas perhatian dan kerja samanya.
");
        $user = User::find($lapor->user_id);
        $user->notify(new TerimaNotification(auth()->user()));
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
