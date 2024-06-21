<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lapor extends Model
{
    use HasFactory;
    protected $guarded = ['id'];
    public $table = 'lapor';
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function siswa()
    {
        return $this->belongsTo(Siswa::class);
    }
}
