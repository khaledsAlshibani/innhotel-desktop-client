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
import type { Branch } from "@/types/api/branch";

interface BranchFormProps {
  onSubmit: (data: Branch) => void;
  defaultValues?: Partial<Branch>;
  isLoading?: boolean;
  mode?: 'create' | 'update';
}

export const BranchForm = ({ 
  onSubmit, 
  defaultValues, 
  isLoading,
  mode = 'create' 
}: BranchFormProps) => {
  const form = useForm<Branch>({
    defaultValues: {
      name: "",
      location: "",
      ...defaultValues
    },
  });

  const handleSubmit = async (data: Branch) => {
    try {
      await onSubmit(data);
      if (mode === 'create') {
        form.reset();
      }
    } catch (error) {
      console.error('Form submission failed:', error);
    }
  };

  const isUpdate = mode === 'update';

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Branch Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter branch name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="Enter branch location" {...field} />
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
            ? (isUpdate ? "Saving Changes..." : "Creating Branch...") 
            : (isUpdate ? "Save Changes" : "Create Branch")
          }
        </Button>
      </form>
    </Form>
  );
};
