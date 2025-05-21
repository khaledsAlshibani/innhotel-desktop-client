import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { EmployeesTable } from "@/components/employees/EmployeesTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserPlus, Search } from "lucide-react";
import employeesData from "@/mocks/employees.json";
import type { Employee } from "@/types/employee";

const Employees = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const employees = (employeesData as { employees: Employee[] }).employees;

  const filteredEmployees = employees.filter((employee) => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      employee.first_name.toLowerCase().includes(searchTerm) ||
      employee.last_name.toLowerCase().includes(searchTerm) ||
      employee.email?.toLowerCase().includes(searchTerm) ||
      employee.phone.toLowerCase().includes(searchTerm) ||
      employee.position.toLowerCase().includes(searchTerm) ||
      employee.branch.name.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Employees</h2>
        <Button onClick={() => navigate(ROUTES.REGISTER_EMPLOYEE)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Register Employee
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search employees..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <EmployeesTable 
        employees={filteredEmployees}
        onEmployeeClick={(employee) => {
          console.log('Employee clicked:', employee);
        }}
      />
    </div>
  );
};

export default Employees;
