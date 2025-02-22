"use server";
import { fetchWithAuth } from "@/lib/secureFetch";
import { revalidatePath } from "next/cache";

export async function removeFromCartAction(productId: number) {
  const response = await fetchWithAuth(
    `http://localhost:8080/api/cart/delete/${productId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  // Check for unauthorized first
  if (response.status === 401) {
    return { success: false, message: "Unauthorized" };
  }

  // For any other non-OK response, try to get a detailed message
  if (!response.ok) {
    const errorData = await response.json();
    return {
      success: false,
      message: errorData.message || "Something went wrong",
    };
  }

  revalidatePath("/products/cart");
}
