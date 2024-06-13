<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\Admin\UserResource;
use Carbon\Carbon;

class UserController extends Controller
{
    public function index()
    {
        $users = User::role('user')->orderBy('updated_at', 'desc');
        if (request('search')) {
            $users->where('name', 'LIKE', '%' . request('search') . '%');
        }
        // return UserResource::collection($users);
        return inertia("Admin/Users/Index", ["users" => UserResource::collection($users->paginate(8)), "search" => request('search')]);
    }

    public function create()
    {
        $years = array();
        foreach (range(now()->year, now()->year - 50) as $year) {
            $years[] = $year;
        }

        $days = array();
        foreach (range(1, 31) as $day) {
            $days[] = $day;
        }

        $months = array();
        foreach (range(1, 12) as $month) {
            switch ($month) {
                case 1:
                    $label = "Januari";
                    break;
                case 2:
                    $label = "Februari";
                    break;
                case 3:
                    $label = "Maret";
                    break;
                case 4:
                    $label = "April";
                    break;
                case 5:
                    $label = "May";
                    break;
                case 6:
                    $label = "June";
                    break;
                case 7:
                    $label = "July";
                    break;
                case 8:
                    $label = "August";
                    break;
                case 9:
                    $label = "September";
                    break;
                case 10:
                    $label = "October";
                    break;
                case 11:
                    $label = "November";
                    break;
                case 12:
                    $label = "December";
                    break;
                default:
                    $label = "Januari";
            }
            $months[] = [
                "label" => $label,
                "value" => $month,
            ];
        }

        return inertia("Admin/Users/Create", ["years" => $years, "days" => $days, "months" => $months]);
    }

    public function store(StoreUserRequest $request)
    {
        $data = $request->all();
        $data['date_of_birth'] = "{$request->year}-{$request->month}-{$request->day}";
        if ($request->photo) {
            $data['photo'] = $request->file('photo')->store('photo');
        }
        User::create($data)->assignRole("user");

        return redirect()->route('admin.users.index')->with([
            "message" => [
                "label" => "Berhasil tambah ➕ user " . $request->name,
                "type" => "success",
            ],
        ]);;
    }

    public function show(User $user)
    {
        return inertia("Admin/Users/Show", ["user" => $user]);
    }

    public function edit(User $user)
    {
        $years = array();
        foreach (range(now()->year, now()->year - 50) as $year) {
            $years[] = $year;
        }

        $days = array();
        foreach (range(1, 31) as $day) {
            $days[] = $day;
        }

        $months = array();
        foreach (range(1, 12) as $month) {
            switch ($month) {
                case 1:
                    $label = "Januari";
                    break;
                case 2:
                    $label = "Februari";
                    break;
                case 3:
                    $label = "Maret";
                    break;
                case 4:
                    $label = "April";
                    break;
                case 5:
                    $label = "May";
                    break;
                case 6:
                    $label = "June";
                    break;
                case 7:
                    $label = "July";
                    break;
                case 8:
                    $label = "August";
                    break;
                case 9:
                    $label = "September";
                    break;
                case 10:
                    $label = "October";
                    break;
                case 11:
                    $label = "November";
                    break;
                case 12:
                    $label = "December";
                    break;
                default:
                    $label = "Januari";
            }
            $months[] = [
                "label" => $label,
                "value" => $month,
            ];
        }
        $day = (new Carbon($user->date_of_birth))->format('d');
        $month = (new Carbon($user->date_of_birth))->format('m');
        $year = (new Carbon($user->date_of_birth))->format('Y');

        return inertia("Admin/Users/Edit", ["user" => $user, "years" => $years, "months" => $months, "days" => $days, "day" => $day, "month" => $month, "year" => $year]);
    }

    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->all();
        $data['date_of_birth'] = "{$request->year}-{$request->month}-{$request->day}";
        if ($request->photo) {
            $data['photo'] = $request->file('photo')->store('photo');
            @unlink('storage/' . $user->photo);
        }
        if ($request->password) {
            $request->validate(['password' => 'confirmed', 'min:8']);
        }
        $user->update($data);
        activity()->withProperties(["name" => $user->name, "id" => $user->id])->log('I have edited user ' . $user->name);
        return redirect()->route('admin.users.index')->with([
            "message" => [
                "label" => "Berhasil edit ✏️ user " . $request->name,
                "type" => "success",
            ],
        ]);;;
    }

    public function destroy(User $user)
    {
        if ($user->hasRole(['super'])) {
            return redirect()->route('admin.users.index')->with([
                "message" => [
                    "label" => "Gagal hapus 🗑️ user "  . $user->name,
                    "type" => "error",
                ],
            ]);
        }

        $user->delete();
        @unlink('storage/' . $user->photo);
        activity()->withProperties($user)->log('I have delete user ' . $user->name);

        return redirect()->route('admin.users.index')->with([
            "message" => [
                "label" => "Berhasil hapus 🗑️ user "  . $user->name,
                "type" => "success",
            ],
        ]);
    }
}
