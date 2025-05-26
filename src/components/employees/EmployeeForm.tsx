import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Position } from "@/types/employee";
import type { BranchResponse } from "@/types/api/branch";
import { employeeSchema, type EmployeeFormData } from "@/schemas/employeeSchema";
import { branchService } from "@/services/branchService";
import { toast } from "sonner";

const positions = Object.values(Position);

interface EmployeeFormProps {
  onSubmit: (data: EmployeeFormData) => void;
  defaultValues?: Partial<EmployeeFormData>;
  isLoading?: boolean;
  mode?: 'create' | 'update';
}

export const EmployeeForm = ({ 
  onSubmit, 
  defaultValues,
  isLoading = false,
  mode = 'create'
}: EmployeeFormProps) => {
  const [branches, setBranches] = useState<BranchResponse[]>([]);
  const [isLoadingBranches, setIsLoadingBranches] = useState(true);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await branchService.getAll();
        setBranches(response.items);
      } catch (error) {
        toast.error("Failed to load branches");
        console.error("Failed to fetch branches:", error);
      } finally {
        setIsLoadingBranches(false);
      }
    };

    fetchBranches();
  }, []);

  const form = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      hire_date: new Date().toISOString().split('T')[0],
      position: Position.Receptionist,
      branch_id: 1,
      ...defaultValues
    },
  });

  const isUpdate = mode === 'update';

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-2xl">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name <span className="text-destructive">*</span></FormLabel>
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
                <FormLabel>Last Name <span className="text-destructive">*</span></FormLabel>
                <FormControl>
                  <Input placeholder="Enter last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="hire_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hire Date <span className="text-destructive">*</span></FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Position <span className="text-destructive">*</span></FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a position" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {positions.map((position) => (
                      <SelectItem key={position} value={position}>
                        {position}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="branch_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Branch <span className="text-destructive">*</span></FormLabel>
              <Select 
                onValueChange={(value) => field.onChange(Number(value))} 
                defaultValue={String(field.value)}
                disabled={isLoadingBranches}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={isLoadingBranches ? "Loading branches..." : "Select a branch"} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {branches.map((branch) => (
                    <SelectItem key={branch.id} value={String(branch.id)}>
                      {branch.name} - {branch.location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          className="w-full"
          disabled={isLoading || isLoadingBranches}
        >
          {isLoading
            ? isUpdate
              ? "Saving Changes..."
              : "Creating Employee..."
            : isUpdate
            ? "Save Changes"
            : "Create Employee"}
        </Button>
      </form>
    </Form>
  );
};
