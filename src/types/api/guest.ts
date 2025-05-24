import type { Pagination, UpdateResponse } from './global';

// Guest interface for creation req and update
export interface Guest {
  firstName: string;
  lastName: string;
  idProofType: string;
  idProofNumber: string;
  email: string;
  phone: string;
  address: string;
}

// res of successful Guest creation and getById
export interface GuestResponse extends Guest {
  id: number;
}

// res of successful get all guests
export interface GuestsResponse extends Pagination {
  items: GuestResponse[];
}

// res of successful guest update
export type UpdateGuestResponse = UpdateResponse<GuestResponse>;