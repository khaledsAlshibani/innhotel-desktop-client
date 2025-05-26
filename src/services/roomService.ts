import type { CreateRoomRequest, RoomResponse, RoomsResponse, UpdateRoomRequest, UpdateRoomResponse, CreateRoomResponse } from '@/types/api/room';
import type { DeleteResponse } from '@/types/api/global';
import axiosInstance from '../lib/axios';
import { isAxiosError } from 'axios';
import { logger } from '@/utils/logger';

export const roomService = {
  getAll: async (pageNumber = 1, pageSize = 10): Promise<RoomsResponse> => {
    try {
      logger().info('Fetching all rooms', { pageNumber, pageSize });
      const response = await axiosInstance.get('/rooms', {
        params: { pageNumber, pageSize }
      });
      logger().info('Successfully fetched all rooms');
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        logger().error('Failed to fetch rooms', {
          status: error.response?.status,
          message: error.response?.data?.message
        });
      }
      throw error;
    }
  },

  getById: async (id: number): Promise<RoomResponse> => {
    try {
      logger().info('Fetching room by ID', { id });
      const response = await axiosInstance.get(`/rooms/${id}`);
      logger().info('Successfully fetched room', { id });
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        logger().error('Failed to fetch room', {
          id,
          status: error.response?.status,
          message: error.response?.data?.message
        });
      }
      throw error;
    }
  },

  create: async (room: CreateRoomRequest): Promise<CreateRoomResponse> => {
    try {
      logger().info('Creating new room');
      const response = await axiosInstance.post('/rooms', room);
      logger().info('Successfully created room', { id: response.data.data.id });
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        logger().error('Failed to create room', {
          status: error.response?.status,
          message: error.response?.data?.message
        });
      }
      throw error;
    }
  },

  update: async (id: number, room: UpdateRoomRequest): Promise<UpdateRoomResponse> => {
    try {
      logger().info('Updating room', { id });
      const response = await axiosInstance.put(`/rooms/${id}`, room);
      logger().info('Successfully updated room', { id });
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        logger().error('Failed to update room', {
          id,
          status: error.response?.status,
          message: error.response?.data?.message
        });
      }
      throw error;
    }
  },

  delete: async (id: number): Promise<DeleteResponse> => {
    try {
      logger().info('Deleting room', { id });
      const response = await axiosInstance.delete(`/rooms/${id}`);
      logger().info('Successfully deleted room', { id });
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        logger().error('Failed to delete room', {
          id,
          status: error.response?.status,
          message: error.response?.data?.message
        });
      }
      throw error;
    }
  }
};