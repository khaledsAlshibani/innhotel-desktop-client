import { BranchForm } from "@/components/branches/BranchForm";
import type { Branch } from "@/types/api/branch";
import { useNavigate } from "react-router-dom";
import FormLayout from "@/layouts/FormLayout";
import { branchService } from "@/services/branchService";
import { useState } from "react";
import { toast } from "sonner";
import { RoleGuard } from "@/hooks/RoleGuard";
import { UserRole } from "@/types/api/user";

const AddBranch = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  RoleGuard(UserRole.SuperAdmin);

  const handleSubmit = async (data: Branch) => {
    try {
      setIsLoading(true);
      await branchService.create(data);
      toast.success('Branch created successfully');
      navigate(-1);
    } catch (error) {
      console.error('Failed to create branch:', error);
      toast.error('Failed to create branch');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormLayout
      title="Add New Branch"
      description="Create a new branch location for your hotel chain."
    >
      <BranchForm onSubmit={handleSubmit} isLoading={isLoading} />
    </FormLayout>
  );
};

export default AddBranch;
