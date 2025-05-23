import { ChevronRight, Building2, Calendar, BedDouble, User2 } from "lucide-react";
import type { Reservation } from "@/types/reservation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ReservationsTableProps {
  reservations: Reservation[];
  onReservationClick?: (reservation: Reservation) => void;
}

const statusStyles: Record<string, { color: string; bg: string }> = {
  'Pending': { color: 'text-yellow-600', bg: 'border-yellow-600/20' },
  'Confirmed': { color: 'text-blue-600', bg: 'border-blue-600/20' },
  'Checked In': { color: 'text-green-600', bg: 'border-green-600/20' },
  'Checked Out': { color: 'text-gray-600', bg: 'border-gray-600/20' },
};

export const ReservationsTable = ({ reservations, onReservationClick }: ReservationsTableProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Guest</TableHead>
            <TableHead>Branch</TableHead>
            <TableHead>Dates</TableHead>
            <TableHead>Rooms</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Total Cost</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reservations.map((reservation) => (
            <TableRow
              key={reservation.id}
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => onReservationClick?.(reservation)}
            >
              <TableCell>
                <div className="flex items-center gap-2">
                  <User2 className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{reservation.guest_name}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Building2 className="h-4 w-4" />
                  <span>{reservation.branch_name}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {formatDate(reservation.check_in_date)} - {formatDate(reservation.check_out_date)}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    Reserved on {formatDate(reservation.reservation_date)}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <BedDouble className="h-4 w-4 text-muted-foreground" />
                  <span>{reservation.rooms.map(room => room.room_number).join(', ')}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={cn(
                    "font-medium text-xs tracking-wide",
                    statusStyles[reservation.status].color,
                    statusStyles[reservation.status].bg
                  )}
                >
                  {reservation.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right font-medium">
                ${reservation.total_cost.toFixed(2)}
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    onReservationClick?.(reservation);
                  }}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
