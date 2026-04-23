import { useState, useMemo } from "react";
import { Link } from "react-router-dom"
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  LogOut,
  CalendarDays,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import MedicoHeader from "@/components/HeaderMedico";

type AppointmentStatus =
  | "pendiente"
  | "confirmada"
  | "completada"
  | "cancelada";

interface Appointment {
  id: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  date: string;
  time: string;
  specialty: string;
  reason: string;
  status: AppointmentStatus;
  notes?: string;
}

const appointments: Appointment[] = [
  {
    id: "1",
    patientName: "María García López",
    patientEmail: "maria.garcia@email.com",
    patientPhone: "+34 612 345 678",
    date: "2026-01-27",
    time: "09:00",
    specialty: "Medicina General",
    reason: "Chequeo general anual",
    status: "pendiente",
  },
  {
    id: "2",
    patientName: "Carlos Rodríguez Pérez",
    patientEmail: "carlos.rodriguez@email.com",
    patientPhone: "+34 623 456 789",
    date: "2026-01-27",
    time: "10:00",
    specialty: "Medicina General",
    reason: "Dolor de cabeza persistente",
    status: "confirmada",
  },
  {
    id: "3",
    patientName: "Ana Martínez Ruiz",
    patientEmail: "ana.martinez@email.com",
    patientPhone: "+34 634 567 890",
    date: "2026-01-27",
    time: "11:00",
    specialty: "Medicina General",
    reason: "Seguimiento de tratamiento",
    status: "pendiente",
  },
  {
    id: "4",
    patientName: "Luis Fernández Gómez",
    patientEmail: "luis.fernandez@email.com",
    patientPhone: "+34 645 678 901",
    date: "2026-01-26",
    time: "09:30",
    specialty: "Medicina General",
    reason: "Revisión de análisis",
    status: "completada",
    notes: "Resultados normales. Continuar con medicación actual.",
  },
  {
    id: "5",
    patientName: "Elena Sánchez Torres",
    patientEmail: "elena.sanchez@email.com",
    patientPhone: "+34 656 789 012",
    date: "2026-01-26",
    time: "10:30",
    specialty: "Medicina General",
    reason: "Consulta por alergias",
    status: "cancelada",
  },
  {
    id: "6",
    patientName: "Pedro López Navarro",
    patientEmail: "pedro.lopez@email.com",
    patientPhone: "+34 667 890 123",
    date: "2026-01-28",
    time: "09:00",
    specialty: "Medicina General",
    reason: "Dolor lumbar",
    status: "pendiente",
  },
  {
    id: "7",
    patientName: "Laura Díaz Moreno",
    patientEmail: "laura.diaz@email.com",
    patientPhone: "+34 678 901 234",
    date: "2026-01-28",
    time: "11:30",
    specialty: "Medicina General",
    reason: "Vacunación",
    status: "confirmada",
  },
  {
    id: "8",
    patientName: "Javier Ruiz Castro",
    patientEmail: "javier.ruiz@email.com",
    patientPhone: "+34 689 012 345",
    date: "2026-01-25",
    time: "10:00",
    specialty: "Medicina General",
    reason: "Control de presión arterial",
    status: "completada",
    notes: "Presión estable. Reducir sal en dieta.",
  },
  {
    id: "9",
    patientName: "Carmen Herrera Vega",
    patientEmail: "carmen.herrera@email.com",
    patientPhone: "+34 690 123 456",
    date: "2026-01-29",
    time: "12:00",
    specialty: "Medicina General",
    reason: "Renovación de receta",
    status: "pendiente",
  },
  {
    id: "10",
    patientName: "Miguel Torres Blanco",
    patientEmail: "miguel.torres@email.com",
    patientPhone: "+34 601 234 567",
    date: "2026-01-25",
    time: "11:00",
    specialty: "Medicina General",
    reason: "Consulta dermatológica",
    status: "completada",
    notes: "Derivado a dermatología para evaluación especializada.",
  },
  {
    id: "11",
    patientName: "Sofía Vega Ramírez",
    patientEmail: "sofia.vega@email.com",
    patientPhone: "+34 612 987 654",
    date: "2026-01-30",
    time: "09:00",
    specialty: "Medicina General",
    reason: "Consulta general",
    status: "confirmada",
  },
  {
    id: "12",
    patientName: "Diego Morales Cruz",
    patientEmail: "diego.morales@email.com",
    patientPhone: "+34 623 876 543",
    date: "2026-01-30",
    time: "10:30",
    specialty: "Medicina General",
    reason: "Dolor abdominal",
    status: "pendiente",
  },
  {
    id: "13",
    patientName: "Patricia Luna Ortiz",
    patientEmail: "patricia.luna@email.com",
    patientPhone: "+34 634 765 432",
    date: "2026-02-02",
    time: "09:00",
    specialty: "Medicina General",
    reason: "Chequeo preventivo",
    status: "confirmada",
  },
  {
    id: "14",
    patientName: "Andrés Campos Silva",
    patientEmail: "andres.campos@email.com",
    patientPhone: "+34 645 654 321",
    date: "2026-02-03",
    time: "11:00",
    specialty: "Medicina General",
    reason: "Seguimiento tratamiento",
    status: "pendiente",
  },
];

