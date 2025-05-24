import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { Guest } from "@/types/api/guest";

interface GuestFormProps {
  onSubmit: (data: Guest) => void;
  defaultValues?: Partial<Guest>;
  isLoading?: boolean;
  mode?: 'create' | 'update';
}

export const GuestForm = ({
  onSubmit,
  defaultValues,
  isLoading = false,
  mode = 'create'
}: GuestFormProps) => {
  const form = useForm<Guest>({
    defaultValues: {
      firstName: "",
      lastName: "",
      idProofType: "",
      idProofNumber: "",
      email: "",
      phone: "",
      address: "",
      ...defaultValues
    },
  });

  const handleSubmit = async (data: Guest) => {
    try {
      await onSubmit(data);
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
        <FormField
          control={form.control}
          name="firstName"
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
          name="lastName"
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

        <FormField
          control={form.control}
          name="idProofType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ID Proof Type</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Passport, Driver’s License" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="idProofNumber"
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
