"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { TProduct } from "@/app/products/type";

interface CartItem extends TProduct {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: TProduct) => void;
  removeItem: (productId: number) => void;
  incrementQuantity: (productId: number) => void;
  decrementQuantity: (productId: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalQuantity: () => number;
}

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      //add items, if item already exists, increment quantity
      addItem: (product: TProduct) => {
        const existingItem = get().items.find((item) => item.id === product.id);
        if (existingItem) {
          set({
            items: get().items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({
            items: [...get().items, { ...product, quantity: 1 }],
          });
        }
      },
      //remove item, if quantity is 1, remove from cart
      removeItem: (productId: number) => {
        const existingItem = get().items.find((item) => item.id === productId);
        if (existingItem && existingItem.quantity > 1) {
          set({
            items: get().items.map((item) =>
              item.id === productId
                ? { ...item, quantity: item.quantity - 1 }
                : item
            ),
          });
        } else {
          set({
            items: get().items.filter((item) => item.id !== productId),
          });
        }
      },
      //increment quantity of item
      incrementQuantity: (productId: number) => {
        const existingItem = get().items.find((item) => item.id === productId);
        if (existingItem) {
          set({
            items: get().items.map((item) =>
              item.id === productId
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        }
      },
      //decrement quantity of item
      decrementQuantity: (productId: number) => {
        const existingItem = get().items.find((item) => item.id === productId);
        if (existingItem) {
          if (existingItem.quantity === 1) {
            set({ items: get().items.filter((item) => item.id !== productId) });
          } else {
            set({
              items: get().items.map((item) =>
                item.id === productId
                  ? { ...item, quantity: item.quantity - 1 }
                  : item
              ),
            });
          }
        }
      },
      clearCart: () => {
        set({ items: [] });
      },
      getTotalPrice: () => {
        return get().items.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
      },
      getTotalQuantity: () => {
        return get().items.reduce((acc, item) => acc + item.quantity, 0);
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCartStore;
