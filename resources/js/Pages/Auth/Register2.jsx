import { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import { IconEye, IconEyeOff } from "@tabler/icons-react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        gender: "male",
        password: "",
        password_confirmation: "",
        show_password: false,
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

            <div className="row g-0 flex-fill">
                <div className="col-12 col-lg-6 col-xl-4 border-top-wide border-primary d-flex flex-column justify-content-center">
                    <div className="container container-tight my-5 px-lg-5">
                        <div className="text-center mb-4">
                            <Link
                                href="/"
                                className="navbar-brand navbar-brand-autodark"
                            >
                                SISTEM NOTIFIKASI PELAPORAN KASUS BULLYING{" "}
                                <br /> DAN KEKERASAN SEKSUAL
                            </Link>
                        </div>
                        <h2 className="h3 text-center mb-3">
                            Masuk ke akun anda
                        </h2>
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
                                <label className="form-label">Nomor WA</label>
                                <input
                                    type="number"
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
                                <label className="form-label">
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="your@email.com"
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
                                <label className="form-label">
                                    Password
                                    <span className="form-label-description">
                                        <Link
                                            tabIndex={-1}
                                            href={route("password.request")}
                                        >
                                            I forgot password
                                        </Link>
                                    </span>
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
                                            setData("password", e.target.value)
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
                            <div className="mb-2">
                                <label className="form-check">
                                    <input
                                        type="checkbox"
                                        tabIndex={-1}
                                        className="form-check-input"
                                        name="remember"
                                        value={1}
                                        onChange={(e) =>
                                            setData("remember", e.target.value)
                                        }
                                    />
                                    <span className="form-check-label">
                                        Remember me on this device
                                    </span>
                                </label>
                            </div>
                            <div className="form-footer">
                                <button
                                    type="submit"
                                    className={`btn btn-primary w-100 ${
                                        processing ? "btn-loading" : ""
                                    }`}
                                >
                                    Sign in
                                </button>
                            </div>
                        </form>
                        <div className="text-center text-muted mt-3">
                            Sudah punya akun ?{" "}
                            <Link href="/login" tabIndex={-1}>
                                Login disini
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-lg-6 col-xl-8 d-none d-lg-block">
                    {/* Photo */}
                    <div
                        className="bg-cover h-100 min-vh-100"
                        style={{
                            backgroundImage: "url(/bully.jpeg)",
                        }}
                    />
                </div>
            </div>
        </GuestLayout>
    );
}
