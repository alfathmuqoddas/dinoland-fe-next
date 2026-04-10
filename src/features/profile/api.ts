import { fetchWithAuth } from "@/lib/secureFetch";
import { AddNewBuildDTO, EditBuildDTO } from "./schemas";

export const addNewBuild = async (data: AddNewBuildDTO) => {
  const response = await fetchWithAuth(`${process.env.BASE_API_URL}/my-build`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.message || `HTTP Error: ${response.status}`);
  }
  return response.json();
};

export const deleteBuild = async (buildId: number | string) => {
  const response = await fetchWithAuth(
    `${process.env.BASE_API_URL}/my-build/${buildId}`,
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
};

export const editBuild = async (data: EditBuildDTO) => {
  const response = await fetchWithAuth(
    `${process.env.BASE_API_URL}/my-build/${data.buildId}`,
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
};

export const addMyBuildItem = async (
  productId: number,
  buildId: string | string[] | undefined,
) => {
  const response = await fetchWithAuth(
    `${process.env.BASE_API_URL}/my-build-item/${buildId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
    },
  );

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.message || `HTTP Error: ${response.status}`);
  }
  return response.json();
};

export const deleteMyBuildItem = async (
  buildId: string | number,
  productId: string | number,
) => {
  const response = await fetchWithAuth(
    `${process.env.BASE_API_URL}/my-build-item/delete/${buildId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
    },
  );

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.message || `HTTP Error: ${response.status}`);
  }
  return response.json();
};
