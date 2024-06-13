<?php

use App\Http\Controllers\ActivityController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\LaporController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReferenceController;
use App\Http\Controllers\SiswaController;
use App\Http\Controllers\UserLaporController;
use App\Models\User;
use App\Notifications\FeedbackNotification;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Surya\Sso\Authenticated;

Route::get('/', function () {
    return redirect('/login');
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
    Route::patch("/lapor/{lapor}/selesai", [LaporController::class, 'selesai'])->name('admin.lapor.selesai');
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
