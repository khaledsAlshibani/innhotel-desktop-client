import { useNavigate } from "react-router-dom";
import { Plus, Search } from "lucide-react";
import { useState, useEffect } from "react";

import { GuestsTable } from "@/components/guests/GuestsTable";
import type { GuestResponse } from "@/types/api/guest";
import { guestService } from "@/services/guestService";
import { ROUTES } from "@/constants/routes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pagination } from "@/components/pagination/Pagination";
import { PAGE_SIZE_OPTIONS } from "@/constants/pagination";

const Guests = () => {
  const navigate = useNavigate();
  const [guests, setGuests] = useState<GuestResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    const fetchGuests = async () => {
      try {
        setIsLoading(true);
        const response = await guestService.getAll(currentPage, pageSize);
        setGuests(response.items);
        setTotalPages(response.totalPages);
        setTotalCount(response.totalCount);
        setHasPreviousPage(response.hasPreviousPage);
        setHasNextPage(response.hasNextPage);
      } catch (error) {
        console.error("Failed to fetch guests:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGuests();
  }, [currentPage, pageSize]);

  const filtered = guests.filter(g =>
    `${g.firstName} ${g.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleGuestClick = (guest: GuestResponse) => {
    navigate(`${ROUTES.GUESTS}/${guest.id}`);
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
          <h1 className="text-2xl font-bold">Guests Management</h1>
          <p className="text-muted-foreground">
            View and manage guest information.
          </p>
        </div>
        <Button onClick={() => navigate(ROUTES.ADD_GUEST)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Guest
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search guests..."
            className="pl-8"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline">Filters</Button>
      </div>

      {isLoading ? (
        <div className="text-center text-muted-foreground">
          Loading guests...
        </div>
      ) : (
        <>
          <GuestsTable
            guests={filtered}
            onGuestClick={handleGuestClick}
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
            itemName="guests"
          />
        </>
      )}
    </div>
  );
};

export default Guests;
