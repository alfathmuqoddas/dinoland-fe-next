export type TProduct = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
};

export type TProductCategory = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};
