import FormGroup from "@/Components/FormGroup";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";
import {
    IconChevronLeft,
    IconGenderMale,
    IconGenderFemale,
} from "@tabler/icons-react";
export default function Create({ auth, years, months, days , jurusan, kelas}) {
    
    const { data, setData, post, errors, processing } = useForm({
        name: "",
        jurusan_id: "",
        kelas_id: "",
        nis: "",
        no_wa: "",
        password: "",
        gender: "",
        month: "",
        day: "",
        year: "",
        photo: "",
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("admin.users.store"));
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
                            Create
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
            <Head title="Create" />
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
                            <label
                                className="form-label required"
                                htmlFor="month"
                            >
                                Date of birth
                            </label>
                            <div className="row g-2">
                                <div className="col-5">
                                    <select
                                        required
                                        id="month"
                                        name="month"
                                        className="form-select"
                                        onChange={handleChange}
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
                            id="photo"
                            type="file"
                            onChange={(e) =>
                                setData("photo", e.target.files[0])
                            }
                            errors={errors.photo}
                        />
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
                           <FormGroup
                            required={true}
                            label="Nomor WA"
                            id="no_wa"
                            type="text"
                            onChange={(e) => setData("no_wa", e.target.value)}
                            value={data.no_wa}
                            placeholder="Input Nomor WA..."
                            errors={errors.no_wa}
                        />
                     
                        <FormGroup
                            required={true}
                            label="NIS"
                            id="email"
                            type="text"
                            onChange={(e) => setData("nis", e.target.value)}
                            value={data.nis}
                            placeholder="Input nis..."
                            errors={errors.nis}
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
