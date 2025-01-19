"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const cookiesStore = await cookies();

  try {
    const response = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const json = await response.json();

    if (json) {
      cookiesStore.set("accessToken", json.accessToken);
      cookiesStore.set("refreshToken", json.refreshToken);
      // redirect("/dashboard");
      return json;
    } else {
      throw new Error("Something went wrong");
    }
  } catch (error) {
    console.error("Error logging in:", error);
  } finally {
    redirect("/dashboard");
  }
}
