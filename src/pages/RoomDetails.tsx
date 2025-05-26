import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { RoomResponse, RoomStatus } from "@/types/api/room";
import { roomService } from "@/services/roomService";
import { ROUTES } from "@/constants/routes";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import { DeleteConfirmationDialog } from "@/components/Dialog/DeleteConfirmationDialog";
import SingleItemLayout from "@/layouts/SingleItemLayout";
import { RoomForm } from "@/components/rooms/RoomForm";
import { CardTitle, CardDescription } from "@/components/ui/card";
import { BedDouble, Building2, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const statusStyles = {
  0: { color: 'text-green-700' }, // Available
  1: { color: 'text-red-700' }, // Occupied
  2: { color: 'text-yellow-700' }, // UnderMaintenance
};

const getStatusText = (status: number): string => {
  switch (status) {
    case 0:
      return 'Available';
    case 1:
      return 'Occupied';
    case 2:
      return 'Under Maintenance';
    default:
      return 'Unknown';
  }
};

const RoomDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [room, setRoom] = useState<RoomResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    const fetchRoom = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        const data = await roomService.getById(parseInt(id));
        setRoom(data);
      } catch (error) {
        console.error('Failed to fetch room:', error);
        navigate(ROUTES.ROOMS);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoom();
  }, [id, navigate]);

  const handleUpdate = async (data: any) => {
    if (!id || !room) return;

    try {
      setIsUpdating(true);
      const response = await roomService.update(parseInt(id), {
        roomTypeId: parseInt(data.roomTypeId),
        roomNumber: data.roomNumber,
        status: parseInt(data.status) as RoomStatus,
        floor: data.floor
      });
      setRoom(response.data);
      toast.success('Room updated successfully');
    } catch (error) {
      console.error('Failed to update room:', error);
      toast.error('Failed to update room');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!id) return;

    try {
      setIsDeleting(true);
      await roomService.delete(parseInt(id));
      toast.success('Room deleted successfully');
      navigate(ROUTES.ROOMS);
    } catch (error) {
      console.error('Failed to delete room:', error);
      toast.error('Failed to delete room. The room might be reserved.');
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  if (isLoading || !room) {
    return <div className="text-center">Loading room details...</div>;
  }

  const deleteButton = (
    <Button
      variant="destructive"
      className="gap-2"
      onClick={() => setShowDeleteDialog(true)}
      disabled={isDeleting}
    >
      <Trash className="h-4 w-4" />
      Delete Room
    </Button>
  );

  const roomOverview = (
    <>
      <CardTitle className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <BedDouble className="h-5 w-5" />
          Room #{room.roomNumber}
        </div>
        <Badge 
          variant="outline" 
          className={cn(
            "font-medium text-xs tracking-wide",
            statusStyles[room.status].color
          )}
        >
          {getStatusText(room.status)}
        </Badge>
      </CardTitle>
      <CardDescription className="space-y-2 mt-2">
        <div className="flex items-center gap-2">
          <Building2 className="h-4 w-4" />
          <span>{room.branchName}</span>
        </div>
        <div className="flex items-center gap-2">
          <DollarSign className="h-4 w-4" />
          <span>${room.basePrice} per night</span>
        </div>
      </CardDescription>
    </>
  );

  return (
    <>
      <SingleItemLayout
        title="Room Details"
        description="View and manage room information"
        backHref={ROUTES.ROOMS}
        onBackClick={() => navigate(ROUTES.ROOMS)}
        actionButton={deleteButton}
        overview={roomOverview}
      >
        <RoomForm
          onSubmit={handleUpdate}
          defaultValues={{
            room_number: room.roomNumber,
            room_type_id: room.roomTypeId.toString(),
            status: room.status.toString(),
            floor: room.floor,
            branch_id: room.branchId.toString()
          }}
          isLoading={isUpdating}
          mode="update"
        />
      </SingleItemLayout>

      <DeleteConfirmationDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
        title="Delete Room"
        description="Are you sure you want to delete this room? This action cannot be undone."
        isDeleting={isDeleting}
      />
    </>
  );
};

export default RoomDetails;