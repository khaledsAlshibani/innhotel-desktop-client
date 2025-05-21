import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, Settings, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface UserProfileProps {
  isCollapsed: boolean;
}

const userInfo = {
  name: "John Doe",
  email: "john@example.com",
  role: "Admin",
};

export const UserProfile = ({ isCollapsed }: UserProfileProps) => {
  return (
    <div className="border-t border-zinc-800 p-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            className={cn(
              "w-full flex items-center gap-2 px-2 text-zinc-400 transition-colors",
              "hover:bg-zinc-800/40",
              isCollapsed ? "justify-center" : "justify-start"
            )}
          >
            <Avatar className="h-6 w-6">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-zinc-100">{userInfo.name}</p>
                <p className="text-xs text-zinc-400">{userInfo.role}</p>
              </div>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align={isCollapsed ? "center" : "end"} 
          className={cn(
            "w-56 bg-zinc-800 border-zinc-700",
            isCollapsed && "ml-2"
          )}
        >
          <DropdownMenuLabel className="text-zinc-100">My Account</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-zinc-700" />
          <DropdownMenuItem className="text-zinc-300 focus:text-zinc-100 focus:bg-zinc-700/50">
            <User className="mr-2 h-4 w-4" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem className="text-zinc-300 focus:text-zinc-100 focus:bg-zinc-700/50">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-zinc-700" />
          <DropdownMenuItem className="text-red-400 focus:text-red-400 focus:bg-zinc-700/50">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
