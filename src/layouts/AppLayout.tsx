import Sidebar from '@/components/Sidebar';
import type { ReactNode } from 'react';

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="pl-16 w-full min-h-screen">
        <div className="p-12 h-full">
          <div className="max-w-7xl mx-auto w-full h-full">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
