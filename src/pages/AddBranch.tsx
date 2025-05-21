import { BranchForm } from "@/components/branches/BranchForm";
import type { Branch } from "@/types/branches";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

const AddBranch = () => {
  const navigate = useNavigate();

  const handleSubmit = (data: Omit<Branch, 'id'>) => {
    console.log("New branch data:", data);
    navigate(ROUTES.BRANCHES);
  };

  return (
    <div className="w-full flex justify-center items-center h-full">
      <div className="space-y-10 w-[500px] max-w-full">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">Add New Branch</h1>
          <p className="text-muted-foreground">
            Create a new branch location for your hotel chain.
          </p>
        </div>

        <BranchForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default AddBranch;
