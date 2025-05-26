import { ChevronRight, Mail, Phone, Eye, EyeOff, Mars, Venus } from "lucide-react";
import { useState } from "react";
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
import type { GuestResponse } from "@/types/api/guest";

interface GuestsTableProps {
  guests: GuestResponse[];
  onGuestClick?: (guest: GuestResponse) => void;
}

const getGenderLabel = (gender: number) => gender === 0 ? 'Male' : 'Female';
const getIdProofTypeLabel = (type: number) => {
  switch (type) {
    case 0: return 'Passport';
    case 1: return "Driver's License";
    case 2: return 'National ID';
    default: return 'Unknown';
  }
};

export const GuestsTable = ({ guests, onGuestClick }: GuestsTableProps) => {
  const [visibleIds, setVisibleIds] = useState<Record<number, boolean>>({});

  const toggleId = (id: number) =>
    setVisibleIds(v => ({ ...v, [id]: !v[id] }));

  const mask = (idNum: string) => {
    const len = idNum.length;
    return "*".repeat(Math.max(len - 4, 0)) + idNum.slice(-4);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>ID Proof</TableHead>
            <TableHead className="w-[100px]" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {guests.map(guest => (
            <TableRow
              key={guest.id}
              className="cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => onGuestClick?.(guest)}
            >
              <TableCell className="font-medium">
                {guest.firstName} {guest.lastName}
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    {guest.phone}
                  </div>
                  {guest.email && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      {guest.email}
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <Badge 
                  variant="outline" 
                  className={cn(
                    "flex items-center gap-1.5 w-fit",
                    guest.gender === 0 
                      ? 'text-blue-600 border-blue-600/20' 
                      : 'text-pink-600 border-pink-600/20'
                  )}
                >
                  {guest.gender === 0 ? (
                    <Mars className="h-3 w-3" />
                  ) : (
                    <Venus className="h-3 w-3" />
                  )}
                  {getGenderLabel(guest.gender)}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span className="font-medium">
                    {getIdProofTypeLabel(guest.idProofType)} - {visibleIds[guest.id]
                      ? guest.idProofNumber
                      : mask(guest.idProofNumber)}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={e => {
                      e.stopPropagation();
                      toggleId(guest.id);
                    }}
                  >
                    {visibleIds[guest.id] ? (
                      <EyeOff className="h-3.5 w-3.5" />
                    ) : (
                      <Eye className="h-3.5 w-3.5" />
                    )}
                  </Button>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <ChevronRight className="h-4 w-4 text-muted-foreground inline-block" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
