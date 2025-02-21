"use server";
import { revalidatePath } from "next/cache";
import { fetchWithAuth } from "@/lib/secureFetch";

export async function deleteProductAction(productId: number | string) {
  const response = await fetchWithAuth(
    `http://localhost:8080/api/product/delete/${productId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    const json = await response.json();
    return { success: false, message: json.message };
  }

  revalidatePath("/admin");
}
