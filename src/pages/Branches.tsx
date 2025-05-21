import { BranchesTable } from "@/components/branches/BranchesTable";
import type { Branch } from "@/types/branches";
import branchesData from "@/mocks/branches.json";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

const Branches = () => {
  const navigate = useNavigate();
  const branches: Branch[] = branchesData.branches;

  const handleBranchClick = (branch: Branch) => {
    console.log("Branch clicked:", branch);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">Branches Management</h1>
          <p className="text-muted-foreground">
            View and manage hotel branch locations.
          </p>
        </div>
        <Button onClick={() => navigate(ROUTES.ADD_BRANCH)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Branch
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search branches..."
            className="pl-8"
          />
        </div>
        <Button variant="outline">
          Filters
        </Button>
      </div>

      <BranchesTable 
        branches={branches} 
        onBranchClick={handleBranchClick}
      />
    </div>
  );
};

export default Branches;
