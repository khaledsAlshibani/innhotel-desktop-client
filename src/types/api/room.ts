import type { Pagination, UpdateResponse } from './global';

export const RoomStatus = {
  Available: 0,
  Occupied: 1,
  UnderMaintenance: 2
} as const;

export type RoomStatus = typeof RoomStatus[keyof typeof RoomStatus];

// Room interface for creation request
export interface CreateRoomRequest {
  branchId: number;
  roomTypeId: number;
  roomNumber: string;
  status: RoomStatus;
  floor: number;
}

// Room interface for update request
export interface UpdateRoomRequest {
  roomTypeId: number;
  roomNumber: string;
  status: RoomStatus;
  floor: number;
}

// Response of successful Room creation and getById
export interface RoomResponse {
  id: number;
  branchId: number;
  branchName: string;
  roomTypeId: number;
  roomTypeName: string;
  basePrice: number;
  capacity: number;
  roomNumber: string;
  status: RoomStatus;
  floor: number;
}

// Response of successful get all rooms
export interface RoomsResponse extends Pagination {
  items: RoomResponse[];
}

// Response of successful room creation
export type CreateRoomResponse = UpdateResponse<RoomResponse>;

// Response of successful room update
export type UpdateRoomResponse = UpdateResponse<RoomResponse>;