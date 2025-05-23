import type { Branch } from "./branches";

export interface Employee {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  hire_date: string;
  position: string;
  branch: Branch;
}

export interface EmployeeFormData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  hire_date: Date;
  position: string;
  branch_id: string;
}
