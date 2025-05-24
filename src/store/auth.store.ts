import { create } from 'zustand';
import type { AuthResponse } from '@/types/api/auth';

interface AuthStore extends AuthResponse {
  isAuthenticated: boolean;
  isLoading: boolean;
  setAuth: (auth: AuthResponse) => void;
  clearAuth: () => void;
  setLoading: (loading: boolean) => void;
}

const initialState = {
  accessToken: '',
  email: '',
  roles: [],
  isAuthenticated: false,
  isLoading: false,
};

export const useAuthStore = create<AuthStore>()((set) => ({
  ...initialState,
  setAuth: (auth: AuthResponse) => 
    set({ 
      ...auth, 
      isAuthenticated: true 
    }),
  clearAuth: () => 
    set(initialState),
  setLoading: (loading: boolean) => 
    set({ isLoading: loading }),
}));