"use client";

import { Trash } from "lucide-react";
import { useTransition } from "react";
import { deleteProductAction } from "@/actions/admin/deleteProductAction";

export default function DeleteAdminProduct({
  productId,
}: {
  productId: number;
}) {
  const [isPending, startTransition] = useTransition();

  const handleDeleteProduct = async (productId: number) => {
    startTransition(async () => {
      const result = await deleteProductAction(productId);

      if (result?.success) {
        alert(result.message);
      } else {
        alert(result?.message || "Something went wrong");
      }
    });
  };
  return (
    <button
      onClick={() => handleDeleteProduct(productId)}
      className="p-1 text-red-600 hover:text-red-800"
    >
      <Trash className="h-5 w-5" />
    </button>
  );
}
