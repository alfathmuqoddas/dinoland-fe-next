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

export interface TProductFlattened extends TProduct {
  categoryName: string;
}

export interface TProductCategory {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}
