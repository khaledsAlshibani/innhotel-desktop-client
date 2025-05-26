import type { 
  Reservation, 
  ReservationResponse, 
  ReservationsResponse, 
  UpdateReservationResponse 
} from '@/types/api/reservation';
import type { DeleteResponse } from '@/types/api/global';
import axiosInstance from '../lib/axios';
import { isAxiosError } from 'axios';
import { logger } from '@/utils/logger';

export const reservationService = {
  getAll: async (pageNumber = 1, pageSize = 10): Promise<ReservationsResponse> => {
    try {
      logger().info('Fetching all reservations', { pageNumber, pageSize });
      const response = await axiosInstance.get('/reservations', {
        params: { pageNumber, pageSize }
      });
      logger().info('Successfully fetched all reservations');
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        logger().error('Failed to fetch reservations', {
          status: error.response?.status,
          message: error.response?.data?.message
        });
        throw new Error(error.response?.data?.message || 'Failed to fetch reservations');
      }
      throw error;
    }
  },

  getById: async (id: number): Promise<ReservationResponse> => {
    try {
      logger().info('Fetching reservation by ID', { id });
      const response = await axiosInstance.get(`/reservations/${id}`);
      logger().info('Successfully fetched reservation', { id });
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        logger().error('Failed to fetch reservation', {
          id,
          status: error.response?.status,
          message: error.response?.data?.message
        });
        throw new Error(error.response?.data?.message || 'Failed to fetch reservation');
      }
      throw error;
    }
  },

  create: async (reservation: Reservation): Promise<ReservationResponse> => {
    try {
      logger().info('Creating new reservation');
      const response = await axiosInstance.post('/reservations', reservation);
      logger().info('Successfully created reservation', { id: response.data.id });
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        logger().error('Failed to create reservation', {
          status: error.response?.status,
          message: error.response?.data?.message
        });
        throw new Error(error.response?.data?.message || 'Failed to create reservation');
      }
      throw error;
    }
  },

  update: async (id: number, reservation: Partial<Reservation>): Promise<UpdateReservationResponse> => {
    try {
      logger().info('Updating reservation', { id });
      const response = await axiosInstance.put(`/reservations/${id}`, reservation);
      logger().info('Successfully updated reservation', { id });
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        logger().error('Failed to update reservation', {
          id,
          status: error.response?.status,
          message: error.response?.data?.message
        });
        throw new Error(error.response?.data?.message || 'Failed to update reservation');
      }
      throw error;
    }
  },

  delete: async (id: number): Promise<DeleteResponse> => {
    try {
      logger().info('Deleting reservation', { id });
      const response = await axiosInstance.delete(`/reservations/${id}`);
      logger().info('Successfully deleted reservation', { id });
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        logger().error('Failed to delete reservation', {
          id,
          status: error.response?.status,
          message: error.response?.data?.message
        });
        throw new Error(error.response?.data?.message || 'Failed to delete reservation');
      }
      throw error;
    }
  }
};