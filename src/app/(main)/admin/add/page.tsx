"use client";
import { useActionState } from "react";
import { addProductAction } from "@/features/admin/actions";
import { TProductCategoryResponse } from "@/type/category";
import useSWR from "swr";
import { fetcher } from "@/features/fetcher";
import { useEffect } from "react";

export default function Add() {
  const [state, formAction, isPending] = useActionState(addProductAction, null);

  const { data: productCategories, isLoading: isLoadingCategories } =
    useSWR<TProductCategoryResponse>(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}productCategory`,
      fetcher,
    );

  useEffect(() => {
    if (state) {
      if (!state.success) {
        alert(state.message);
      }
    }
  }, [state]);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Add New Product</h1>
      <form action={formAction} className="flex flex-col gap-4">
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
        <select
          name="addProductCategoryId"
          className="brutalist-input-select text-black"
        >
          {isLoadingCategories ? (
            <option>Loading...</option>
          ) : (
            productCategories?.data?.map((category) => (
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
