"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { signOut } from "@/actions/auth/signOutActions";

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

// // Function to fetch new access token using the refresh token
async function fetchNewToken(refreshToken: string) {
  const response = await fetch("http://localhost:8080/api/auth/refresh", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  });
  return response;
}

export async function fetchWithAuth(url: string, options: any = {}) {
  // Retrieve tokens from cookies
  let accessToken = (await cookies()).get("accessToken")?.value;
  const refreshToken = (await cookies()).get("refreshToken")?.value;

  // Set up headers with the access token
  const authHeaders = {
    ...options.headers,
    Authorization: `Bearer ${accessToken}`,
  };

  // Initial fetch with access token
  let response = await fetch(url, { ...options, headers: authHeaders });

  if (response.status === 401 && refreshToken) {
    // Access token might be expired, attempt to refresh it
    const tokenResponse = await fetchNewToken(refreshToken);

    if (tokenResponse.ok) {
      const { newAccessToken } = await tokenResponse.json();

      // Update the access token in cookies
      (await cookies()).set("accessToken", newAccessToken);
      accessToken = newAccessToken;

      // Retry the original request with the new access token
      const retryAuthHeaders = {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      };

      response = await fetch(url, { ...options, headers: retryAuthHeaders });

      if (response.status === 401) {
        signOut();
        redirect("/login");
      }
    } else {
      signOut();
      redirect("/login");
    }
  } else if (response.status === 401) {
    signOut();
    redirect("/login");
  }

  // Return the successful response
  return response;
}
