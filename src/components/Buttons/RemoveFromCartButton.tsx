"use client";
import { removeFromCartAction } from "@/actions/cart/deleteFromCart";
import { Trash } from "lucide-react";
import { useTransition } from "react";
import { redirect } from "next/navigation";

export default function RemoveFromCartButton({
  productId,
}: {
  productId: number;
}) {
  const [isPending, startTransition] = useTransition();

  async function handleRemoveFromCart() {
    if (confirm("Are you sure you want to remove this item from your cart?")) {
      startTransition(async () => {
        const result = await removeFromCartAction(productId);

        if (result?.success === false) {
          alert(result?.message || "Something went wrong");
        }
      });
    } else {
      return;
    }
  }

  return (
    <button
      className="bg-red-500 border-[3px] border-black text-black font-xl font-bold p-1 disabled:bg-gray-500"
      onClick={handleRemoveFromCart}
      disabled={isPending}
    >
      <Trash />
    </button>
  );
}
