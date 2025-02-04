"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Store,
  LogIn,
  UserPlus,
  Menu,
  ShoppingCart,
  Search,
} from "lucide-react";
import { logout, isLogin } from "@/lib/session";
import Form from "next/form";
import { useSearchParams } from "next/navigation";
import { Auth } from "./Auth";

export const SearchForm = () => {
  const searchParams = useSearchParams();

  return (
    <Form action="/products" className="relative w-80 mx-auto">
      <input
        key={searchParams?.get("q")}
        type="text"
        name="q"
        placeholder="Search for products..."
        autoComplete="off"
        defaultValue={searchParams?.get("q") || ""}
        className="text-md w-full border bg-transparent rounded-md px-4 py-2 border-gray-600 focus:border-pink-500"
      />
      <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
        <Search className="h-4" />
      </div>
    </Form>
  );
};

export const MobileMenu = () => {
  return (
    <div className="p-2 hover:bg-pink-600 hover:cursor-pointer">
      <Menu className="w-5 h-5" />
    </div>
  );
};

export const Checkout = () => {
  return (
    <div className="p-2 hover:bg-pink-600 hover:cursor-pointer">
      <ShoppingCart className="w-5 h-5" />
    </div>
  );
};

export const NavMenu: React.FC<{
  link: string;
  text: string;
  icon: React.ReactNode;
}> = ({ link, text, icon }) => {
  const location = usePathname();

  const isActive = (path: string) => {
    return location === path ? "bg-pink-500" : "hover:bg-pink-600";
  };

  return (
    <Link
      href={link}
      className={`flex items-center space-x-1 px-2 py-1 text-white text-sm font-bold transition-colors hover:bg-pink-600 ${isActive(
        link
      )}`}
    >
      {icon}
      <span>{text}</span>
    </Link>
  );
};

export const NavMenuList = () => {
  const navList = [
    {
      link: "/products",
      text: "Products",
      icon: <Store className="w-5 h-5" />,
    },
    // {
    //   link: "/login",
    //   text: "Login",
    //   icon: <LogIn className="w-5 h-5" />,
    // },
    // {
    //   link: "/register",
    //   text: "Register",
    //   icon: <UserPlus className="w-5 h-5" />,
    // },
  ];

  return (
    <div className="flex gap-4">
      {navList.map((nav, index) => (
        <NavMenu key={index} {...nav} />
      ))}
    </div>
  );
};

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const checkLogin = async () => {
      const loginStatus = await isLogin();
      setLoggedIn(loginStatus);
    };
    checkLogin();
  }, []);

  return (
    <nav className="relative p-2 lg:px-6 bg-gray-800">
      <div className="flex items-center justify-between max-w-[1440px] mx-auto">
        <div className="flex lg:hidden">
          <MobileMenu />
        </div>
        <div className="md:w-1/3">
          <Link
            href="/"
            className="flex items-center space-x-2 text-white font-bold text-xl"
          >
            <span>BRUTALIST STORE 🚀</span>
          </Link>
        </div>

        <div className="hidden md:flex justify-center md:w-1/3">
          <SearchForm />
        </div>

        <div className="hidden lg:flex justify-end  md:w-1/3">
          <NavMenuList />
        </div>

        <div className="flex lg:hidden">
          <Checkout />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
