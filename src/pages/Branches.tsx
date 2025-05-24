import { BranchesTable } from "@/components/branches/BranchesTable";
import type { BranchResponse } from "@/types/api/branch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { branchService } from "@/services/branchService";
import { useState, useEffect } from "react";

const Branches = () => {
  const navigate = useNavigate();
  const [branches, setBranches] = useState<BranchResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await branchService.getAll();
        setBranches(response.items);
      } catch (error) {
        console.error('Failed to fetch branches:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBranches();
  }, []);

  const handleBranchClick = (branch: BranchResponse) => {
    navigate(`/branches/${branch.id}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">Branches Management</h1>
          <p className="text-muted-foreground">
            View and manage branch information.
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

      {isLoading ? (
        <div className="text-center text-muted-foreground">Loading branches...</div>
      ) : (
        <BranchesTable 
          branches={branches} 
          onBranchClick={handleBranchClick}
        />
      )}
    </div>
  );
};

export default Branches;
