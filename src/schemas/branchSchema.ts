import { z } from "zod";

export const branchSchema = z.object({
  name: z.string()
    .min(1, "Branch name is required")
    .min(2, "Branch name must be at least 2 characters")
    .max(100, "Branch name must not exceed 100 characters"),

  location: z.string()
    .min(1, "Location is required")
    .min(2, "Location must be at least 2 characters")
    .max(200, "Location must not exceed 200 characters")
});

export type BranchFormValues = z.infer<typeof branchSchema>;