import { useState } from "react";
import { Overlay } from "./Overlay";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarNav } from "./SidebarNav";
import { UserProfile } from "./UserProfile";
import { QuickActions } from "./QuickActions";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <>
      <Overlay
        isCollapsed={isCollapsed}
        onCollapse={() => setIsCollapsed(true)}
      />

      <aside
        className={`flex h-screen flex-col fixed left-0 top-0 border-r border-zinc-800 bg-zinc-900 transition-all duration-300 z-40 ${
          isCollapsed ? "w-16" : "w-64 shadow-[5px_0_25px_0_rgba(0,0,0,0.25)]"
        }`}
      >
        <SidebarHeader
          isCollapsed={isCollapsed}
          onCollapse={() => setIsCollapsed(!isCollapsed)}
        />
        <SidebarNav isCollapsed={isCollapsed} />
        <QuickActions isCollapsed={isCollapsed} />
        <UserProfile isCollapsed={isCollapsed} />
      </aside>
    </>
  );
};

export default Sidebar;
