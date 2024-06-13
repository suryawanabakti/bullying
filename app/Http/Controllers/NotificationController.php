<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class NotificationController extends Controller
{
    public function index(Request $request)
    {

        $notifications = auth()->user()->notifications->map(function ($notication) use ($request) {
            $true = stristr($notication->data["message"], $request->search ?? null);
            if ($true != false) {
                return [
                    "id" => $notication->id,
                    "message" => $notication->data["message"],
                    "user" => $notication->data["data"],
                    "created_at" => $notication->created_at->diffForHumans(),
                ];
            }
        });

        return Inertia::render('Notifications/Index', [
            "notifications" => $notifications,
            "search" => request('search') ?? null
        ]);
    }

    public function getData()
    {
        return auth()->user()->someNotification;
    }

    public function reads()
    {
        auth()->user()->unreadNotifications->markAsRead();
        return back();
    }
}
