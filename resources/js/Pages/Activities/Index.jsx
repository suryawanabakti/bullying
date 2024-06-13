import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";

export default function Index({ auth, activities, search }) {
    const [term, setTerm] = useState(search);
    const [loading, setLoading] = useState(false);
    const handleSearch = (e) => {
        e.preventDefault();
        if (e.keyCode === 13) {
            router.get(
                route("activities.index"),
                {
                    search: term,
                },
                {
                    onBefore: () => {
                        setLoading(true);
                    },
                    onFinish: (e) => {
                        setLoading(false);
                    },
                }
            );
        }
    };

    const header = (
        <div className="row g-2 align-items-center">
            <div className="col">
                <h2 className="page-title">Activities</h2>
                <div className="text-muted mt-1"></div>
            </div>
            <div className="col-auto ms-auto d-print-none">
                <div className="d-flex">
                    <div className="input-icon">
                        <input
                            onKeyUp={handleSearch}
                            onChange={(e) => setTerm(e.target.value)}
                            type="search"
                            className="form-control d-inline-block w-9 me-3"
                            placeholder="Search..."
                            value={term}
                        />
                        {loading && (
                            <span className="input-icon-addon">
                                <div
                                    className="spinner-border spinner-border-sm text-secondary"
                                    role="status"
                                ></div>
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
    return (
        <AuthenticatedLayout user={auth.user} header={header}>
            <Head title="activities" />
            <div className="col-12">
                <div className="card" style={{ height: "28rem" }}>
                    <div className="card-body card-body-scrollable card-body-scrollable-shadow">
                        <div className="divide-y">
                            {activities.data.map((data) => {
                                return (
                                    <div>
                                        <div className="row">
                                            <div className="col">
                                                <div className="text-truncate">
                                                    <strong>
                                                        {data?.user?.name}
                                                    </strong>{" "}
                                                    {data?.description}{" "}
                                                </div>
                                                <div className="text-muted">
                                                    {data?.created_at}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
