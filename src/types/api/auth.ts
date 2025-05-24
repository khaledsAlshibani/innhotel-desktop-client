import type { UserRole } from "./user";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  email: string;
  roles: UserRole[];
}

export interface AuthState extends AuthResponse {
  loading: boolean;
}

export interface AuthContextType {
  isLoading: boolean;
  setAuth: (auth: AuthResponse) => void;
}