import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  FileText,
  LogOut,
  BookOpen,
  Video,
  MessageCircle,
  Phone,
  Mail,
  ChevronRight,
  ExternalLink,
  PlayCircle,
  FileQuestion,
  Settings,
  Shield,
  Clock,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import MedicoHeader from "@/components/HeaderMedico";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface Guide {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  type: "video" | "article";
  isNew?: boolean;
}

interface SupportTicket {
  id: string;
  subject: string;
  status: "abierto" | "en_progreso" | "resuelto";
  date: string;
  lastUpdate: string;
}

const faqs: FAQ[] = [
  {
    id: "1",
    question: "¿Cómo puedo ver mis citas programadas?",
    answer: "Para ver sus citas programadas, acceda al menú lateral y seleccione 'Mis Citas'. Allí encontrará una lista completa de todas sus citas organizadas por fecha, con opciones para filtrar por estado (pendientes, confirmadas, completadas). También puede usar la búsqueda para encontrar citas específicas por nombre de paciente.",
    category: "citas",
  },
  {
    id: "2",
    question: "¿Cómo confirmo o rechazo una cita?",
    answer: "En la sección 'Mis Citas', cada cita pendiente tiene botones de acción. Haga clic en 'Aceptar' para confirmar la cita o 'Rechazar' para cancelarla. Si rechaza una cita, se le pedirá que ingrese un motivo que será comunicado al paciente.",
    category: "citas",
  },
  {
    id: "3",
    question: "¿Cómo marco una cita como completada?",
    answer: "Una vez finalizada la consulta, vaya a 'Mis Citas', localice la cita confirmada y haga clic en 'Completar'. Se abrirá un formulario donde puede agregar notas médicas sobre la consulta antes de marcarla como terminada.",
    category: "citas",
  },
  {
    id: "4",
    question: "¿Cómo uso la agenda para ver mi disponibilidad?",
    answer: "Acceda a 'Mi Agenda' desde el menú lateral. Verá un calendario mensual donde los días con citas están marcados. Al seleccionar un día, aparecerá la lista de horarios con sus citas programadas, permitiéndole visualizar rápidamente su disponibilidad.",
    category: "agenda",
  },
  {
    id: "5",
    question: "¿Puedo bloquear horarios en mi agenda?",
    answer: "Actualmente puede coordinar con el personal administrativo para bloquear horarios específicos. En futuras actualizaciones, podrá gestionar su disponibilidad directamente desde la plataforma.",
    category: "agenda",
  },
  {
    id: "6",
    question: "¿Cómo accedo al historial de un paciente?",
    answer: "Desde la vista de detalles de una cita, puede ver información básica del paciente. Para acceder al historial completo, utilice la sección 'Historial' en el menú lateral donde puede buscar pacientes y ver todas sus consultas anteriores.",
    category: "pacientes",
  },
  {
    id: "7",
    question: "¿Cómo agrego notas a una consulta?",
    answer: "Al completar una cita, se le presentará un campo de texto para agregar notas médicas. Estas notas quedarán asociadas a la cita y podrá consultarlas posteriormente desde el historial del paciente.",
    category: "pacientes",
  },
  {
    id: "8",
    question: "¿Cómo cambio mi contraseña?",
    answer: "Vaya a la sección de configuración de su perfil. Allí encontrará la opción 'Cambiar contraseña'. Deberá ingresar su contraseña actual y la nueva contraseña dos veces para confirmar el cambio.",
    category: "cuenta",
  },
  {
    id: "9",
    question: "¿Qué hago si olvidé mi contraseña?",
    answer: "En la pantalla de inicio de sesión, haga clic en '¿Olvidó su contraseña?'. Ingrese su correo electrónico registrado y recibirá instrucciones para restablecer su contraseña. Si no recibe el correo, verifique su carpeta de spam o contacte a soporte técnico.",
    category: "cuenta",
  },
  {
    id: "10",
    question: "¿Cómo actualizo mi información de perfil?",
    answer: "Acceda a 'Configuración' desde el menú y seleccione 'Mi Perfil'. Allí podrá actualizar su información personal, especialidades, foto de perfil y datos de contacto profesional.",
    category: "cuenta",
  },
  {
    id: "11",
    question: "¿Cómo contacto al soporte técnico?",
    answer: "Puede contactar al soporte técnico de varias formas: a través del chat en vivo disponible en esta página, enviando un correo a soporte@medicareplus.com, o llamando al +34 900 123 456 en horario de oficina (Lun-Vie 8:00-20:00).",
    category: "soporte",
  },
  {
    id: "12",
    question: "¿Qué navegadores son compatibles con la plataforma?",
    answer: "La plataforma es compatible con las últimas versiones de Chrome, Firefox, Safari y Edge. Recomendamos mantener su navegador actualizado para una mejor experiencia y seguridad.",
    category: "soporte",
  },
];

