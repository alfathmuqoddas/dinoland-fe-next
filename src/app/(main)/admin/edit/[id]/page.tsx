"use client";
import useSWR from "swr";
import { useParams } from "next/navigation";
import { fetcher } from "@/actions/fetcher";
import { TProductCategory } from "@/lib/type/product";
import editProduct from "@/actions/admin/editProductActions";
import { useActionState } from "react";

export default function Edit() {
  const { id } = useParams();

  const {
    data: productData,
    error: errorProduct,
    isLoading: isLoadingProduct,
  } = useSWR(`http://localhost:8080/api/product/${id}`, fetcher);

  const {
    data: productCategories,
    error: errorCategories,
    isLoading: isLoadingCategories,
  } = useSWR(`http://localhost:8080/api/productCategory`, fetcher);

  const [state, editProductAction, isPending] = useActionState(
    editProduct,
    null
  );

  if (isLoadingProduct || isLoadingCategories) {
    return <p>Loading...</p>;
  }

  if (errorProduct || errorCategories) {
    return <p>Error loading data.</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
      <form action={editProductAction} className="flex flex-col gap-4">
        <input type="hidden" name="productId" value={id} />
        <input
          type="text"
          name="addProductName"
          placeholder="Name"
          className="brutalist-input"
          defaultValue={productData.name}
        />
        <input
          type="number"
          name="addProductPrice"
          placeholder="Price"
          className="brutalist-input"
          defaultValue={productData.price}
          step="any"
        />
        <input
          type="text"
          name="addProductDescription"
          placeholder="Description"
          className="brutalist-input"
          defaultValue={productData.description}
        />
        <select
          name="addProductCategoryId"
          className="brutalist-input-select"
          defaultValue={productData.categoryId.toString()}
        >
          {productCategories.map((category: TProductCategory) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="addProductImage"
          placeholder="Image"
          className="brutalist-input"
          defaultValue={productData.image}
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
