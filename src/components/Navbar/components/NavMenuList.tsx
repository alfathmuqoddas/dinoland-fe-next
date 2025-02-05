"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Store } from "lucide-react";

const NavMenu: React.FC<{
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

export default NavMenuList;
