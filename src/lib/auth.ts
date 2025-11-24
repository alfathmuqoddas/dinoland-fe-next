"use server";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

export async function getAuthToken() {
  const accessToken = (await cookies()).get("accessToken")?.value;
  const refreshToken = (await cookies()).get("refreshToken")?.value;

  return { accessToken, refreshToken };
}

export async function createSession(
  accessToken: string,
  refreshToken?: string
) {
  const cookiesStore = await cookies();

  cookiesStore.set("accessToken", accessToken, { httpOnly: true });
  if (refreshToken) {
    cookiesStore.set("refreshToken", refreshToken, { httpOnly: true });
  }
}

export async function deleteSession() {
  const cookiesStore = await cookies();
  cookiesStore.delete("accessToken");
  cookiesStore.delete("refreshToken");
}

export async function getRoleFromToken(token: string): Promise<string> {
  try {
    const decoded = jwtDecode<{ userId: string; userRole: string }>(token);
    return decoded.userRole;
  } catch (e) {
    console.error("Failed to decode token:", e);
    return "guest";
  }
}

// // Function to fetch new access token using the refresh token
export async function fetchNewToken(token: string) {
  const response = await fetch("http://localhost:8080/api/auth/refresh", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const { newAccessToken } = await response.json();
  return { newAccessToken };
}
