import { useAuthStore } from "@/store/auth.store";
import type { UserRole } from "@/types/api/user";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const RoleGuard = (role: UserRole) => {
  const { roles } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!roles.includes(role)) {
      navigate("/");
    }
  }, [roles, navigate, role]);

  return null;
};
