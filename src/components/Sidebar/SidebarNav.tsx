import { Link, useLocation } from "react-router-dom";
import { BedDouble, Users } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

interface SidebarNavProps {
  isCollapsed: boolean;
}

const sidebarItems = [
  { to: ROUTES.ROOMS, label: "Rooms", icon: BedDouble },
  { to: ROUTES.GUESTS, label: "Guests", icon: Users },
];

export const SidebarNav = ({ isCollapsed }: SidebarNavProps) => {
  const location = useLocation();

  return (
    <nav className="flex-1 overflow-y-auto">
      <div className={cn(
        "flex flex-col",
        isCollapsed ? "p-2 gap-2" : "p-4 gap-1"
      )}>
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex items-center gap-3 px-3 py-3 rounded-md transition-colors",
                isCollapsed ? "justify-center px-2" : "",
                isActive 
                  ? "bg-zinc-800 text-zinc-100" 
                  : "text-zinc-400 hover:bg-zinc-800/80 hover:text-zinc-100"
              )}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon className={`${isCollapsed ? "h-4 w-4" : "h-4 w-4"} transition-all duration-300`} />
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
