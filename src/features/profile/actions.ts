"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  addNewBuild,
  deleteBuild,
  editBuild,
  addMyBuildItem,
  deleteMyBuildItem,
} from "./api";
import { addNewBuildSchema, editBuildSchema } from "./schemas";

export const addNewBuildAction = async (
  _prevState: any,
  formData: FormData,
) => {
  const rawData = Object.fromEntries(formData.entries());
  const validated = addNewBuildSchema.safeParse({
    name: rawData.buildName,
    description: rawData.buildDescription,
  });
  if (!validated.success) {
    return {
      success: false,
      errors: "Validation error",
      message: "",
    };
  }
  try {
    await addNewBuild(validated.data);
    revalidatePath("/profile/my-builds");
    return { success: true, message: "Build added successfully" };
  } catch (e: any) {
    return { success: false, message: e.message };
  }
};

export const deleteBuildAction = async (buildId: number | string) => {
  try {
    await deleteBuild(buildId);
    revalidatePath("/profile/my-builds");
  } catch (e: any) {
    return { success: false, message: e.message };
  }

  redirect("/profile/my-builds");
};

export const editBuildAction = async (_prevState: any, formData: FormData) => {
  const rawData = Object.fromEntries(formData.entries());
  const validated = editBuildSchema.safeParse({
    name: rawData.buildName,
    description: rawData.buildDescription,
    buildId: rawData.buildId,
  });
  if (!validated.success) {
    return {
      success: false,
      errors: "Validation error",
      message: "",
    };
  }
  try {
    await editBuild(validated.data);
    revalidatePath("/profile/my-builds");
    return { success: true, message: "Build updated successfully" };
  } catch (e: any) {
    return { success: false, message: e.message };
  }
};

export const deleteMyBuildItemAction = async (
  buildId: number | string,
  productId: number | string,
) => {
  try {
    await deleteMyBuildItem(buildId, productId);
    revalidatePath(`/profile/my-builds/${buildId}`);
    revalidatePath(`/profile/my-builds`);
    return { success: true, message: "Build item removed successfully" };
  } catch (e: any) {
    return { success: false, message: e.message };
  }
};

export const addBuildItemAction = async (
  buildId: string | string[] | undefined,
  productId: number,
) => {
  try {
    await addMyBuildItem(productId, buildId);
    revalidatePath(`/profile/my-builds/${buildId}`);
  } catch (e: any) {
    return { success: false, message: e.message };
  }
  redirect(`/profile/my-builds/${buildId}`);
};
