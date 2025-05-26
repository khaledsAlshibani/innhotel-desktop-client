import { BranchesTable } from "@/components/branches/BranchesTable";
import type { BranchResponse } from "@/types/api/branch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { branchService } from "@/services/branchService";
import { useState, useEffect } from "react";
import { RoleGuard } from "@/hooks/RoleGuard";
import { UserRole } from "@/types/api/user";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const PAGE_SIZE_OPTIONS = [5, 10, 20, 50];

const Branches = () => {
  const navigate = useNavigate();
  const [branches, setBranches] = useState<BranchResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);

  RoleGuard(UserRole.SuperAdmin);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        setIsLoading(true);
        const response = await branchService.getAll(currentPage, pageSize);
        setBranches(response.items);
        setTotalPages(response.totalPages);
        setTotalCount(response.totalCount);
        setHasPreviousPage(response.hasPreviousPage);
        setHasNextPage(response.hasNextPage);
      } catch (error) {
        console.error('Failed to fetch branches:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBranches();
  }, [currentPage, pageSize]);

  const filteredBranches = branches.filter((branch) => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      branch.name.toLowerCase().includes(searchTerm) ||
      branch.location.toLowerCase().includes(searchTerm)
    );
  });

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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline">
          Filters
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center text-muted-foreground">Loading branches...</div>
      ) : (
        <>
          <BranchesTable 
            branches={filteredBranches} 
            onBranchClick={handleBranchClick}
          />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <p className="text-sm text-muted-foreground">
                Rows per page
              </p>
              <Select
                value={pageSize.toString()}
                onValueChange={(value) => {
                  setPageSize(Number(value));
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PAGE_SIZE_OPTIONS.map(size => (
                    <SelectItem key={size} value={size.toString()}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                {totalCount} total items
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <p className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </p>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                disabled={!hasPreviousPage}
                onClick={() => setCurrentPage(p => p - 1)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                disabled={!hasNextPage}
                onClick={() => setCurrentPage(p => p + 1)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Branches;
