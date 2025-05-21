import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
import { ROUTES } from "@/constants/routes";
import {
  BedDouble,
  ChevronFirst,
  ChevronLast,
  LogOut,
  Settings,
  User,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Auto-collapse on small screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsCollapsed(true);
      }
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sidebarItems = [
    { to: ROUTES.ROOMS, label: "Rooms", icon: BedDouble },
    { to: ROUTES.GUESTS, label: "Guests", icon: Users },
  ];

  const userInfo = {
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-30 transition-opacity duration-300 ${
          !isCollapsed ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsCollapsed(true)}
      />

      <aside 
        className={`flex h-screen flex-col fixed left-0 top-0 border-r bg-background transition-all duration-300 z-40 ${
          isCollapsed ? "w-16" : "w-64 shadow-[5px_0_25px_0_rgba(0,0,0,0.1)]"
        }`}
      >
        <div className={`border-b flex items-center ${isCollapsed ? "p-6 justify-center" : "p-4 justify-between"}`}>
          <h2 className={`text-lg font-semibold transition-opacity ${isCollapsed ? "opacity-0 hidden" : "opacity-100"}`}>
            InnHotel
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="h-8 w-8"
          >
            {isCollapsed ? <ChevronLast className="h-5 w-5" /> : <ChevronFirst className="h-5 w-5" />}
          </Button>
        </div>

        <nav className="flex-1 overflow-y-auto">
          <div className={cn(
            "flex flex-col",
            isCollapsed ? "p-2 gap-2" : "p-4"
          )}>
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-3 px-3 py-3 hover:bg-accent rounded-md transition-colors ${
                    isCollapsed ? "justify-center px-2" : ""
                  }`}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon className={`${isCollapsed ? "h-4 w-4" : "h-4 w-4"} transition-all duration-300`} />
                  {!isCollapsed && <span>{item.label}</span>}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="border-t p-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className={`w-full flex items-center gap-2 px-2 ${
                  isCollapsed ? "justify-center" : "justify-start"
                }`}
              >
                <Avatar className="h-6 w-6">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                {!isCollapsed && (
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium">{userInfo.name}</p>
                    <p className="text-xs text-muted-foreground">{userInfo.role}</p>
                  </div>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align={isCollapsed ? "center" : "end"} className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
