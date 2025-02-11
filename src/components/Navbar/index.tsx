import Link from "next/link";
import SearchForm from "./components/Search";
import MobileMenu from "./components/MobileMenu";
import NavMenuList from "./components/NavMenuList";
import Cart from "./components/Cart";

const Navbar = () => {
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

        <div className="flex ml-0 md:ml-4">
          <Cart />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
