export type TCartItem = {
  id: string;
  items: {
    name: string;
    description: string;
    price: number;
    image: string;
  };
  productId: number;
  quantity: number;
};
