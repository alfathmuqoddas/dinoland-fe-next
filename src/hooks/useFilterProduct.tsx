"use client";

import { useState, useEffect } from "react";
import { TProductFlattened } from "@/lib/type/product";
import useDebounce from "./useDebounce";

export const useFilterProduct = (
  searchQuery: string,
  products: TProductFlattened[]
) => {
  const [filteredProductsData, setFilteredProductsData] = useState<
    TProductFlattened[]
  >([]);
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  //filter products by product name or category name
  useEffect(() => {
    if (debouncedSearchQuery) {
      const filteredProducts = products.filter((product) => {
        const nameMateches = product.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const categoryNameMatches = product.categoryName
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        return nameMateches || categoryNameMatches;
      });
      setFilteredProductsData(filteredProducts);
    } else {
      setFilteredProductsData(products);
    }
  }, [debouncedSearchQuery, products]);

  return filteredProductsData;
};
