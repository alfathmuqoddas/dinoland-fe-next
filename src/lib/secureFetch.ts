"use server";
import { cookies } from "next/headers";

export async function fetchWithAuth(
  url: string,
  options: RequestInit = {},
): Promise<Response> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const headers = new Headers(options.headers);

  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  return fetch(url, {
    ...options,
    headers,
  });
}

export async function safeJson<T>(
  response: Response | null,
): Promise<T | Partial<T>> {
  if (!response || !response.ok) return {} as T;
  try {
    return await response.json();
  } catch {
    return {} as T;
  }
}
