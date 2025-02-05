"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signOut() {
  const cookieStore = await cookies();
  try {
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
  } catch (error) {
    throw new Error("Something went wrong: " + error);
  }
  redirect("/login");
}
