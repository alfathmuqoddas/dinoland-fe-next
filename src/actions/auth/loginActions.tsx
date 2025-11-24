"use server";
import { TAuthResponse } from "@/type/auth";
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

    const responseJson = (await response.json()) as TAuthResponse;
    const { accessToken, refreshToken } = responseJson.data;

    const cookiesStore = await cookies();

    cookiesStore.set({
      name: "refreshToken",
      value: accessToken,
      httpOnly: true,
    });

    cookiesStore.set({
      name: "refreshToken",
      value: refreshToken,
      httpOnly: true,
    });
  } catch (err: any) {
    return { error: `${err.message}` };
  }
  redirect("/");
}
