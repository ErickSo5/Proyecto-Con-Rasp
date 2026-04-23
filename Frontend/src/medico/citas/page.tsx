import { useState, useMemo } from "react";
import {
  Search,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Filter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
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

const initialAppointments: Appointment[] = [
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
];

const statusConfig = {
  pendiente: {
    label: "Pendiente",
    color: "bg-amber-100 text-amber-800 border-amber-200",
    icon: AlertCircle,
  },
  confirmada: {
    label: "Confirmada",
    color: "bg-[#3B82F6]/10 text-[#3B82F6] border-[#3B82F6]/20",
    icon: CheckCircle2,
  },
  completada: {
    label: "Completada",
    color: "bg-emerald-100 text-emerald-800 border-emerald-200",
    icon: CheckCircle2,
  },
  cancelada: {
    label: "Cancelada",
    color: "bg-red-100 text-red-800 border-red-200",
    icon: XCircle,
  },
};

export default function DoctorAppointmentsPage() {
  const [appointments, setAppointments] =
    useState<Appointment[]>(initialAppointments);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [activeTab, setActiveTab] = useState("todas");
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [dialogType, setDialogType] = useState<
    "details" | "reject" | "complete" | null
  >(null);
  const [rejectReason, setRejectReason] = useState("");
  const [completionNotes, setCompletionNotes] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      const matchesSearch =
        appointment.patientName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        appointment.patientEmail
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        appointment.reason.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDate = dateFilter ? appointment.date === dateFilter : true;

      const matchesTab =
        activeTab === "todas" || appointment.status === activeTab;

      return matchesSearch && matchesDate && matchesTab;
    });
  }, [appointments, searchTerm, dateFilter, activeTab]);

  const paginatedAppointments = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredAppointments.slice(start, start + itemsPerPage);
  }, [filteredAppointments, currentPage]);

  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);

  const stats = useMemo(() => {
    const today = new Date().toISOString().split("T")[0];
    return {
      pendientes: appointments.filter((a) => a.status === "pendiente").length,
      confirmadas: appointments.filter((a) => a.status === "confirmada").length,
      hoy: appointments.filter(
        (a) => a.date === today && ["pendiente", "confirmada"].includes(a.status)
      ).length,
      completadas: appointments.filter((a) => a.status === "completada").length,
    };
  }, [appointments]);

  const handleAccept = (appointment: Appointment) => {
    setAppointments((prev) =>
      prev.map((a) =>
        a.id === appointment.id ? { ...a, status: "confirmada" } : a
      )
    );
  };

  const handleReject = () => {
    if (selectedAppointment) {
      setAppointments((prev) =>
        prev.map((a) =>
          a.id === selectedAppointment.id ? { ...a, status: "cancelada" } : a
        )
      );
      setDialogType(null);
      setSelectedAppointment(null);
      setRejectReason("");
    }
  };

  const handleComplete = () => {
    if (selectedAppointment) {
      setAppointments((prev) =>
        prev.map((a) =>
          a.id === selectedAppointment.id
            ? { ...a, status: "completada", notes: completionNotes }
            : a
        )
      );
      setDialogType(null);
      setSelectedAppointment(null);
      setCompletionNotes("");
    }
  };

  const openRejectDialog = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setDialogType("reject");
  };

  const openCompleteDialog = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setCompletionNotes(appointment.notes || "");
    setDialogType("complete");
  };

  const openDetailsDialog = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setDialogType("details");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <MedicoHeader />

      {/* Main Content */}
      <main className="ml-64 min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-30 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
          <div className="flex h-16 items-center justify-between px-6">
            <div>
              <h1 className="text-xl font-semibold text-foreground">
                Panel de Citas
              </h1>
              <p className="text-sm text-muted-foreground">
                Gestiona tus citas médicas
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
          <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="border-border bg-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Pendientes
                </CardTitle>
                <AlertCircle className="h-4 w-4 text-amber-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {stats.pendientes}
                </div>
                <p className="text-xs text-muted-foreground">
                  Por confirmar
                </p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Confirmadas
                </CardTitle>
                <CheckCircle2 className="h-4 w-4 text-[#3B82F6]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {stats.confirmadas}
                </div>
                <p className="text-xs text-muted-foreground">Listas para atender</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Citas Hoy
                </CardTitle>
                <Calendar className="h-4 w-4 text-[#60A6FA]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {stats.hoy}
                </div>
                <p className="text-xs text-muted-foreground">Programadas</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Completadas
                </CardTitle>
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {stats.completadas}
                </div>
                <p className="text-xs text-muted-foreground">Este mes</p>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Search */}
          <Card className="mb-6 border-border bg-card">
            <CardContent className="pt-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por paciente, email o motivo..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 bg-background border-input"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <Input
                      type="date"
                      value={dateFilter}
                      onChange={(e) => setDateFilter(e.target.value)}
                      className="w-auto bg-background border-input"
                    />
                  </div>
                  {dateFilter && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setDateFilter("")}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Limpiar
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs and Table */}
          <Card className="border-border bg-card">
            <Tabs
              value={activeTab}
              onValueChange={(value) => {
                setActiveTab(value);
                setCurrentPage(1);
              }}
            >
              <CardHeader className="border-b border-border pb-0">
                <TabsList className="bg-muted">
                  <TabsTrigger value="todas">
                    Todas ({appointments.length})
                  </TabsTrigger>
                  <TabsTrigger value="pendiente">
                    Pendientes ({stats.pendientes})
                  </TabsTrigger>
                  <TabsTrigger value="confirmada">
                    Confirmadas ({stats.confirmadas})
                  </TabsTrigger>
                  <TabsTrigger value="completada">
                    Completadas ({stats.completadas})
                  </TabsTrigger>
                </TabsList>
              </CardHeader>

              <CardContent className="p-0">
                <TabsContent value={activeTab} className="m-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border hover:bg-transparent">
                        <TableHead className="text-muted-foreground">Paciente</TableHead>
                        <TableHead className="text-muted-foreground">Fecha y Hora</TableHead>
                        <TableHead className="text-muted-foreground">Motivo</TableHead>
                        <TableHead className="text-muted-foreground">Estado</TableHead>
                        <TableHead className="text-right text-muted-foreground">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedAppointments.length === 0 ? (
                        <TableRow>
                          <TableCell
                            colSpan={5}
                            className="h-24 text-center text-muted-foreground"
                          >
                            No se encontraron citas
                          </TableCell>
                        </TableRow>
                      ) : (
                        paginatedAppointments.map((appointment) => {
                          const StatusIcon =
                            statusConfig[appointment.status].icon;
                          return (
                            <TableRow
                              key={appointment.id}
                              className="border-border cursor-pointer hover:bg-muted/50"
                              onClick={() => openDetailsDialog(appointment)}
                            >
                              <TableCell>
                                <div className="flex items-center gap-3">
                                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#3B82F6]/10">
                                    <User className="h-4 w-4 text-[#3B82F6]" />
                                  </div>
                                  <div>
                                    <p className="font-medium text-foreground">
                                      {appointment.patientName}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                      {appointment.patientEmail}
                                    </p>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-4 w-4 text-muted-foreground" />
                                  <div>
                                    <p className="text-sm text-foreground">
                                      {new Date(
                                        appointment.date
                                      ).toLocaleDateString("es-ES", {
                                        day: "numeric",
                                        month: "short",
                                      })}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                      {appointment.time}
                                    </p>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <p className="max-w-[200px] truncate text-sm text-foreground">
                                  {appointment.reason}
                                </p>
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant="outline"
                                  className={`${statusConfig[appointment.status].color} gap-1`}
                                >
                                  <StatusIcon className="h-3 w-3" />
                                  {statusConfig[appointment.status].label}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <div
                                  className="flex items-center justify-end gap-2"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  {appointment.status === "pendiente" && (
                                    <>
                                      <Button
                                        size="sm"
                                        onClick={() => handleAccept(appointment)}
                                        className="bg-[#3B82F6] hover:bg-[#3B82F6]/90 text-white"
                                      >
                                        Aceptar
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() =>
                                          openRejectDialog(appointment)
                                        }
                                        className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                                      >
                                        Rechazar
                                      </Button>
                                    </>
                                  )}
                                  {appointment.status === "confirmada" && (
                                    <Button
                                      size="sm"
                                      onClick={() =>
                                        openCompleteDialog(appointment)
                                      }
                                      className="bg-emerald-600 hover:bg-emerald-700 text-white"
                                    >
                                      Completar
                                    </Button>
                                  )}
                                  {appointment.status === "completada" && (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() =>
                                        openDetailsDialog(appointment)
                                      }
                                      className="border-border text-foreground hover:bg-muted"
                                    >
                                      Ver notas
                                    </Button>
                                  )}
                                </div>
                              </TableCell>
                            </TableRow>
                          );
                        })
                      )}
                    </TableBody>
                  </Table>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-between border-t border-border px-4 py-3">
                      <p className="text-sm text-muted-foreground">
                        Mostrando {(currentPage - 1) * itemsPerPage + 1} a{" "}
                        {Math.min(
                          currentPage * itemsPerPage,
                          filteredAppointments.length
                        )}{" "}
                        de {filteredAppointments.length} citas
                      </p>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setCurrentPage((p) => Math.max(1, p - 1))
                          }
                          disabled={currentPage === 1}
                          className="border-border"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <span className="text-sm text-foreground">
                          {currentPage} / {totalPages}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setCurrentPage((p) => Math.min(totalPages, p + 1))
                          }
                          disabled={currentPage === totalPages}
                          className="border-border"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </TabsContent>
              </CardContent>
            </Tabs>
          </Card>
        </div>
      </main>

      {/* Details Dialog */}
      <Dialog
        open={dialogType === "details"}
        onOpenChange={() => {
          setDialogType(null);
          setSelectedAppointment(null);
        }}
      >
        <DialogContent className="sm:max-w-lg bg-card">
          <DialogHeader>
            <DialogTitle className="text-foreground">Detalles de la Cita</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Información completa de la cita médica
            </DialogDescription>
          </DialogHeader>
          {selectedAppointment && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#3B82F6]/10">
                  <User className="h-6 w-6 text-[#3B82F6]" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">
                    {selectedAppointment.patientName}
                  </p>
                  <Badge
                    variant="outline"
                    className={`${statusConfig[selectedAppointment.status].color} mt-1`}
                  >
                    {statusConfig[selectedAppointment.status].label}
                  </Badge>
                </div>
              </div>

              <div className="grid gap-3 rounded-lg bg-muted p-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">
                    {selectedAppointment.patientEmail}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">
                    {selectedAppointment.patientPhone}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">
                    {formatDate(selectedAppointment.date)}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">
                    {selectedAppointment.time}
                  </span>
                </div>
              </div>

              <div>
                <p className="mb-1 text-sm font-medium text-muted-foreground">
                  Motivo de consulta
                </p>
                <p className="text-sm text-foreground">{selectedAppointment.reason}</p>
              </div>

              {selectedAppointment.notes && (
                <div>
                  <p className="mb-1 text-sm font-medium text-muted-foreground">
                    Notas de la consulta
                  </p>
                  <p className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800">
                    {selectedAppointment.notes}
                  </p>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setDialogType(null);
                setSelectedAppointment(null);
              }}
              className="border-border text-foreground hover:bg-muted"
            >
              Cerrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog
        open={dialogType === "reject"}
        onOpenChange={() => {
          setDialogType(null);
          setSelectedAppointment(null);
          setRejectReason("");
        }}
      >
        <DialogContent className="sm:max-w-md bg-card">
          <DialogHeader>
            <DialogTitle className="text-foreground">Rechazar Cita</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Por favor, indica el motivo del rechazo de la cita.
            </DialogDescription>
          </DialogHeader>
          {selectedAppointment && (
            <div className="space-y-4">
              <div className="rounded-lg bg-muted p-3">
                <p className="text-sm font-medium text-foreground">
                  {selectedAppointment.patientName}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatDate(selectedAppointment.date)} a las{" "}
                  {selectedAppointment.time}
                </p>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  Motivo del rechazo
                </label>
                <Select onValueChange={setRejectReason}>
                  <SelectTrigger className="bg-background border-input text-foreground">
                    <SelectValue placeholder="Selecciona un motivo" />
                  </SelectTrigger>
                  <SelectContent className="bg-card">
                    <SelectItem value="no-disponible">
                      No disponible en esa fecha
                    </SelectItem>
                    <SelectItem value="emergencia">
                      Emergencia médica
                    </SelectItem>
                    <SelectItem value="vacaciones">Vacaciones</SelectItem>
                    <SelectItem value="otro">Otro motivo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setDialogType(null);
                setSelectedAppointment(null);
                setRejectReason("");
              }}
              className="border-border text-foreground hover:bg-muted"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleReject}
              disabled={!rejectReason}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Rechazar Cita
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Complete Dialog */}
      <Dialog
        open={dialogType === "complete"}
        onOpenChange={() => {
          setDialogType(null);
          setSelectedAppointment(null);
          setCompletionNotes("");
        }}
      >
        <DialogContent className="sm:max-w-md bg-card">
          <DialogHeader>
            <DialogTitle className="text-foreground">Completar Cita</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Agrega notas sobre la consulta realizada.
            </DialogDescription>
          </DialogHeader>
          {selectedAppointment && (
            <div className="space-y-4">
              <div className="rounded-lg bg-muted p-3">
                <p className="text-sm font-medium text-foreground">
                  {selectedAppointment.patientName}
                </p>
                <p className="text-xs text-muted-foreground">
                  {selectedAppointment.reason}
                </p>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  Notas de la consulta
                </label>
                <Textarea
                  placeholder="Escribe las notas de la consulta, diagnóstico, tratamiento, etc."
                  value={completionNotes}
                  onChange={(e) => setCompletionNotes(e.target.value)}
                  rows={4}
                  className="bg-background border-input text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setDialogType(null);
                setSelectedAppointment(null);
                setCompletionNotes("");
              }}
              className="border-border text-foreground hover:bg-muted"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleComplete}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Marcar como Completada
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
