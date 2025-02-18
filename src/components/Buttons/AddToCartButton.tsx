"use client";
// import { TProduct } from "../../type";
// import useCartStore from "@/store/useCartStore";
import { addToCartAction } from "../../actions/cart/addToCartAction";
import { useTransition } from "react";

export default function AddToCartButton({ productId }: { productId: number }) {
  //   const { items, addItem } = useCartStore();
  const [isPending, startTransition] = useTransition();

  async function handleAddToCart() {
    startTransition(async () => {
      const result = await addToCartAction(productId);

      if (result.success) {
        alert(result.message);
      } else {
        alert(result.message);
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
      <button className="bg-yellow-400 text-black font-bold px-4 py-2 rounded-xl border-[3px] border-black">
        View Cart
      </button>
    </div>
  );
}
