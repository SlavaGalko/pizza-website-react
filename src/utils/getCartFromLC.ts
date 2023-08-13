import { TCartItem } from "../redux/slices/cartSlice";
import { calcTotalPrice } from "./calcTotalPrice";

export const getCartFromLC = () => {
  const cartData = localStorage.getItem("cart");
  const items = cartData ? JSON.parse(cartData) : [];
  const totalPrice = calcTotalPrice(items);
  return {
    items: items as TCartItem[],
    totalPrice,
  };
};
