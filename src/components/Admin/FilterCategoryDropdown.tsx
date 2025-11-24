"use client";

import { TProductCategory } from "@/type/product";
import { useRouter, useSearchParams } from "next/navigation";

export default function FilterCategoryDropdown({
  categories,
}: {
  categories: TProductCategory[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategoryId = searchParams.get("categoryId") || "";

  const handleCategoryChange = (event: any) => {
    const newCategoryId = event.target.value;
    const params = new URLSearchParams(searchParams.toString());
    params.set("categoryId", newCategoryId);
    if (newCategoryId === "") {
      params.delete("categoryId");
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <select
      title="Category"
      name="categoryFilter"
      className="brutalist-input-select w-full"
      defaultValue={currentCategoryId}
      onChange={handleCategoryChange}
    >
      <option value="">All</option>
      {categories?.map((category: TProductCategory) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </select>
  );
}
