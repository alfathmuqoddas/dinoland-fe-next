"use server";

import { redirect } from "next/navigation";
import { signOut } from "@/actions/auth/signOutActions";
import { fetchNewToken, createSession, getAuthToken } from "@/lib/auth";

export async function fetchWithAuth(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const { accessToken, refreshToken } = await getAuthToken();

  // Ensure we have tokens
  if (!accessToken || !refreshToken) {
    redirect("/login");
  }

  // Helper to build headers
  const makeHeaders = (token: string) => ({
    ...options.headers,
    Authorization: `Bearer ${token}`,
  });

  // First attempt
  let response = await fetch(url, {
    ...options,
    headers: makeHeaders(accessToken!),
  });

  // On 401, try refreshing
  if (response.status === 401) {
    try {
      // Fetch new tokens
      const { newAccessToken } = await fetchNewToken(refreshToken);

      // Persist new tokens in cookies/session
      await createSession(newAccessToken);

      // Retry original request
      response = await fetch(url, {
        ...options,
        headers: makeHeaders(newAccessToken),
      });

      // Still unauthorized? force logout
      if (response.status === 401) {
        throw new Error("Unauthorized after token refresh");
      }
    } catch (err) {
      // Any error -> sign out
      console.error("fetchWithAuth error:", err);
      signOut();
      redirect("/login");
    }
  }

  return response;
}
