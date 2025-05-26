import { ChevronRight, Building2, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import type { EmployeeResponse } from "@/types/api/employee";
import type { BranchResponse } from "@/types/api/branch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { branchService } from "@/services/branchService";

interface EmployeesTableProps {
  employees: EmployeeResponse[];
  onEmployeeClick?: (employee: EmployeeResponse) => void;
}

export const EmployeesTable = ({ employees, onEmployeeClick }: EmployeesTableProps) => {
  const [branches, setBranches] = useState<Record<number, BranchResponse>>({});

  useEffect(() => {
    const fetchBranches = async () => {
      const uniqueBranchIds = [...new Set(employees.map(emp => emp.branchId))];
      
      for (const branchId of uniqueBranchIds) {
        if (!branches[branchId]) {
          try {
            const branch = await branchService.getById(branchId);
            setBranches(prev => ({ ...prev, [branchId]: branch }));
          } catch (error) {
            console.error(`Failed to fetch branch ${branchId}:`, error);
          }
        }
      }
    };

    fetchBranches();
  }, [employees]);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Branch</TableHead>
            <TableHead>Hire Date</TableHead>
            <TableHead className="w-[100px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee) => (
            <TableRow 
              key={employee.id} 
              className="cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => onEmployeeClick?.(employee)}
            >
              <TableCell className="font-medium">
                <span>{employee.firstName} {employee.lastName}</span>
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
                  <span>{branches[employee.branchId]?.name || `Branch ${employee.branchId}`}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{format(new Date(employee.hireDate), 'MMM d, yyyy')}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <ChevronRight className="h-4 w-4 text-muted-foreground inline-block" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
