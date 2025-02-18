"use server";
import { fetchWithAuth } from "@/lib/secureFetch";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function removeFromCartAction(productId: number) {
  try {
    const response = await fetchWithAuth(
      `http://localhost:8080/api/cart/delete/${productId}`,
      {
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json",
        // },
      }
    );

    const json = await response.json();

    if (!response.ok) {
      return { success: false, ...json };
    }

    // return { success: true, ...json };
    revalidatePath("/products/cart");
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
