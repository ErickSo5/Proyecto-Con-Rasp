import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"
import { AlertTriangle } from "lucide-react";

import {
  Stethoscope,
  Calendar,
  CalendarDays,
  Users,
  FileText,
  MessageSquare,
  HelpCircle,
  LogOut,
  Bell,
  Settings,
  ChevronRight,
  Clock,
  Activity,
  TrendingUp,
  UserCheck,
  ClipboardList,
  Building2,
  Briefcase,
  Shield,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface UserData {
  name: string;
  email: string;
  role: string;
  roleLabel: string;
  mfa_habilitado?: boolean
}

const roleConfig: Record<
  string,
  {
    icon: React.ElementType;
    color: string;
    bgColor: string;
    greeting: string;
    description: string;
    quickActions: { label: string; to: string; icon: React.ElementType }[];
    stats: { label: string; value: string; icon: React.ElementType }[];
  }
> = {
  medico: {
    icon: Stethoscope,
    color: "text-[#3B82F6]",
    bgColor: "bg-[#3B82F6]/10",
    greeting: "Bienvenido, Doctor",
    description:
      "Gestiona tus citas, revisa historiales y atiende a tus pacientes.",
    quickActions: [
      { label: "Mis Citas", to: "/medico/citas", icon: Calendar },
      { label: "Mi Agenda", to: "/medico/agenda", icon: CalendarDays },
      { label: "Pacientes", to: "#", icon: Users },
      { label: "Ayuda", to: "/medico/ayuda", icon: HelpCircle },
    ],
    stats: [
      { label: "Citas Hoy", value: "8", icon: Calendar },
      { label: "Pacientes Atendidos", value: "156", icon: UserCheck },
      { label: "Citas Pendientes", value: "12", icon: Clock },
      { label: "Mensajes", value: "5", icon: MessageSquare },
    ],
  },
  enfermero: {
    icon: Heart,
    color: "text-rose-500",
    bgColor: "bg-rose-500/10",
    greeting: "Bienvenido/a, Enfermero/a",
    description:
      "Administra el cuidado de pacientes y coordina con el equipo médico.",
    quickActions: [
      { label: "Pacientes", to: "#", icon: Users },
      { label: "Signos Vitales", to: "#", icon: Activity },
      { label: "Medicamentos", to: "#", icon: ClipboardList },
      { label: "Ayuda", to: "/medico/ayuda", icon: HelpCircle },
    ],
    stats: [
      { label: "Pacientes Asignados", value: "15", icon: Users },
      { label: "Medicamentos Hoy", value: "32", icon: ClipboardList },
      { label: "Signos Registrados", value: "45", icon: Activity },
      { label: "Alertas", value: "2", icon: Bell },
    ],
  },
  administrativo: {
    icon: Briefcase,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    greeting: "Bienvenido/a, Administrativo",
    description:
      "Gestiona citas, registros de pacientes y procesos administrativos.",
    quickActions: [
      { label: "Agendar Citas", to: "/agendar-cita", icon: Calendar },
      { label: "Pacientes", to: "#", icon: Users },
      { label: "Reportes", to: "#", icon: FileText },
      { label: "Ayuda", to: "/medico/ayuda", icon: HelpCircle },
    ],
    stats: [
      { label: "Citas Agendadas", value: "24", icon: Calendar },
      { label: "Pacientes Nuevos", value: "8", icon: UserCheck },
      { label: "Llamadas Hoy", value: "35", icon: MessageSquare },
      { label: "Pendientes", value: "6", icon: Clock },
    ],
  },
  personal: {
    icon: Building2,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    greeting: "Bienvenido/a, Personal Administrativo",
    description:
      "Supervisa operaciones, recursos humanos y procesos internos de la clínica.",
    quickActions: [
      { label: "Personal", to: "#", icon: Users },
      { label: "Reportes", to: "#", icon: FileText },
      { label: "Inventario", to: "#", icon: ClipboardList },
      { label: "Ayuda", to: "/medico/ayuda", icon: HelpCircle },
    ],
    stats: [
      { label: "Empleados Activos", value: "52", icon: Users },
      { label: "Turnos Hoy", value: "18", icon: Clock },
      { label: "Solicitudes", value: "7", icon: FileText },
      { label: "Pendientes", value: "3", icon: Bell },
    ],
  },
  direccion: {
    icon: Shield,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    greeting: "Bienvenido/a, Director/a Médico",
    description:
      "Supervisa la operación médica, calidad de atención y toma de decisiones estratégicas.",
    quickActions: [
      { label: "Dashboard", to: "#", icon: TrendingUp },
      { label: "Médicos", to: "#", icon: Stethoscope },
      { label: "Reportes", to: "#", icon: FileText },
      { label: "Configuración", to: "#", icon: Settings },
    ],
    stats: [
      { label: "Médicos Activos", value: "28", icon: Stethoscope },
      { label: "Citas del Día", value: "156", icon: Calendar },
      { label: "Satisfacción", value: "98%", icon: TrendingUp },
      { label: "Ingresos Mes", value: "$45K", icon: Activity },
    ],
  },
};

export default function DashboardPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserData | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Obtener datos del usuario
    const storedUser = localStorage.getItem("medicarePlusUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login");
    }

    // Actualizar hora cada minuto
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("medicarePlusUser");
    navigate("/login");
  };

  const handleActivateMFA = () => {
    navigate("/setup-mfa");
  };

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#EAF2FE]">
        <div className="flex items-center gap-3">
          <svg className="h-8 w-8 animate-spin text-[#3B82F6]" viewBox="0 0 24 24">
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
          <span className="text-lg text-[#2C3E50]">Cargando...</span>
        </div>
      </div>
    );
  }

  const config = roleConfig[user.role] || roleConfig.medico;
  const RoleIcon = config.icon;

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Buenos días";
    if (hour < 19) return "Buenas tardes";
    return "Buenas noches";
  };

  return (
    <div className="min-h-screen bg-[#EAF2FE]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[#d1e3f8] bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#3B82F6]">
              <Stethoscope className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold text-[#2C3E50]">
              MediCare Plus
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-[#2C3E50]" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                3
              </span>
            </Button>

            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9 border-2 border-[#3B82F6]">
                <AvatarImage src="" />
                <AvatarFallback className="bg-[#3B82F6] text-white">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-[#2C3E50]">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.roleLabel}</p>
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="text-muted-foreground hover:text-red-500"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8 overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between md:p-8">
            <div className="flex items-center gap-5">
              <div
                className={`flex h-20 w-20 items-center justify-center rounded-2xl ${config.bgColor}`}
              >
                <RoleIcon className={`h-10 w-10 ${config.color}`} />
              </div>
            <div>
                <h1 className="text-2xl font-bold text-[#2C3E50] md:text-3xl">
                  Bienvenido, <span className={config.color}>{user.name.split(' ')[0]}</span>
                </h1>
                <p className="mt-2 text-lg font-semibold text-[#2C3E50]">
                  Rol: {user.roleLabel}
                </p>
                <p className="mt-2 text-muted-foreground">{config.description}</p>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <Badge
                variant="outline"
                className={`${config.bgColor} ${config.color} border-0 px-3 py-1 text-sm font-medium`}
              >
                {user.roleLabel}
              </Badge>
              <p className="text-sm text-muted-foreground">
                {currentTime.toLocaleDateString("es-ES", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="text-lg font-semibold text-[#2C3E50]">
                {currentTime.toLocaleTimeString("es-ES", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        </div>

        {!user.mfa_habilitado && (
        <Card className="mb-6 border-amber-300 bg-amber-50">
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-amber-600" />
              <div>
                <p className="font-semibold text-amber-800">
                  Seguridad recomendada
                </p>
                <p className="text-sm text-amber-700">
                  Tu cuenta no tiene autenticación en dos factores (MFA) activada.
                  Actívala para proteger mejor tu cuenta.
                </p>
              </div>
            </div>

            {user.mfa_habilitado ? (
              <Badge className="bg-green-100 text-green-700">
                MFA activado
              </Badge>
            ) : (
              <Button
                onClick={handleActivateMFA}
                className="bg-amber-500 hover:bg-amber-600"
              >
                Activar MFA
              </Button>
            )}
          </CardContent>
        </Card>
      )}

        {/* Stats Grid */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {config.stats.map((stat, index) => {
            const StatIcon = stat.icon;
            return (
              <Card
                key={index}
                className="border-0 bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <CardContent className="flex items-center gap-4 p-5">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${config.bgColor}`}
                  >
                    <StatIcon className={`h-6 w-6 ${config.color}`} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#2C3E50]">
                      {stat.value}
                    </p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <Card className="mb-8 border-0 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg text-[#2C3E50]">
              Acciones Rápidas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {config.quickActions.map((action, index) => {
                const ActionIcon = action.icon;
                return (
                  <Link
                    key={index}
                    to={action.to}
                    className="group flex items-center justify-between rounded-xl border border-[#d1e3f8] p-4 transition-all hover:border-[#3B82F6] hover:bg-[#3B82F6]/5"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EAF2FE] transition-colors group-hover:bg-[#3B82F6]/10">
                        <ActionIcon className="h-5 w-5 text-[#3B82F6]" />
                      </div>
                      <span className="font-medium text-[#2C3E50]">
                        {action.label}
                      </span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-[#3B82F6]" />
                  </Link>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-0 bg-white shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg text-[#2C3E50]">
                Actividad Reciente
              </CardTitle>
              <Button variant="ghost" size="sm" className="text-[#3B82F6]">
                Ver todo
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "Cita confirmada",
                    description: "Paciente María López - 10:30 AM",
                    time: "Hace 5 min",
                  },
                  {
                    title: "Nuevo mensaje",
                    description: "Dr. García envió un mensaje",
                    time: "Hace 15 min",
                  },
                  {
                    title: "Historial actualizado",
                    description: "Paciente Juan Rodríguez",
                    time: "Hace 1 hora",
                  },
                  {
                    title: "Cita completada",
                    description: "Paciente Ana Martínez - Cardiología",
                    time: "Hace 2 horas",
                  },
                ].map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-lg border border-[#d1e3f8] p-3"
                  >
                    <div className="mt-1 h-2 w-2 rounded-full bg-[#3B82F6]" />
                    <div className="flex-1">
                      <p className="font-medium text-[#2C3E50]">
                        {activity.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {activity.description}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {activity.time}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg text-[#2C3E50]">
                Próximas Citas
              </CardTitle>
              <Button variant="ghost" size="sm" className="text-[#3B82F6]">
                Ver agenda
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    patient: "Carlos Mendoza",
                    time: "09:00 AM",
                    type: "Consulta General",
                  },
                  {
                    patient: "Laura Sánchez",
                    time: "10:30 AM",
                    type: "Control",
                  },
                  {
                    patient: "Roberto Díaz",
                    time: "11:00 AM",
                    type: "Primera Vez",
                  },
                  {
                    patient: "Patricia Gómez",
                    time: "12:00 PM",
                    type: "Seguimiento",
                  },
                ].map((appointment, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border border-[#d1e3f8] p-3"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-[#EAF2FE] text-[#3B82F6]">
                          {appointment.patient
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-[#2C3E50]">
                          {appointment.patient}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {appointment.type}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className="border-[#3B82F6] bg-[#3B82F6]/10 text-[#3B82F6]"
                    >
                      {appointment.time}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
