import { z } from "zod";

const createUserZodSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
    phone: z.string(),
  }),
});

export const UserValidation = {
  createUserZodSchema,
};
