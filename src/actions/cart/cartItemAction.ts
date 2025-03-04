"use server";
import { fetchWithAuth } from "@/lib/secureFetch";
import { revalidatePath } from "next/cache";

export async function cartItemAction(
  action: "increment" | "decrement" | "delete",
  productId: number
) {
  const response = await fetchWithAuth(
    `http://localhost:8080/api/cart/update/${productId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action }),
    }
  );

  // Check for unauthorized first
  if (response.status === 401) {
    return { success: false, message: "Unauthorized" };
  }

  const res = await response.json();

  revalidatePath("/products/cart");

  return {
    success: true,
    message: res.message || "Successfully updated quantity",
  };
}
