import { useState, useEffect } from "react";
import { Overlay } from "./Overlay";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarNav } from "./SidebarNav";
import { UserProfile } from "./UserProfile";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsCollapsed(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <Overlay
        isCollapsed={isCollapsed}
        onCollapse={() => setIsCollapsed(true)}
      />

      <aside
        className={`flex h-screen flex-col fixed left-0 top-0 border-r bg-background transition-all duration-300 z-40 ${isCollapsed ? "w-16" : "w-64 shadow-[5px_0_25px_0_rgba(0,0,0,0.1)]"
          }`}
      >
        <SidebarHeader
          isCollapsed={isCollapsed}
          onCollapse={() => setIsCollapsed(!isCollapsed)}
        />
        <SidebarNav isCollapsed={isCollapsed} />
        <UserProfile isCollapsed={isCollapsed} />
      </aside>
    </>
  );
};

export default Sidebar;
