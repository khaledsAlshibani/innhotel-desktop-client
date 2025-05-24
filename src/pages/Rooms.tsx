import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { RoomResponse } from "@/types/api/room";
import { RoomsListing } from "@/components/rooms/RoomsListing";
import { roomService } from "@/services/roomService";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { toast } from "sonner";

const Rooms = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<RoomResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setIsLoading(true);
        const response = await roomService.getAll();
        setRooms(response.items);
      } catch (error) {
        console.error('Failed to fetch rooms:', error);
        toast.error('Failed to load rooms');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const handleRoomClick = (room: RoomResponse) => {
    navigate(`${ROUTES.ROOMS}/${room.id}`);
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Rooms Management</h1>
          <p className="text-muted-foreground">Manage your hotel rooms and their status.</p>
        </div>
        <Button 
          onClick={() => navigate(ROUTES.ADD_ROOM)} 
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Room
        </Button>
      </div>

      <RoomsListing 
        rooms={rooms} 
        onRoomClick={handleRoomClick}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Rooms;
