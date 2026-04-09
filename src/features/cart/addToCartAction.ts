"use server";
import { fetchWithAuth } from "@/lib/secureFetch";

export async function addToCartAction(productId: number) {
  const response = await fetchWithAuth(`${process.env.BASE_API_URL}/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId, quantity: 1 }),
  });

  if (!response.ok && response.status !== 401) {
    const json = await response.json();
    return { success: false, message: json.message };
  }

  if (response.status === 401) {
    return { success: false, message: "Unauthorized" };
  }

  const json = await response.json();
  return { success: true, ...json };
}
