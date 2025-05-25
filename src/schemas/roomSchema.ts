import { z } from "zod";

const roomSchema = z.object({
  branch_id: z.string()
    .min(1, "Please select a branch")
    .refine((val) => parseInt(val) > 0, {
      message: "Invalid branch selection. Please choose a valid branch"
    }),
  room_type_id: z.string()
    .min(1, "Please select a room type")
    .refine((val) => parseInt(val) > 0, {
      message: "Invalid room type selection. Please choose a valid room type"
    }),
  room_number: z.string()
    .min(1, "Room number is a required field")
    .max(20, "Room number must be less than 20 digits")
    .refine((val) => /^\d+$/.test(val), {
      message: "Room number can only contain numeric digits (0-9)"
    })
    .refine((val) => parseInt(val) > 0, {
      message: "Room number must be a positive number greater than zero"
    }),
  status: z.string()
    .min(1, "Please select a room status"),
  floor: z.number()
    .min(0, "Floor number cannot be negative")
    .max(100, "Floor number cannot exceed 100"),
});

export type RoomFormValues = z.infer<typeof roomSchema>;

export { roomSchema };