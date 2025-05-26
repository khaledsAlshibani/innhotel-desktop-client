import type { Branch, BranchResponse, BranchesResponse, UpdateBranchResponse } from '@/types/api/branch';
import type { DeleteResponse } from '@/types/api/global';
import axiosInstance from '../lib/axios';
import { isAxiosError } from 'axios';
import { logger } from '@/utils/logger';

export const branchService = {
  getAll: async (pageNumber = 1, pageSize = 10): Promise<BranchesResponse> => {
    try {
      logger().info('Fetching all branches', { pageNumber, pageSize });
      const response = await axiosInstance.get('/branches', {
        params: { pageNumber, pageSize }
      });
      logger().info('Successfully fetched all branches');
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        logger().error('Failed to fetch branches', {
          status: error.response?.status,
          message: error.response?.data?.message
        });
        throw new Error(error.response?.data?.message || 'Failed to fetch branches');
      }
      throw error;
    }
  },

  getById: async (id: number): Promise<BranchResponse> => {
    try {
      logger().info('Fetching branch by ID', { id });
      const response = await axiosInstance.get(`/branches/${id}`);
      logger().info('Successfully fetched branch', { id });
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        logger().error('Failed to fetch branch', {
          id,
          status: error.response?.status,
          message: error.response?.data?.message
        });
        throw new Error(error.response?.data?.message || 'Failed to fetch branch');
      }
      throw error;
    }
  },

  create: async (branch: Branch): Promise<BranchResponse> => {
    try {
      logger().info('Creating new branch');
      const response = await axiosInstance.post('/branches', branch);
      logger().info('Successfully created branch', { id: response.data.id });
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        logger().error('Failed to create branch', {
          status: error.response?.status,
          message: error.response?.data?.message
        });
        throw new Error(error.response?.data?.message || 'Failed to create branch');
      }
      throw error;
    }
  },

  update: async (id: number, branch: Branch): Promise<UpdateBranchResponse> => {
    try {
      logger().info('Updating branch', { id });
      const response = await axiosInstance.put(`/branches/${id}`, branch);
      logger().info('Successfully updated branch', { id });
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        logger().error('Failed to update branch', {
          id,
          status: error.response?.status,
          message: error.response?.data?.message
        });
        throw new Error(error.response?.data?.message || 'Failed to update branch');
      }
      throw error;
    }
  },

  delete: async (id: number): Promise<DeleteResponse> => {
    try {
      logger().info('Deleting branch', { id });
      const response = await axiosInstance.delete(`/branches/${id}`);
      logger().info('Successfully deleted branch', { id });
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        logger().error('Failed to delete branch', {
          id,
          status: error.response?.status,
          message: error.response?.data?.message
        });
        throw new Error(error.response?.data?.message || 'Failed to delete branch');
      }
      throw error;
    }
  }
};