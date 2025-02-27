"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function PageSelector({
  //   currentPage,
  totalPages,
}: {
  //   currentPage: number;
  totalPages: number;
}) {
  const allPages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const searchParams = useSearchParams();

  const newParams = (page: number) => {
    const updatedSearchParams = new URLSearchParams(searchParams);
    updatedSearchParams.set("page", page.toString());
    updatedSearchParams.delete("q");
    return updatedSearchParams.toString();
  };

  const isActive = (page: number) => {
    return searchParams.get("page") === page.toString()
      ? "underline pointer-events-none"
      : "";
  };

  return (
    <div className="flex gap-4">
      {allPages.length > 1 ? (
        allPages.map((page) => (
          <Link
            href={`products?${newParams(page)}`}
            key={page}
            className={`hover:underline underline-offset-4 text-xl font-bold ${isActive(
              page === 1 ? 1 : page
            )}`}
          >
            {page}
          </Link>
        ))
      ) : (
        <></>
      )}
    </div>
  );
}
