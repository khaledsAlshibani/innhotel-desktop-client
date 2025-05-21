import { BranchesTable } from "@/components/branches/BranchesTable";
import type { Branch } from "@/types/branches";
import branchesData from "@/mocks/branches.json";

const Branches = () => {
  const branches: Branch[] = branchesData.branches;

  const handleBranchClick = (branch: Branch) => {
    console.log("Branch clicked:", branch);
  };

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">Branches</h1>
        <p className="text-muted-foreground">
          View and manage all hotel branches in the system.
        </p>
      </div>

      <BranchesTable 
        branches={branches} 
        onBranchClick={handleBranchClick} 
      />
    </div>
  );
};

export default Branches;
