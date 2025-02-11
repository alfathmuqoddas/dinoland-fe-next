"use client";
import { TProduct } from "../../type";
import useCartStore from "@/store/useCartStore";

export default function AddToCartButton({ product }: { product: TProduct }) {
  const { items, addItem } = useCartStore();

  const handleAddToCart = () => {
    addItem(product);
    alert("Added to cart");
  };

  return (
    <div>
      <button
        className="bg-yellow-400 text-black font-bold px-4 py-2 rounded-xl border-[3px] border-black"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
      <button
        className="bg-yellow-400 text-black font-bold px-4 py-2 rounded-xl border-[3px] border-black"
        onClick={() => alert(JSON.stringify(items))}
      >
        View Cart
      </button>
    </div>
  );
}
