import { BranchesTable } from "@/components/branches/BranchesTable";
import type { BranchResponse } from "@/types/api/branch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { branchService } from "@/services/branchService";
import { useState, useEffect } from "react";
import { RoleGuard } from "@/hooks/RoleGuard";
import { UserRole } from "@/types/api/user";
import { Pagination } from "@/components/pagination/Pagination";
import { PAGE_SIZE_OPTIONS } from "@/constants/pagination";

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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
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
          
          <Pagination
            currentPage={currentPage}
            pageSize={pageSize}
            totalPages={totalPages}
            totalCount={totalCount}
            hasPreviousPage={hasPreviousPage}
            hasNextPage={hasNextPage}
            pageSizeOptions={PAGE_SIZE_OPTIONS}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            itemName="branches"
          />
        </>
      )}
    </div>
  );
};

export default Branches;
