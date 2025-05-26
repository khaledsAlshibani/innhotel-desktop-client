import type { 
  Employee, 
  EmployeeResponse, 
  EmployeesResponse, 
  UpdateEmployeeResponse 
} from '@/types/api/employee';
import type { DeleteResponse } from '@/types/api/global';
import axiosInstance from '../lib/axios';
import { isAxiosError } from 'axios';
import { logger } from '@/utils/logger';

export const employeeService = {
  getAll: async (pageNumber = 1, pageSize = 10): Promise<EmployeesResponse> => {
    try {
      logger().info('Fetching all employees', { pageNumber, pageSize });
      const response = await axiosInstance.get('/employees', {
        params: { pageNumber, pageSize }
      });
      logger().info('Successfully fetched all employees');
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        logger().error('Failed to fetch employees', {
          status: error.response?.status,
          message: error.response?.data?.message
        });
        throw new Error(error.response?.data?.message || 'Failed to fetch employees');
      }
      throw error;
    }
  },

  getById: async (id: number): Promise<EmployeeResponse> => {
    try {
      logger().info('Fetching employee by ID', { id });
      const response = await axiosInstance.get(`/employees/${id}`);
      logger().info('Successfully fetched employee', { id });
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        logger().error('Failed to fetch employee', {
          id,
          status: error.response?.status,
          message: error.response?.data?.message
        });
        throw new Error(error.response?.data?.message || 'Failed to fetch employee');
      }
      throw error;
    }
  },

  create: async (employee: Employee): Promise<EmployeeResponse> => {
    try {
      logger().info('Creating new employee');
      const response = await axiosInstance.post('/employees', employee);
      logger().info('Successfully created employee', { id: response.data.id });
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        logger().error('Failed to create employee', {
          status: error.response?.status,
          message: error.response?.data?.message
        });
        throw new Error(error.response?.data?.message || 'Failed to create employee');
      }
      throw error;
    }
  },

  update: async (id: number, employee: Partial<Employee>): Promise<UpdateEmployeeResponse> => {
    try {
      logger().info('Updating employee', { id });
      const response = await axiosInstance.put(`/employees/${id}`, employee);
      logger().info('Successfully updated employee', { id });
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        logger().error('Failed to update employee', {
          id,
          status: error.response?.status,
          message: error.response?.data?.message
        });
        throw new Error(error.response?.data?.message || 'Failed to update employee');
      }
      throw error;
    }
  },

  delete: async (id: number): Promise<DeleteResponse> => {
    try {
      logger().info('Deleting employee', { id });
      const response = await axiosInstance.delete(`/employees/${id}`);
      logger().info('Successfully deleted employee', { id });
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        logger().error('Failed to delete employee', {
          id,
          status: error.response?.status,
          message: error.response?.data?.message
        });
        throw new Error(error.response?.data?.message || 'Failed to delete employee');
      }
      throw error;
    }
  }
};