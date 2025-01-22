import Navbar from "@/app/components/Navbar";
import { Metadata } from "next";

const meta: Metadata = {
  title: "Products",
  description: "Products page",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-16 max-w-screen-xl">
        {children}
      </main>
    </>
  );
}
