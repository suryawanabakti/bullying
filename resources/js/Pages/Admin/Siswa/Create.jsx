import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ auth }) {
    const { data, setData, processing, reset, post, errors } = useForm({
        nis: "",
        nama: "",
        no_wa: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("admin.siswa.store"));
    };
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Siswa" />
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">Tambah Siswa</h4>
                    <div className="card-actions">
                        <Link
                            href={route("admin.siswa.index")}
                            className="btn btn-primary"
                        >
                            Kembali
                        </Link>
                    </div>
                </div>
                <form onSubmit={submit}>
                    <div className="card-body">
                        <div className="mb-3">
                            <label htmlFor="NIS" className="form-label">
                                NIS
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Masukkan nis anda..."
                                onChange={(e) => setData("nis", e.target.value)}
                                value={data.nis}
                            />
                            {errors.nis && (
                                <small className="text-danger">
                                    {errors.nis}
                                </small>
                            )}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="NIS" className="form-label">
                                Nama
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Masukkan nama anda..."
                                onChange={(e) =>
                                    setData("nama", e.target.value)
                                }
                                value={data.nama}
                            />
                            {errors.nama && (
                                <small className="text-danger">
                                    {errors.nama}
                                </small>
                            )}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="no_wa" className="form-label">
                                NO WhatsApp Aktif
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Masukkan nomor wa ortu..."
                                onChange={(e) =>
                                    setData("no_wa", e.target.value)
                                }
                                value={data.no_wa}
                            />
                            {errors.no_wa && (
                                <small className="text-danger">
                                    {errors.no_wa}
                                </small>
                            )}
                        </div>
                    </div>
                    <div className="card-footer">
                        <button
                            className={`btn btn-primary ${
                                processing && "btn-loading"
                            }`}
                        >
                            Simpan
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
