import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">Informasi</h4>
                </div>
                <div className="card-body">
                    <p>
                        <b>Pasal yang menjerat pelaku Bully-ing</b>
                    </p>
                    <p>
                        Di Indonesia, pelaku bullying dapat dijerat dengan
                        beberapa pasal dalam Undang-Undang dan Kitab
                        Undang-Undang Hukum Pidana (KUHP), tergantung pada
                        bentuk dan dampak bullying tersebut. Berikut adalah
                        beberapa pasal yang mungkin relevan: <br /> <br />
                        1. Pasal 335 KUHP: Tentang Perbuatan Tidak Menyenangkan{" "}
                        <br />
                        2. Pasal 351 KUHP: Tentang Penganiayaan <br />
                        3. Pasal 27 ayat (3) UU ITE No. 19 Tahun 2016: Tentang
                        Pencemaran Nama Baik melalui Media Elektronik <br />
                        4. Pasal 45 ayat (3) UU ITE: Tentang Ancaman Pidana bagi
                        Pencemaran Nama Baik melalui Media Elektronik <br />
                        5. Pasal 80 UU Perlindungan Anak No. 35 Tahun 2014:
                        Tentang Kekerasan terhadap Anak <br />
                        6. Pasal 81 dan 82 UU Perlindungan Anak: Tentang
                        Kekerasan Seksual terhadap Anak
                    </p>
                    <p className="mt-5">
                        <b>Pasal yang menjerat pelaku Kekerasan seksual</b>
                    </p>
                    <p>
                        Di Indonesia, pelaku kekerasan seksual dapat dijerat
                        dengan berbagai pasal dalam Kitab Undang-Undang Hukum
                        Pidana (KUHP) serta undang-undang khusus lainnya.
                        Berikut adalah beberapa pasal yang relevan: <br />{" "}
                        <br />
                        1. Pasal 285: Tentang Pemerkosaan <br />
                        2. Pasal 289: Tentang Perbuatan Cabul <br />
                        3. Pasal 290: Tentang Perbuatan Cabul terhadap Anak di
                        Bawah Umur atau Orang yang Tidak Berdaya <br />
                    </p>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
