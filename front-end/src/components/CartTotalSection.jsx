function CartTotalSection({ cart }) {
  const subtotal = cart.reduce(
    (sum, item) => sum + parseFloat(item.price || 0),
    0
  );

  return (
    <div className="bg-[#f7f7f7] md:bg-white rounded-xl shadow p-6 mt-8 md:mt-0">
      <h3 className="text-lg font-bold mb-4">Tickets Subtotal</h3>
      <div className="flex justify-between mb-2">
        <span>Subtotal</span>
        <span className="font-semibold">
          {subtotal === 0 ? "Free" : `${subtotal.toFixed(2)} €`}
        </span>
      </div>
      <div className="flex justify-between mb-2">
        <span>Delivery fee</span>
        <span className="font-semibold">0.00 €</span>
      </div>
      <hr className="my-4" />
      <h3 className="text-lg font-bold mb-2">Total Order</h3>
      <div className="flex justify-between mb-4">
        <span className="font-semibold">Total:</span>
        <span className="font-bold text-xl">
          {subtotal === 0 ? "Free" : `${subtotal.toFixed(2)} €`}
        </span>
      </div>
      <div className="mt-6">
        <span className="block mb-2 text-gray-600">
          Accepted payment methods
        </span>
        <div className="flex gap-3">
          <img src="/assets/images/visa.png" alt="Visa" className="h-8" />
          <img
            src="/assets/images/mastercard.png"
            alt="Mastercard"
            className="h-8"
          />
        </div>
      </div>
    </div>
  );
}

export default CartTotalSection;
