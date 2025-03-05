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

export interface TProductCategory {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface TMyBuild {
  id: number;
  name: string;
  description: string;
}

export interface TMyBuildItem {
  id: number;
  productId: number;
  buildId: number;
  createdAt: string;
  updatedAt: string;
  product: Pick<
    TProduct,
    "id" | "name" | "description" | "price" | "image" | "categoryId"
  >;
}
