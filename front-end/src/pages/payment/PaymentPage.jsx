import { useState } from "react";
import CartBreadcrumbs from "../../components/CartBreadcrumbs";
import CartTotalSection from "../../components/CartTotalSection";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router";
import axiosConferenceInstance from "../../api/axiosConfig";
import { toast } from "sonner";

function PaymentPage() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState("Credit card");
  const [cardForm, setCardForm] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvc: "",
  });
  const [loading, setLoading] = useState(false);

  const handleCardChange = (e) => {
    setCardForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosConferenceInstance.post("/tickets", {
        tickets: cart.map((item) => ({
          ticketTypeId: item.id,
        })),
        paymentMethod: selectedMethod,
      });
      clearCart();
      toast.success(res.data?.message || "Order successful!");
      navigate("/");
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          "An error occurred while processing your order."
      );
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#f7f7f7] flex flex-col items-center pt-8 pb-16 px-2">
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8">
        {/* Left side */}
        <div className="flex-1">
          <CartBreadcrumbs currentStep={3} />
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-6">Payment Method</h2>
            <form onSubmit={handleOrder} className="flex flex-col gap-6">
              <div className="border rounded-xl overflow-hidden">
                <label className="flex items-center px-6 py-4 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Credit card"
                    checked={selectedMethod === "Credit card"}
                    onChange={() => setSelectedMethod("Credit card")}
                    className="accent-blue-600 w-5 h-5 mr-3"
                  />
                  <span className="text-xl font-semibold">Credit Card</span>
                </label>
                {selectedMethod === "Credit card" && (
                  <div className="px-6 py-4 bg-white flex flex-col gap-4">
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="Card Number"
                      value={cardForm.cardNumber}
                      onChange={handleCardChange}
                      className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      required
                    />
                    <input
                      type="text"
                      name="cardName"
                      placeholder="Name on Card"
                      value={cardForm.cardName}
                      onChange={handleCardChange}
                      className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      required
                    />
                    <div className="flex gap-4">
                      <input
                        type="text"
                        name="expiry"
                        placeholder="MM/YY"
                        value={cardForm.expiry}
                        onChange={handleCardChange}
                        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-1/2"
                        required
                      />
                      <input
                        type="text"
                        name="cvc"
                        placeholder="CVC"
                        value={cardForm.cvc}
                        onChange={handleCardChange}
                        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-1/2"
                        required
                      />
                    </div>
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded transition mt-4 w-full max-w-xs self-end"
                disabled={loading}
              >
                {loading ? "Processing..." : "ORDER AND PAY"}
              </button>
            </form>
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

export default PaymentPage;
