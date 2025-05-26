import type { Pagination, UpdateResponse } from './global';

export type Gender = 0 | 1; // 0: Male, 1: Female
export type IdProofType = 0 | 1 | 2; // 0: Passport, 1: DriverLicense, 2: NationalId

// Guest interface for creation req and update
export interface Guest {
  firstName: string;
  lastName: string;
  gender: Gender;
  idProofType: IdProofType;
  idProofNumber: string;
  email?: string;
  phone?: string;
  address?: string;
}

// res of successful Guest creation and getById
export interface GuestResponse {
  id: number;
  firstName: string;
  lastName: string;
  gender: Gender;
  idProofType: IdProofType;
  idProofNumber: string;
  email?: string;
  phone?: string;
  address?: string;
}

// res of successful get all guests
export interface GuestsResponse extends Pagination {
  items: GuestResponse[];
}

// res of successful guest update
export type UpdateGuestResponse = UpdateResponse<GuestResponse>;

export interface GuestReq {
  firstName: string;
  lastName: string;
  gender: 'Male' | 'Female';
  idProofType: 'Passport' | 'DriverLicense' | 'NationalId';
  idProofNumber: string;
  email?: string;
  phone?: string;
  address?: string;
}