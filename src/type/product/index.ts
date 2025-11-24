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
