import React from "react";

const steps = [
  "My Cart",
  "Customer Information",
  "Delivery Method",
  "Payment Method",
];

function CartBreadcrumbs({ currentStep = 0 }) {
  return (
    <nav className="flex items-center gap-2 text-sm font-semibold mt-2">
      {steps.map((step, idx) => (
        <React.Fragment key={step}>
          <span
            className={`${
              idx === currentStep
                ? "text-black"
                : idx < currentStep
                ? "text-blue-700 cursor-pointer hover:underline"
                : "text-gray-400"
            }`}
            style={{ pointerEvents: idx > currentStep ? "none" : "auto" }}
          >
            {step}
          </span>
          {idx < steps.length - 1 && (
            <span className="mx-1 text-gray-400">{">"}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}

export default CartBreadcrumbs;
