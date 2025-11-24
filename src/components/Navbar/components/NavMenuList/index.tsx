import { cookies } from "next/headers";
import NavMenu from "./NavMenu";
import SignOutButton from "./SignOutButton";
import getNavItems from "./getNavItems";
import { getRoleFromToken } from "@/lib/auth";
import { signOut } from "@/actions/auth/signOutActions";

const NavMenuList = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const isAuthenticated = Boolean(accessToken);

  let isAdmin = false;

  if (isAuthenticated && accessToken) {
    const role = await getRoleFromToken(accessToken);
    isAdmin = role === "admin";
  }

  const navList = getNavItems(isAuthenticated, isAdmin);

  return (
    <div className="flex gap-4">
      {navList.map((nav, index) => (
        <NavMenu key={index} {...nav} />
      ))}
      {isAuthenticated && <SignOutButton />}
    </div>
  );
};

export default NavMenuList;
