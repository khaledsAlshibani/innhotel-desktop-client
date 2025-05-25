import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { roomSchema } from "@/schemas/roomSchema";
import type { RoomFormValues } from "@/types/room";
import { roomStatusOptions, roomTypeOptions } from "@/types/room";

interface BaseRoomFormProps {
  defaultValues?: Partial<RoomFormValues>;
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

  const form = useForm<RoomFormValues>({
    resolver: zodResolver(roomSchema),
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

  const handleSubmit = (values: RoomFormValues) => {
    const submitValues = {
      branchId: parseInt(values.branch_id),
      roomTypeId: parseInt(values.room_type_id),
      roomNumber: values.room_number,
      status: parseInt(values.status),
      floor: values.floor
    };

    onSubmit(submitValues as any);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="room_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Room Number</FormLabel>
              <FormControl>
                <Input 
                  type="text"
                  placeholder="e.g. 101" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="room_type_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Room Type</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select room type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {roomTypeOptions.map((type) => (
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
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {roomStatusOptions.map((status) => (
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
          render={({ field }) => (
            <FormItem>
              <FormLabel>Floor</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  min="0"
                  max="100"
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
            render={({ field }) => (
              <FormItem>
                <FormLabel>Branch</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
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
