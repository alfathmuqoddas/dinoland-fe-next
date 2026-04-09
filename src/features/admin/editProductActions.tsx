"use server";
import { fetchWithAuth } from "@/lib/secureFetch";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function editProduct(prevState: any, formData: FormData) {
  const productId = formData.get("productId");
  const data = {
    name: formData.get("addProductName"),
    price: formData.get("addProductPrice"),
    description: formData.get("addProductDescription"),
    image: formData.get("addProductImage"),
    categoryId: Number(formData.get("addProductCategoryId")),
  };

  const response = await fetchWithAuth(
    `${process.env.BASE_API_URL}/product/update/${productId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );

  if (!response.ok) {
    const result = await response.json();
    return { success: false, message: result.error };
  }

  revalidatePath("/admin");
  redirect("/admin");
}
