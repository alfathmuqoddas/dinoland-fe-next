// components/PageSizeDropdown.jsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function SortByDropdown() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSortBy = searchParams.get("sortBy") || "createdAt";

  const handleSortByChange = (event: any) => {
    const newSortBy = event.target.value;
    // Create a new URLSearchParams instance to modify the query parameters
    const params = new URLSearchParams(searchParams.toString());
    params.set("sortBy", newSortBy);

    // Update the URL while preserving the pathname and other query parameters
    router.push(`?${params.toString()}`);
  };

  return (
    <select
      title="Sort By"
      name="sortBy"
      className="brutalist-input-select"
      defaultValue={currentSortBy}
      onChange={handleSortByChange}
    >
      <option value="price">Price</option>
      <option value="name">Name</option>
      <option value="createdAt">CreatedAt</option>
      <option value="updatedAt">UpdatedAt</option>
    </select>
  );
}

export function SortOrderDropdown() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSortOrder = searchParams.get("sortOrder") || "asc";

  const handleSortOrderChange = (event: any) => {
    const newSortOrder = event.target.value;
    // Create a new URLSearchParams instance to modify the query parameters
    const params = new URLSearchParams(searchParams.toString());
    params.set("sortOrder", newSortOrder);

    // Update the URL while preserving the pathname and other query parameters
    router.push(`?${params.toString()}`);
  };

  return (
    <select
      title="Sort Order"
      name="sortOrder"
      className="brutalist-input-select"
      defaultValue={currentSortOrder}
      onChange={handleSortOrderChange}
    >
      <option value="asc">Ascending</option>
      <option value="desc">Descending</option>
    </select>
  );
}
