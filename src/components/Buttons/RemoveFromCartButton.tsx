"use client";
import { removeFromCartAction } from "@/actions/cart/deleteFromCart";
import { Trash } from "lucide-react";

export default function RemoveFromCartButton({
  productId,
}: {
  productId: number;
}) {
  return (
    <button
      className="bg-yellow-400 border-[3px] border-black text-black font-xl font-bold px-4 py-2 rounded-xl"
      onClick={() => removeFromCartAction(productId)}
    >
      <Trash />
    </button>
  );
}
