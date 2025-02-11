"use client";
import { ShoppingCart } from "lucide-react";
import useCartStore from "@/store/useCartStore";

const Cart = () => {
  const { items } = useCartStore();
  return (
    <div
      className="p-2 hover:bg-pink-600 hover:cursor-pointer flex items-center space-x-1"
      onClick={() => alert(JSON.stringify(items, null, 2))}
    >
      {items && items.length}
      <ShoppingCart className="w-5 h-5" />
    </div>
  );
};

export default Cart;
