import { useAuthStore } from "@/store/auth.store";
import type { UserRole } from "@/types/api/user";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const RoleGuard = (roles: UserRole | UserRole[]) => {
  const { roles: storedRoles } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const hasRequiredRole = Array.isArray(roles)
      ? roles.some(role => storedRoles.includes(role))
      : storedRoles.includes(roles);

    if (!hasRequiredRole) {
      navigate("/");
    }
  }, [storedRoles, navigate, roles]);

  return null;
};
