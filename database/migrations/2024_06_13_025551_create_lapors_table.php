<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('lapor', function (Blueprint $table) {
            $table->id();
            $table->string('jenis_kasus');
            $table->unsignedBigInteger('siswa_id')->references('id')->on('siswa')->cascadeOnDelete();
            $table->string('deskripsi');
            $table->string('bukti');
            $table->string('status')->default('proses');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lapors');
    }
};