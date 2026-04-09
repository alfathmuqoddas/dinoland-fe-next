"use client";
import { addToCartAction } from "../../features/cart/addToCartAction";
import { useTransition } from "react";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import { signOutAction as signOut } from "@/features/auth/actions";

export default function AddToCartButton({ productId }: { productId: number }) {
  const [isPending, startTransition] = useTransition();

  async function handleAddToCart() {
    startTransition(async () => {
      const result = await addToCartAction(productId);
      alert(result.message);
      if (result.message === "Unauthorized") {
        signOut();
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
