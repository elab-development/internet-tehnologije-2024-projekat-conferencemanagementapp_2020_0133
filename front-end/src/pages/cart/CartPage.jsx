import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router";
import CartBreadcrumbs from "../../components/CartBreadcrumbs";
import CartTotalSection from "../../components/CartTotalSection";

function CartPage() {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-[70vh] bg-[#f7f7f7] flex flex-col items-center pt-8 pb-16 px-2">
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8">
        {/* Left side */}
        <div className="flex-1">
          <CartBreadcrumbs currentStep={0} />
          <div className="mt-8 bg-white rounded-xl shadow p-6">
            <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
            {cart.length === 0 ? (
              <div className="text-gray-500 text-center py-12">
                Your cart is empty.
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b pb-4"
                  >
                    <div>
                      <div className="font-bold text-lg text-gray-900 mb-1">
                        {item.conferenceTitle}
                      </div>
                      <div className="text-sm text-gray-600 mb-1">
                        {new Date(
                          item.conferenceStartDate
                        ).toLocaleDateString()}{" "}
                        -{" "}
                        {new Date(item.conferenceEndDate).toLocaleDateString()}
                      </div>
                      <div className="text-base text-blue-700 font-semibold">
                        {item.name}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-4 sm:mt-0">
                      <button
                        className="text-red-600 hover:text-red-800 flex items-center gap-1 hover:cursor-pointer"
                        onClick={() => removeFromCart(item.conferenceId)}
                        title="Delete"
                      >
                        <span>Delete</span>
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
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                      <div className="font-bold text-lg text-gray-900">
                        {parseFloat(item.price) === 0
                          ? "Free"
                          : `${item.price} €`}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="flex justify-between items-center mt-8">
              <button
                className="flex hover:cursor-pointer items-center gap-2 text-blue-700 hover:underline font-semibold"
                onClick={() => navigate("/conferences")}
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
                Continue shopping
              </button>
              {cart.length > 0 && (
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded transition hover:cursor-pointer"
                  onClick={() => navigate("/order/customer-info")}
                >
                  CHECK OUT
                </button>
              )}
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

export default CartPage;
