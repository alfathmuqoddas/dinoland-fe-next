"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function fetchWithAuth(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status === 401) {
    redirect("/login");
  }

  return response;
}

export async function safeJson(response: Response | null) {
  if (!response) return null;
  try {
    return await response.json();
  } catch (err) {
    console.error("JSON parsing failed:", err);
    return null;
  }
}
