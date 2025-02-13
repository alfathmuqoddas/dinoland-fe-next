"use server";
import { cookies } from "next/headers";
import { fetchWithAuth } from "@/lib/secureFetch";

export async function addToCartAction(productId: number) {
  const accessToken = (await cookies()).get("accessToken")?.value;
  const refreshToken = (await cookies()).get("refreshToken")?.value;

  try {
    const response = await fetchWithAuth("http://localhost:8080/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId, quantity: 1 }),
    });

    const json = await response.json();

    if (!response.ok) {
      return { success: false, ...json };
    }

    return { success: true, ...json };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
