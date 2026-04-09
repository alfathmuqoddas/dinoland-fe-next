import Navbar from "@/components/Navbar";
import { Metadata } from "next";

const meta: Metadata = {
  title: "Products",
  description: "Products page",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 md:px-0 w-full md:max-w-7xl min-h-[calc(100vh-12.5rem)]">
        {children}
      </main>
      <footer className="py-16 max-h-36 bg-gray-800">
        <p className="text-center text-sm   text-white">
          © {new Date().getFullYear()} Dinoland. All rights reserved.
        </p>
      </footer>
    </>
  );
}
