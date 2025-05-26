import { UserRole } from '@/types/api/user';
import { useAuthStore } from '@/store/auth.store';

export function isSuperAdmin() {
  return useAuthStore.getState().roles.includes(UserRole.SuperAdmin);
}

export function isAdminOrSuperAdmin() {
  const roles = useAuthStore.getState().roles;
  return roles.includes(UserRole.SuperAdmin) || roles.includes(UserRole.Admin);
}