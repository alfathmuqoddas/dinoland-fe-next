"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function PageSelector({
  totalPages,
  path = "products",
}: {
  totalPages: number;
  path?: string;
}) {
  const searchParams = useSearchParams();

  const currentPage = searchParams.get("page") || "1";

  const newParams = (page: number) => {
    const updatedSearchParams = new URLSearchParams(searchParams.toString());
    updatedSearchParams.set("page", page.toString());
    return updatedSearchParams.toString();
  };

  if (totalPages <= 1) return null;

  const allPages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex gap-4" aria-label="Pagination">
      {allPages.map((page) => {
        const pageStr = page.toString();
        const active = currentPage === pageStr;

        return (
          <Link
            href={`${path}?${newParams(page)}`}
            key={page}
            aria-current={active ? "page" : undefined}
            className={`hover:underline underline-offset-4 text-xl font-bold transition-colors ${
              active
                ? "underline underline-pink-500 text-pink-500 pointer-events-none"
                : "text-black hover:text-pink-400"
            }`}
          >
            {page}
          </Link>
        );
      })}
    </nav>
  );
}
