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
      <main className="container mx-auto px-4 py-8 max-w-[1440px]">
        {children}
      </main>
    </>
  );
}
