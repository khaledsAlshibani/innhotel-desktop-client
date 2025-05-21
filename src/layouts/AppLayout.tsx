import type { ReactNode } from 'react';
import Sidebar from '@/components/Sidebar';

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 ml-20 lg:ml-64 p-8">
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
