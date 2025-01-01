<?php

use App\Http\Controllers\ActivityController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\LaporController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReferenceController;
use App\Http\Controllers\SiswaController;
use App\Http\Controllers\UserLaporController;
use App\Models\Jurusan;
use App\Models\User;
use App\Notifications\FeedbackNotification;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Surya\Sso\Authenticated;

Route::get('/test', function () {
    $api_key = env('FONNTE_TOKEN'); // Ganti dengan API Key Anda
    $phone_number = '6281244067445'; // Ganti dengan nomor tujuan
    $message = 'Ini adalah file PDF yang dikirim via Fonnte.';
    $pdf_url = 'https://sertifikatdokterpppds.med.unhas.ac.id/storage/sertifikat/262d9167-0f1e-4423-ab5b-844c8cf93342.pdf'; // Ganti dengan URL file PDF Anda

    $data = [
        'target' => $phone_number,
        'message' => $message,
        'url' => $pdf_url,
        'filename' => 'pdf'
    ];

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
            'message' => 'test message',
            'url' => $pdf_url,
            'filename' => 'my-file.pdf', //optional, only works on file and audio
            'countryCode' => '62', //optional
        ),
        CURLOPT_HTTPHEADER => array(
            'Authorization: ' . $api_key //change TOKEN to your actual token
        ),
    ));

    $response = curl_exec($curl);

    curl_close($curl);
    echo $response;
});
Route::get('/', function () {

    return redirect('/login');
});

Route::get('/change-jurusan', function () {
    Jurusan::where('nama', 'Tekhnik dan bisnis sepeda motor')->update(['nama' => 'Teknik dan bisnis sepeda motor']);
    Jurusan::where('nama', 'Tekhnik Komputer dan jaringan')->update(['nama' => 'Teknik Komputer dan jaringan']);
    Jurusan::where('nama', 'Tekhnik Kendaraan ringan')->update(['nama' => 'Teknik Kendaraan ringan']);
    Jurusan::where('nama', 'Tekhnik Permesinan')->update(['nama' => 'Teknik Permesinan']);
    Jurusan::where('nama', 'Tekhnik Instalasi Tenaga Listrik')->update(['nama' => 'Teknik Instalasi Tenaga Listrik']);
    Jurusan::where('nama', 'Tekhnik Audio Video')->update(['nama' => 'Teknik Audio Video']);
    Jurusan::where('nama', 'Rekaya Perangkat Lunak')->update(['nama' => 'Rekayasa Perangkat Lunak']);
});


Route::get('/ref/siswa', [ReferenceController::class, 'getSiswa']);
Route::get('/send-notification', function () {
    $user = User::where('email', 'super@super')->first();
    $user->notify(new FeedbackNotification(auth()->user()));
    try {
        \App\Events\FeedbackNotification::dispatch($user->id);
    } catch (Exception $e) {
    }
    return redirect('/dashboard')->with('success', 'Gagal memberikan notifikasi');
});

Route::get('/login-sso', function () {
    $user =  Authenticated::authenticate(request('token'), request('sso_token'), request('app_name'));
    Auth::login($user);
    // Kondisi Jika Ada cth:  if role === admin redirect :
    return redirect('/dashboard');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::resource('users', UserController::class)->names("admin.users");
    Route::resource('siswa', SiswaController::class)->names("admin.siswa");
    Route::get("/lapor", [LaporController::class, 'index'])->name('admin.lapor.index');

    Route::patch("/lapor/{lapor}/terima", [LaporController::class, 'terima'])->name('admin.lapor.terima');
    Route::patch("/lapor/{lapor}/tolak", [LaporController::class, 'tolak'])->name('admin.lapor.tolak');
    Route::patch("/lapor/{lapor}/selesai", [LaporController::class, 'selesai'])->name('admin.lapor.selesai');
    Route::delete("/lapor/{lapor}/delete", [LaporController::class, 'destroy'])->name('admin.lapor.destroy');
    Route::get("/lapor/{lapor}/cetak", [LaporController::class, 'cetak'])->name('admin.lapor.cetak');

    Route::resource("/user/lapor", UserLaporController::class)->names("user.lapor");

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/notifications', [NotificationController::class, 'index'])->name('notifications.index');
    Route::get('/notifications/get-data', [NotificationController::class, 'getData'])->name('notifications.get-data');
    Route::get('/notifications/{notification}', [NotificationController::class, 'show'])->name('notifications.show');
    Route::post('/notifications/reads', [NotificationController::class, 'reads'])->name('notifications.reads');

    Route::get('/activities', [ActivityController::class, 'index'])->name('activities.index');
});

require __DIR__ . '/auth.php';
