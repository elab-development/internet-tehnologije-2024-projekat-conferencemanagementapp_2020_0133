import { createContext, useContext, useState } from "react";
import { toast } from "sonner";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  
  const addToCart = (item) => {
    if (cart.some((el) => el.id === item.id)) {
      toast.info("This ticket is already in your cart.");
      return;
    }
    const sameConferenceIdx = cart.findIndex(
      (el) => el.conferenceId === item.conferenceId
    );
    if (sameConferenceIdx !== -1) {
      setCart((prev) => {
        const newCart = [...prev];
        newCart[sameConferenceIdx] = item;
        return newCart;
      });
      toast.info("Ticket for this conference replaced in your cart.");
      return;
    }
    setCart((prev) => [...prev, item]);
    toast.success("Ticket added to cart.");
  };

  const removeFromCart = (conferenceId) => {
    setCart((prev) => prev.filter((el) => el.conferenceId !== conferenceId));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
