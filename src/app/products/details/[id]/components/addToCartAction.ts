"use server";
import { cookies } from "next/headers";

export async function addToCartAction(productId: number) {
  const accessToken = (await cookies()).get("accessToken")?.value;

  try {
    const response = await fetch("http://localhost:8080/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
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
