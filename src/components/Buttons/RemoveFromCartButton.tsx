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
    startTransition(async () => {
      const result = await removeFromCartAction(productId);

      if (result.success) {
        alert(result.message);
      } else if (result.message === "Unauthorized") {
        alert("You are not authorized to remove this item");
        redirect("/login");
      } else {
        alert(result.message);
      }
    });
  }

  return (
    <button
      className="bg-yellow-400 border-[3px] border-black text-black font-xl font-bold px-4 py-2 rounded-xl"
      onClick={handleRemoveFromCart}
      disabled={isPending}
    >
      <Trash />
    </button>
  );
}
