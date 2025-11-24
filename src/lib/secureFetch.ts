"use server";

import { redirect } from "next/navigation";
import { signOut } from "@/actions/auth/signOutActions";
import { fetchNewToken, createSession, getAuthToken } from "@/lib/auth";

export async function fetchWithAuth(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  try {
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

    let response: Response;

    // ------------------------------
    // 1️⃣ First attempt
    // ------------------------------
    try {
      response = await fetch(url, {
        ...options,
        headers: makeHeaders(accessToken!),
      });
    } catch (err) {
      console.error("fetchWithAuth → initial request failed:", err);
      throw new Error("Network error during initial request");
    }

    // ------------------------------
    // 2️⃣ Handle expired access token
    // ------------------------------
    if (response.status === 401) {
      try {
        // Get a new access token using refresh token
        const { newAccessToken } = await fetchNewToken(refreshToken);

        // Persist the new token
        await createSession(newAccessToken);

        // Retry the original request
        response = await fetch(url, {
          ...options,
          headers: makeHeaders(newAccessToken),
        });

        // If still 401 → refresh token invalid
        if (response.status === 401) {
          throw new Error("Unauthorized after token refresh");
        }
      } catch (err) {
        console.error("fetchWithAuth → token refresh failed:", err);
        await signOut();
        redirect("/login");
      }
    }

    return response;
  } catch (err) {
    console.error("fetchWithAuth → fatal error:", err);
    await signOut();
    redirect("/login");
  }
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
