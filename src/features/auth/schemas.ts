import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().pipe(z.email("Invalid email")),
  password: z.string(),
});

export const registerSchema = z.object({
  name: z.string(),
  email: z.string().trim().pipe(z.email("Invalid email")),
  password: z.string(),
});

export type LoginDTO = z.infer<typeof loginSchema>;
export type RegisterDTO = z.infer<typeof registerSchema>;
