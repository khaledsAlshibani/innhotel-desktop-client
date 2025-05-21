import mockData from "@/mocks/rooms.json";
import type { Room, RoomStatus, RoomType } from "@/types/room";
import { RoomsListing } from "@/components/rooms/RoomsListing";

const isValidStatus = (status: string): status is RoomStatus => {
  return ['Available', 'Occupied', 'Under Maintenance'].includes(status);
};

const isValidType = (type: string): type is RoomType => {
  return ['Standard', 'Deluxe', 'Suite', 'Presidential'].includes(type);
};

const roomsData = {
  rooms: mockData.rooms.map(room => ({
    ...room,
    status: isValidStatus(room.status) ? room.status : 'Available',
    type: isValidType(room.type) ? room.type : 'Standard'
  })) as Room[]
};

const Rooms = () => {
  const handleRoomClick = (room: Room) => {
    console.log("Room clicked:", room);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">Rooms Management</h1>
        <p className="text-muted-foreground">Manage your hotel rooms and their status.</p>
      </div>

      <RoomsListing 
        rooms={roomsData.rooms} 
        onRoomClick={handleRoomClick}
      />
    </div>
  );
};

export default Rooms;
