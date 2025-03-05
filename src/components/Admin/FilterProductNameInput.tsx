"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function FilterProductNameInput() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize state with the query param if available.
  const [searchQuery, setSearchQuery] = useState(
    () => searchParams.get("q") || ""
  );

  // Debounce updating the URL with the search query.
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      // Only update "q" if searchQuery has content; otherwise, remove it.
      if (searchQuery.trim()) {
        params.set("q", searchQuery);
        params.delete("page");
      } else {
        params.delete("q");
      }

      router.push(`?${params.toString()}`);
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, router, searchParams]);

  // Update local state only on input change.
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search..."
      className="brutalist-input"
      onChange={handleSearchChange}
      value={searchQuery}
    />
  );
}
