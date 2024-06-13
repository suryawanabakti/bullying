import React from "react";
import { Link } from "@inertiajs/react";
import { IconEdit, IconHome, IconUsers } from "@tabler/icons-react";

export default function NavLinkUser() {
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
                    route().current("user.lapor*") && "active"
                }`}
            >
                <Link className="nav-link" href={route("user.lapor.create")}>
                    <span className="nav-link-icon d-md-none d-lg-inline-block">
                        <IconEdit className="icon" />
                    </span>
                    <span className="nav-link-title">Lapor</span>
                </Link>
            </li>
        </ul>
    );
}
