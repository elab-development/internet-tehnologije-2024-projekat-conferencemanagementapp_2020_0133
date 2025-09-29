import { useUser } from "../../context/UserContext";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router";
import CartBreadcrumbs from "../../components/CartBreadcrumbs";
import CartTotalSection from "../../components/CartTotalSection";

function CustomerInfoPage() {
  const { user } = useUser();
  const { cart } = useCart();
  const navigate = useNavigate();

  // Pretpostavljamo da user ima address, city, country, postalCode
  const addressLabel = `${user?.firstName || ""} ${user?.lastName || ""}`;
  const addressLine = user
    ? `${user.city ? user.city : ""}${
        user.postalCode ? ", " + user.postalCode : ""
      }${user.country ? ", " + user.country : ""}`
    : "";

  return (
    <div className="w-full min-h-screen bg-[#f7f7f7] flex flex-col items-center pt-8 pb-16 px-2">
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8">
        {/* Left side */}
        <div className="flex-1">
          <CartBreadcrumbs currentStep={1} />
          <div className="mt-8 bg-white rounded-xl shadow p-6">
            <h2 className="text-2xl font-bold mb-6">Your Informations</h2>
            {user ? (
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-gray-100 px-6 py-3 font-bold text-lg">
                  {addressLabel}
                </div>
                <div className="px-6 py-3 text-gray-700 flex items-center justify-between">
                  <span>{addressLine || "No address info available"}</span>
                  <button
                    className="bg-blue-600 text-white font-semibold px-6 py-2 rounded hover:bg-gray-800 transition ml-6"
                    onClick={() => navigate("/order/delivery-method")}
                  >
                    SELECT
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4 py-12">
                <p className="text-lg text-gray-700 font-semibold mb-2">
                  Please sign in or sign up to continue with your order.
                </p>
                <div className="flex gap-4">
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition"
                    onClick={() => navigate("/login")}
                  >
                    Sign In
                  </button>
                  <button
                    className="bg-gray-200 hover:bg-gray-300 text-blue-700 font-semibold px-6 py-2 rounded transition"
                    onClick={() => navigate("/register")}
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            )}
            <div className="flex items-center gap-2 mt-8">
              <button
                className="flex items-center gap-2 text-blue-600 hover:underline font-semibold"
                onClick={() => navigate("/order/cart")}
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
                Back to your cart
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

export default CustomerInfoPage;
