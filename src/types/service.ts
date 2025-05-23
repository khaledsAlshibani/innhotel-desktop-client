export interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  branch_id: number;
}

export interface RoomService {
  room_id: number;
  service_id: number;
  branch_id: number;
}

export interface ReservationService {
  reservation_service_id: number;
  reservation_id: number;
  service_id: number;
  quantity: number;
  total_price: number;
  branch_id: number;
}
