import { TApiResponse } from "../api";

export type TProductCategory = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type TProductCategoryResponse = TApiResponse<TProductCategory[]>;
