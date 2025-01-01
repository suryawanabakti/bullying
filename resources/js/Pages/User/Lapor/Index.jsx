import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { IconDotsVertical } from "@tabler/icons-react";
import toast from "react-hot-toast";

export default function Index({ auth, lapor }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Daftar laporan" />
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">
                        Daftar Laporan {auth.user.name}
                    </h4>
                </div>
                <div className="card-body">
                    <table className="table table-stripped table-hover">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Jenis kasus</th>
                                <th>Siswa Pelaku</th>
                                <th>Deskripsi</th>
                                <th>Bukti</th>
                                <th>Status</th>
                                <th>Keterangan</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lapor.map((data) => {
                                return (
                                    <tr key={data.id}>
                                        <td>
                                            <div className="dropdown">
                                                <IconDotsVertical
                                                    className="icon"
                                                    id="dropdownMenuButton1"
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded="false"
                                                />

                                                <ul
                                                    className="dropdown-menu"
                                                    aria-labelledby="dropdownMenuButton1"
                                                >
                                                    <li>
                                                        {data.status ==
                                                            "proses" && (
                                                            <Link
                                                                className="dropdown-item"
                                                                method="delete"
                                                                as="button"
                                                                href={route(
                                                                    "admin.lapor.destroy",
                                                                    data.id
                                                                )}
                                                                onSuccess={() =>
                                                                    toast.success(
                                                                        "Berhasil hapus lapor"
                                                                    )
                                                                }
                                                            >
                                                                Batalkan
                                                            </Link>
                                                        )}
                                                    </li>
                                                </ul>
                                            </div>
                                        </td>

                                        <td>{data.jenis_kasus}</td>
                                        <td>
                                            {data.siswa?.name} <br />
                                            {data.siswa?.email} <br />
                                            {data.siswa?.kelas.nama} <br />
                                            {data.siswa?.jurusan.nama} <br />
                                        </td>
                                        <td>{data.deskripsi}</td>
                                        <td>
                                            <a
                                                target="_blank"
                                                href={`/storage/${data.bukti}`}
                                            >
                                                Lihat Bukti Foto
                                            </a>{" "}
                                            <br />
                                            <a
                                                target="_blank"
                                                href={`/storage/${data.video}`}
                                            >
                                                Lihat Bukti Video
                                            </a>
                                        </td>
                                        <td>
                                            <span className="badge bg-primary text-white">
                                                {data.status}
                                            </span>
                                        </td>
                                        <td>{data.keterangan}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
