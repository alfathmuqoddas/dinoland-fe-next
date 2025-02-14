"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signOut() {
  const cookieStore = await cookies();

  try {
    const response = await fetch("http://localhost:8080/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refreshToken: cookieStore.get("refreshToken")?.value,
      }),
    });

    if (!response.ok) {
      throw new Error("Could not sign out");
    }

    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
  } catch (error) {
    throw new Error("Something went wrong: " + error);
  }
  redirect("/login");
}
