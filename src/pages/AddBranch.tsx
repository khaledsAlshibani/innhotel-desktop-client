import { BranchForm } from "@/components/branches/BranchForm";
import type { Branch } from "@/types/branches";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import FormLayout from "@/layouts/FormLayout";

const AddBranch = () => {
  const navigate = useNavigate();

  const handleSubmit = (data: Omit<Branch, 'id'>) => {
    console.log("New branch data:", data);
    navigate(ROUTES.BRANCHES);
  };

  return (
    <FormLayout
      title="Add New Branch"
      description="Create a new branch location for your hotel chain."
    >
      <BranchForm onSubmit={handleSubmit} />
    </FormLayout>
  );
};

export default AddBranch;
