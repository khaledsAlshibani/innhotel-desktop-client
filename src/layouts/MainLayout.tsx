import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import type { ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Link to={ROUTES.HOME} className="text-foreground hover:text-primary">
        Home
      </Link>
      <Link to={ROUTES.LOGIN} className="text-foreground hover:text-primary">
        Login
      </Link>
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
