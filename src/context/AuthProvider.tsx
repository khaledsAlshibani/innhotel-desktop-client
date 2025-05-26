'use client';

import { useAuthStore } from "@/store/auth.store";
import type { AuthContextType } from "@/types/api/auth";
import { useMemo, useEffect, createContext, useRef } from "react";
import LoadingSpinner from "../components/Loader/LoadingSpinner";
import { logger } from '@/utils/logger';
import { authService } from "@/services/authService";
import { isAxiosError } from "axios";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { setAuth, isLoading, setLoading } = useAuthStore();
  const log = logger();
  const refreshAttempted = useRef(false);

  useEffect(() => {
    const initializeAuth = async () => {
      // Prevent multiple refresh attempts
      if (refreshAttempted.current) {
        return;
      }
      refreshAttempted.current = true;

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
      } catch (error) {
        log.error('Authentication failed:', {
          isAuthenticated: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
        
        // Only clear auth if it's not a 401 (which means no refresh token)
        if (isAxiosError(error) && error.response?.status !== 401) {
          setAuth({
            accessToken: '',
            email: '',
            roles: [],
          });
        }
      } finally {
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
      <LoadingSpinner />
    );
  }

  log.info('Rendering AuthProvider children');
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};