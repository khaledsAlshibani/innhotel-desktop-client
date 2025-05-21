import { Building2, MapPin, ChevronRight, BedDouble, Users } from "lucide-react";
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
import type { Branch } from "@/types/branches";

interface BranchesTableProps {
  branches: Branch[];
  onBranchClick?: (branch: Branch) => void;
}

export const BranchesTable = ({ branches, onBranchClick }: BranchesTableProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Branch Name</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Capacity</TableHead>
            <TableHead className="w-[100px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {branches.map((branch) => (
            <TableRow key={branch.id} className="cursor-pointer hover:bg-muted/50">
              <TableCell>
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{branch.name}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{branch.location}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Badge 
                    variant="outline" 
                    className="flex items-center gap-1.5 text-blue-600 border-blue-600/20"
                  >
                    <BedDouble className="h-3 w-3" />
                    {branch.rooms_count} Rooms
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className="flex items-center gap-1.5 text-emerald-600 border-emerald-600/20"
                  >
                    <Users className="h-3 w-3" />
                    {branch.employees_count} Staff
                  </Badge>
                </div>
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onBranchClick?.(branch)}
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
