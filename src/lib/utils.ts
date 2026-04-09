import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function handleBackendError(error: any) {
  if (error instanceof Response) {
    const data = await error.json().catch(() => ({}));

    if (error.status === 401) {
      return { success: false, message: "Invalid email or password." };
    }

    if (error.status === 400 && data.errors) {
      return {
        success: false,
        message: "Validation error",
        errors: data.errors,
      };
    }
  }

  return {
    success: false,
    message: "An unexpected error occurred. Please try again.",
  };
}
