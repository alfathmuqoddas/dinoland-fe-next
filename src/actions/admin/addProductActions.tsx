"use server";
import { fetchWithAuth } from "@/lib/secureFetch";

export default async function addProduct(prevState: any, formData: FormData) {
  const data = {
    name: formData.get("name"),
    price: formData.get("price"),
    image: formData.get("image"),
    description: formData.get("description"),
    category: formData.get("category"),
  };

  try {
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

    const result = await response.json();

    if (!response.ok) {
      return result.error;
    }
  } catch (error) {
    return `Something went wrong ${error}`;
  }
}
