"use client";
import useSWR from "swr";
import { useParams } from "next/navigation";
import { fetcher } from "@/features/fetcher";
import { TProductCategoryResponse } from "@/type/category";
import { editProductAction } from "@/features/admin/actions";
import { useActionState } from "react";
import { TProductDetailResponse } from "@/type/product";

export default function Edit() {
  const { id } = useParams();

  const {
    data: productData,
    error: errorProduct,
    isLoading: isLoadingProduct,
  } = useSWR<TProductDetailResponse>(
    `http://localhost:8080/api/product/${id}`,
    fetcher,
  );

  const {
    data: productCategories,
    error: errorCategories,
    isLoading: isLoadingCategories,
  } = useSWR<TProductCategoryResponse>(
    `http://localhost:8080/api/productCategory`,
    fetcher,
  );

  const [state, formAction, isPending] = useActionState(
    editProductAction,
    null,
  );

  if (isLoadingProduct || isLoadingCategories) {
    return <p>Loading...</p>;
  }

  if (errorProduct || errorCategories) {
    return <p>Error loading data.</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Edit Product</h1>
      <form action={formAction} className="flex flex-col gap-4">
        <input type="hidden" name="productId" value={id} />
        <input
          type="text"
          name="addProductName"
          placeholder="Name"
          className="brutalist-input"
          defaultValue={productData?.data?.name}
        />
        <input
          type="number"
          name="addProductPrice"
          placeholder="Price"
          className="brutalist-input"
          defaultValue={productData?.data?.price}
          step="any"
        />
        <input
          type="text"
          name="addProductDescription"
          placeholder="Description"
          className="brutalist-input"
          defaultValue={productData?.data?.description}
        />
        <select
          name="addProductCategoryId"
          className="brutalist-input-select"
          defaultValue={productData?.data?.categoryId.toString()}
        >
          {isLoadingCategories ? (
            <option>Loading...</option>
          ) : (
            productCategories?.data?.map((category) => (
              <option key={category.id} value={category.id}>
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
          defaultValue={productData?.data?.image}
        />
        <button
          type="submit"
          className="brutalist-button w-full"
          disabled={isPending}
        >
          {isPending ? "Loading..." : "UPDATE"}
        </button>
        {state && <p>{state.message}</p>}
      </form>
    </div>
  );
}
