import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, useForm, Link } from "@inertiajs/react";
import { IconMail } from "@tabler/icons-react";

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("password.email"));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <div className="page page-center">
                <div className="container container-tight py-4">
                    <div className="text-center mb-4">
                        <Link
                            href={route("login")}
                            className="navbar-brand navbar-brand-autodark"
                        >
                            Lareact
                        </Link>
                    </div>
                    <form className="card card-md" onSubmit={submit}>
                        <div className="card-body">
                            <h2 className="card-title text-center mb-4">
                                {status && (
                                    <div className="mb-4 font-medium text-sm text-green-600">
                                        {status}
                                    </div>
                                )}
                                Forgot password
                            </h2>
                            <p className="text-muted mb-4">
                                Enter your email address and your password will
                                be reset and emailed to you.
                            </p>
                            <div className="mb-3">
                                <label className="form-label">
                                    Email address
                                </label>
                                <input
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter email"
                                />
                                {errors.email && (
                                    <small className="text-danger">
                                        {errors.email}
                                    </small>
                                )}
                            </div>
                            <div className="form-footer">
                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                >
                                    {/* Download SVG icon from http://tabler-icons.io/i/mail */}
                                    <IconMail className="icon" />
                                    Send me new password
                                </button>
                            </div>
                        </div>
                    </form>
                    <div className="text-center text-muted mt-3">
                        Forget it,{" "}
                        <Link href={route("login")}>send me back</Link> to the
                        sign in screen.
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
