import React from "react";
import { Link } from "@inertiajs/react";

export default function Pagination({ links, search }) {
    return (
        <div className="card mt-2">
            <div className="card-body">
                <ul className="pagination">
                    {links.map((data) => {
                        return (
                            <li
                                key={data.label}
                                className={`page-item ${
                                    !data.url && "disabled"
                                } ${data.active ? "active" : ""}`}
                            >
                                <Link
                                    className="page-link"
                                    href={`${data.url + `&search=${search}`}`}
                                    dangerouslySetInnerHTML={{
                                        __html: data.label,
                                    }}
                                ></Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
