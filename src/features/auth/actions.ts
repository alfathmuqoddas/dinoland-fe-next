"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { loginSchema, registerSchema } from "./schemas";
import { login, register, logout } from "./api";
import { handleBackendError } from "@/lib/utils";
import { success } from "zod";

export async function loginAction(_prevState: any, formData: FormData) {
  const rawData = Object.fromEntries(formData);
  console.log(rawData);
  const validated = loginSchema.safeParse(rawData);
  if (!validated.success) {
    return {
      success: false,
      errors: "Validation error",
      message: "",
    };
  }

  let isSuccess = false;

  try {
    const res = await login(validated.data);

    const { accessToken, refreshToken } = res.data;

    const cookiesStore = await cookies();

    cookiesStore.set({
      name: "accessToken",
      value: accessToken,
      httpOnly: true,
    });

    cookiesStore.set({
      name: "refreshToken",
      value: refreshToken,
      httpOnly: true,
    });

    isSuccess = true;
  } catch (err: any) {
    return handleBackendError(err);
  }

  if (isSuccess) {
    redirect("/");
  }
}

export async function signOutAction() {
  const cookieStore = await cookies();

  try {
    await logout({
      refreshToken: cookieStore.get("refreshToken")?.value,
    });

    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}

export async function registerAction(_prevState: any, formData: FormData) {
  const rawData = Object.fromEntries(formData);
  const validated = registerSchema.safeParse(rawData);
  if (!validated.success) {
    return {
      success: false,
      errors: validated.error.flatten().fieldErrors,
      message: "",
    };
  }
  let isSuccess = false;
  try {
    await register(validated.data);
    isSuccess = true;
  } catch (err: any) {
    return handleBackendError(err);
  }
  if (isSuccess) {
    redirect("/login");
  }
}
