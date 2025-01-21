"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function updateSession() {
  const accessToken = (await cookies()).get("accessToken")?.value;

  if (!accessToken) {
    return null;
  }

  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const cookieStore = await cookies();
  cookieStore.set({
    name: "accessToken",
    value: accessToken,
    expires,
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });
}

export async function isLogin(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.has("accessToken");
}

export async function logout() {
  (await cookies()).delete("accessToken");
  (await cookies()).delete("refreshToken");
  redirect("/login");
}
