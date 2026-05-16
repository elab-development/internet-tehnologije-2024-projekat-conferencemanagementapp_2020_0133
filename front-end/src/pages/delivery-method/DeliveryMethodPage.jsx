import CartBreadcrumbs from "../../components/CartBreadcrumbs";
import CartTotalSection from "../../components/CartTotalSection";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router";

function DeliveryMethodPage() {
  const { cart } = useCart();
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-[#f7f7f7] flex flex-col items-center pt-8 pb-16 px-2">
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8">
        {/* Left side */}
        <div className="flex-1">
          <CartBreadcrumbs currentStep={2} />
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-6">Delivery Method</h2>
            <div className="border rounded-xl overflow-hidden mb-8">
              <div className="flex items-center justify-between px-6 py-4 bg-gray-100">
                <div className="flex items-center gap-3">
                  <span className="flex items-center">
                    <span className="w-4 h-4 rounded-full border-2 border-blue-600 flex items-center justify-center mr-2">
                      <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                    </span>
                    <span className="text-xl font-semibold">e-Tickets</span>
                  </span>
                </div>
                <span className="text-lg font-bold text-gray-900">Free</span>
              </div>
              <div className="px-6 py-4 bg-white text-gray-700">
                Your print-at-home e-ticket will be available for download in
                your account.
              </div>
            </div>
            <div className="flex items-center gap-2 mt-8">
              <button
                className="flex items-center gap-2 text-blue-600 hover:underline font-semibold"
                onClick={() => navigate("/order/customer-info")}
              >
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back to your informations
              </button>
              <button
                className="ml-auto bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded transition"
                onClick={() => navigate("/order/payment")}
              >
                CONTINUE
              </button>
            </div>
          </div>
        </div>
        {/* Right side */}
        <div className="w-full md:w-[400px]">
          <CartTotalSection cart={cart} />
        </div>
      </div>
    </div>
  );
}

export default DeliveryMethodPage;
