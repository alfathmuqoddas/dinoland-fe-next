"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  try {
    const response = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // const cookiesStore = await cookies();

    const json = await response.json();

    const setAccessToken = (await cookies()).set({
      name: "accessToken",
      value: json.accessToken,
      httpOnly: true,
    });

    const setRefreshToken = (await cookies()).set({
      name: "refreshToken",
      value: json.refreshToken,
      httpOnly: true,
    });

    if (!response.ok) {
      return { error: json.error };
    }
  } catch (error) {
    return { error: `Something went wrong ${error}` };
  }
  redirect("/");
}
