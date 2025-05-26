import type { AuthResponse, LoginCredentials } from '@/types/api/auth';
import axiosInstance from '../lib/axios';
import { isAxiosError } from 'axios';
import { logger } from '@/utils/logger';

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      logger().info('Attempting login', { email: credentials.email });
      const response = await axiosInstance.post('/auth/login', credentials);
      logger().info('Login successful');
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        logger().error('Login failed', {
          status: error.response?.status,
          message: error.response?.data?.message
        });
        throw new Error(error.response?.data?.message || 'Login failed');
      }
      throw error;
    }
  },

  refresh: async (): Promise<AuthResponse> => {
    try {
      logger().info('Attempting to refresh token');
      const response = await axiosInstance.post('/auth/refresh');
      logger().info('Token refresh successful');
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        logger().error('Token refresh failed', {
          status: error.response?.status,
          message: error.response?.data?.message
        });
        throw new Error(error.response?.data?.message || 'Token refresh failed');
      }
      throw error;
    }
  },

  logout: async (): Promise<void> => {
    try {
      const response = await axiosInstance.post('/auth/logout');
      logger().info('Logout successful');
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        logger().error('Logout failed', {
          status: error.response?.status,
          message: error.response?.data?.message
        });
        throw new Error(error.response?.data?.message || 'Logout failed');
      }
      throw error;
    }
  }
};
