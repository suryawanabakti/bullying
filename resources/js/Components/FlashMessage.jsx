import React, { useState } from "react";
import { IconCheck, IconExclamationCircle } from "@tabler/icons-react";

export default function FlashMessage({ flash, show, setShow }) {
    return (
        <div
            className={`alert ${
                flash.message?.type == "success"
                    ? "alert-success"
                    : "alert-danger"
            } alert-dismissible ${!show ? "hidden" : ""}`}
            role={`alert`}
        >
            <div className="d-flex">
                <div>
                    {/* Download SVG icon from http://tabler-icons.io/i/check */}
                    {flash.message?.type === "success" ? (
                        <IconCheck className="icon me-2" />
                    ) : (
                        <IconExclamationCircle className="icon me-2" />
                    )}
                </div>
                <div className="fw-bold">{flash.message?.label}</div>
            </div>
            <a
                className="btn-close"
                onClick={() => setShow(false)}
                href="#"
                aria-label="close"
            ></a>
        </div>
    );
}
