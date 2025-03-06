"use client";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

const Cart = () => {
  return (
    <Link href="/products/cart">
      <div
        className="p-2 hover:bg-pink-600 text-white hover:cursor-pointer flex items-center space-x-1"
        // onClick={() => alert(JSON.stringify(items, null, 2))}
      >
        <ShoppingCart className="w-5 h-5" />
      </div>
    </Link>
  );
};

export default Cart;
