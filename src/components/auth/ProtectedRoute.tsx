/**
 * We know HOCs are not commonly used in modern React code...
 * but it's just an assignment and deadlines are deadlines :/
 */
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/auth.store';
import { ROUTES } from '@/constants/routes';
import LoadingSpinner from '@/components/Loader/LoadingSpinner';
import { useEffect, useState } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export const ProtectedRoute = ({ children, requireAuth = true }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuthStore();
  const location = useLocation();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [redirectTo, setRedirectTo] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading) {
      if (requireAuth && !isAuthenticated) {
        setIsRedirecting(true);
        setRedirectTo(ROUTES.LOGIN);
      } else if (!requireAuth && isAuthenticated) {
        setIsRedirecting(true);
        setRedirectTo(ROUTES.ROOMS);
      } else {
        setIsRedirecting(false);
        setRedirectTo(null);
      }
    }
  }, [isLoading, isAuthenticated, requireAuth]);

  useEffect(() => {
    if (isRedirecting && redirectTo) {
      const timer = setTimeout(() => {
        setIsRedirecting(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isRedirecting, redirectTo]);

  if (isLoading || isRedirecting) {
    return <LoadingSpinner />;
  }

  if (redirectTo) {
    if (redirectTo === ROUTES.LOGIN) {
      return <Navigate to={redirectTo} state={{ from: location }} replace />;
    }
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};