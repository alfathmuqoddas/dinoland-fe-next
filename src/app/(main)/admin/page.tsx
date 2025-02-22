"use client";
import { SortableTable } from "@/components/Table/SortTable";
import { deleteProductAction } from "@/actions/admin/deleteProductAction";
import Link from "next/link";
import useSWR from "swr";
import { fetcher } from "@/actions/fetcher";
import { useFilterProduct } from "@/hooks/useFilterProduct";
import { useState, useMemo } from "react";
import { Plus } from "lucide-react";

export default function Admin() {
  const [searchQuery, setSearchQuery] = useState("");
  const [params, setParams] = useState({ pageSize: 20, page: 1 });
  const {
    data: productsData,
    error: errorProducts,
    isLoading: isLoadingProducts,
  } = useSWR(
    `http://localhost:8080/api/product?page=${params.page}&pageSize=${params.pageSize}`,
    fetcher
  );

  const productList = useMemo(() => {
    return productsData
      ? {
          products: productsData.products,
          totalPages: productsData.totalPages,
          totalRecords: productsData.totalRecords,
        }
      : { products: [], totalPages: 0, totalRecords: 0 };
  }, [productsData]);

  const flattenedProducts = useMemo(() => {
    return (productList.products || []).map((product: any) => {
      const { category, ...rest } = product;
      return {
        ...rest,
        categoryName: category?.name,
      };
    });
  }, [productList]);

  const filteredProducts = useFilterProduct(searchQuery, flattenedProducts);
  const allPages = Array.from(
    { length: Number(productList.totalPages) },
    (_, i) => i + 1
  );

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
        <div>
          <select
            name="pageSize"
            className="brutalist-input-select"
            value={params.pageSize}
            onChange={(e) =>
              setParams((prevParams) => ({
                ...prevParams,
                pageSize: Number(e.target.value),
              }))
            }
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
        </div>
        <Link
          href="/admin/add"
          className="brutalist-button flex items-center gap-2"
        >
          Add Product <Plus className="w-4 h-4" />
        </Link>
      </div>
      <SortableTable
        data={filteredProducts}
        columns={columns}
        onDelete={deleteProductAction}
      />
      <div className="flex gap-2 text-gray-900 font-bold">
        {allPages.map((paginate, index) => (
          <div
            key={index}
            onClick={() =>
              setParams((prevParams) => ({
                ...prevParams,
                page: paginate,
              }))
            }
            className={`${
              paginate === params.page && "underline underline-offset-4"
            } hover:cursor-pointer`}
          >
            {paginate}
          </div>
        ))}
      </div>
    </div>
  );
}
