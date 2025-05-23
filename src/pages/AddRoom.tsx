import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import FormLayout from "@/layouts/FormLayout";
import { RoomForm } from "@/components/rooms/RoomForm";
import type { CreateRoomFormData } from "@/types/room";

const AddRoom = () => {
  const navigate = useNavigate();

  const handleSubmit = (data: CreateRoomFormData) => {
    console.log("New room data:", data);
    navigate(ROUTES.ROOMS);
  };

  return (
    <FormLayout
      title="Add New Room"
      description="Create a new room in your hotel branch."
    >
      <RoomForm onSubmit={handleSubmit} />
    </FormLayout>
  );
};

export default AddRoom;
