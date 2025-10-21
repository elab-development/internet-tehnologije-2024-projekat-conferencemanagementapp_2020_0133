import React from "react";
import { useNavigate } from "react-router";

const steps = [
  { label: "My Cart", path: "/order/cart" },
  { label: "Customer Information", path: "/order/customer-info" },
  { label: "Delivery Method", path: "/order/delivery-method" },
  { label: "Payment Method", path: "/order/payment" },
];

function CartBreadcrumbs({ currentStep = 0 }) {
  const navigate = useNavigate();

  return (
    <nav className="flex items-center gap-2 text-sm font-semibold mt-2">
      {steps.map((step, idx) => (
        <React.Fragment key={step.label}>
          {idx < currentStep ? (
            <button
              type="button"
              className="text-blue-700 cursor-pointer hover:underline bg-transparent border-none p-0 m-0"
              onClick={() => navigate(step.path)}
            >
              {step.label}
            </button>
          ) : (
            <span
              className={`${
                idx === currentStep ? "text-black" : "text-gray-400"
              }`}
            >
              {step.label}
            </span>
          )}
          {idx < steps.length - 1 && (
            <span className="mx-1 text-gray-400">{">"}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}

export default CartBreadcrumbs;
