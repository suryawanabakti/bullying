import React from "react";

export default function FormGroup({
    id = "",
    label = "",
    type = "text",
    onChange,
    value = "",
    required = false,
    placeholder = "",
    errors = null,
}) {
    return (
        <div className="mb-3">
            <label
                htmlFor={id}
                className={`form-label ${required ? "required" : ""}`}
            >
                {label}
            </label>
            {type === "file" ? (
                <input
                    type="file"
                    className="form-control"
                    name={id}
                    id={id}
                    onChange={onChange}
                />
            ) : (
                <input
                    type={type}
                    className={`form-control `}
                    name={id}
                    id={id}
                    onChange={onChange}
                    placeholder={placeholder}
                    value={value}
                />
            )}
            {errors && <small className="text-danger">{errors}</small>}
        </div>
    );
}
