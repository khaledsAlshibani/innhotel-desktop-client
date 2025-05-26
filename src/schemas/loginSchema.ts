import { z } from "zod";

export const loginSchema = z.object({
  email: z.string()
    .min(1, "Email is required")
    .max(50, "Email cannot exceed 50 characters"),

  password: z.string()
    .min(1, "Password is required")
    .max(50, "Password cannot exceed 50 characters"),
});

export type loginFormValues = z.infer<typeof loginSchema>;