import type { TProduct } from "../product";
import type { TApiResponse } from "../api";

export type TMyBuild = {
  id: number;
  userId: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type TMyBuildResponse = TApiResponse<TMyBuild[]>;

export type TMyBuildDetailResponse = TApiResponse<TMyBuild>;

export type TMyBuildItem = {
  id: number;
  productId: number;
  buildId: number;
  createdAt: string;
  updatedAt: string;
  product: Pick<
    TProduct,
    "id" | "name" | "description" | "price" | "image" | "categoryId"
  >;
};

export type TMyBuildItemResponse = TApiResponse<TMyBuildItem[]>;
