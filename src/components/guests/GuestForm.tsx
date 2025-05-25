import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import type { Guest } from "@/types/api/guest";
import { guestSchema, type GuestFormValues } from "@/schemas/guestSchema";

interface GuestFormProps {
  onSubmit: (data: Guest) => void;
  defaultValues?: Partial<GuestFormValues>;
  isLoading?: boolean;
  mode?: 'create' | 'update';
}

const ID_PROOF_TYPES = [
  { value: 'passport', label: 'Passport' },
  { value: 'national_id', label: 'National ID' },
  { value: 'drivers_license', label: "Driver's License" }
] as const;

export const GuestForm = ({
  onSubmit,
  defaultValues,
  isLoading = false,
  mode = 'create'
}: GuestFormProps) => {
  const form = useForm<GuestFormValues>({
    resolver: zodResolver(guestSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      id_proof_type: "passport",
      id_proof_number: "",
      email: "",
      phone: "",
      address: "",
      ...defaultValues
    },
  });

  const handleSubmit = async (data: GuestFormValues) => {
    try {
      const guestData: Guest = {
        firstName: data.first_name,
        lastName: data.last_name,
        idProofType: data.id_proof_type,
        idProofNumber: data.id_proof_number,
        email: data.email || "",
        phone: data.phone || "",
        address: data.address || ""
      };

      await onSubmit(guestData);
      if (mode === 'create') {
        form.reset();
      }
    } catch (error) {
      console.error("GuestForm submission failed:", error);
    }
  };

  const isUpdate = mode === 'update';

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter first name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter email address"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="Enter phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="id_proof_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ID Proof Type</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select ID proof type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {ID_PROOF_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="id_proof_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ID Proof Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter ID proof number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="Enter address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading
            ? isUpdate
              ? "Saving Changes..."
              : "Creating Guest..."
            : isUpdate
            ? "Save Changes"
            : "Create Guest"}
        </Button>
      </form>
    </Form>
  );
};
