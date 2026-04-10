import { fetchWithAuth } from "@/lib/secureFetch";
import { AddProductDTO, EditProductDTO } from "./schemas";

export async function addProduct(data: AddProductDTO) {
  const response = await fetchWithAuth(
    `${process.env.BASE_API_URL}/product/add`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([data]),
    },
  );

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.message || `HTTP Error: ${response.status}`);
  }
  return response.json();
}

export async function editProduct(data: EditProductDTO) {
  const response = await fetchWithAuth(
    `${process.env.BASE_API_URL}/product/update/${data.productId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.message || `HTTP Error: ${response.status}`);
  }
  return response.json();
}

export async function deleteProduct(productId: number | string) {
  const response = await fetchWithAuth(
    `${process.env.BASE_API_URL}/product/delete/${productId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.message || `HTTP Error: ${response.status}`);
  }
  return response.json();
}
