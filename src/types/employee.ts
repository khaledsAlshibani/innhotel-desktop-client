export type Position = 'Receptionist' | 'Manager' | 'Housekeeper' | 'Maintenance' | 'Chef' | 'Waiter';

export interface Branch {
  id: number;
  name: string;
  location: string;
}

export interface Employee {
  id: string;
  first_name: string;
  last_name: string;
  email?: string;
  phone: string;
  hire_date: string;
  position: Position;
  branch_id: number;
}

export type EmployeeFormData = Omit<Employee, 'id'>;
