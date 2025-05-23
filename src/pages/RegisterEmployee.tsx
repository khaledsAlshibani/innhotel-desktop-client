import type { EmployeeFormData } from "@/types/employee";
import { EmployeeForm } from "@/components/employees/EmployeeForm";
import FormLayout from "@/layouts/FormLayout";

const RegisterEmployee = () => {
  const handleSubmit = (data: EmployeeFormData) => {
    console.log(data);
  };

  return (
    <FormLayout
      title="Register New Employee"
      description="Add a new employee to the system."
    >
      <EmployeeForm onSubmit={handleSubmit} />
    </FormLayout>
  );
};

export default RegisterEmployee;
