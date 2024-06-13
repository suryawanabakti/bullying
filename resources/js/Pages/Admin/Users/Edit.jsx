import FormGroup from "@/Components/FormGroup";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";
import {
    IconChevronLeft,
    IconGenderMale,
    IconGenderFemale,
} from "@tabler/icons-react";
export default function Edit({
    auth,
    years,
    months,
    days,
    user,
    day,
    month,
    year,
}) {
    const { data, setData, put, errors, processing } = useForm({
        name: user.name,
        email: user.email,
        password: user.password,
        gender: user.gender,
        month: month,
        day: day,
        year: year,
        photo: "",
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        put(route("admin.users.update", user.id));
        console.log(data);
    };
    const header = (
        <div className="row g-2 align-items-center">
            <div className="col">
                <h2 className="page-title">Users </h2>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb mt-1">
                        <li class="breadcrumb-item">
                            <Link href={route("admin.users.index")}>Users</Link>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">
                            Edit
                        </li>
                    </ol>
                </nav>
            </div>
            <div className="col-auto ms-auto d-print-none">
                <div className="d-flex">
                    <Link
                        href={route("admin.users.index")}
                        className="btn btn-primary"
                    >
                        {/* Download SVG icon from http://tabler-icons.io/i/plus */}
                        <IconChevronLeft className="icon" />
                        Back
                    </Link>
                </div>
            </div>
        </div>
    );
    return (
        <AuthenticatedLayout user={auth.user} header={header}>
            <Head title="Edit" />
            <div className="card">
                <form onSubmit={submit}>
                    <div className="card-body">
                        <FormGroup
                            required={true}
                            label="Nama"
                            id="name"
                            onChange={(e) => setData("name", e.target.value)}
                            value={data.name}
                            placeholder="Iput name..."
                            errors={errors.name}
                        />
                        <div className="mb-3">
                            <label className="form-label required">
                                Gender
                            </label>
                            <div className="form-selectgroup">
                                <label className="form-selectgroup-item">
                                    <input
                                        type="radio"
                                        name="gender"
                                        defaultValue="male"
                                        className="form-selectgroup-input"
                                        onChange={(e) =>
                                            setData("gender", e.target.value)
                                        }
                                        defaultChecked=""
                                    />
                                    <span className="form-selectgroup-label d-flex justify-between space-x-2">
                                        Male
                                        <IconGenderMale className="icon" />
                                    </span>
                                </label>
                                <label className="form-selectgroup-item">
                                    <input
                                        type="radio"
                                        name="gender"
                                        defaultValue="female"
                                        onChange={(e) =>
                                            setData("gender", e.target.value)
                                        }
                                        className="form-selectgroup-input"
                                        defaultChecked=""
                                    />
                                    <span className="form-selectgroup-label d-flex justify-between space-x-2">
                                        Female
                                        <IconGenderFemale className="icon" />
                                    </span>
                                </label>
                            </div>
                            {errors.gender && (
                                <small className="text-danger">
                                    {errors.gender}
                                </small>
                            )}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Date of birth</label>
                            <div className="row g-2">
                                <div className="col-5">
                                    <select
                                        required
                                        name="month"
                                        className="form-select"
                                        onChange={handleChange}
                                        value={data.month}
                                    >
                                        <option value="" disabled selected>
                                            Month
                                        </option>
                                        {months.map((data) => {
                                            return (
                                                <option value={data.value}>
                                                    {data.label}
                                                </option>
                                            );
                                        })}
                                    </select>
                                    {errors.month && (
                                        <small className="text-danger">
                                            {errors.month}
                                        </small>
                                    )}
                                </div>
                                <div className="col-3">
                                    <select
                                        required
                                        name="day"
                                        className="form-select"
                                        onChange={handleChange}
                                        value={data.day}
                                    >
                                        <option value="" disabled selected>
                                            Day
                                        </option>
                                        {days.map((data) => {
                                            return (
                                                <option value={data}>
                                                    {data}
                                                </option>
                                            );
                                        })}
                                    </select>
                                    {errors.day && (
                                        <small className="text-danger">
                                            {errors.day}
                                        </small>
                                    )}
                                </div>
                                <div className="col-4">
                                    <select
                                        required
                                        name="year"
                                        className="form-select"
                                        onChange={handleChange}
                                        value={data.year}
                                    >
                                        <option value="" disabled selected>
                                            Year
                                        </option>
                                        {years.map((data) => {
                                            return (
                                                <option
                                                    value={data}
                                                    key={data.id}
                                                >
                                                    {data}
                                                </option>
                                            );
                                        })}
                                    </select>
                                    {errors.year && (
                                        <small className="text-danger">
                                            {errors.year}
                                        </small>
                                    )}
                                </div>
                            </div>
                        </div>
                        <FormGroup
                            label="Photo"
                            type="file"
                            id="photo"
                            onChange={(e) =>
                                setData("photo", e.target.files[0])
                            }
                            errors={errors.photo}
                        />
                        <FormGroup
                            required={true}
                            label="Email"
                            id="email"
                            type="email"
                            onChange={(e) => setData("email", e.target.value)}
                            value={data.email}
                            placeholder="Iput email..."
                            errors={errors.email}
                        />
                        <FormGroup
                            required={true}
                            label="Password"
                            id="password"
                            type="password"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            value={data.password}
                            placeholder="Iput password..."
                            errors={errors.password}
                        />
                        <FormGroup
                            required={true}
                            label="Password Confirmation"
                            id="password_confirmation"
                            type="password"
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            value={data.password_confirmation}
                            placeholder="Iput password confirmation..."
                            errors={errors.password_confirmation}
                        />
                    </div>
                    <div className="card-footer">
                        <button
                            className={`btn btn-primary ${
                                processing ? "btn-loading" : ""
                            }`}
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
