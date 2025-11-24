export type TProductCategory = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type TProductCategoryResponse = {
  status: string;
  message: string;
  data: TProductCategory[];
};
