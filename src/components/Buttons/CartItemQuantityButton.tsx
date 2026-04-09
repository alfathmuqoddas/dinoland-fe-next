"use client";

import { cartItemAction } from "@/features/cart/cartItemAction";
import { useTransition } from "react";
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
      const result = await cartItemAction("increment", productId);

      if (result?.success === false) {
        alert(result.message || "Something went wrong");
      }
    });
  }

  async function handleDecrementCartItemQuantity() {
    startTransition(async () => {
      const result = await cartItemAction("decrement", productId);

      if (result?.success === false) {
        alert(result.message || "Something went wrong");
      }
    });
  }

  return (
    <div className="flex items-stretch">
      <button
        className="border-[3px] rounded-l-md hover:bg-gray-800 hover:text-white border-black text-black px-2 flex items-center justify-center disabled:opacity-50"
        onClick={handleDecrementCartItemQuantity}
        disabled={isPending}
      >
        <Minus size={20} />
      </button>

      <div className=" border-y-[3px] border-black font-bold px-4 flex items-center justify-center min-w-[40px]">
        {quantity}
      </div>

      <button
        className=" border-[3px] rounded-r-md hover:bg-gray-800 hover:text-white border-black text-black px-2 flex items-center justify-center disabled:opacity-50"
        onClick={handleIncrementCartItemQuantity}
        disabled={isPending}
      >
        <Plus size={20} />
      </button>
    </div>
  );
}
