"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { signOut } from "@/actions/auth/signOutActions";
import { fetchNewToken } from "@/lib/auth";
import { createSession } from "@/lib/auth";

// export async function fetchWithAuth(url: string, options: any = {}) {
//   const accessToken = (await cookies()).get("accessToken")?.value;

//   const authHeaders = {
//     ...options.headers,
//     Authorization: `Bearer ${accessToken}`,
//   };

//   const response = await fetch(url, { ...options, headers: authHeaders });

//   if (response.status === 401) {
//     signOut();
//   }

//   if (!accessToken) {
//     signOut();
//   }

//   return response;
// }

export async function fetchWithAuth(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  let accessToken = (await cookies()).get("accessToken")?.value;
  const refreshToken = (await cookies()).get("refreshToken")?.value;

  // Ensure we have tokens
  if (!accessToken || !refreshToken) {
    signOut();
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
