import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { IconDotsVertical } from "@tabler/icons-react";
import toast from "react-hot-toast";

export default function Index({ auth, lapor }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Index" />
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">Daftar Laporan</h4>
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
                                                    </li>
                                                </ul>
                                            </div>
                                        </td>

                                        <td>{data.jenis_kasus}</td>
                                        <td>{data.siswa.name}</td>
                                        <td>{data.deskripsi}</td>
                                        <td>
                                            <a
                                                target="_blank"
                                                href={`/storage/${data.bukti}`}
                                            >
                                                Lihat Bukti
                                            </a>
                                        </td>
                                        <td>
                                            <span className="badge bg-primary text-white">
                                                {data.status}
                                            </span>
                                        </td>
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
