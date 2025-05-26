import type { Pagination, UpdateResponse } from './global';

// Employee interface for creation
export interface Employee {
  firstName: string;
  lastName: string;
  branchId: number;
  hireDate: string; // DateOnly format: YYYY-MM-DD
  position: string;
  userId: string | null;
}

// Response of successful employee creation and getById
export interface EmployeeResponse {
  id: number;
  branchId: number;
  firstName: string;
  lastName: string;
  hireDate: string;
  position: string;
  userId: string | null;
}

// Response of successful get all employees
export interface EmployeesResponse extends Pagination {
  items: EmployeeResponse[];
}

// Response of successful employee update
export type UpdateEmployeeResponse = UpdateResponse<EmployeeResponse>;