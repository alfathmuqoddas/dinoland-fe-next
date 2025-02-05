import { cookies } from "next/headers";
import NavMenu from "./NavMenu";
import { Store, LogIn, UserPlus, LogOut, User } from "lucide-react";

const NavMenuList = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const isAuthenticated = Boolean(accessToken);

  const navList = isAuthenticated
    ? [
        {
          link: "/profile",
          text: "Profile",
          icon: <User className="w-5 h-5" />,
        },
        {
          link: "/signout",
          text: "Sign Out",
          icon: <LogOut className="w-5 h-5" />,
        },
      ]
    : [
        {
          link: "/products",
          text: "Products",
          icon: <Store className="w-5 h-5" />,
        },
        {
          link: "/login",
          text: "Login",
          icon: <LogIn className="w-5 h-5" />,
        },
        {
          link: "/register",
          text: "Register",
          icon: <UserPlus className="w-5 h-5" />,
        },
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
