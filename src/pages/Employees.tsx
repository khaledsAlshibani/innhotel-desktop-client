import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { EmployeesTable } from "@/components/employees/EmployeesTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserPlus, Search } from "lucide-react";
import type { EmployeeResponse } from "@/types/api/employee";
import { employeeService } from "@/services/employeeService";
import { RoleGuard } from "@/hooks/RoleGuard";
import { UserRole } from "@/types/api/user";
import { Pagination } from "@/components/pagination/Pagination";
import { PAGE_SIZE_OPTIONS } from "@/constants/pagination";

const Employees = () => {
  RoleGuard(UserRole.SuperAdmin);
  const navigate = useNavigate();
  const [employees, setEmployees] = useState<EmployeeResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setIsLoading(true);
        const response = await employeeService.getAll(currentPage, pageSize);
        setEmployees(response.items);
        setTotalPages(response.totalPages);
        setTotalCount(response.totalCount);
        setHasPreviousPage(response.hasPreviousPage);
        setHasNextPage(response.hasNextPage);
      } catch (error) {
        console.error("Failed to fetch employees:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployees();
  }, [currentPage, pageSize]);

  const filteredEmployees = employees.filter((employee) => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      employee.firstName.toLowerCase().includes(searchTerm) ||
      employee.lastName.toLowerCase().includes(searchTerm) ||
      employee.position.toLowerCase().includes(searchTerm) ||
      String(employee.branchId).includes(searchTerm)
    );
  });

  const handleEmployeeClick = (employee: EmployeeResponse) => {
    navigate(`/employees/${employee.id}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">Employees Management</h1>
          <p className="text-muted-foreground">
            View and manage employee information.
          </p>
        </div>
        <Button onClick={() => navigate(ROUTES.REGISTER_EMPLOYEE)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Register Employee
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search employees..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline">
          Filters
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center text-muted-foreground">Loading employees...</div>
      ) : (
        <>
          <EmployeesTable 
            employees={filteredEmployees}
            onEmployeeClick={handleEmployeeClick}
          />
          
          <Pagination
            currentPage={currentPage}
            pageSize={pageSize}
            totalPages={totalPages}
            totalCount={totalCount}
            hasPreviousPage={hasPreviousPage}
            hasNextPage={hasNextPage}
            pageSizeOptions={PAGE_SIZE_OPTIONS}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            itemName="employees"
          />
        </>
      )}
    </div>
  );
};

export default Employees;
