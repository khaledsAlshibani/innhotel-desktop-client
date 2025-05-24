import type { Branch } from "./branches";

export const Position = {
  Receptionist: 'Receptionist',
  Manager: 'Manager',
  Housekeeper: 'Housekeeper',
  Maintenance: 'Maintenance',
  Chef: 'Chef',
  Waiter: 'Waiter'
} as const;

export type Position = typeof Position[keyof typeof Position];

export interface Employee {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  hire_date: string;
  position: Position;
  branch: Branch;
}

export interface EmployeeFormData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  hire_date: string;
  position: Position;
  branch_id: number;
}

