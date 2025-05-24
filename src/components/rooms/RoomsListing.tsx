import type { RoomResponse } from "@/types/api/room";
import { RoomCard } from "./RoomCard";

interface RoomsListingProps {
  rooms: RoomResponse[];
  onRoomClick?: (room: RoomResponse) => void;
  isLoading?: boolean;
}

export const RoomsListing = ({ rooms, onRoomClick, isLoading }: RoomsListingProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
        {[...Array(8)].map((_, index) => (
          <div 
            key={index}
            className="h-[200px] rounded-lg bg-muted animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (rooms.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No rooms found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
      {rooms.map((room) => (
        <RoomCard
          key={room.id}
          room={room}
          onClick={onRoomClick}
        />
      ))}
    </div>
  );
};
