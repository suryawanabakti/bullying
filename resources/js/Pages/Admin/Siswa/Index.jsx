import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Index({ auth, siswa }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Siswa" />
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">Siswa</h4>
                    <div className="card-actions">
                        <button className="btn btn-warning me-2">
                            Import Siswa
                        </button>
                        <Link
                            href={route("admin.siswa.create")}
                            className="btn btn-primary me-2"
                        >
                            Tambah Siswa
                        </Link>
                    </div>
                </div>
                <table className="table cardtable table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Nis</th>
                            <th>Nama</th>
                            <th>WA Ortu</th>
                        </tr>
                    </thead>
                    <tbody>
                        {siswa.map((data) => {
                            return (
                                <tr key={data.id}>
                                    <td>{data.nis}</td>
                                    <td>{data.nama}</td>
                                    <td>{data.no_wa}</td>
                                    <td>
                                        <Link
                                            method="delete"
                                            as="button"
                                            href={route(
                                                "admin.siswa.destroy",
                                                data.id
                                            )}
                                            className="btn btn-primary"
                                        >
                                            Hapus
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    );
}
