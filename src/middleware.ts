import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const protectedRoutes = ["/dashboard"];
const publicRoutes = ["/login", "/register", "/about", "/products"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoutes = protectedRoutes.includes(path);
  const isPublicRoutes = publicRoutes.includes(path);

  const cookie = (await cookies()).get("accessToken")?.value;

  if (isProtectedRoutes && !cookie) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // if (
  //   isPublicRoutes &&
  //   cookie &&
  //   !req.nextUrl.pathname.startsWith("/dashboard")
  // ) {
  //   return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  // }

  console.log("Middleware worked!");

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
