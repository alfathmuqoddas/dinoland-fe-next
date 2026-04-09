import Link from "next/link";
import SearchForm from "./components/Search";
import MobileMenu from "./components/MobileMenu";
import NavMenuList from "./components/NavMenuList";
import Cart from "./components/Cart";
import { cookies } from "next/headers";
import getNavItems from "./components/NavMenuList/getNavItems";
import { getRoleFromToken } from "@/lib/auth";

const Navbar = async () => {
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
    <nav className="relative p-2 lg:px-6 bg-gray-800">
      <div className="flex items-center justify-between max-h-14 mx-auto container max-w-7xl">
        <div className="flex lg:hidden">
          <MobileMenu navList={navList} isAuthenticated={isAuthenticated} />
        </div>
        <div className="md:w-1/3">
          <Link
            href="/products"
            className="flex items-center space-x-2 text-white font-bold font-heading text-xl"
          >
            <span>BRUTALIST STORE 🚀</span>
          </Link>
        </div>

        <div className="hidden lg:flex justify-center md:w-1/3">
          <SearchForm />
        </div>

        <div className="hidden md:flex justify-end  md:w-1/3">
          <NavMenuList navList={navList} isAuthenticated={isAuthenticated} />
        </div>

        <div className="flex ml-0 md:ml-4">
          <Cart />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
