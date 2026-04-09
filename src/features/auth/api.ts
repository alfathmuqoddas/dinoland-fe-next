import type { TApiResponse } from "@/type/api";
import type { TAuth } from "@/type/auth";
import type { LoginDTO, RegisterDTO } from "./schemas";

export async function login(data: LoginDTO): Promise<TApiResponse<TAuth>> {
  const res = await fetch(`${process.env.BASE_API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Network response was not ok");

  return res.json();
}

export async function register(data: RegisterDTO): Promise<TApiResponse<any>> {
  const res = await fetch(`${process.env.BASE_API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Network response was not ok");

  return res.json();
}

export async function logout(data: { refreshToken: string | undefined }) {
  const res = await fetch(`${process.env.BASE_API_URL}/auth/logout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Network response was not ok");

  return res.json();
}
