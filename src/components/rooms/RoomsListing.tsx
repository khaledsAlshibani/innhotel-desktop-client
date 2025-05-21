import type { Room } from "@/types/room";
import { RoomCard } from "./RoomCard";

interface RoomsListingProps {
  rooms: Room[];
  onRoomClick?: (room: Room) => void;
}

export const RoomsListing = ({ rooms, onRoomClick }: RoomsListingProps) => {
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
