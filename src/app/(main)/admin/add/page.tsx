"use client";
import { useActionState, useState, useEffect } from "react";
import addProduct from "@/actions/admin/addProductActions";
import { TProductCategory } from "@/lib/type/product";
import useSWR from "swr";
import { fetcher } from "@/actions/fetcher";

export default function Add() {
  const [state, addProductAction, isPending] = useActionState(addProduct, null);

  const {
    data: productCategories,
    error: errorCategories,
    isLoading: isLoadingCategories,
  } = useSWR(`http://localhost:8080/api/productCategory`, fetcher);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
      <form action={addProductAction} className="flex flex-col gap-4">
        <input
          type="text"
          name="addProductName"
          placeholder="Name"
          className="brutalist-input"
        />
        <input
          type="number"
          name="addProductPrice"
          placeholder="Price"
          className="brutalist-input"
        />
        <input
          type="text"
          name="addProductDescription"
          placeholder="Description"
          className="brutalist-input"
        />
        <select name="addProductCategoryId" className="text-black">
          {isLoadingCategories ? (
            <option>Loading...</option>
          ) : (
            productCategories.map((category: TProductCategory) => (
              <option
                key={category.id}
                value={category.id}
                className="text-black"
              >
                {category.name}
              </option>
            ))
          )}
        </select>
        <input
          type="text"
          name="addProductImage"
          placeholder="Image"
          className="brutalist-input"
        />
        <button
          type="submit"
          className="brutalist-button w-full"
          disabled={isPending}
        >
          {isPending ? "Loading..." : "ADD"}
        </button>
        {state && <p>{state.message}</p>}
      </form>
    </div>
  );
}
