"use server";
export const editProductAction = async (productId: number, formData: any) => {
  "use server";
  const response = await fetch("http://localhost:8080/api/product/edit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId, ...formData }),
  });

  const json = await response.json();

  if (!response.ok) {
    return json.error;
  }
};
