"use server";
import { fetchWithAuth } from "@/lib/secureFetch";

export async function removeFromCartAction(productId: number) {
  try {
    const response = await fetchWithAuth(
      `http://localhost:8080/api/cart/detele/${productId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const json = await response.json();

    if (!response.ok) {
      return { success: false, ...json };
    }

    return { success: true, ...json };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
