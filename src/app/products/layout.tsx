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
      <main className="container px-4 py-8 w-full md:max-w-[1280px]">
        {children}
      </main>
    </>
  );
}
