import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";

export default function Index({ auth, notifications, search }) {
    const [term, setTerm] = useState(search ?? "");
    const [loading, setLoading] = useState(false);
    const handleSearch = (e) => {
        e.preventDefault();
        if (e.keyCode === 13) {
            router.get(
                route("notifications.index"),
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
                <h2 className="page-title">Notification</h2>
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
            <Head title="Notifications" />
            <div className="col-12">
                <div className="card" style={{ height: "28rem" }}>
                    <div className="card-body card-body-scrollable card-body-scrollable-shadow">
                        <div className="divide-y">
                            {notifications.map((data) => {
                                return (
                                    <div
                                        key={data.id}
                                        hidden={data ? false : true}
                                    >
                                        <div className="row">
                                            <div className="col-auto">
                                                <img
                                                    className="avatar"
                                                    src={
                                                        data?.user?.photo
                                                            ? `/storage/${data?.user?.photo}`
                                                            : `https://ui-avatars.com/api/?name=${encodeURI(
                                                                  data?.user
                                                                      ?.name
                                                              )}`
                                                    }
                                                    alt="Photo"
                                                />
                                            </div>
                                            <div className="col">
                                                <div className="text-truncate">
                                                    <strong>
                                                        {data?.user?.name}
                                                    </strong>{" "}
                                                    {data?.message}{" "}
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
