<?php

namespace App\Http\Controllers;

use App\Http\Resources\ActivityResource;
use Spatie\Activitylog\Models\Activity;

class ActivityController extends Controller
{
    public function index()
    {
        $activities = ActivityResource::collection(Activity::where('causer_id', auth()->id())->latest()->get());
        return inertia("Activities/Index", ["activities" => $activities]);
    }   
}
