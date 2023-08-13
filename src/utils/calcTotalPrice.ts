import { TCartItem } from "../redux/slices/cartSlice";

export const calcTotalPrice = (items: TCartItem[]) => {
  return items.reduce((sum, item) => {
    return item.price * item.count + sum;
  }, 0);
};
