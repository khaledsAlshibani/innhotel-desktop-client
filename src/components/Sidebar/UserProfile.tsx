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
import { LogOut, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { getDefaultProfilePhoto } from "@/utils/getDefaultProfilePhoto";
import { useAuthStore } from "@/store/auth.store";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { logger } from "@/utils/logger";
import { toast } from "sonner";
import { authService } from "@/services/authService";

interface UserProfileProps {
  isCollapsed: boolean;
}

export const UserProfile = ({ isCollapsed }: UserProfileProps) => {
  const { email, roles, clearAuth } = useAuthStore();
  const navigate = useNavigate();
  const log = logger();

  log.info('Auth Store State:', { email, roles, accessToken: useAuthStore().accessToken });

  // Don't render if no user data
  if (!email || !roles.length) {
    log.info('UserProfile not rendered - missing data:', { email, roles });
    return null;
  }

  const handleLogout = async () => {
    try {
      log.info('Logging out user:', { email });
      await authService.logout();
      clearAuth();
      navigate(ROUTES.LOGIN);
      log.info('Logout successful');
      toast.success('Logged out successfully');
    } catch (error) {
      log.error('Logout failed:', error);
      toast.error('Failed to logout');
    }
  };

  const initials = email
    .split('@')[0]
    .split('.')
    .map(part => part[0])
    .join('')
    .toUpperCase();

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
              <AvatarImage src={getDefaultProfilePhoto(roles[0])} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-zinc-100">{email}</p>
                <p className="text-xs text-zinc-400">{roles[0]}</p>
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
          <DropdownMenuLabel className="text-xs text-zinc-400 font-normal flex items-center gap-2">
            <Mail className="h-3 w-3 text-zinc-500" />{email}
          </DropdownMenuLabel>
          {/* <DropdownMenuSeparator className="bg-zinc-700" />
          <DropdownMenuItem className="text-zinc-300 focus:text-zinc-100 focus:bg-zinc-700/50">
            <User className="mr-2 h-4 w-4" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem className="text-zinc-300 focus:text-zinc-100 focus:bg-zinc-700/50">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </DropdownMenuItem> */}
          <DropdownMenuSeparator className="bg-zinc-700" />
          <DropdownMenuItem 
            className="text-red-400 focus:text-red-400 focus:bg-zinc-700/50"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