const guides: Guide[] = [
  {
    id: "1",
    title: "Primeros pasos en MediCare Plus",
    description: "Aprenda a navegar por la plataforma y configure su cuenta correctamente.",
    category: "inicio",
    duration: "5 min",
    type: "video",
    isNew: true,
  },
  {
    id: "2",
    title: "Gestión completa de citas",
    description: "Tutorial detallado sobre cómo administrar sus citas: confirmar, rechazar y completar.",
    category: "citas",
    duration: "8 min",
    type: "video",
  },
  {
    id: "3",
    title: "Uso eficiente de la agenda",
    description: "Optimice su tiempo aprendiendo todas las funciones del calendario de citas.",
    category: "agenda",
    duration: "6 min",
    type: "video",
  },
  {
    id: "4",
    title: "Documentación de consultas",
    description: "Guía para registrar notas médicas y mantener un historial completo de pacientes.",
    category: "pacientes",
    duration: "10 min",
    type: "article",
  },
  {
    id: "5",
    title: "Configuración de notificaciones",
    description: "Personalice las alertas que recibe sobre nuevas citas y mensajes.",
    category: "configuracion",
    duration: "4 min",
    type: "article",
  },
  {
    id: "6",
    title: "Seguridad y privacidad",
    description: "Mejores prácticas para proteger la información de sus pacientes.",
    category: "seguridad",
    duration: "7 min",
    type: "article",
    isNew: true,
  },
  {
    id: "7",
    title: "Comunicación con pacientes",
    description: "Cómo usar el sistema de mensajería para comunicarse de forma segura.",
    category: "comunicacion",
    duration: "5 min",
    type: "video",
  },
  {
    id: "8",
    title: "Reportes y estadísticas",
    description: "Aprenda a generar informes de su actividad y analizar sus estadísticas.",
    category: "reportes",
    duration: "6 min",
    type: "article",
  },
];

const recentTickets: SupportTicket[] = [
  {
    id: "TK-2024-001",
    subject: "Problema al cargar imágenes en el historial",
    status: "en_progreso",
    date: "2026-01-24",
    lastUpdate: "2026-01-25",
  },
  {
    id: "TK-2024-002",
    subject: "Solicitud de nueva funcionalidad para recetas",
    status: "abierto",
    date: "2026-01-26",
    lastUpdate: "2026-01-26",
  },
];

const faqCategories = [
  { id: "todos", label: "Todos" },
  { id: "citas", label: "Citas" },
  { id: "agenda", label: "Agenda" },
  { id: "pacientes", label: "Pacientes" },
  { id: "cuenta", label: "Cuenta" },
  { id: "soporte", label: "Soporte" },
];

