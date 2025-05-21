import { ChevronRight, Mail, Phone, Mars, Venus, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import type { Guest } from "@/types/guest";
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

interface GuestsTableProps {
  guests: Guest[];
  onGuestClick?: (guest: Guest) => void;
}

export const GuestsTable = ({ guests, onGuestClick }: GuestsTableProps) => {
  const [visibleIds, setVisibleIds] = useState<Record<string, boolean>>({});

  const toggleIdVisibility = (guestId: string) => {
    setVisibleIds(prev => ({
      ...prev,
      [guestId]: !prev[guestId]
    }));
  };

  const maskId = (id: string) => {
    const length = id.length;
    return '*'.repeat(Math.max(length - 4, 0)) + id.slice(-4);
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
            <TableHead className="w-[100px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {guests.map((guest) => (
            <TableRow key={guest.id} className="cursor-pointer hover:bg-muted/50">
              <TableCell className="font-medium">
                <span>{guest.first_name} {guest.last_name}</span>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>{guest.phone}</span>
                  </div>
                  {guest.email && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      <span>{guest.email}</span>
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <Badge 
                  variant="outline" 
                  className={cn(
                    "flex items-center gap-1.5 w-fit",
                    guest.gender === 'male' 
                      ? 'text-blue-600 border-blue-600/20' 
                      : 'text-pink-600 border-pink-600/20'
                  )}
                >
                  {guest.gender === 'male' ? (
                    <Mars className="h-3 w-3" />
                  ) : (
                    <Venus className="h-3 w-3" />
                  )}
                  {guest.gender}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-muted-foreground capitalize">
                    {guest.id_proof_type.replace('_', ' ')}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">
                      {visibleIds[guest.id] ? guest.id_proof_number : maskId(guest.id_proof_number)}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleIdVisibility(guest.id);
                      }}
                    >
                      {visibleIds[guest.id] ? (
                        <EyeOff className="h-3.5 w-3.5" />
                      ) : (
                        <Eye className="h-3.5 w-3.5" />
                      )}
                    </Button>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onGuestClick?.(guest)}
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
