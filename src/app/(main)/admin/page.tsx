"use client";
import { SortableTable } from "@/components/Table/SortTable";
import { deleteProductAction } from "@/actions/admin/deleteProductAction";
import Link from "next/link";
import useSWR from "swr";
import { fetcher } from "@/actions/fetcher";
import { useFilterProduct } from "@/hooks/useFilterProduct";
import { useState, useMemo } from "react";

export default function Admin() {
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: productsData,
    error: errorProducts,
    isLoading: isLoadingProducts,
  } = useSWR(`http://localhost:8080/api/product?pageSize=50`, fetcher);

  const productList = useMemo(() => {
    return productsData
      ? Array.isArray(productsData)
        ? productsData
        : productsData.products || []
      : [];
  }, [productsData]);

  const flattenedProducts = useMemo(() => {
    return productList.map((product: any) => {
      const { category, ...rest } = product;
      return {
        ...rest,
        categoryName: category?.name,
      };
    });
  }, [productList]);

  const filteredProducts = useFilterProduct(searchQuery, flattenedProducts);

  const columns: any = [
    { key: "name", label: "Name" },
    { key: "categoryName", label: "Category" },
    { key: "price", label: "Price" },
    { key: "createdAt", label: "Created At" },
    { key: "updatedAt", label: "Updated At" },
  ];

  if (isLoadingProducts) {
    return <p>Loading...</p>;
  }

  if (errorProducts) {
    return <p>Error loading data.</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-gray-900">Admin</h1>
      <div className="flex gap-2 justify-between">
        <div>
          <input
            type="text"
            placeholder="Search..."
            className="brutalist-input"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Link href="/admin/add" className="brutalist-button">
          Add New
        </Link>
      </div>
      <SortableTable
        data={filteredProducts}
        columns={columns}
        onDelete={deleteProductAction}
      />
    </div>
  );
}