const statusConfig = {
  pendiente: {
    label: "Pendiente",
    color: "bg-amber-500",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
  },
  confirmada: {
    label: "Confirmada",
    color: "bg-[#3B82F6]",
    badgeColor: "bg-[#3B82F6]/10 text-[#3B82F6] border-[#3B82F6]/20",
  },
  completada: {
    label: "Completada",
    color: "bg-emerald-500",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
  },
  cancelada: {
    label: "Cancelada",
    color: "bg-red-500",
    badgeColor: "bg-red-100 text-red-800 border-red-200",
  },
};

const timeSlots = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
  "16:00", "16:30", "17:00", "17:30", "18:00", "18:30",
];

const DAYS_OF_WEEK = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

export default function DoctorAgendaPage() {
  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_role");
    window.location.assign("/login");
  };
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 1));
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date(2026, 0, 27));

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    
    let startingDay = firstDay.getDay() - 1;
    if (startingDay < 0) startingDay = 6;
    
    const days: (Date | null)[] = [];
    
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const calendarDays = useMemo(() => getDaysInMonth(currentDate), [currentDate]);

  const getAppointmentsForDate = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0];
    return appointments.filter(
      (a) => a.date === dateStr && a.status !== "cancelada"
    );
  };

  const selectedDateAppointments = useMemo(() => {
    if (!selectedDate) return [];
    return getAppointmentsForDate(selectedDate).sort((a, b) => 
      a.time.localeCompare(b.time)
    );
  }, [selectedDate]);

  const getAppointmentForSlot = (time: string) => {
    return selectedDateAppointments.find((a) => a.time === time);
  };

  const hasAppointments = (date: Date) => {
    return getAppointmentsForDate(date).length > 0;
  };

  const getAppointmentCount = (date: Date) => {
    return getAppointmentsForDate(date).length;
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      if (direction === "prev") {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (date: Date) => {
    if (!selectedDate) return false;
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  const formatSelectedDate = () => {
    if (!selectedDate) return "";
    return selectedDate.toLocaleDateString("es-ES", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const monthStats = useMemo(() => {
    let occupied = 0;
    let free = 0;
    const workDays = calendarDays.filter((d) => d !== null).length;
    
    calendarDays.forEach((day) => {
      if (day) {
        const dayAppointments = getAppointmentsForDate(day);
        occupied += dayAppointments.length;
      }
    });
    
    free = workDays * timeSlots.length - occupied;
    
    return { occupied, free, workDays };
  }, [calendarDays]);

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-card">
        <div className="flex h-full flex-col">
          <MedicoHeader />
          {/* Logout */}
          <div className="border-t border-border p-4">
            <Link
              to="/login"
              onClick={(event) => {
                event.preventDefault();
                handleLogout();
              }}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <LogOut className="h-4 w-4" />
              Cerrar Sesión
            </Link>
          </div>
        </div>
      </aside>


      {/* Main Content */}
      <main className="ml-64 min-h-screen">

        <header className="sticky top-0 z-30 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
          <div className="flex h-16 items-center justify-between px-6">
            <div>
              <h1 className="text-xl font-semibold text-foreground">
                Mi Agenda
              </h1>
              <p className="text-sm text-muted-foreground">
                Visualiza tu disponibilidad y citas programadas
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                {new Date().toLocaleDateString("es-ES", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        </header>

        <div className="p-6">
          {/* Stats Cards */}
          <div className="mb-6 grid gap-4 sm:grid-cols-3">
            <Card className="border-border bg-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Citas Este Mes
                </CardTitle>
                <Calendar className="h-4 w-4 text-[#3B82F6]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {monthStats.occupied}
                </div>
                <p className="text-xs text-muted-foreground">
                  Horas ocupadas
                </p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Disponibilidad
                </CardTitle>
                <Clock className="h-4 w-4 text-emerald-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {monthStats.free}
                </div>
                <p className="text-xs text-muted-foreground">
                  Horas disponibles
                </p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Citas Hoy
                </CardTitle>
                <CalendarDays className="h-4 w-4 text-[#60A6FA]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {selectedDate ? selectedDateAppointments.length : 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  {selectedDate ? formatSelectedDate().split(",")[0] : "Selecciona un día"}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Calendar */}
            <Card className="border-border bg-card">
              <CardHeader className="border-b border-border">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-foreground">
                    {currentDate.toLocaleDateString("es-ES", {
                      month: "long",
                      year: "numeric",
                    })}
                  </CardTitle>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => navigateMonth("prev")}
                      className="h-8 w-8 text-muted-foreground hover:text-foreground"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => navigateMonth("next")}
                      className="h-8 w-8 text-muted-foreground hover:text-foreground"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                {/* Days of week header */}
                <div className="mb-2 grid grid-cols-7 gap-1">
                  {DAYS_OF_WEEK.map((day) => (
                    <div
                      key={day}
                      className="py-2 text-center text-xs font-medium text-muted-foreground"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar grid */}
                <div className="grid grid-cols-7 gap-1">
                  {calendarDays.map((day, index) => {
                    if (!day) {
                      return <div key={`empty-${index}`} className="aspect-square" />;
                    }

                    const appointmentCount = getAppointmentCount(day);
                    const hasAppts = hasAppointments(day);

                    return (
                      <button
                        key={day.toISOString()}
                        onClick={() => setSelectedDate(day)}
                        className={cn(
                          "relative flex aspect-square flex-col items-center justify-center rounded-lg text-sm transition-colors",
                          isSelected(day)
                            ? "bg-[#3B82F6] text-white"
                            : isToday(day)
                            ? "bg-[#3B82F6]/10 text-[#3B82F6] font-semibold"
                            : "hover:bg-muted text-foreground",
                          hasAppts && !isSelected(day) && "font-medium"
                        )}
                      >
                        <span>{day.getDate()}</span>
                        {hasAppts && (
                          <div className="absolute bottom-1 flex gap-0.5">
                            {appointmentCount <= 3 ? (
                              Array.from({ length: appointmentCount }).map((_, i) => (
                                <div
                                  key={i}
                                  className={cn(
                                    "h-1 w-1 rounded-full",
                                    isSelected(day)
                                      ? "bg-white"
                                      : "bg-[#3B82F6]"
                                  )}
                                />
                              ))
                            ) : (
                              <span
                                className={cn(
                                  "text-[10px]",
                                  isSelected(day)
                                    ? "text-white/80"
                                    : "text-[#3B82F6]"
                                )}
                              >
                                +{appointmentCount}
                              </span>
                            )}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-border pt-4">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-amber-500" />
                    <span className="text-xs text-muted-foreground">Pendiente</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-[#3B82F6]" />
                    <span className="text-xs text-muted-foreground">Confirmada</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-emerald-500" />
                    <span className="text-xs text-muted-foreground">Completada</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Daily Schedule */}
            <Card className="border-border bg-card">
              <CardHeader className="border-b border-border">
                <CardTitle className="text-lg font-semibold text-foreground">
                  {selectedDate ? (
                    <span className="capitalize">{formatSelectedDate()}</span>
                  ) : (
                    "Selecciona un día"
                  )}
                </CardTitle>
                {selectedDate && (
                  <p className="text-sm text-muted-foreground">
                    {selectedDateAppointments.length} citas programadas
                  </p>
                )}
              </CardHeader>
              <CardContent className="p-0">
                {selectedDate ? (
                  <div className="max-h-[500px] overflow-y-auto">
                    <div className="divide-y divide-border">
                      {timeSlots.map((time) => {
                        const appointment = getAppointmentForSlot(time);
                        const isLunchBreak = time === "13:30";

                        if (isLunchBreak) {
                          return (
                            <div
                              key={time}
                              className="flex items-center gap-4 bg-muted/30 px-4 py-3"
                            >
                              <span className="w-16 text-sm font-medium text-muted-foreground">
                                13:30
                              </span>
                              <div className="flex-1">
                                <p className="text-sm text-muted-foreground italic">
                                  Pausa - Almuerzo
                                </p>
                              </div>
                            </div>
                          );
                        }

                        return (
                          <div
                            key={time}
                            className={cn(
                              "flex items-start gap-4 px-4 py-3 transition-colors",
                              appointment
                                ? "bg-card hover:bg-muted/30"
                                : "bg-card"
                            )}
                          >
                            <span className="w-16 pt-0.5 text-sm font-medium text-muted-foreground">
                              {time}
                            </span>
                            {appointment ? (
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                  <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2">
                                      <p className="truncate text-sm font-medium text-foreground">
                                        {appointment.patientName}
                                      </p>
                                      <Badge
                                        variant="outline"
                                        className={cn(
                                          "shrink-0 text-xs",
                                          statusConfig[appointment.status].badgeColor
                                        )}
                                      >
                                        {statusConfig[appointment.status].label}
                                      </Badge>
                                    </div>
                                    <p className="mt-1 truncate text-xs text-muted-foreground">
                                      {appointment.reason}
                                    </p>
                                  </div>
                                  <Link
                                    to="/medico/citas"
                                    className="shrink-0 text-xs text-[#3B82F6] hover:underline"
                                  >
                                    Ver detalles
                                  </Link>
                                </div>
                              </div>
                            ) : (
                              <div className="flex-1">
                                <p className="text-sm text-muted-foreground/60">
                                  Disponible
                                </p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="flex h-64 items-center justify-center">
                    <p className="text-sm text-muted-foreground">
                      Selecciona un día en el calendario para ver los horarios
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Weekly Overview */}
          <Card className="mt-6 border-border bg-card">
            <CardHeader className="border-b border-border">
              <CardTitle className="text-lg font-semibold text-foreground">
                Resumen de Citas por Estado
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {(["pendiente", "confirmada", "completada", "cancelada"] as const).map(
                  (status) => {
                    const count = appointments.filter(
                      (a) => a.status === status
                    ).length;
                    return (
                      <div
                        key={status}
                        className="flex items-center gap-3 rounded-lg border border-border p-4"
                      >
                        <div
                          className={cn(
                            "h-10 w-10 rounded-full flex items-center justify-center",
                            status === "pendiente" && "bg-amber-100",
                            status === "confirmada" && "bg-[#3B82F6]/10",
                            status === "completada" && "bg-emerald-100",
                            status === "cancelada" && "bg-red-100"
                          )}
                        >
                          <div
                            className={cn(
                              "h-3 w-3 rounded-full",
                              statusConfig[status].color
                            )}
                          />
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-foreground">
                            {count}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {statusConfig[status].label}
                          </p>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
