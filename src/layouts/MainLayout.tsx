import type { ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 flex items-center justify-center min-h-screen">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
