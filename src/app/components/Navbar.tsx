"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Store, LogIn, UserPlus } from "lucide-react";
import { logout, isLogin } from "@/app/lib/session";

export function useCookieExists(cookieName: string): boolean {
  const [cookieExists, setCookieExists] = useState(false);

  useEffect(() => {
    const checkCookie = () => {
      const cookieValue = document.cookie
        .split("; ")
        .find((row) => row.startsWith(`${cookieName}=`));

      setCookieExists(!!cookieValue);
    };

    checkCookie();
  }, [cookieName]);

  return cookieExists;
}

const Navbar = () => {
  const location = usePathname();

  const isActive = (path: string) => {
    return location === path ? "bg-pink-500" : "hover:bg-pink-600";
  };

  const hasAuthCookie = useCookieExists("accessToken");

  return (
    <div className="bg-gray-800 text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="flex items-center space-x-2 text-white font-bold text-xl"
          >
            <Store className="w-8 h-8" />
            <span>BRUTALIST STORE 🚀 {location}</span>
          </Link>
          <div className="flex space-x-4">
            <Link
              href="/products"
              className={`flex items-center space-x-1 px-4 py-2 text-white font-bold transition-colors hover:bg-pink-600`}
            >
              <Store className="w-5 h-5" />
              <span>Products</span>
            </Link>

            {hasAuthCookie ? (
              <>
                <Link
                  href="/login"
                  className={`flex items-center space-x-1 px-4 py-2 text-white font-bold transition-colors ${isActive(
                    "/login"
                  )}`}
                >
                  <LogIn className="w-5 h-5" />
                  <span>Login</span>
                </Link>
                <Link
                  href="/register"
                  className={`flex items-center space-x-1 px-4 py-2 text-white font-bold transition-colors ${isActive(
                    "/register"
                  )}`}
                >
                  <UserPlus className="w-5 h-5" />
                  <span>Register</span>
                </Link>
              </>
            ) : (
              <>
                <div
                  onClick={() => logout()}
                  className={`flex items-center space-x-1 px-4 py-2 text-whit font-bold transition-colors hover:cursor-pointer hover:bg-pink-600`}
                >
                  <UserPlus className="w-5 h-5" />
                  <span>Logout</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
