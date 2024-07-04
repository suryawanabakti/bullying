import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { IconDotsVertical } from "@tabler/icons-react";
import toast from "react-hot-toast";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
export default function Index({ auth, lapor }) {
    const [show, setShow] = useState(false);
    const { data, setData, patch } = useForm({
        keterangan: "",
        lapor_id: "",
    });

    const handleClose = () => setShow(false);
    const handleShow = (data) => {
        console.log(data);
        setData("lapor_id", data.id);
        setShow(true);
    };
    const selesaikanLaporan = (e) => {
        e.preventDefault();
        patch(route("admin.lapor.selesai", data.lapor_id), {
            onSuccess: () => {
                toast.success("Berhasil menyelesaikan laporan");
                setShow(false);
            },
            onError: () => {
                toast.error("Gagal menyelesaikan laporan");
            },
        });

        console.log("data", data);
    };
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Laporan" />
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">Laporan</h4>
                </div>
                <div className="card-body">
                    <table className="table table-stripped table-hover">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Pelapor</th>
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
                                            {auth.user.roles[0].name ==
                                                "guru bk" && (
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
                                                                method="patch"
                                                                as="button"
                                                                href={route(
                                                                    "admin.lapor.terima",
                                                                    data.id
                                                                )}
                                                                onSuccess={() =>
                                                                    toast.success(
                                                                        "Berhasil menerima laporan"
                                                                    )
                                                                }
                                                            >
                                                                Terima
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Button
                                                                variant="primary"
                                                                className="dropdown-item"
                                                                onClick={() =>
                                                                    handleShow(
                                                                        data
                                                                    )
                                                                }
                                                            >
                                                                Selesai
                                                            </Button>
                                                        </li>
                                                        <li>
                                                            <Link
                                                                className="dropdown-item"
                                                                method="patch"
                                                                as="button"
                                                                href={route(
                                                                    "admin.lapor.tolak",
                                                                    data.id
                                                                )}
                                                                onSuccess={() =>
                                                                    toast.success(
                                                                        "Berhasil menolak laporan"
                                                                    )
                                                                }
                                                            >
                                                                Tolak
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link
                                                                className="dropdown-item"
                                                                method="patch"
                                                                as="button"
                                                                href={route(
                                                                    "admin.lapor.selesai",
                                                                    data.id
                                                                )}
                                                                onSuccess={() =>
                                                                    toast.success(
                                                                        "Berhasil menyelesaikan laporan"
                                                                    )
                                                                }
                                                            >
                                                                Selesai
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                            )}
                                        </td>
                                        <td>
                                            {data.user?.name} <br />
                                            {data.user?.email} <br />
                                            {data.user?.kelas?.nama} -
                                            {data.user?.jurusan?.nama}
                                        </td>
                                        <td>{data.jenis_kasus}</td>
                                        <td>
                                            {data.siswa.name} <br />
                                            {data.siswa.email} <br />
                                            {data.siswa.kelas.nama} -
                                            {data.siswa.jurusan.nama}
                                        </td>
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
                                        <td>{data.keterangan}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Menyelesaikan Laporan</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <label
                            htmlFor="balasan"
                            className="form-label required"
                        >
                            Keterangan
                        </label>
                        <textarea
                            placeholder="Masukkan keterangan..."
                            name="keterangan"
                            onChange={(e) =>
                                setData("keterangan", e.target.value)
                            }
                            id="keterangan"
                            className="form-control"
                        ></textarea>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        onClick={selesaikanLaporan}
                        type="button"
                    >
                        Kirim
                    </Button>
                </Modal.Footer>
            </Modal>
        </AuthenticatedLayout>
    );
}
