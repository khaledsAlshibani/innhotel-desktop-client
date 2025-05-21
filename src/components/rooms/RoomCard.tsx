import { cn } from "@/lib/utils";
import type { Room, RoomStatus } from "@/types/room";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, LandPlot, BedDouble, Activity } from "lucide-react";

interface RoomCardProps {
  room: Room;
  onClick?: (room: Room) => void;
}

const statusStyles: Record<RoomStatus, { color: string; bg: string; lightBg: string }> = {
  'Available': { color: 'text-green-700', bg: 'bg-green-500', lightBg: 'bg-green-100' },
  'Occupied': { color: 'text-red-700', bg: 'bg-red-500', lightBg: 'bg-red-100' },
  'Under Maintenance': { color: 'text-yellow-700', bg: 'bg-yellow-500', lightBg: 'bg-yellow-100' },
};

export const RoomCard = ({ room, onClick }: RoomCardProps) => {
  const { number, status, type, floor, branch } = room;
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
          <span className={cn("text-4xl", statusStyle.color)}>#{number}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <LandPlot className="h-4 w-4" />
            <span>Floor {floor}</span>
          </div>
          {branch && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Building2 className="h-4 w-4" />
              <span>{branch}</span>
            </div>
          )}
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
              <Activity className="h-3 w-3" />
              {status}
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
              {type}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
