export type ReservationStatus = 'Pending' | 'Confirmed' | 'Checked In' | 'Checked Out';

export interface ReservationRoom {
  id: number;
  room_id: number;
  room_number: string;
  price_per_night: number;
}

export interface ReservationService {
  id: number;
  service_id: number;
  service_name: string;
  quantity: number;
  total_price: number;
}

export interface Reservation {
  id: number;
  guest_id: number;
  guest_name: string;
  check_in_date: string;
  check_out_date: string;
  reservation_date: string;
  status: ReservationStatus;
  total_cost: number;
  branch_id: number;
  branch_name: string;
  rooms: ReservationRoom[];
  services: ReservationService[];
} 