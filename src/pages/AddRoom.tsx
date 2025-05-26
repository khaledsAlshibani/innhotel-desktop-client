import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormLayout from "@/layouts/FormLayout";
import { RoomForm } from "@/components/rooms/RoomForm";
import type { CreateRoomRequest } from "@/types/api/room";
import { roomService } from "@/services/roomService";
import { toast } from "sonner";
import { AxiosError } from "axios";

const AddRoom = () => {
  const navigate = useNavigate();
  const [isCreating, setIsCreating] = useState(false);

  const handleSubmit = async (data: CreateRoomRequest) => {
    try {
      setIsCreating(true);
      await roomService.create(data);
      toast.success('Room created successfully');
      navigate(-1);
    } catch (error) {
      console.error('Failed to create room:', error);
      if (error instanceof AxiosError) {
        switch (error.response?.status) {
          case 400:
            toast.error('Validation Error', {
              description: 'Either the room number already exists or the room type is not available in this branch.'
            });
            break;
          case 404:
            toast.error('Room Type Not Found', {
              description: 'The selected room type no longer exists.'
            });
            break;
          default:
            toast.error('Operation Failed', {
              description: 'Unable to create room. Please try again.'
            });
        }
      } else {
        toast.error('Operation Failed', {
          description: 'Unable to create room. Please try again.'
        });
      }
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <FormLayout
      title="Add New Room"
      description="Create a new room in your hotel branch."
    >
      <RoomForm 
        onSubmit={handleSubmit} 
        isLoading={isCreating}
        mode="create"
      />
    </FormLayout>
  );
};

export default AddRoom;
