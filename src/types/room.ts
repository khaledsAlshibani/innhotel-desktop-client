export type RoomStatus = 'Available' | 'Occupied' | 'Under Maintenance';

export type RoomType = 'Standard' | 'Deluxe' | 'Suite' | 'Presidential';

// Form data types
export type RoomFormValues = {
  room_number: string;
  room_type_id: string;
  status: string;
  floor: number;
  branch_id: string;
};

export interface RoomSubmitValues {
  branchId: number;
  roomTypeId: number;
  roomNumber: string;
  status: number;
  floor: number;
}

// Constants
export const roomStatusOptions = [
  { id: "0", name: "Available" },
  { id: "1", name: "Occupied" },
  { id: "2", name: "Under Maintenance" }
] as const;

export const roomTypeOptions = [
  { id: "1", name: "Standard" },
  { id: "2", name: "Suite" },
  { id: "3", name: "Deluxe" }
] as const;
