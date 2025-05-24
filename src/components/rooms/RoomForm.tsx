import { useForm } from "react-hook-form";
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
import { Button } from "@/components/ui/button";
import type { CreateRoomRequest, UpdateRoomRequest } from "@/types/api/room";
import { useState, useEffect } from "react";
import { branchService } from "@/services/branchService";
import { toast } from "sonner";

interface BaseRoomFormProps {
  defaultValues?: {
    room_number: string;
    room_type_id: string;
    status: string;
    floor: number;
    branch_id: string;
  };
  isLoading?: boolean;
}

interface CreateRoomFormProps extends BaseRoomFormProps {
  mode: 'create';
  onSubmit: (data: CreateRoomRequest) => void;
}

interface UpdateRoomFormProps extends BaseRoomFormProps {
  mode: 'update';
  onSubmit: (data: UpdateRoomRequest) => void;
}

type RoomFormProps = CreateRoomFormProps | UpdateRoomFormProps;

interface Branch {
  id: number;
  name: string;
}

export const RoomForm = ({ 
  onSubmit, 
  defaultValues,
  isLoading = false,
  mode 
}: RoomFormProps) => {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [isLoadingBranches, setIsLoadingBranches] = useState(false);

  const form = useForm({
    defaultValues: {
      room_number: "",
      room_type_id: "1",
      status: "0",
      floor: 1,
      branch_id: "",
      ...defaultValues
    }
  });

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        setIsLoadingBranches(true);
        const response = await branchService.getAll();
        setBranches(response.items.map(branch => ({
          id: branch.id,
          name: branch.name
        })));
      } catch (error) {
        console.error('Failed to fetch branches:', error);
        toast.error('Failed to load branches');
      } finally {
        setIsLoadingBranches(false);
      }
    };

    if (mode === 'create') {
      fetchBranches();
    }
  }, [mode]);

  const handleSubmit = (values: any) => {
    if (mode === 'create' && !values.branch_id) {
      form.setError('branch_id', { message: 'Branch is required' });
      return;
    }

    console.log("Form Values:", {
      room_number: values.room_number,
      room_type_id: values.room_type_id,
      status: values.status,
      floor: values.floor,
      branch_id: values.branch_id
    });

    const baseFormData = {
      roomNumber: String(values.room_number),
      roomTypeId: parseInt(values.room_type_id),
      status: parseInt(values.status),
      floor: values.floor,
    };

    const formData = mode === 'create' 
      ? { ...baseFormData, branchId: parseInt(values.branch_id) }
      : baseFormData;

    console.log("Final Form Data:", formData);
    console.log("Form Mode:", mode);

    onSubmit(formData as any);
  };

  const roomTypes = [
    { id: "1", name: "Standard" },
    { id: "2", name: "Suite" },
    { id: "3", name: "Deluxe" }
  ];

  const roomStatuses = [
    { id: "0", name: "Available" },
    { id: "1", name: "Occupied" },
    { id: "2", name: "Under Maintenance" }
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="room_number"
          rules={{ required: "Room number is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Room Number</FormLabel>
              <FormControl>
                <Input placeholder="e.g. 101" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="room_type_id"
          rules={{ required: "Room type is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Room Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select room type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {roomTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
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
          name="status"
          rules={{ required: "Status is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {roomStatuses.map((status) => (
                    <SelectItem key={status.id} value={status.id}>
                      {status.name}
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
          name="floor"
          rules={{ 
            required: "Floor is required",
            min: { value: 1, message: "Floor must be at least 1" }
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Floor</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  min="1" 
                  placeholder="Floor number" 
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {mode === 'create' && (
          <FormField
            control={form.control}
            name="branch_id"
            rules={{ required: "Branch is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Branch</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select branch" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {branches.map((branch) => (
                      <SelectItem key={branch.id} value={branch.id.toString()}>
                        {branch.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <Button type="submit" disabled={isLoading || isLoadingBranches}>
          {isLoading 
            ? (mode === 'update' ? "Saving Changes..." : "Creating Room...") 
            : (mode === 'update' ? "Save Changes" : "Create Room")
          }
        </Button>
      </form>
    </Form>
  );
};
