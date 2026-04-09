"use client";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";
import type { NavItem } from "./NavMenuList/getNavItems";
import Link from "next/link";

const MobileMenu = ({
  navList,
  isAuthenticated,
}: {
  navList: NavItem[];
  isAuthenticated: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className="relative md:hidden">
      <button
        onClick={toggleMenu}
        className="p-2 transition-colors hover:bg-pink-600 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
        aria-expanded={isOpen}
        aria-label="Toggle navigation menu"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Menu className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={closeMenu} />

          <div className="absolute top-12 left-0 w-[70vw] min-w-[240px] bg-gray-900 border border-gray-800 shadow-xl rounded-lg z-50 animate-in fade-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col p-4">
              {navList?.map((nav, index) => (
                <Link
                  href={nav.link}
                  key={index}
                  onClick={closeMenu}
                  className="flex items-center gap-3 p-3 text-gray-200 hover:bg-pink-600 hover:text-white rounded-md transition-all"
                >
                  <span className="opacity-80">{nav.icon}</span>
                  <span className="font-medium">{nav.text}</span>
                </Link>
              ))}

              {isAuthenticated && (
                <>
                  <div className="h-px bg-gray-800 my-2" />
                  <Link
                    href="/cart"
                    onClick={closeMenu}
                    className="flex items-center gap-3 p-3 text-gray-200 hover:bg-pink-600 hover:text-white rounded-md transition-all"
                  >
                    <ShoppingCart className="w-5 h-5 opacity-80" />
                    <span className="font-medium">Cart</span>
                  </Link>
                </>
              )}
            </nav>
          </div>
        </>
      )}
    </div>
  );
};

export default MobileMenu;
