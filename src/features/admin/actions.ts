"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { addProduct, editProduct, deleteProduct } from "./api";
import { addProductSchema, editProductSchema } from "./schemas";

export async function addProductAction(_prevState: any, formData: FormData) {
  const rawData = Object.fromEntries(formData.entries());
  const validated = addProductSchema.safeParse({
    name: rawData.addProductName,
    price: Number(rawData.addProductPrice),
    description: rawData.addProductDescription,
    image: rawData.addProductImage,
    categoryId: Number(rawData.addProductCategoryId),
  });

  if (!validated.success) {
    return {
      success: false,
      message: "Validation error",
    };
  }

  try {
    await addProduct(validated.data);
    revalidatePath("/admin");
  } catch (e: any) {
    return { success: false, message: e.message };
  }

  redirect("/admin");
}

export async function editProductAction(_prevState: any, formData: FormData) {
  const rawData = Object.fromEntries(formData.entries());
  const validated = editProductSchema.safeParse({
    name: rawData.addProductName,
    price: Number(rawData.addProductPrice),
    description: rawData.addProductDescription,
    image: rawData.addProductImage,
    categoryId: Number(rawData.addProductCategoryId),
    productId: rawData.productId,
  });

  if (!validated.success) {
    return {
      success: false,
      message: "Validation error",
    };
  }

  try {
    await editProduct(validated.data);
    revalidatePath("/admin");
  } catch (e: any) {
    return { success: false, message: e.message };
  }
  redirect("/admin");
}

export async function deleteProductAction(productId: number | string) {
  try {
    await deleteProduct(productId);
    revalidatePath("/admin");
  } catch (e: any) {
    return { success: false, message: e.message };
  }
}
