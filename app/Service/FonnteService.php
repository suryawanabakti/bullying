<?php

namespace App\Service;

use Illuminate\Support\Facades\Http;

class FonnteService
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public static function sendWa($noWa, $message)
    {
        Http::withHeader("Authorization", env('FONNTE_TOKEN'))->post("https://api.fonnte.com/send", [
            'target' => $noWa,
            'message' => $message,
            'countryCode' => '62', //optional
        ]);
    }
}
