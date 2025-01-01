<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Surat Pemanggilan Sekolah</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
        }

        .container {
            width: 80%;
            margin: 0 auto;
            border: 1px solid #000;
            padding: 20px;
            border-radius: 5px;
        }

        .header {
            text-align: center;
            margin-bottom: 20px;
        }

        .content {
            margin-bottom: 20px;
        }

        .footer {
            text-align: right;
            margin-top: 20px;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <img src="https://yt3.googleusercontent.com/ytc/AIdro_nhE6OZ6cNWyZVeWFjYN9afSK3cExy4YPQbJsX-rbvUjQ=s900-c-k-c0x00ffffff-no-rj"
                width="100px" alt="" height="100px"> <br>
            <b>SMK Kartika XX-1 Makassar</b>
            <p>Jl. Urip Sumoharjo, Tello Baru, Kec. Panakkukang, Kota Makassar</p>
        </div>
        <div class="content">
            Perihal: Pemanggilan Orang Tua/Wali Murid <br>
            Yth. Bapak/Ibu Orang Tua/Wali Murid dari <br>
            Nama: {{ $lapor->siswa->name ?? null }} <br>
            Jurusan : {{ $lapor->siswa->jurusan->nama ?? null }} <br>
            Kelas: {{ $lapor->siswa->kelas->nama ?? null }} <br>

            <p>Dengan hormat,</p>
            <p>Kami dari Bimbingan Konseling (BK) SMK Kartika XX-1 Makassar mengundang bapak/ibu untuk menjalin
                komunikasi yang baik antara Orangtua siswa/i dan Pihak Sekolah dalam mendidik dan melatih anak ke arah
                yang lebih baik, maka kami mohon kehadiran Bapak/Ibu besok di sekolah pukul
                {{ $lapor->waktu ?? '08.50' }} WITA</p>

            <p>Demikian surat pemanggilan ini kami sampaikan. Atas perhatian dan kerjasama Bapak/Ibu, kami ucapkan
                terima kasih.</p>
        </div>
        <div class="footer">
            <p>Makassar, {{ now()->format('d M Y') }}</p>
            <p>Hormat kami,</p>
            <br><br>
            <p>[Nama Guru BK]</p>
            <p>Guru BK</p>
        </div>
    </div>
</body>

</html>
