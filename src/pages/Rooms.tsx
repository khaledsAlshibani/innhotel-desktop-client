import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { RoomResponse } from "@/types/api/room";
import { RoomsListing } from "@/components/rooms/RoomsListing";
import { roomService } from "@/services/roomService";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { Pagination } from "@/components/pagination/Pagination";
import { PAGE_SIZE_OPTIONS } from "@/constants/pagination";

const Rooms = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<RoomResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setIsLoading(true);
        const response = await roomService.getAll(currentPage, pageSize);
        setRooms(response.items);
        setTotalPages(response.totalPages);
        setTotalCount(response.totalCount);
        setHasPreviousPage(response.hasPreviousPage);
        setHasNextPage(response.hasNextPage);
      } catch (error) {
        console.error('Failed to fetch rooms:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRooms();
  }, [currentPage, pageSize]);

  const handleRoomClick = (room: RoomResponse) => {
    navigate(`${ROUTES.ROOMS}/${room.id}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Rooms Management</h1>
          <p className="text-muted-foreground">Manage your hotel rooms and their status.</p>
        </div>
        <Button 
          onClick={() => navigate(ROUTES.ADD_ROOM)} 
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Room
        </Button>
      </div>

      <RoomsListing 
        rooms={rooms} 
        onRoomClick={handleRoomClick}
        isLoading={isLoading}
      />

      {!isLoading && (
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
          itemName="rooms"
        />
      )}
    </div>
  );
};

export default Rooms;
