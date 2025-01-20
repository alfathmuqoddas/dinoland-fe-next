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

export async function isLogin() {
  const accessToken = (await cookies()).get("accessToken")?.value;

  if (accessToken) {
    return true;
  }

  return false;
}

export async function logout() {
  const cookiesStore = await cookies();
  cookiesStore.set({
    name: "accessToken",
    value: "",
    httpOnly: true,
  });
  cookiesStore.set({
    name: "refreshToken",
    value: "",
    httpOnly: true,
  });
  redirect("/login");
}
