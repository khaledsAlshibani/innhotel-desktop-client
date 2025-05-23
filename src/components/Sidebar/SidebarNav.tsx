import { Link, useLocation } from "react-router-dom";
import { BedDouble, Users, Building2, CalendarDays, UserSquare2 } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

interface SidebarNavProps {
  isCollapsed: boolean;
}

const mainItems = [
  { to: ROUTES.ROOMS, label: "Rooms", icon: BedDouble },
  { to: ROUTES.GUESTS, label: "Guests", icon: Users },
  { to: ROUTES.RESERVATIONS, label: "Reservations", icon: CalendarDays },
];

const managementItems = [
  { to: ROUTES.BRANCHES, label: "Branches", icon: Building2 },
  { to: ROUTES.EMPLOYEES, label: "Employees", icon: UserSquare2 },
];

export const SidebarNav = ({ isCollapsed }: SidebarNavProps) => {
  const location = useLocation();

  const NavLink = ({ to, label, icon: Icon }: { to: string; label: string; icon: any }) => (
    <Link
      key={to}
      to={to}
      className={cn(
        "flex items-center gap-3 px-3 py-3 rounded-md transition-colors",
        isCollapsed ? "justify-center px-2" : "",
        location.pathname === to
          ? "bg-zinc-800 text-zinc-100" 
          : "text-zinc-400 hover:bg-zinc-800/80 hover:text-zinc-100"
      )}
      title={isCollapsed ? label : undefined}
    >
      <Icon className="h-4 w-4 transition-all duration-300" />
      {!isCollapsed && <span>{label}</span>}
    </Link>
  );

  return (
    <nav className="flex-1 overflow-y-auto">
      <div className={cn(
        "flex flex-col",
        isCollapsed ? "p-2 gap-2" : "p-4 gap-1"
      )}>
        {/* Main Navigation */}
        {mainItems.map((item) => (
          <NavLink key={item.to} {...item} />
        ))}

        <div className="h-[1px] bg-zinc-800 my-2 mx-2" />
        
        {/* Management Section */}
        {managementItems.map((item) => (
          <NavLink key={item.to} {...item} />
        ))}
      </div>
    </nav>
  );
};
