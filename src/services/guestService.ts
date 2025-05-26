import type { Guest, GuestResponse, GuestsResponse, UpdateGuestResponse } from '@/types/api/guest';
import type { DeleteResponse } from '@/types/api/global';
import axiosInstance from '../lib/axios';
import { isAxiosError } from 'axios';
import { logger } from '@/utils/logger';

export const guestService = {
  getAll: async (pageNumber?: number, pageSize?: number): Promise<GuestsResponse> => {
    try {
      logger().info('Fetching all guests', { pageNumber, pageSize });
      const params = new URLSearchParams();
      if (pageNumber) params.append('pageNumber', pageNumber.toString());
      if (pageSize) params.append('pageSize', pageSize.toString());
      
      const response = await axiosInstance.get(`/guests${params.toString() ? `?${params.toString()}` : ''}`);
      logger().info('Successfully fetched all guests');
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        logger().error('Failed to fetch guests', {
          status: error.response?.status,
          message: error.response?.data?.message,
        });
        throw new Error(error.response?.data?.message || 'Failed to fetch guests');
      }
      throw error;
    }
  },

  getById: async (id: number): Promise<GuestResponse> => {
    try {
      logger().info('Fetching guest by ID', { id });
      const response = await axiosInstance.get(`/guests/${id}`);
      logger().info('Successfully fetched guest', { id });
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        logger().error('Failed to fetch guest', {
          id,
          status: error.response?.status,
          message: error.response?.data?.message,
        });
        throw new Error(error.response?.data?.message || 'Failed to fetch guest');
      }
      throw error;
    }
  },

  create: async (guest: Guest): Promise<GuestResponse> => {
    try {
      logger().info('Creating new guest');
      const response = await axiosInstance.post('/guests', guest);
      logger().info('Successfully created guest', { id: response.data.id });
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        logger().error('Failed to create guest', {
          status: error.response?.status,
          message: error.response?.data?.message,
        });
        throw new Error(error.response?.data?.message || 'Failed to create guest');
      }
      throw error;
    }
  },

  update: async (id: number, guest: Guest): Promise<UpdateGuestResponse> => {
    try {
      logger().info('Updating guest', { id });
      const response = await axiosInstance.put(`/guests/${id}`, guest);
      logger().info('Successfully updated guest', { id });
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        logger().error('Failed to update guest', {
          id,
          status: error.response?.status,
          message: error.response?.data?.message,
        });
        throw new Error(error.response?.data?.message || 'Failed to update guest');
      }
      throw error;
    }
  },

  delete: async (id: number): Promise<DeleteResponse> => {
    try {
      logger().info('Deleting guest', { id });
      const response = await axiosInstance.delete(`/guests/${id}`);
      logger().info('Successfully deleted guest', { id });
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        logger().error('Failed to delete guest', {
          id,
          status: error.response?.status,
          message: error.response?.data?.message,
        });
        throw new Error(error.response?.data?.message || 'Failed to delete guest');
      }
      throw error;
    }
  },
};
