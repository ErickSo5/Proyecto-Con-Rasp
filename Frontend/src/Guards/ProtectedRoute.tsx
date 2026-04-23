import { Navigate } from "react-router-dom";
import { useAuth } from "@/auth/useAuth";
import type { ReactNode } from "react";

type Role = "medico" | "cliente";

type Props = {
  children: ReactNode;
  allowedRoles?: Role[];
};

export default function ProtectedRoute({
  children,
  allowedRoles,
}: Props) {
  const { isAuthenticated, role, loading } = useAuth();
  const token = localStorage.getItem("auth_token")

  if (!token) {
    return <Navigate to="/login" replace />
  }

  if (loading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!role) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
