import { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import { IconEye, IconEyeOff } from "@tabler/icons-react";

export default function Register({ kelas, jurusan }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        gender: "male",
        password: "",
        password_confirmation: "",
        show_password: false,
        jurusan_id: "",
        kelas_id: "",
        photo: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("register"));
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <div className="page page-center">
                <div className="container container-tight py-4">
                    <div className="text-center mb-4">
                        <a
                            href="."
                            className="navbar-brand navbar-brand-autodark"
                        >
                            <img
                                src="https://yt3.googleusercontent.com/ytc/AIdro_nhE6OZ6cNWyZVeWFjYN9afSK3cExy4YPQbJsX-rbvUjQ=s900-c-k-c0x00ffffff-no-rj"
                                width={180}
                                alt="Tabler"
                            />
                        </a>
                    </div>
                    <div className="card card-md">
                        <div className="card-body">
                            <h2 className="h2 text-center mb-4">Register</h2>
                            <form onSubmit={submit}>
                                <div className="mb-3">
                                    <label className="form-label">Nama</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Your Name"
                                        autoComplete="name"
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                    />
                                    {errors.name && (
                                        <small className="text-danger">
                                            {errors.name}
                                        </small>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">
                                        Nomor WA
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Your NO. WA"
                                        autoComplete="no_wa"
                                        onChange={(e) =>
                                            setData("no_wa", e.target.value)
                                        }
                                    />
                                    {errors.no_wa && (
                                        <small className="text-danger">
                                            {errors.no_wa}
                                        </small>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">NIS</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="NIS Kamu"
                                        autoComplete="email"
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                    />
                                    {errors.email && (
                                        <small className="text-danger">
                                            {errors.email}
                                        </small>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Photo</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        placeholder="Photo"
                                        autoComplete="photo"
                                        onChange={(e) =>
                                            setData("photo", e.target.files[0])
                                        }
                                    />
                                    {errors.photo && (
                                        <small className="text-danger">
                                            {errors.photo}
                                        </small>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Kelas</label>
                                    <select
                                        name="kelas_id"
                                        id="kelas_id"
                                        className="form-select"
                                        onChange={(e) =>
                                            setData("kelas_id", e.target.value)
                                        }
                                    >
                                        <option value="">Pilih Kelas</option>
                                        {kelas.map((data) => {
                                            return (
                                                <option
                                                    key={data.id}
                                                    value={data.id}
                                                >
                                                    {data.nama}
                                                </option>
                                            );
                                        })}
                                    </select>
                                    {errors.kelas_id && (
                                        <small className="text-danger">
                                            {errors.kelas_id}
                                        </small>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">
                                        Jurusan
                                    </label>
                                    <select
                                        name="jurusan"
                                        id="jurusan"
                                        className="form-select"
                                        onChange={(e) =>
                                            setData(
                                                "jurusan_id",
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="">Pilih Jurusan</option>
                                        {jurusan.map((data) => {
                                            return (
                                                <option
                                                    key={data.id}
                                                    value={data.id}
                                                >
                                                    {data.nama}
                                                </option>
                                            );
                                        })}
                                    </select>
                                    {errors.jurusan_id && (
                                        <small className="text-danger">
                                            {errors.jurusan_id}
                                        </small>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Password
                                    </label>
                                    <div className="input-group input-group-flat">
                                        <input
                                            type={`${
                                                !data.show_password
                                                    ? "password"
                                                    : "text"
                                            }`}
                                            className="form-control"
                                            placeholder="Your password"
                                            autoComplete="off"
                                            onChange={(e) =>
                                                setData(
                                                    "password",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <span className="input-group-text">
                                            <a
                                                href="#"
                                                tabIndex={-1}
                                                className="link-secondary"
                                                onClick={() =>
                                                    setData(
                                                        "show_password",
                                                        !data.show_password
                                                    )
                                                }
                                            >
                                                {/* Download SVG icon from http://tabler-icons.io/i/eye */}
                                                {!data.show_password ? (
                                                    <IconEye className="icon" />
                                                ) : (
                                                    <IconEyeOff className="icon" />
                                                )}
                                            </a>
                                        </span>
                                    </div>
                                    {errors.password && (
                                        <small className="text-danger">
                                            {errors.password}
                                        </small>
                                    )}
                                </div>
                                <div className="mb-2">
                                    <label className="form-label">
                                        Password Konfirmasi
                                    </label>
                                    <div className="input-group input-group-flat">
                                        <input
                                            type={`${
                                                !data.show_password
                                                    ? "password"
                                                    : "text"
                                            }`}
                                            className="form-control"
                                            placeholder="Your password"
                                            autoComplete="off"
                                            onChange={(e) =>
                                                setData(
                                                    "password_confirmation",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <span className="input-group-text">
                                            <a
                                                href="#"
                                                tabIndex={-1}
                                                className="link-secondary"
                                                onClick={() =>
                                                    setData(
                                                        "show_password",
                                                        !data.show_password
                                                    )
                                                }
                                            >
                                                {/* Download SVG icon from http://tabler-icons.io/i/eye */}
                                                {!data.show_password ? (
                                                    <IconEye className="icon" />
                                                ) : (
                                                    <IconEyeOff className="icon" />
                                                )}
                                            </a>
                                        </span>
                                    </div>
                                    {errors.password && (
                                        <small className="text-danger">
                                            {errors.password}
                                        </small>
                                    )}
                                </div>

                                <div className="form-footer">
                                    <button
                                        type="submit"
                                        className={`btn btn-primary w-100 ${
                                            processing ? "btn-loading" : ""
                                        }`}
                                    >
                                        Daftar
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="hr-text">Atau</div>
                    </div>
                    <div className="text-center text-secondary mt-3">
                        Sudah punya akun ?
                        <Link href="/login" tabIndex={-1}>
                            Login disini
                        </Link>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
