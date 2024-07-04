import React, { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Link } from "@inertiajs/react";

import {
    IconMoon,
    IconSun,
    IconBell,
    IconHome,
    IconSearch,
} from "@tabler/icons-react";
import NavLinkAdmin from "./NavLinkAdmin";
import NavLinkUser from "./NavLinkUser";
import NavLinkBk from "./NavLinkBk";

export default function Navigation({ user }) {
    const [notifications, setNotifcations] = useState([]);
    const [navbarCollapse, setNavbarCollapse] = useState(true);

    const getNotifications = async () => {
        fetch(route("notifications.get-data"))
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setNotifcations(data);
            });
    };

    // const connectWebSocket = () => {
    //     window.Echo.channel("feedback-" + user.id).listen(
    //         "FeedbackNotification",
    //         async (e) => {
    //             console.log("event", e.user);
    //             getNotifications();
    //             toast.custom((t) => (
    //                 <div
    //                     className={`${
    //                         t.visible ? "animate-enter" : "animate-leave"
    //                     } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    //                 >
    //                     <div className="flex-1 w-0 p-4">
    //                         <div className="flex items-start">
    //                             <div className="flex-shrink-0 pt-0.5">
    //                                 <img
    //                                     className="h-10 w-10 rounded-full"
    //                                     src={
    //                                         e.user.photo
    //                                             ? `/storage/${e.user.photo}`
    //                                             : `https://ui-avatars.com/api/?name=${encodeURI(
    //                                                   e.user.name
    //                                               )}`
    //                                     }
    //                                     alt="Photo"
    //                                 />
    //                             </div>
    //                             <div className="ml-3 flex-1">
    //                                 <p className="text-sm font-medium text-gray-900">
    //                                     {e.user.name}
    //                                 </p>
    //                                 <p className="mt-1 text-sm text-gray-500">
    //                                     {e.message}
    //                                 </p>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //             ));
    //         }
    //     );
    // };

    useEffect(() => {
        getNotifications();
        // connectWebSocket();
    }, []);

    return (
        <div className="sticky-top">
            <header className="navbar navbar-expand-md d-print-none sticky-top">
                <div className="container-xl">
                    <button
                        onClick={() => setNavbarCollapse(!navbarCollapse)}
                        className="navbar-toggler"
                        type="button"
                        aria-expanded={`${navbarCollapse ? "false" : "true"}`}
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <h1 className="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
                        <Link href="/">SMK KARTIKA</Link>
                    </h1>
                    <div className="navbar-nav flex-row order-md-last">
                        <div className="d-none d-md-flex">
                            <a
                                href="?theme=dark"
                                className="nav-link px-0 hide-theme-dark"
                                title="Enable dark mode"
                                data-bs-toggle="tooltip"
                                data-bs-placement="bottom"
                            >
                                <IconMoon className="icon" />
                            </a>
                            <a
                                href="?theme=light"
                                className="nav-link px-0 hide-theme-light"
                                title="Enable light mode"
                                data-bs-toggle="tooltip"
                                data-bs-placement="bottom"
                            >
                                <IconSun className="icon" />
                            </a>
                            <div className="nav-item dropdown d-none d-md-flex me-3">
                                <a
                                    href="#"
                                    className="nav-link px-0"
                                    data-bs-toggle="dropdown"
                                    tabIndex={-1}
                                    aria-label="Show notifications"
                                >
                                    <IconBell className="icon" />
                                    <span className="badge bg-red" />
                                </a>
                                <div className="dropdown-menu dropdown-menu-arrow dropdown-menu-end dropdown-menu-card">
                                    <div className="card">
                                        <div className="card-header">
                                            <h3 className="card-title">
                                                Notifications
                                            </h3>
                                            <div className="card-actions">
                                                <Link
                                                    href={route(
                                                        "notifications.reads"
                                                    )}
                                                    method="POST"
                                                    as="button"
                                                    onSuccess={() =>
                                                        toast.success(
                                                            "Mark all as read 🚀"
                                                        )
                                                    }
                                                >
                                                    Mark all as read
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="list-group list-group-flush list-group-hoverable">
                                            <div
                                                style={{ width: "500px" }}
                                            ></div>

                                            {notifications.map((data) => {
                                                return (
                                                    <div
                                                        className="list-group-item"
                                                        key={data.id}
                                                    >
                                                        <div className="row align-items-center">
                                                            <div className="col-auto">
                                                                <span
                                                                    className={`status-dot status-dot-animated ${
                                                                        data.read_at
                                                                            ? "bg-secondary"
                                                                            : "bg-red"
                                                                    } d-block`}
                                                                />
                                                            </div>
                                                            <div className="col text-truncate">
                                                                <Link
                                                                    href={route(
                                                                        "notifications.show",
                                                                        data.id
                                                                    )}
                                                                    className="text-capitalize text-body d-block"
                                                                >
                                                                    {data.type}
                                                                </Link>
                                                                <div className="d-block text-muted text-truncate mt-n1 w-full">
                                                                    {
                                                                        data
                                                                            .data
                                                                            .message
                                                                    }
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
                        </div>
                        <div className="nav-item dropdown">
                            <a
                                href="#"
                                className="nav-link d-flex lh-1 text-reset p-0"
                                data-bs-toggle="dropdown"
                                aria-label="Open user menu"
                            >
                                <span
                                    className="avatar avatar-sm"
                                    style={
                                        user.photo
                                            ? {
                                                  backgroundImage: `url(./storage/${user.photo})`,
                                              }
                                            : {
                                                  backgroundImage: `url(https://ui-avatars.com/api/?name=${encodeURI(
                                                      user.name
                                                  )})`,
                                              }
                                    }
                                />
                                <div className="d-none d-xl-block ps-2">
                                    <div>{user.name}</div>
                                    <div className="mt-1 small text-muted">
                                        {user.roles[0].name}
                                    </div>
                                </div>
                            </a>
                            <div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                <Link
                                    href={route("notifications.index")}
                                    className="dropdown-item"
                                >
                                    Notifications
                                </Link>
                                <Link
                                    href={route("activities.index")}
                                    className="dropdown-item"
                                >
                                    Activities
                                </Link>

                                <div className="dropdown-divider" />
                                <Link
                                    href={route("profile.edit")}
                                    className="dropdown-item"
                                >
                                    Settings
                                </Link>
                                <Link
                                    href={route("logout")}
                                    method="POST"
                                    as="button"
                                    className="dropdown-item"
                                >
                                    Logout
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <header className="navbar-expand-md">
                <div
                    className={`navbar-collapse ${
                        navbarCollapse ? "hidden" : ""
                    }`}
                >
                    <div className="navbar">
                        <div className="container-xl">
                            {user.roles[0].name == "admin" && <NavLinkAdmin />}
                            {user.roles[0].name == "user" && <NavLinkUser />}
                            {user.roles[0].name == "guru bk" && <NavLinkBk />}
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
}
