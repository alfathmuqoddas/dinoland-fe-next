import type { TApiResponse } from "../api";

export type TCartItem = {
  id: string;
  userId: number;
  productId: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  items: {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
  };
};

export type TCartResponse = TApiResponse<{
  totalPrice: number;
  totalQuantity: number;
  cartItem: TCartItem[];
}>;
