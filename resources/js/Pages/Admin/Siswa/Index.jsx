import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Index({ auth, siswa }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Siswa" />
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">Siswa</h4>
                </div>
                <table className="table cardtable table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Nama</th>
                            <th>WA Ortu</th>
                        </tr>
                    </thead>
                    <tbody>
                        {siswa.map((data) => {
                            return (
                                <tr key={data.id}>
                                    <td>{data.nama}</td>
                                    <td>{data.no_wa}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    );
}
