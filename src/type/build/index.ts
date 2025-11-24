import type { TProduct } from "../product";

export type TMyBuild = {
  id: number;
  userId: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type TMyBuildResponse = {
  status: string;
  message: string;
  data: TMyBuild[];
};

export type TMyBuildDetailResponse = {
  status: string;
  message: string;
  data: TMyBuild;
};

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

export type TMyBuildItemResponse = {
  status: string;
  message: string;
  data: TMyBuildItem[];
};
