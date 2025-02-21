"use server";
import { fetchWithAuth } from "@/lib/secureFetch";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function addProduct(prevState: any, formData: FormData) {
  const data = [
    {
      name: formData.get("addProductName"),
      price: formData.get("addProductPrice"),
      description: formData.get("addProductDescription"),
      image: formData.get("addProductImage"),
      categoryId: formData.get("addProductCategoryId"),
    },
  ];

  const response = await fetchWithAuth(
    "http://localhost:8080/api/product/add",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    const result = await response.json();
    return { success: false, message: result.error };
  }

  revalidatePath("/admin");
  redirect("/admin");
}
