"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Stethoscope,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const roles = [
  { id: "medico", label: "Médico", redirect: "/dashboard" },
  { id: "enfermero", label: "Enfermero/a", redirect: "/dashboard" },
  { id: "administrativo", label: "Administrativo", redirect: "/dashboard" },
  { id: "personal", label: "Personal Administrativo", redirect: "/dashboard" },
  { id: "direccion", label: "Dirección Médica", redirect: "/dashboard" },
];

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
    name: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simular autenticación
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Guardar datos en localStorage para simular sesión
    const userData = {
      name: formData.name || "Usuario",
      email: formData.email,
      role: formData.role,
      roleLabel: roles.find((r) => r.id === formData.role)?.label || "Usuario",
    };
    localStorage.setItem("medicarePlusUser", JSON.stringify(userData));

    setIsLoading(false);
    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen">
      {/* Panel izquierdo - Formulario */}
      <div className="flex w-full flex-col justify-center bg-background px-8 py-12 lg:w-1/2 lg:px-16">
        <div className="mx-auto w-full max-w-md">
          {/* Logo */}
          <Link href="/" className="mb-8 flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#3B82F6]">
              <Stethoscope className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-[#2C3E50]">
              MediCare Plus
            </span>
          </Link>

          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold text-[#2C3E50]">
              Bienvenido de nuevo
            </h1>
            <p className="text-muted-foreground">
              Ingresa tus credenciales para acceder al sistema
            </p>
          </div>

          <Card className="border-0 shadow-none">
            <CardHeader className="p-0" />
            <CardContent className="p-0">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Nombre */}
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-[#2C3E50]"
                  >
                    Nombre completo
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Dr. Juan Pérez"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="h-12 border-[#d1e3f8] bg-white focus:border-[#3B82F6] focus:ring-[#3B82F6]"
                    required
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-[#2C3E50]"
                  >
                    Correo electrónico
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="correo@medicareplus.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="h-12 border-[#d1e3f8] bg-white pl-10 focus:border-[#3B82F6] focus:ring-[#3B82F6]"
                      required
                    />
                  </div>
                </div>

                {/* Rol */}
                <div className="space-y-2">
                  <label
                    htmlFor="role"
                    className="text-sm font-medium text-[#2C3E50]"
                  >
                    Rol en el sistema
                  </label>
                  <Select
                    value={formData.role}
                    onValueChange={(value) =>
                      setFormData({ ...formData, role: value })
                    }
                    required
                  >
                    <SelectTrigger className="h-12 border-[#d1e3f8] bg-white focus:border-[#3B82F6] focus:ring-[#3B82F6]">
                      <SelectValue placeholder="Selecciona tu rol" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role.id} value={role.id}>
                          {role.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Contraseña */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-sm font-medium text-[#2C3E50]"
                    >
                      Contraseña
                    </label>
                    <Link
                      href="#"
                      className="text-sm text-[#3B82F6] hover:underline"
                    >
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      className="h-12 border-[#d1e3f8] bg-white pl-10 pr-10 focus:border-[#3B82F6] focus:ring-[#3B82F6]"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-[#2C3E50]"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Recordarme */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="remember"
                    className="h-4 w-4 rounded border-[#d1e3f8] text-[#3B82F6] focus:ring-[#3B82F6]"
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm text-muted-foreground"
                  >
                    Mantener sesión iniciada
                  </label>
                </div>

                {/* Botón Submit */}
                <Button
                  type="submit"
                  disabled={isLoading || !formData.role}
                  className="h-12 w-full bg-[#3B82F6] text-white hover:bg-[#3B82F6]/90"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="h-5 w-5 animate-spin"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Iniciando sesión...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Iniciar Sesión
                      <ArrowRight className="h-5 w-5" />
                    </span>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            ¿Necesitas acceso al sistema?{" "}
            <Link href="#" className="text-[#3B82F6] hover:underline">
              Contacta con administración
            </Link>
          </p>
        </div>
      </div>

      {/* Panel derecho - Imagen/Info */}
      <div className="hidden bg-[#3B82F6] lg:flex lg:w-1/2 lg:flex-col lg:items-center lg:justify-center lg:p-12">
        <div className="max-w-md text-center text-white">
          <div className="mb-8 flex justify-center">
            <div className="rounded-full bg-white/20 p-6">
              <Stethoscope className="h-16 w-16" />
            </div>
          </div>
          <h2 className="mb-4 text-3xl font-bold">Sistema Médico Integral</h2>
          <p className="mb-8 text-lg text-white/90">
            Accede a todas las herramientas que necesitas para brindar la mejor
            atención a tus pacientes. Gestiona citas, historiales y
            comunicaciones en un solo lugar.
          </p>
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="mb-2 text-3xl font-bold">24/7</div>
              <div className="text-sm text-white/80">Disponibilidad</div>
            </div>
            <div>
              <div className="mb-2 text-3xl font-bold">100%</div>
              <div className="text-sm text-white/80">Seguro</div>
            </div>
            <div>
              <div className="mb-2 text-3xl font-bold">+50</div>
              <div className="text-sm text-white/80">Profesionales</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
