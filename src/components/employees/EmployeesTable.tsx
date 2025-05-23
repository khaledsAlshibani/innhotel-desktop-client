import { ChevronRight, Mail, Phone, Building2, Calendar } from "lucide-react";
import type { Employee } from "@/types/employee";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface EmployeesTableProps {
  employees: Employee[];
  onEmployeeClick?: (employee: Employee) => void;
}

export const EmployeesTable = ({ employees, onEmployeeClick }: EmployeesTableProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Branch</TableHead>
            <TableHead>Hire Date</TableHead>
            <TableHead className="w-[100px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id} className="cursor-pointer hover:bg-muted/50">
              <TableCell className="font-medium">
                <span>{employee.first_name} {employee.last_name}</span>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>{employee.phone}</span>
                  </div>
                  {employee.email && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      <span>{employee.email}</span>
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <Badge 
                  variant="outline" 
                  className="flex items-center gap-1.5 w-fit text-primary border-primary/20"
                >
                  {employee.position}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Building2 className="h-4 w-4" />
                  <span>{employee.branch.name}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{format(new Date(employee.hire_date), 'MMM d, yyyy')}</span>
                </div>
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEmployeeClick?.(employee)}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
