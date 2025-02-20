import { Store, LogIn, UserPlus, User, Shield } from "lucide-react";

export default function getNavItems(
  isAuthenticated: boolean,
  isAdmin: boolean
) {
  if (isAuthenticated) {
    return [
      { link: "/profile", text: "Profile", icon: <User className="w-5 h-5" /> },
      ...(isAdmin
        ? [
            {
              link: "/admin",
              text: "Admin",
              icon: <Shield className="w-5 h-5" />,
            },
          ]
        : []),
    ];
  }
  return [
    {
      link: "/products",
      text: "Products",
      icon: <Store className="w-5 h-5" />,
    },
    { link: "/login", text: "Login", icon: <LogIn className="w-5 h-5" /> },
    {
      link: "/register",
      text: "Register",
      icon: <UserPlus className="w-5 h-5" />,
    },
  ];
}
