import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { EmployeeForm } from "@/components/employees/EmployeeForm";
import type { Employee, EmployeeResponse } from "@/types/api/employee";
import { employeeService } from "@/services/employeeService";
import { ROUTES } from "@/constants/routes";
import { Button } from "@/components/ui/button";
import { User, Building2, Calendar, Trash } from "lucide-react";
import { CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { DeleteConfirmationDialog } from "@/components/Dialog/DeleteConfirmationDialog";
import SingleItemLayout from "@/layouts/SingleItemLayout";
import { format } from "date-fns";
import type { EmployeeFormData } from "@/schemas/employeeSchema";
import { RoleGuard } from "@/hooks/RoleGuard";
import { UserRole } from "@/types/api/user";

const EmployeeDetails = () => {
  RoleGuard(UserRole.SuperAdmin);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState<EmployeeResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    const fetchEmployee = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        const data = await employeeService.getById(parseInt(id));
        setEmployee(data);
      } catch (error) {
        console.error('Failed to fetch employee:', error);
        navigate(ROUTES.EMPLOYEES);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployee();
  }, [id, navigate]);

  const handleUpdate = async (formData: EmployeeFormData) => {
    if (!id || !employee) return;

    const employeeData: Employee = {
      firstName: formData.first_name,
      lastName: formData.last_name,
      branchId: formData.branch_id,
      hireDate: formData.hire_date,
      position: formData.position,
      userId: employee.userId // Keep the existing userId
    };

    try {
      setIsUpdating(true);
      const response = await employeeService.update(parseInt(id), employeeData);
      setEmployee(response.data);
      toast.success('Employee updated successfully');
    } catch (error) {
      console.error('Failed to update employee:', error);
      toast.error('Failed to update employee');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await employeeService.delete(parseInt(id!));
      toast.success('Employee deleted successfully');
      navigate(ROUTES.EMPLOYEES);
    } catch (error) {
      console.error('Failed to delete employee:', error);
      toast.error('Failed to delete employee');
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  if (isLoading || !employee) {
    return <div className="text-center">Loading employee details...</div>;
  }

  const deleteButton = (
    <Button
      variant="destructive"
      className="gap-2"
      onClick={() => setShowDeleteDialog(true)}
      disabled={isDeleting}
    >
      <Trash className="h-4 w-4" />
      Delete Employee
    </Button>
  );

  const employeeOverview = (
    <>
      <CardTitle className="flex items-center gap-2">
        <User className="h-5 w-5" />
        {employee.firstName} {employee.lastName}
      </CardTitle>
      <div className="flex flex-col gap-1">
        <CardDescription className="flex items-center gap-2">
          <Building2 className="h-4 w-4" />
          Branch ID: {employee.branchId}
        </CardDescription>
        <CardDescription className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          Hired on {format(new Date(employee.hireDate), 'MMMM d, yyyy')}
        </CardDescription>
      </div>
    </>
  );

  return (
    <>
      <SingleItemLayout
        title="Employee Details"
        description="View and manage employee information"
        backHref={ROUTES.EMPLOYEES}
        onBackClick={() => navigate(ROUTES.EMPLOYEES)}
        actionButton={deleteButton}
        overview={employeeOverview}
      >
        <EmployeeForm
          onSubmit={handleUpdate}
          defaultValues={{
            first_name: employee.firstName,
            last_name: employee.lastName,
            branch_id: employee.branchId,
            hire_date: employee.hireDate,
            position: employee.position
          }}
          isLoading={isUpdating}
          mode="update"
        />
      </SingleItemLayout>

      <DeleteConfirmationDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
        title="Delete Employee"
        description="Are you sure you want to delete this employee? This action cannot be undone."
        isDeleting={isDeleting}
      />
    </>
  );
};

export default EmployeeDetails;