import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import toast from "react-hot-toast";
import AsyncSelect from "react-select/async";
export default function Create({ auth }) {
    const loadOptions = async (searchValue, callback) => {
        const res = await axios.get("/ref/siswa?term=" + searchValue);
        callback(res.data);
        // setTimeout(() => {
        //     const filteredOptions = res.data.filter((option) => option);
        // }, 2000);
    };

    const { data, setData, post, processing, reset } = useForm({
        jenis_kasus: "",
        siswa_id: "",
        deskripsi: "",
        gambar: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("user.lapor.store"), {
            onSuccess: (re) => {
                toast.success("berhasil memberikan laporan");
                reset();
            },
        });
    };
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Buat Laporan" />
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">Lapor</h4>
                </div>
                <form onSubmit={submit}>
                    <div className="card-body">
                        <div className="mb-3">
                            <label htmlFor="" className="form-label">
                                Jenis Kasus
                            </label>
                            <select
                                defaultValue={data.jenis_kasus}
                                onChange={(e) =>
                                    setData("jenis_kasus", e.target.value)
                                }
                                name="jeniskasus"
                                id="jeniskasus"
                                className="form-select"
                            >
                                <option value="">Pilih Kasus</option>
                                <option value="bully">Kasus bully-ing</option>
                                <option value="kekerasan seksual">
                                    Kekerasan seksual
                                </option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="" className="form-label">
                                Nama Pelaku
                            </label>
                            <AsyncSelect
                                isClearable={true}
                                loadOptions={loadOptions}
                                onChange={({ value }) =>
                                    setData("siswa_id", value)
                                }
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="deskripsi" className="form-label">
                                Deskripsi
                            </label>
                            <textarea
                                id="deskripsi"
                                className="form-control"
                                onChange={(e) =>
                                    setData("deskripsi", e.target.value)
                                }
                                defaultValue={data.deskripsi}
                                placeholder="Isi Deskripsi...."
                            ></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="gambar" className="form-label">
                                Masukkan gambar sebagai bukti
                            </label>
                            <input
                                type="file"
                                className="form-control"
                                onChange={(e) =>
                                    setData("gambar", e.target.files[0])
                                }
                            />
                        </div>
                    </div>
                    <div className="card-footer">
                        <button className="btn btn-primary" type="submit">
                            Kirim
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
