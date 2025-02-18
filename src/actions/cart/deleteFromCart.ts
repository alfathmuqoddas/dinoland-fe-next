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
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok && response.status !== 401) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Something went wrong");
    }

    if (response.status === 401) {
      throw new Error("Unauthorized");
    }

    const data = await response.json();

    return { success: true, message: data.message };
  } catch (error: any) {
    return { success: false, message: error.message };
  } finally {
    revalidatePath("/products/cart");
  }
}
