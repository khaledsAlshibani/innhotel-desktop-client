import { Link } from "react-router-dom";
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
  return (
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
  );
};
