export type RoomStatus = 'Available' | 'Occupied' | 'Under Maintenance';

export type RoomType = 'Standard' | 'Deluxe' | 'Suite' | 'Presidential';

export interface Room {
  id: number;
  number: string;
  type: RoomType;
  status: RoomStatus;
  floor: number;
  branch_id: number;
  price_per_night: number;
}

export interface CreateRoomFormData {
  room_number: string;
  room_type_id: string;
  status: string;
  floor: number;
  branch_id: string;
}
