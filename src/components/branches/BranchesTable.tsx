import { Building2, MapPin, ChevronRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { BranchResponse } from "@/types/api/branch";

interface BranchesTableProps {
  branches: BranchResponse[];
  onBranchClick?: (branch: BranchResponse) => void;
}

export const BranchesTable = ({ branches, onBranchClick }: BranchesTableProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Branch Name</TableHead>
            <TableHead>Location</TableHead>
            <TableHead className="w-[100px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {branches.map((branch) => (
            <TableRow 
              key={branch.id} 
              className="cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => onBranchClick?.(branch)}
            >
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
