// components/PageSizeDropdown.jsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function PageSizeDropdown() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPageSize = searchParams.get("pageSize") || "10";

  const handlePageSizeChange = (event: any) => {
    const newPageSize = event.target.value;
    // Create a new URLSearchParams instance to modify the query parameters
    const params = new URLSearchParams(searchParams.toString());
    params.set("pageSize", newPageSize);

    // Update the URL while preserving the pathname and other query parameters
    router.push(`?${params.toString()}`);
  };

  return (
    <select
      title="Page Size"
      name="pageSize"
      className="brutalist-input-select"
      defaultValue={currentPageSize}
      onChange={handlePageSizeChange}
    >
      <option value="10">10</option>
      <option value="20">20</option>
      <option value="30">30</option>
    </select>
  );
}
