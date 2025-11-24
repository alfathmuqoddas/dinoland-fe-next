"use server";
import { redirect } from "next/navigation";
import { signOut } from "@/actions/auth/signOutActions";
import { getAuthToken } from "@/lib/auth";

export async function fetchWithAuth(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const { accessToken } = await getAuthToken();

  // No token → force logout
  if (!accessToken) {
    await signOut();
    redirect("/login");
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  // Unauthorized → logout + redirect
  if (response.status === 401) {
    await signOut();
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