export default function AyudaMedicoPage() {
  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_role");
    window.location.assign("/login");
  };
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFaqCategory, setSelectedFaqCategory] = useState("todos");
  const [selectedGuideCategory, setSelectedGuideCategory] = useState("todos");

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedFaqCategory === "todos" || faq.category === selectedFaqCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredGuides = guides.filter((guide) => {
    const matchesSearch =
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedGuideCategory === "todos" || guide.category === selectedGuideCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusBadge = (status: SupportTicket["status"]) => {
    switch (status) {
      case "abierto":
        return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">Abierto</Badge>;
      case "en_progreso":
        return <Badge className="bg-[#3B82F6]/10 text-[#3B82F6] hover:bg-[#3B82F6]/10">En Progreso</Badge>;
      case "resuelto":
        return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">Resuelto</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <MedicoHeader />
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-card">
        <div className="flex h-full flex-col">
          {/* Logo */}
          {/* <div className="flex h-16 items-center gap-2 border-b border-border px-6">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#3B82F6]">
              <Stethoscope className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold text-foreground">MediCare Plus</span>
          </div> */}

          {/* Doctor Info
          <div className="border-b border-border p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#3B82F6]/10">
                <User className="h-5 w-5 text-[#3B82F6]" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Dr. Roberto Sánchez</p>
                <p className="text-xs text-muted-foreground">Medicina General</p>
              </div>
            </div>
          </div> */}

          {/* Navigation */}
          {/* <nav className="flex-1 p-4">
            <ul className="space-y-1">
              <li>
                <Link
                  to="/medico/citas"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <Calendar className="h-4 w-4" />
                  Mis Citas
                </Link>
              </li>
              <li>
                <Link
                  to="/medico/agenda"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <CalendarDays className="h-4 w-4" />
                  Mi Agenda
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <User className="h-4 w-4" />
                  Pacientes
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <FileText className="h-4 w-4" />
                  Historial
                </Link>
              </li>
              <li>
                <Link
                  to="/medico/ayuda"
                  className="flex items-center gap-3 rounded-lg bg-[#3B82F6]/10 px-3 py-2 text-sm font-medium text-[#3B82F6]"
                >
                  <HelpCircle className="h-4 w-4" />
                  Ayuda
                </Link>
              </li>
            </ul>
          </nav> */}

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
        {/* Header */}
        <header className="sticky top-0 z-30 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
          <div className="flex h-16 items-center justify-between px-6">
            <div>
              <h1 className="text-xl font-semibold text-foreground">Centro de Ayuda</h1>
              <p className="text-sm text-muted-foreground">
                Recursos, guías y soporte técnico
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
          {/* Search Bar */}
          <div className="mb-8">
            <div className="mx-auto max-w-2xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar en preguntas frecuentes y guías..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-12 pl-12 text-base border-border bg-card"
                />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="border-border bg-card hover:border-[#3B82F6]/50 transition-colors cursor-pointer">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#3B82F6]/10">
                  <BookOpen className="h-6 w-6 text-[#3B82F6]" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Guías Rápidas</p>
                  <p className="text-sm text-muted-foreground">8 tutoriales</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card hover:border-[#3B82F6]/50 transition-colors cursor-pointer">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#60A6FA]/10">
                  <Video className="h-6 w-6 text-[#60A6FA]" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Video Tutoriales</p>
                  <p className="text-sm text-muted-foreground">5 videos</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card hover:border-[#3B82F6]/50 transition-colors cursor-pointer">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100">
                  <MessageCircle className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Chat en Vivo</p>
                  <p className="text-sm text-muted-foreground">Disponible ahora</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card hover:border-[#3B82F6]/50 transition-colors cursor-pointer">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100">
                  <Phone className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Llamar Soporte</p>
                  <p className="text-sm text-muted-foreground">+34 900 123 456</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="faq" className="space-y-6">
            <TabsList className="bg-muted/50">
              <TabsTrigger value="faq" className="data-[state=active]:bg-card">
                <FileQuestion className="mr-2 h-4 w-4" />
                Preguntas Frecuentes
              </TabsTrigger>
              <TabsTrigger value="guides" className="data-[state=active]:bg-card">
                <BookOpen className="mr-2 h-4 w-4" />
                Guías y Tutoriales
              </TabsTrigger>
              <TabsTrigger value="support" className="data-[state=active]:bg-card">
                <MessageCircle className="mr-2 h-4 w-4" />
                Soporte Técnico
              </TabsTrigger>
            </TabsList>

            {/* FAQ Tab */}
            <TabsContent value="faq" className="space-y-6">
              {/* Category Filters */}
              <div className="flex flex-wrap gap-2">
                {faqCategories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedFaqCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFaqCategory(category.id)}
                    className={
                      selectedFaqCategory === category.id
                        ? "bg-[#3B82F6] text-white hover:bg-[#3B82F6]/90"
                        : "border-border text-foreground hover:bg-muted"
                    }
                  >
                    {category.label}
                  </Button>
                ))}
              </div>

              {/* FAQ Accordion */}
              <Card className="border-border bg-card">
                <CardContent className="p-6">
                  {filteredFaqs.length > 0 ? (
                    <Accordion type="single" collapsible className="space-y-2">
                      {filteredFaqs.map((faq) => (
                        <AccordionItem
                          key={faq.id}
                          value={faq.id}
                          className="border border-border rounded-lg px-4"
                        >
                          <AccordionTrigger className="text-left text-foreground hover:no-underline hover:text-[#3B82F6]">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  ) : (
                    <div className="py-12 text-center">
                      <FileQuestion className="mx-auto h-12 w-12 text-muted-foreground/50" />
                      <p className="mt-4 text-lg font-medium text-foreground">
                        No se encontraron resultados
                      </p>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Intente con otros términos de búsqueda o categoría
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Guides Tab */}
            <TabsContent value="guides" className="space-y-6">
              {/* Category Filters */}
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedGuideCategory === "todos" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedGuideCategory("todos")}
                  className={
                    selectedGuideCategory === "todos"
                      ? "bg-[#3B82F6] text-white hover:bg-[#3B82F6]/90"
                      : "border-border text-foreground hover:bg-muted"
                  }
                >
                  Todos
                </Button>
                <Button
                  variant={selectedGuideCategory === "video" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedGuideCategory("video")}
                  className={
                    selectedGuideCategory === "video"
                      ? "bg-[#3B82F6] text-white hover:bg-[#3B82F6]/90"
                      : "border-border text-foreground hover:bg-muted"
                  }
                >
                  <Video className="mr-2 h-4 w-4" />
                  Videos
                </Button>
                <Button
                  variant={selectedGuideCategory === "article" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedGuideCategory("article")}
                  className={
                    selectedGuideCategory === "article"
                      ? "bg-[#3B82F6] text-white hover:bg-[#3B82F6]/90"
                      : "border-border text-foreground hover:bg-muted"
                  }
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Artículos
                </Button>
              </div>

              {/* Guides Grid */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredGuides
                  .filter((g) =>
                    selectedGuideCategory === "todos"
                      ? true
                      : selectedGuideCategory === "video"
                      ? g.type === "video"
                      : g.type === "article"
                  )
                  .map((guide) => (
                    <Card
                      key={guide.id}
                      className="border-border bg-card hover:border-[#3B82F6]/50 transition-colors cursor-pointer group"
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                              guide.type === "video"
                                ? "bg-[#60A6FA]/10"
                                : "bg-[#3B82F6]/10"
                            }`}
                          >
                            {guide.type === "video" ? (
                              <PlayCircle
                                className={`h-5 w-5 ${
                                  guide.type === "video"
                                    ? "text-[#60A6FA]"
                                    : "text-[#3B82F6]"
                                }`}
                              />
                            ) : (
                              <FileText className="h-5 w-5 text-[#3B82F6]" />
                            )}
                          </div>
                          {guide.isNew && (
                            <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                              Nuevo
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="mt-3 text-base font-semibold text-foreground group-hover:text-[#3B82F6] transition-colors">
                          {guide.title}
                        </CardTitle>
                        <CardDescription className="text-muted-foreground">
                          {guide.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            {guide.duration}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-[#3B82F6] hover:text-[#3B82F6]/80 hover:bg-[#3B82F6]/10"
                          >
                            {guide.type === "video" ? "Ver video" : "Leer más"}
                            <ChevronRight className="ml-1 h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>

              {filteredGuides.filter((g) =>
                selectedGuideCategory === "todos"
                  ? true
                  : selectedGuideCategory === "video"
                  ? g.type === "video"
                  : g.type === "article"
              ).length === 0 && (
                <div className="py-12 text-center">
                  <BookOpen className="mx-auto h-12 w-12 text-muted-foreground/50" />
                  <p className="mt-4 text-lg font-medium text-foreground">
                    No se encontraron guías
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Intente con otros términos de búsqueda
                  </p>
                </div>
              )}
            </TabsContent>

            {/* Support Tab */}
            <TabsContent value="support" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-3">
                {/* Contact Options */}
                <div className="lg:col-span-2 space-y-6">
                  <Card className="border-border bg-card">
                    <CardHeader>
                      <CardTitle className="text-foreground">Opciones de Contacto</CardTitle>
                      <CardDescription>
                        Elija el método de contacto que prefiera
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Chat Support */}
                      <div className="flex items-center justify-between rounded-lg border border-border p-4">
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100">
                            <MessageCircle className="h-6 w-6 text-emerald-600" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">Chat en Vivo</p>
                            <p className="text-sm text-muted-foreground">
                              Respuesta inmediata - Disponible ahora
                            </p>
                          </div>
                        </div>
                        <Button className="bg-[#3B82F6] text-white hover:bg-[#3B82F6]/90">
                          Iniciar Chat
                        </Button>
                      </div>

                      {/* Email Support */}
                      <div className="flex items-center justify-between rounded-lg border border-border p-4">
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#3B82F6]/10">
                            <Mail className="h-6 w-6 text-[#3B82F6]" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">Correo Electrónico</p>
                            <p className="text-sm text-muted-foreground">
                              soporte@medicareplus.com - Respuesta en 24h
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" className="border-border text-foreground hover:bg-muted bg-transparent">
                          <Mail className="mr-2 h-4 w-4" />
                          Enviar Email
                        </Button>
                      </div>

                      {/* Phone Support */}
                      <div className="flex items-center justify-between rounded-lg border border-border p-4">
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100">
                            <Phone className="h-6 w-6 text-amber-600" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">Soporte Telefónico</p>
                            <p className="text-sm text-muted-foreground">
                              +34 900 123 456 - Lun-Vie 8:00-20:00
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" className="border-border text-foreground hover:bg-muted bg-transparent">
                          <Phone className="mr-2 h-4 w-4" />
                          Llamar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recent Tickets */}
                  <Card className="border-border bg-card">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-foreground">Mis Tickets de Soporte</CardTitle>
                          <CardDescription>
                            Historial de solicitudes de soporte
                          </CardDescription>
                        </div>
                        <Button className="bg-[#3B82F6] text-white hover:bg-[#3B82F6]/90">
                          Nuevo Ticket
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {recentTickets.length > 0 ? (
                        <div className="space-y-3">
                          {recentTickets.map((ticket) => (
                            <div
                              key={ticket.id}
                              className="flex items-center justify-between rounded-lg border border-border p-4 hover:bg-muted/50 cursor-pointer transition-colors"
                            >
                              <div className="flex-1">
                                <div className="flex items-center gap-3">
                                  <span className="text-sm font-mono text-muted-foreground">
                                    {ticket.id}
                                  </span>
                                  {getStatusBadge(ticket.status)}
                                </div>
                                <p className="mt-1 font-medium text-foreground">
                                  {ticket.subject}
                                </p>
                                <p className="mt-1 text-sm text-muted-foreground">
                                  Creado: {new Date(ticket.date).toLocaleDateString("es-ES")} |
                                  Última actualización:{" "}
                                  {new Date(ticket.lastUpdate).toLocaleDateString("es-ES")}
                                </p>
                              </div>
                              <ChevronRight className="h-5 w-5 text-muted-foreground" />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="py-8 text-center">
                          <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-500" />
                          <p className="mt-4 text-foreground">No tiene tickets abiertos</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                  {/* System Status */}
                  <Card className="border-border bg-card">
                    <CardHeader>
                      <CardTitle className="text-base text-foreground">Estado del Sistema</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Plataforma Web</span>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-emerald-500" />
                          <span className="text-sm text-emerald-600">Operativo</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">API de Citas</span>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-emerald-500" />
                          <span className="text-sm text-emerald-600">Operativo</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Mensajería</span>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-emerald-500" />
                          <span className="text-sm text-emerald-600">Operativo</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Notificaciones</span>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-emerald-500" />
                          <span className="text-sm text-emerald-600">Operativo</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Helpful Resources */}
                  <Card className="border-border bg-card">
                    <CardHeader>
                      <CardTitle className="text-base text-foreground">Recursos Útiles</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Link
                        to="#"
                        className="flex items-center justify-between rounded-lg p-2 text-sm hover:bg-muted transition-colors"
                      >
                        <div className="flex items-center gap-2 text-foreground">
                          <Shield className="h-4 w-4 text-[#3B82F6]" />
                          Política de Privacidad
                        </div>
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      </Link>
                      <Link
                        to="#"
                        className="flex items-center justify-between rounded-lg p-2 text-sm hover:bg-muted transition-colors"
                      >
                        <div className="flex items-center gap-2 text-foreground">
                          <FileText className="h-4 w-4 text-[#3B82F6]" />
                          Términos de Uso
                        </div>
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      </Link>
                      <Link
                        to="#"
                        className="flex items-center justify-between rounded-lg p-2 text-sm hover:bg-muted transition-colors"
                      >
                        <div className="flex items-center gap-2 text-foreground">
                          <Settings className="h-4 w-4 text-[#3B82F6]" />
                          Configuración de Cuenta
                        </div>
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      </Link>
                    </CardContent>
                  </Card>

                  {/* Support Hours */}
                  <Card className="border-[#3B82F6]/30 bg-[#3B82F6]/5">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-[#3B82F6] mt-0.5" />
                        <div>
                          <p className="font-medium text-foreground">Horario de Soporte</p>
                          <p className="mt-1 text-sm text-muted-foreground">
                            Lunes a Viernes: 8:00 - 20:00
                            <br />
                            Sábados: 9:00 - 14:00
                            <br />
                            Domingos y festivos: Cerrado
                          </p>
                          <p className="mt-2 text-sm text-muted-foreground">
                            Para emergencias técnicas fuera de horario, contacte al +34 900 999 999
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
