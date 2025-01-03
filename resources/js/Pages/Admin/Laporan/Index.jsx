import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { IconDotsVertical } from "@tabler/icons-react";
import toast from "react-hot-toast";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
export default function Index({ auth, lapor }) {
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
    const { data, setData, patch } = useForm({
        keterangan: "",
        lapor_id: "",
        waktu: "",
    });

    const handleClose = () => setShow(false);
    const handleClose2 = () => setShow2(false);
    const handleClose3 = () => setShow2(false);

    const handleShow = (data) => {
        console.log(data);
        setData("lapor_id", data.id);
        setShow(true);
    };
    const handleShow2 = (data) => {
        console.log(data);
        setData("lapor_id", data.id);
        setShow2(true);
    };
    const handleShow3 = (data) => {
        console.log(data);
        setData("lapor_id", data.id);
        setShow3(true);
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

    const menerimaLaporan = (e) => {
        e.preventDefault();
        patch(route("admin.lapor.terima", data.lapor_id), {
            onSuccess: () => {
                toast.success("Berhasil menerima laporan");
                setShow2(false);
            },
            onError: () => {
                toast.error("Gagal menyelesaikan laporan");
            },
        });

        console.log("data", data);
    };
    const tolakLaporan = (e) => {
        e.preventDefault();
        patch(route("admin.lapor.tolak", data.lapor_id), {
            onSuccess: () => {
                toast.success("Berhasil menolak laporan");
                setShow3(false);
            },
            onError: () => {
                toast.error("Gagal menolak laporan");
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
                                <th>Tanggal</th>
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
                                                            <a
                                                                className="dropdown-item"
                                                                as="button"
                                                                href="#terima"
                                                                onClick={() =>
                                                                    handleShow2(
                                                                        data
                                                                    )
                                                                }
                                                            >
                                                                Terima
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a
                                                                className="dropdown-item"
                                                                href={`/lapor/${data.id}/cetak`}
                                                                target="_blank"
                                                            >
                                                                Cetak
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a
                                                                href="#a"
                                                                className="dropdown-item"
                                                                onClick={() =>
                                                                    handleShow(
                                                                        data
                                                                    )
                                                                }
                                                            >
                                                                Selesai
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a
                                                                className="dropdown-item"
                                                                as="button"
                                                                href="#terima"
                                                                onClick={() =>
                                                                    handleShow3(
                                                                        data
                                                                    )
                                                                }
                                                            >
                                                                Tolak
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            )}
                                        </td>
                                        <td>{data.created_at}</td>
                                        <td>
                                            {data.user?.name} <br />
                                            {data.user?.email} <br />
                                            {data.user?.kelas?.nama} -
                                            {data.user?.jurusan?.nama}
                                        </td>
                                        <td>{data.jenis_kasus}</td>
                                        <td>
                                            {data.siswa?.name} <br />
                                            {data.siswa?.email} <br />
                                            {data.siswa?.kelas?.nama} -
                                            {data.siswa?.jurusan?.nama}
                                        </td>
                                        <td>{data.deskripsi}</td>
                                        <td>
                                            <a
                                                target="_blank"
                                                href={`/storage/${data.bukti}`}
                                            >
                                                Lihat Bukti Foto
                                            </a>
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

            <Modal show={show2} onHide={handleClose2}>
                <Modal.Header closeButton>
                    <Modal.Title>Menerima Laporan</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <label
                            htmlFor="balasan"
                            className="form-label required"
                        >
                            Waktu
                        </label>
                        <input
                            type="time"
                            onChange={(e) => setData("waktu", e.target.value)}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose2}>
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        onClick={menerimaLaporan}
                        type="button"
                    >
                        Kirim
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={show3} onHide={handleClose3}>
                <Modal.Header closeButton>
                    <Modal.Title>Tolak Laporan</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <label
                            htmlFor="balasan"
                            className="form-label required"
                        >
                            keterangan
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            onChange={(e) =>
                                setData("keterangan", e.target.value)
                            }
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose2}>
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        onClick={tolakLaporan}
                        type="button"
                    >
                        Kirim
                    </Button>
                </Modal.Footer>
            </Modal>
        </AuthenticatedLayout>
    );
}
