import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, Building2, UserPlus, BedDouble, CalendarPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

interface QuickActionsProps {
  isCollapsed: boolean;
}

export const QuickActions = ({ isCollapsed }: QuickActionsProps) => {
  const navigate = useNavigate();

  return (
    <div className="border-t border-zinc-800 p-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            className={cn(
              "w-full flex items-center gap-2 px-2",
              "hover:bg-zinc-800 [&_svg]:text-zinc-400",
              isCollapsed ? "justify-center" : "justify-start"
            )}
          >
            <Plus className="h-4 w-4" />
            {!isCollapsed && (
              <div className="flex-1 text-left text-zinc-400">
                <p className="text-sm font-medium text-zinc-100">Quick Actions</p>
                <p className="text-xs text-zinc-400">Add new items</p>
              </div>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          side="top"
          align={isCollapsed ? "center" : "end"}
          className={cn(
            "w-56 bg-zinc-800 border-zinc-700",
            isCollapsed && "ml-2"
          )}
        >
          <DropdownMenuLabel className="text-zinc-100">Quick Actions</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-zinc-700" />
          <DropdownMenuItem 
            className="text-zinc-300 focus:text-zinc-100 focus:bg-zinc-700/50"
            onClick={() => navigate(ROUTES.ADD_RESERVATION)}
          >
            <CalendarPlus className="mr-2 h-4 w-4" />
            New Reservation
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="text-zinc-300 focus:text-zinc-100 focus:bg-zinc-700/50"
            onClick={() => navigate(ROUTES.ADD_ROOM)}
          >
            <BedDouble className="mr-2 h-4 w-4" />
            Add Room
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="text-zinc-300 focus:text-zinc-100 focus:bg-zinc-700/50"
            onClick={() => navigate(ROUTES.ADD_BRANCH)}
          >
            <Building2 className="mr-2 h-4 w-4" />
            Add Branch
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="text-zinc-300 focus:text-zinc-100 focus:bg-zinc-700/50"
            onClick={() => navigate(ROUTES.REGISTER_EMPLOYEE)}
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Register Employee
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
