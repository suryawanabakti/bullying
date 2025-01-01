<?php

namespace App\Http\Controllers;

use App\Models\Lapor;
use App\Models\User;
use App\Notifications\TerimaNotification;
use App\Service\FonnteService;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;

class LaporController extends Controller
{
    public function index()
    {
        $lapor = Lapor::with('siswa', 'user.kelas', 'user.jurusan', 'siswa.kelas', 'siswa.jurusan')->orderBy('created_at', 'desc')->get()->map(function ($data) {
            return [
                "deskripsi" => $data->deskripsi,
                "jenis_kasus" => $data->jenis_kasus,
                "id" => $data->id,
                "user_id" => $data->user_id,
                "pelaku_id" => $data->pelaku_id,
                "bukti" => $data->bukti,
                "video" => $data->video,
                "status" => $data->status,
                "keterangan" => $data->keterangan,
                "siswa" => $data->siswa,
                "user" => $data->user,
                "created_at" => $data->created_at->format('d M Y H:i:s')
            ];
        });
        return inertia("Admin/Laporan/Index", [
            "lapor" => $lapor
        ]);
    }

    public function terima(Lapor $lapor, Request $request)
    {
        $pdf = Pdf::loadView('pdf.surat', compact('lapor'));
        $fileName = "surat$lapor->id.pdf";
        $pdf->save(storage_path('app/public/pdf/' . $fileName));

        $api_key = env('FONNTE_TOKEN'); // Ganti dengan API Key Anda
        $phone_number = $lapor->siswa->no_wa; // Ganti dengan nomor tujuan
        $message = "Yth. Bpk/Ibu Orangtua Siswa bernama {$lapor->siswa->name} \n\nKami dari Bimbingan Konseling (BK) SMK Kartika XX-1 Makassar mengundang bapak/ibu untuk menjalin komunikasi yang baik antara Orangtua siswa/i dan Pihak Sekolah dalam mendidik dan melatih anak ke arah yang lebih baik, maka kami mohon kehadiran Bapak/Ibu besok di sekolah pukul {$request->waktu} WITA.
Demikian Pemberitahuan ini kami sampaikan ke orangtua siswa/i.Terima kasih atas perhatian dan kerja samanya. ";
        $pdf_url = url('/storage/pdf/' . $fileName); // Ganti dengan URL file PDF Anda

        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => 'https://api.fonnte.com/send',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_POSTFIELDS => array(
                'target' => $phone_number,
                'message' => $message,
                'url' => $pdf_url,
                'filename' => $fileName, //optional, only works on file and audio
                'countryCode' => '62', //optional
            ),
            CURLOPT_HTTPHEADER => array(
                'Authorization: ' . $api_key //change TOKEN to your actual token
            ),
        ));

        $response = curl_exec($curl);

        curl_close($curl);
        echo $response;

        $user = User::find($lapor->user_id);
        $user->notify(new TerimaNotification(auth()->user()));
        $lapor->update(["status" => "terima", "waktu" => $request->waktu]);
        return back();
    }

    public function tolak(Lapor $lapor, Request $request)
    {

        $lapor->update(["status" => "tolak", "keterangan" => $request->keterangan]);

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

    public function cetak(Lapor $lapor)
    {
        $pdf = Pdf::loadView('pdf.surat', compact('lapor'));
        return $pdf->stream('surat.pdf');
    }
}
