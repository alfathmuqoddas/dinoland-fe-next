import { z } from "zod";

export const addProductSchema = z.object({
  name: z.string().trim(),
  price: z.number().min(0),
  description: z.string().trim(),
  image: z.string().trim(),
  categoryId: z.number().min(0),
});

export const editProductSchema = z.object({
  name: z.string().trim(),
  price: z.number().min(0),
  description: z.string().trim(),
  image: z.string().trim(),
  categoryId: z.number().min(0),
  productId: z.string().trim(),
});

export type AddProductDTO = z.infer<typeof addProductSchema>;
export type EditProductDTO = z.infer<typeof editProductSchema>;
