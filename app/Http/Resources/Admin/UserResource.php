<?php

namespace App\Http\Resources\Admin;

use App\Http\Resources\RoleResoruce;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "name" => $this->name,
            "gender" => $this->gender,
            "photo" => $this->photo,
            "roles" => RoleResoruce::collection($this->roles),
            "created_at" => $this->created_at->format('d M Y'),
            "updated_at" => $this->created_at->format('d M Y'),
        ];
    }
}
