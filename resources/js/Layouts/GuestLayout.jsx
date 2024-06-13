import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import "@tabler/core/dist/css/tabler.min.css";
import "@tabler/core/dist/css/tabler-flags.min.css";
import "@tabler/core/dist/js/demo-theme.min.js";

export default function Guest({ children }) {
    return <div className="d-flex flex-column bg-white">{children}</div>;
}
