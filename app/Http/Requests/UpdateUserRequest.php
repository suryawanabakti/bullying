<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use App\Models\User;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $super = $this->route()->parameter('user')->hasRole('super');
        if ($super) {
            return  auth()->user()->hasRole('super');
        } else {
            return true;
        }
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "name" => ['required', 'max:255'],
            'nis' => 'required|unique:users,email,'. $this->id,
            // 'nis' => ['required', 'string', 'lowercase', 'max:255', Rule::unique(User::class)->ignore($this->user()->id)],
            "gender" => ['in:female,male'],
            "month" => ['required'],
            "day" => ['required'],
            "year" => ['required'],
            "photo" => ['nullable', 'image', 'mimes:png,jpg,jpeg,webp']
        ];
    }
}
