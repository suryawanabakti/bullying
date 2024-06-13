import { Toaster } from "react-hot-toast";
import Navigation from "@/Components/Partials/Auth/Navigation";
import "@tabler/core/dist/css/tabler.min.css";
import "@tabler/core/dist/css/tabler-flags.min.css";
import "@tabler/core/dist/css/tabler-payments.min.css";
import "@tabler/core/dist/css/tabler-vendors.min.css";
import "@tabler/core/dist/css/demo.min.css";
import "@tabler/core/dist/js/tabler.min.js";
import "@tabler/core/dist/js/demo.min.js";
import "@tabler/core/dist/js/demo-theme.min.js";

export default function Authenticated({ user, header, children }) {
    return (
        <div className="page">
            <Toaster />
            <Navigation user={user} />

            <div className="page-wrapper">
                {header && (
                    <div className="page-header d-print-none">
                        <div className="container-xl">{header}</div>
                    </div>
                )}
                <div className="page-body">
                    <div className="container-xl">{children}</div>
                </div>
            </div>
        </div>
    );
}
