import type { Pagination, UpdateResponse } from './global';

// Room in a reservation
export interface ReservationRoom {
  roomId: number;
  pricePerNight: number;
}

// Service in a reservation
export interface ReservationService {
  serviceId: number;
  quantity: number;
  unitPrice: number;
}

// Reservation interface for creation
export interface Reservation {
  guestId: number;
  checkInDate: string; // DateOnly format: YYYY-MM-DD
  checkOutDate: string; // DateOnly format: YYYY-MM-DD
  rooms: ReservationRoom[];
  services: ReservationService[];
  status?: 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed';
}

// Response of successful reservation creation and getById
export interface ReservationResponse extends Reservation {
  id: number;
  reservationDate: string; // DateTime format
  totalCost: number;
}

// Response of successful get all reservations
export interface ReservationsResponse extends Pagination {
  items: ReservationResponse[];
}

// Response of successful reservation update
export type UpdateReservationResponse = UpdateResponse<ReservationResponse>;