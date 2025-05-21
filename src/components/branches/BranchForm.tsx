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
import type { Branch } from "@/types/branches";

type BranchFormData = Omit<Branch, 'id'>;

interface BranchFormProps {
  onSubmit: (data: BranchFormData) => void;
  defaultValues?: Partial<BranchFormData>;
}

export const BranchForm = ({ onSubmit, defaultValues }: BranchFormProps) => {
  const form = useForm<BranchFormData>({
    defaultValues: {
      name: "",
      location: "",
      rooms_count: 0,
      ...defaultValues
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

        <FormField
          control={form.control}
          name="rooms_count"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Rooms</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  min={0}
                  placeholder="Enter number of rooms" 
                  {...field}
                  onChange={e => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Save Branch
        </Button>
      </form>
    </Form>
  );
};
