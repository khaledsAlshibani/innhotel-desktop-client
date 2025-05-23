import { useState } from "react";
import { ReservationsTable } from "@/components/reservations/ReservationsTable";
import type { Reservation, ReservationStatus } from "@/types/reservation";
import reservationsData from "@/mocks/reservations.json";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Reservations = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<ReservationStatus | "all">("all");

  const allReservations = (reservationsData as { reservations: Reservation[] }).reservations;

  const filteredReservations = allReservations.filter(reservation => {
    const matchesSearch = reservation.guest_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reservation.branch_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reservation.rooms.some(room => room.room_number.includes(searchQuery));

    const matchesStatus = statusFilter === "all" || reservation.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleReservationClick = (reservation: Reservation) => {
    console.log("Reservation clicked:", reservation);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">Reservations</h1>
          <p className="text-muted-foreground">
            View and manage hotel reservations.
          </p>
        </div>
        <Button onClick={() => navigate(ROUTES.ADD_RESERVATION)}>
          <Plus className="mr-2 h-4 w-4" />
          New Reservation
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search reservations..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={(value) => setStatusFilter(value as ReservationStatus | "all")}
        >
          <SelectTrigger className="w-[180px]">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <SelectValue placeholder="Filter by status" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Confirmed">Confirmed</SelectItem>
            <SelectItem value="Checked In">Checked In</SelectItem>
            <SelectItem value="Checked Out">Checked Out</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <ReservationsTable
        reservations={filteredReservations}
        onReservationClick={handleReservationClick}
      />
    </div>
  );
};

export default Reservations;
