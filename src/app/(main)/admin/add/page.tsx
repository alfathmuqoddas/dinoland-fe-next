"use client";
import { useActionState, useState, useEffect } from "react";
import addProduct from "@/actions/admin/addProductActions";

export default function Add() {
  const [state, addProductAction, isPending] = useActionState(addProduct, null);

  type Category = {
    id: number;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  };

  const [productCategories, setProductCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/productCategory"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const json = await response.json();
        setProductCategories(json);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div>
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
          {productCategories.map((category) => (
            <option
              key={category.id}
              value={category.id}
              className="text-black"
            >
              {category.name}
            </option>
          ))}
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
