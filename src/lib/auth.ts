import "use server";
import { cookies } from "next/headers";

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
