export type RoomStatus = 'Available' | 'Occupied' | 'Under Maintenance';

export type RoomType = 'Standard' | 'Deluxe' | 'Suite' | 'Presidential';

export interface Room {
  id: string;
  number: string;
  status: RoomStatus;
  type: RoomType;
  floor: number;
  branch?: string;
}

export interface CreateRoomFormData {
  room_number: string;
  room_type_id: RoomType;
  status: RoomStatus;
  floor: number;
  branch_id: string;
}
