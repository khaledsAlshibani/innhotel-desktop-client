import * as z from "zod";

export const employeeSchema = z.object({
  first_name: z.string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters"),
  last_name: z.string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters"),
  hire_date: z.string()
    .min(1, "Please select a hire date"),
  position: z.string()
    .min(1, "Please select a position"),
  branch_id: z.number({
    required_error: "Please select a branch",
    invalid_type_error: "Please select a branch",
  }),
});

export type EmployeeFormData = z.infer<typeof employeeSchema>;