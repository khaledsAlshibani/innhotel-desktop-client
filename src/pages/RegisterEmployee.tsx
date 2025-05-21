import type { EmployeeFormData } from "@/types/employee";
import { EmployeeForm } from "@/components/employees/EmployeeForm";

const RegisterEmployee = () => {
  const handleSubmit = (data: EmployeeFormData) => {
    console.log(data);
  };

  return (
    <div className="w-full flex justify-center items-center h-full">
      <div className="space-y-10 w-[500px] max-w-full">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">Register New Employee</h1>
          <p className="text-muted-foreground">Add a new employee to the system.</p>
        </div>

        <EmployeeForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default RegisterEmployee;
