import React from "react";
import { Link } from "@inertiajs/react";
import { IconEdit, IconHome, IconUser, IconUsers } from "@tabler/icons-react";

export default function NavLinkAdmin() {
    return (
        <ul className="navbar-nav">
            <li
                className={`nav-item ${
                    route().current("dashboard") && "active"
                }`}
            >
                <Link className="nav-link" href={route("dashboard")}>
                    <span className="nav-link-icon d-md-none d-lg-inline-block">
                        <IconHome className="icon" />
                    </span>
                    <span className="nav-link-title">Home</span>
                </Link>
            </li>
            <li
                className={`nav-item ${
                    route().current("admin.users*") && "active"
                }`}
            >
                <Link className="nav-link" href={route("admin.users.index")}>
                    <span className="nav-link-icon d-md-none d-lg-inline-block">
                        <IconUsers className="icon" />
                    </span>
                    <span className="nav-link-title">Siswa</span>
                </Link>
            </li>

            <li
                className={`nav-item ${
                    route().current("admin.lapor*") && "active"
                }`}
            >
                <Link className="nav-link" href={route("admin.lapor.index")}>
                    <span className="nav-link-icon d-md-none d-lg-inline-block">
                        <IconEdit className="icon" />
                    </span>
                    <span className="nav-link-title">Laporan</span>
                </Link>
            </li>
        </ul>
    );
}
