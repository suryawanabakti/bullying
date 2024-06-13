import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">Informasi</h4>
                </div>
                <div className="card-body">
                    <p>
                        <b>Pasal yang menjerat pelaku Bully-ing</b>
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Sunt, odit modi soluta, dolorem, magnam illo tempore
                        suscipit ab iste veniam error. Facere nulla alias
                        tempore porro quo dolorum exercitationem aliquid.
                    </p>
                    <p className="mt-5">
                        <b>Pasal yang menjerat pelaku Kekerasan seksual</b>
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Sunt, odit modi soluta, dolorem, magnam illo tempore
                        suscipit ab iste veniam error. Facere nulla alias
                        tempore porro quo dolorum exercitationem aliquid.
                    </p>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
