import React from "react";

export default function Button({
  children,
  type = "button",
  onClick,
  className = "",
  loading = false,
  disabled = false,
  ariaLabel,
  ...props
}) {
  const isDisabled = disabled || loading;
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      aria-label={ariaLabel}
      className={`inline-flex items-center justify-center gap-2 rounded px-4 py-2 font-semibold transition ${
        isDisabled
          ? "bg-gray-300 text-gray-600 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700 text-white"
      } ${className}`}
      {...props}
    >
      {loading ? (
        // simple spinner
        <svg
          className="animate-spin h-4 w-4 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
      ) : null}
      <span>{children}</span>
    </button>
  );
}
