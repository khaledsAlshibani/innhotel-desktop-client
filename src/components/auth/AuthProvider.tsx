'use client';

import { useAuthStore } from "@/store/auth.store";
import type { AuthContextType } from "@/types/api/auth";
import { useMemo, useEffect, createContext } from "react";
import LoadingSpinner from "../Loader/LoadingSpinner";
import { logger } from '@/utils/logger';
import { authService } from "@/services/authService";
import { isAxiosError } from "axios";
// import { authService } from "@/services/authService";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { setAuth, isLoading, setLoading } = useAuthStore();
  const log = logger();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        log.info('Checking authentication state...');
        const { accessToken, email, roles } = await authService.refresh();

        log.info('Refresh token successful:', {
          isAuthenticated: true,
          user: { email, roles }
        });

        setAuth({
          accessToken,
          email,
          roles,
        });
        setLoading(false);
      } catch (error) {
        log.error('Authentication failed:', {
          isAuthenticated: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
        
        // Only clear auth state if it's not an initial load 401 error
        if (isAxiosError(error) && error.response?.status !== 401) {
          setAuth({
            accessToken: '',
            email: '',
            roles: [],
          });
        }
        setLoading(false);
      }
    };
    initializeAuth();
  }, []);

  const contextValue = useMemo(() => {
    log.debug('Auth context value updated:', { isLoading });
    return { isLoading, setAuth };
  }, [isLoading]);

  if (isLoading) {
    log.info('Rendering loading state');
    return (
      <LoadingSpinner size="xl" color="primary" fullScreen={true} />
    );
  }

  log.info('Rendering AuthProvider children');
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};