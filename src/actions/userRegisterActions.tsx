"use server";
// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";

export async function register(prevState: any, formData: FormData) {
  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  try {
    const response = await fetch("http://localhost:8080/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const json = await response.json();

    if (!response.ok) {
      return json.error;
    }

    return "User registered successfully, now you can log in";
  } catch (error: any) {
    return error.message;
  }
}
