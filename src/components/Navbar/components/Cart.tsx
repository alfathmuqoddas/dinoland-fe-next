"use client";
import { ShoppingCart } from "lucide-react";
import useCartStore from "@/store/useCartStore";
import Link from "next/link";

const Cart = () => {
  const { items } = useCartStore();
  return (
    <Link href="/products/cart">
      <div
        className="p-2 hover:bg-pink-600 text-white hover:cursor-pointer flex items-center space-x-1"
        // onClick={() => alert(JSON.stringify(items, null, 2))}
      >
        {items && items.length}
        <ShoppingCart className="w-5 h-5" />
      </div>
    </Link>
  );
};

export default Cart;
