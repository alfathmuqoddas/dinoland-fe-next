import type { TApiResponse, TPaginatedResponse } from "../api";

export interface TProduct {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
}

export type TProductBodyRequest = Pick<
  TProduct,
  "name" | "price" | "description" | "image" | "categoryId"
>;

export interface TProductDTO {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
  category: { name: string };
}

export interface TProductFlattened extends TProduct {
  categoryName: string;
}

export type TProductResponse = TPaginatedResponse<"products", TProductDTO>;
export type TProductDetailResponse = TApiResponse<TProduct>;
