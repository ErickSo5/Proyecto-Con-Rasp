import { useEffect, useState } from "react";

type UserRole = "medico" | "cliente" | null;

type AuthState = {
  isAuthenticated: boolean;
  role: UserRole;
  loading: boolean;
};

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export function useAuth(): AuthState {
  const [state, setState] = useState<AuthState>(() => {
    const token = localStorage.getItem("auth_token");
    const role = (localStorage.getItem("auth_role") as UserRole) ?? null;
    if (token) {
      return { isAuthenticated: true, role, loading: true };
    }
    return { isAuthenticated: false, role: null, loading: false };
  });

  useEffect(() => {
    const token = localStorage.getItem("auth_token");

    if (!token) {
      setState({ isAuthenticated: false, role: null, loading: false });
      return;
    }

    const controller = new AbortController();

    fetch(`${API_URL}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      signal: controller.signal,
    })
      .then(async (response) => {
        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            throw new Error("Unauthorized");
          }
          return null;
        }
        return response.json();
      })
      .then((data) => {
        if (!data) {
          setState((prev) => ({ ...prev, loading: false }));
          return;
        }
        const role = (data?.user?.rol ?? data?.user?.role ?? null) as UserRole;
        if (role) {
          localStorage.setItem("auth_role", role);
        }
        setState({ isAuthenticated: true, role, loading: false });
      })
      .catch((err) => {
        if (err instanceof Error && err.message === "Unauthorized") {
          localStorage.removeItem("auth_token");
          localStorage.removeItem("auth_role");
          setState({ isAuthenticated: false, role: null, loading: false });
          return;
        }
        setState((prev) => ({ ...prev, loading: false }));
      });

    return () => controller.abort();
  }, []);

  return state;
}
