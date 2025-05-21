import { Button } from "@/components/ui/button";
import { ChevronFirst, ChevronLast } from "lucide-react";

interface SidebarHeaderProps {
  isCollapsed: boolean;
  onCollapse: () => void;
}

export const SidebarHeader = ({ isCollapsed, onCollapse }: SidebarHeaderProps) => {
  return (
    <div className={`border-b border-zinc-800 flex items-center ${isCollapsed ? "p-6 justify-center" : "p-4 justify-between"}`}>
      <h2 className={`text-lg font-semibold text-zinc-100 transition-opacity ${isCollapsed ? "opacity-0 hidden" : "opacity-100"}`}>
        InnHotel
      </h2>
      <Button
        variant="ghost"
        size="icon"
        onClick={onCollapse}
        className="h-8 w-8 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/80"
      >
        {isCollapsed ? <ChevronLast className="h-5 w-5" /> : <ChevronFirst className="h-5 w-5" />}
      </Button>
    </div>
  );
};
