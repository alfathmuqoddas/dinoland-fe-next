import "server only";
import { cookies } from "next/headers";

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
