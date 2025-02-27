"use client";
import { addToCartAction } from "../../actions/cart/addToCartAction";
import { useTransition } from "react";
import { redirect } from "next/navigation";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";

export default function AddToCartButton({ productId }: { productId: number }) {
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
      <Button
        variant={"warning"}
        size={"lg"}
        className="font-bold"
        onClick={handleAddToCart}
        disabled={isPending}
      >
        Add to Cart <ShoppingCart className="w-4 h-4" />
      </Button>
    </div>
  );
}
