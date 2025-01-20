import { redirect } from "next/navigation";

export async function refreshToken(refreshToken: string) {
  const response = await fetch("http://localhost:8080/api/auth/refresh", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refreshToken,
    }),
  });

  if (!response.ok) {
    throw new Error("Could not refresh token");
  }

  const { accessToken } = await response.json();
  return accessToken;
}

export async function fetchWithAuth(url: string, options: any) {
  let response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${options.accessToken}`,
    },
  });

  if (response.status === 401) {
    const newToken = await refreshToken(options.refreshToken);
    if (newToken) {
      response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${newToken}`,
        },
      });
    } else {
      throw new Error("Could not refresh token");
    }
  }

  return response;
}

//example
// const response = await fetchWithAuth('http://localhost:3000/api/protected', { method: 'GET', accessToken, refreshToken, });
