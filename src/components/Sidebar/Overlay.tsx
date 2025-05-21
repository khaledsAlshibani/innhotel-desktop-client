interface OverlayProps {
  isCollapsed: boolean;
  onCollapse: () => void;
}

export const Overlay = ({ isCollapsed, onCollapse }: OverlayProps) => {
  return (
    <div 
      className={`fixed inset-0 bg-black/50 z-30 transition-opacity duration-300 ${
        !isCollapsed ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={onCollapse}
    />
  );
};
