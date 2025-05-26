import { z } from "zod";

export const guestSchema = z.object({
  first_name: z.string()
    .min(1, "First name is required")
    .max(50, "First name cannot exceed 50 characters"),

  last_name: z.string()
    .min(1, "Last name is required")
    .max(50, "Last name cannot exceed 50 characters"),

  gender: z.number().min(0).max(1),

  id_proof_type: z.number().min(0).max(2),

  id_proof_number: z.string()
    .min(1, "ID proof number is required")
    .max(50, "ID proof number cannot exceed 50 characters"),

  email: z.string()
    .email("Please enter a valid email address")
    .max(100, "Email cannot exceed 100 characters")
    .optional()
    .or(z.literal("")),

  phone: z.string()
    .max(20, "Phone number cannot exceed 20 characters")
    .regex(/^[\d\-\+\s]+$/, "Phone number can only contain numbers, spaces, + and -")
    .optional()
    .or(z.literal("")),

  address: z.string()
    .max(500, "Address cannot exceed 500 characters")
    .optional()
    .or(z.literal(""))
});

export type GuestFormValues = z.infer<typeof guestSchema>;