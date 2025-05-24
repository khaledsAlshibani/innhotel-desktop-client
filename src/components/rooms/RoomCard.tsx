import { cn } from "@/lib/utils";
import type { RoomResponse, RoomStatus } from "@/types/api/room";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, LandPlot, BedDouble, DollarSign } from "lucide-react";

interface RoomCardProps {
  room: RoomResponse;
  onClick?: (room: RoomResponse) => void;
}

const statusStyles: Record<RoomStatus, { color: string; bg: string; lightBg: string; dot: string }> = {
  0: { color: 'text-green-700', bg: 'bg-green-500', lightBg: 'bg-green-100', dot: 'bg-green-700' }, // Available
  1: { color: 'text-red-700', bg: 'bg-red-500', lightBg: 'bg-red-100', dot: 'bg-red-700' }, // Occupied
  2: { color: 'text-yellow-700', bg: 'bg-yellow-500', lightBg: 'bg-yellow-100', dot: 'bg-yellow-700' }, // UnderMaintenance
};

const getStatusText = (status: RoomStatus): string => {
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

export const RoomCard = ({ room, onClick }: RoomCardProps) => {
  const { roomNumber, status, roomTypeName, floor, branchName, basePrice } = room;
  const statusStyle = statusStyles[status];

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all duration-200 hover:shadow-md",
        onClick && "cursor-pointer",
      )}
      onClick={() => onClick?.(room)}
    >
      <CardHeader className="pb-0">
        <div className={cn(
          "relative h-24 flex items-center justify-center rounded-md",
          statusStyle.lightBg
        )}>
          <span className={cn("text-4xl", statusStyle.color)}>#{roomNumber}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <LandPlot className="h-4 w-4" />
              <span>Floor {floor}</span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="h-4 w-4" />
              <span>{basePrice}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Building2 className="h-4 w-4" />
            <span>{branchName}</span>
          </div>
          <div className="flex items-center gap-2 pt-1">
            <Badge 
              variant="outline" 
              className={cn(
                "font-medium text-xs tracking-wide flex items-center gap-1.5",
                "bg-background hover:bg-background",
                statusStyle.color,
                "border border-current/20"
              )}
            >
              <div className={cn("h-2 w-2 rounded-full", statusStyle.dot)} />
              {getStatusText(status)}
            </Badge>
            <Badge 
              variant="outline" 
              className={cn(
                "font-medium text-xs tracking-wide flex items-center gap-1.5",
                "bg-background hover:bg-background",
                "border text-blue-600 border-current/20"
              )}
            >
              <BedDouble className="h-3 w-3" />
              {roomTypeName}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
