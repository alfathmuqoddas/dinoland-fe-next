"use server";
import { fetchWithAuth } from "@/lib/secureFetch";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const addNewBuildAction = async (prevState: any, formData: FormData) => {
  const data = {
    name: formData.get("buildName"),
    description: formData.get("buildDescription"),
  };

  const response = await fetchWithAuth("http://localhost:8080/api/my-build", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const result = await response.json();
    return { success: false, message: result.error };
  }

  revalidatePath("/profile/my-builds");

  return { success: true, message: "Build added successfully" };
};

export const deleteBuildAction = async (buildId: number | string) => {
  const response = await fetchWithAuth(
    `http://localhost:8080/api/my-build/${buildId}`,
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

  revalidatePath("/profile/my-builds");
  redirect("/profile/my-builds");
};

export const editBuildAction = async (prevState: any, formData: FormData) => {
  const data = {
    name: formData.get("buildName"),
    description: formData.get("buildDescription"),
    buildId: formData.get("buildId"),
  };

  const response = await fetchWithAuth(
    `http://localhost:8080/api/my-build/${data.buildId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    const json = await response.json();
    return { success: false, message: json.message };
  }

  revalidatePath("/profile/my-builds");
  return { success: true, message: "Build updated successfully" };
};

export const deleteMyBuildItemAction = async (
  buildId: number | string,
  productId: number | string
) => {
  const response = await fetchWithAuth(
    `http://localhost:8080/api/my-build-item/delete/${buildId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
    }
  );

  const res = await response.json();

  if (!response.ok) return { success: false, message: res.error };

  revalidatePath("/profile/my-builds?buildId=" + buildId);

  return { success: true, message: "Build item removed successfully" };
};

export const addBuildItemAction = async (
  buildId: string | string[],
  productId: number
) => {
  const response = await fetchWithAuth(
    `http://localhost:8080/api/my-build-item/${buildId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
    }
  );

  const res = await response.json();

  if (!response.ok) return { success: false, message: res.error };

  redirect("/profile/my-builds?buildId=" + buildId);
};
