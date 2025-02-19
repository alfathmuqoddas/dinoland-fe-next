"use client";
// import { TProduct } from "../../type";
// import useCartStore from "@/store/useCartStore";
import { addToCartAction } from "../../actions/cart/addToCartAction";
import { useTransition } from "react";
import { redirect } from "next/navigation";

export default function AddToCartButton({ productId }: { productId: number }) {
  //   const { items, addItem } = useCartStore();
  const [isPending, startTransition] = useTransition();

  async function handleAddToCart() {
    startTransition(async () => {
      const result = await addToCartAction(productId);

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
    <div>
      <button
        className="bg-yellow-400 text-black disabled:bg-gray-400 disabled:text-gray-600 font-bold px-4 py-2 rounded-xl border-[3px] border-black"
        onClick={handleAddToCart}
        disabled={isPending}
      >
        Add to Cart
      </button>
    </div>
  );
}
