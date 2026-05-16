import React from "react";

function FormInput({
  id,
  name,
  label,
  type = "text",
  value,
  onChange,
  required = true,
  autoComplete,
  className = "",
  ...rest
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id || name} className="text-gray-700 font-medium">
        {label}
      </label>
      <input
        id={id || name}
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
        {...rest}
      />
    </div>
  );
}

export default FormInput;
