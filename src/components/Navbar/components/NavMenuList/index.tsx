import { cookies } from "next/headers";
import NavMenu from "./NavMenu";
import SignOutButton from "./SignOutButton";
import getNavItems from "./getNavItems";
import { fetchWithAuth } from "@/lib/secureFetch";
import { signOut } from "@/actions/auth/signOutActions";

const NavMenuList = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const isAuthenticated = Boolean(accessToken);

  let isAdmin = false;

  const response = await fetchWithAuth(
    "http://localhost:8080/api/auth/isAdmin"
  );

  if (response.status === 401) {
    signOut();
  }

  ({ isAdmin } = await response.json());

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
