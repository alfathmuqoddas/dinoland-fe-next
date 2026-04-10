import { z } from "zod";

export const addNewBuildSchema = z.object({
  name: z.string().trim(),
  description: z.string().trim(),
});

export const editBuildSchema = z.object({
  name: z.string().trim(),
  description: z.string().trim(),
  buildId: z.string().trim(),
});

export type AddNewBuildDTO = z.infer<typeof addNewBuildSchema>;
export type EditBuildDTO = z.infer<typeof editBuildSchema>;
