import { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { IconEye, IconEyeOff } from "@tabler/icons-react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
        show_password: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}
            <div className="page page-center">
                <div className="container container-tight py-4">
                    <div className="text-center ">
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
                    <center>
                        <h2>SMK Kartika XX-1 Makassar</h2>
                    </center>
                    <div className="card card-md">
                        <div className="card-body">
                            <h2 className="h2 text-center mb-4">
                                Masuk ke akun anda
                            </h2>
                            <form onSubmit={submit}>
                                <div className="mb-3">
                                    <label className="form-label">NIS</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Masukkan nis anda..."
                                        autoComplete="off"
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
                                <div className="mb-2">
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
                                </div>

                                <div className="form-footer">
                                    <button
                                        type="submit"
                                        className="btn btn-primary w-100"
                                        disabled={processing}
                                    >
                                        Masuk
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="hr-text">Atau</div>
                    </div>
                    <div className="text-center text-secondary mt-3">
                        Belum punya akun ?
                        <Link href="/register" tabIndex={-1}>
                            Daftar disini
                        </Link>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
