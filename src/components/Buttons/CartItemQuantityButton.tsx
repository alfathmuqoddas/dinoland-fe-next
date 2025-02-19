"use client";

import { cartItemQuantityAction } from "@/actions/cart/cartQuantityAction";
import { useTransition } from "react";
import { redirect } from "next/navigation";
import { Plus, Minus } from "lucide-react";

export default function CartItemQuantityButton({
  productId,
  quantity,
}: {
  quantity: number;
  productId: number;
}) {
  const [isPending, startTransition] = useTransition();

  async function handleIncrementCartItemQuantity() {
    startTransition(async () => {
      const result = await cartItemQuantityAction("increment", productId);

      if (result.success) {
        alert(result.message);
      } else if (result.message === "Unauthorized") {
        alert("You are not authorized to add this item");
        redirect("/login");
      } else {
        alert(result.message || "Something went wrong");
      }
    });
  }

  async function handleDecrementCartItemQuantity() {
    startTransition(async () => {
      const result = await cartItemQuantityAction("decrement", productId);

      if (result.success) {
        alert(result.message);
      } else if (result.message === "Unauthorized") {
        alert("You are not authorized to add this item");
        redirect("/login");
      } else {
        alert(result.message || "Something went wrong");
      }
    });
  }

  return (
    <div className="flex items-center">
      <button
        className="bg-red-500 border-[3px] border-black text-black p-0.5"
        onClick={handleDecrementCartItemQuantity}
        disabled={isPending}
      >
        <Minus />
      </button>
      <div className="bg-green border-y-[3px] border-black h-full max-h-[34px] font-bold px-2 py-1">
        {quantity}
      </div>
      <button
        className="bg-blue-500 border-[3px] border-black text-black p-0.5"
        onClick={handleIncrementCartItemQuantity}
        disabled={isPending}
      >
        <Plus />
      </button>
    </div>
  );
}
