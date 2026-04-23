import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Search,
  Send,
  Paperclip,
  Star,
  Archive,
  ChevronLeft,
  Plus,
  Clock,
  CheckCheck,
  Check,
  Bell,
  Inbox,
  MessageSquare,
  Users,
  Stethoscope,
  AlertCircle,
} from "lucide-react";

// Tipos
interface Message {
  id: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
  status: "sent" | "delivered" | "read";
}

interface Conversation {
  id: string;
  contact: {
    name: string;
    avatar: string;
    role: string;
    specialty?: string;
  };
  lastMessage: string;
  timestamp: string;
  unread: number;
  isOnline: boolean;
  isPinned: boolean;
  category: "doctor" | "admin" | "support";
  messages: Message[];
}

// Datos de ejemplo
const conversationsData: Conversation[] = [
  {
    id: "1",
    contact: {
      name: "Dra. María González",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Doctora",
      specialty: "Cardiología",
    },
    lastMessage: "Sus resultados están listos. Todo se ve bien.",
    timestamp: "10:30",
    unread: 2,
    isOnline: true,
    isPinned: true,
    category: "doctor",
    messages: [
      {
        id: "m1",
        content: "Buenos días, ¿cómo se ha sentido después de la última consulta?",
        timestamp: "09:15",
        isOwn: false,
        status: "read",
      },
      {
        id: "m2",
        content: "Buenos días Dra. González. Me he sentido mucho mejor, gracias por preguntar.",
        timestamp: "09:20",
        isOwn: true,
        status: "read",
      },
      {
        id: "m3",
        content: "Me alegra escuchar eso. Recuerde tomar sus medicamentos según las indicaciones.",
        timestamp: "09:25",
        isOwn: false,
        status: "read",
      },
      {
        id: "m4",
        content: "Sí, los estoy tomando puntualmente. ¿Ya están listos mis resultados de laboratorio?",
        timestamp: "10:00",
        isOwn: true,
        status: "read",
      },
      {
        id: "m5",
        content: "Sus resultados están listos. Todo se ve bien.",
        timestamp: "10:30",
        isOwn: false,
        status: "read",
      },
    ],
  },
  {
    id: "2",
    contact: {
      name: "Dr. Carlos Rodríguez",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Doctor",
      specialty: "Medicina General",
    },
    lastMessage: "Perfecto, nos vemos el lunes entonces.",
    timestamp: "Ayer",
    unread: 0,
    isOnline: false,
    isPinned: false,
    category: "doctor",
    messages: [
      {
        id: "m1",
        content: "Hola, quería confirmar mi cita del lunes.",
        timestamp: "14:00",
        isOwn: true,
        status: "read",
      },
      {
        id: "m2",
        content: "Perfecto, nos vemos el lunes entonces.",
        timestamp: "14:30",
        isOwn: false,
        status: "read",
      },
    ],
  },
  {
    id: "3",
    contact: {
      name: "Recepción MediCare",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Administración",
    },
    lastMessage: "Su factura ha sido enviada a su correo electrónico.",
    timestamp: "Ayer",
    unread: 1,
    isOnline: true,
    isPinned: false,
    category: "admin",
    messages: [
      {
        id: "m1",
        content: "Buenos días, ¿podría enviarme la factura de mi última consulta?",
        timestamp: "11:00",
        isOwn: true,
        status: "read",
      },
      {
        id: "m2",
        content: "Su factura ha sido enviada a su correo electrónico.",
        timestamp: "11:45",
        isOwn: false,
        status: "read",
      },
    ],
  },
  {
    id: "4",
    contact: {
      name: "Soporte Técnico",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Soporte",
    },
    lastMessage: "¿Hay algo más en lo que podamos ayudarle?",
    timestamp: "Lun",
    unread: 0,
    isOnline: true,
    isPinned: false,
    category: "support",
    messages: [
      {
        id: "m1",
        content: "Tengo problemas para acceder a mis resultados en línea.",
        timestamp: "09:00",
        isOwn: true,
        status: "read",
      },
      {
        id: "m2",
        content: "Entendido, vamos a revisar su cuenta. ¿Podría proporcionarme su número de paciente?",
        timestamp: "09:10",
        isOwn: false,
        status: "read",
      },
      {
        id: "m3",
        content: "Mi número es PAC-2024-0892",
        timestamp: "09:15",
        isOwn: true,
        status: "read",
      },
      {
        id: "m4",
        content: "Listo, hemos restablecido su acceso. Intente ingresar nuevamente.",
        timestamp: "09:30",
        isOwn: false,
        status: "read",
      },
      {
        id: "m5",
        content: "Funcionó perfectamente, muchas gracias.",
        timestamp: "09:35",
        isOwn: true,
        status: "read",
      },
      {
        id: "m6",
        content: "¿Hay algo más en lo que podamos ayudarle?",
        timestamp: "09:40",
        isOwn: false,
        status: "read",
      },
    ],
  },
  {
    id: "5",
    contact: {
      name: "Dra. Laura Martínez",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Doctora",
      specialty: "Dermatología",
    },
    lastMessage: "Le envío las indicaciones para el tratamiento.",
    timestamp: "15 Ene",
    unread: 0,
    isOnline: false,
    isPinned: false,
    category: "doctor",
    messages: [
      {
        id: "m1",
        content: "Le envío las indicaciones para el tratamiento.",
        timestamp: "16:00",
        isOwn: false,
        status: "read",
      },
    ],
  },
];

const departments = [
  { id: "doctor", label: "Doctores", icon: Stethoscope },
  { id: "admin", label: "Administración", icon: Users },
  { id: "support", label: "Soporte", icon: MessageSquare },
];

export default function MensajesPage() {
  const [conversations, setConversations] = useState<Conversation[]>(conversationsData);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(
    conversationsData[0]
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [showMobileChat, setShowMobileChat] = useState(false);
  const [isNewMessageOpen, setIsNewMessageOpen] = useState(false);
  const [newConversation, setNewConversation] = useState({
    department: "",
    subject: "",
    message: "",
  });

  // Filtrar conversaciones
  const filteredConversations = conversations.filter((conv) => {
    const matchesSearch =
      conv.contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === "all" || conv.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Ordenar conversaciones (fijadas primero, luego por no leídos)
  const sortedConversations = [...filteredConversations].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    if (a.unread > 0 && b.unread === 0) return -1;
    if (a.unread === 0 && b.unread > 0) return 1;
    return 0;
  });

  // Enviar mensaje
  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const newMsg: Message = {
      id: `m${Date.now()}`,
      content: newMessage,
      timestamp: new Date().toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isOwn: true,
      status: "sent",
    };

    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === selectedConversation.id
          ? {
              ...conv,
              messages: [...conv.messages, newMsg],
              lastMessage: newMessage,
              timestamp: "Ahora",
            }
          : conv
      )
    );

    setSelectedConversation((prev) =>
      prev
        ? {
            ...prev,
            messages: [...prev.messages, newMsg],
            lastMessage: newMessage,
            timestamp: "Ahora",
          }
        : null
    );

    setNewMessage("");
  };

  // Crear nueva conversación
  const handleCreateConversation = () => {
    if (!newConversation.department || !newConversation.message) return;

    const departmentInfo = {
      doctor: { name: "Consulta Médica", role: "Doctor" },
      admin: { name: "Recepción MediCare", role: "Administración" },
      support: { name: "Soporte Técnico", role: "Soporte" },
    };

    const dept = newConversation.department as keyof typeof departmentInfo;
    const info = departmentInfo[dept];

    const newConv: Conversation = {
      id: `conv${Date.now()}`,
      contact: {
        name: info.name,
        avatar: "/placeholder.svg?height=40&width=40",
        role: info.role,
      },
      lastMessage: newConversation.message,
      timestamp: "Ahora",
      unread: 0,
      isOnline: true,
      isPinned: false,
      category: dept,
      messages: [
        {
          id: `m${Date.now()}`,
          content: newConversation.subject
            ? `Asunto: ${newConversation.subject}\n\n${newConversation.message}`
            : newConversation.message,
          timestamp: new Date().toLocaleTimeString("es-ES", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          isOwn: true,
          status: "sent",
        },
      ],
    };

    setConversations((prev) => [newConv, ...prev]);
    setSelectedConversation(newConv);
    setIsNewMessageOpen(false);
    setNewConversation({ department: "", subject: "", message: "" });
    setShowMobileChat(true);
  };

  // Fijar/desfijar conversación
  const togglePin = (convId: string) => {
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === convId ? { ...conv, isPinned: !conv.isPinned } : conv
      )
    );
  };

  // Marcar como leído
  const markAsRead = (convId: string) => {
    setConversations((prev) =>
      prev.map((conv) => (conv.id === convId ? { ...conv, unread: 0 } : conv))
    );
  };

  // Archivar conversación
  const archiveConversation = (convId: string) => {
    setConversations((prev) => prev.filter((conv) => conv.id !== convId));
    if (selectedConversation?.id === convId) {
      setSelectedConversation(null);
    }
  };

  // Seleccionar conversación
  const handleSelectConversation = (conv: Conversation) => {
    setSelectedConversation(conv);
    markAsRead(conv.id);
    setShowMobileChat(true);
  };

  // Contar mensajes no leídos
  const totalUnread = conversations.reduce((acc, conv) => acc + conv.unread, 0);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Header de la página */}
          <div className="mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                  Buzón de Mensajes
                </h1>
                <p className="text-muted-foreground mt-1">
                  Comunícate con tu equipo médico y personal de la clínica
                </p>
              </div>
              <div className="flex items-center gap-3">
                {totalUnread > 0 && (
                  <Badge className="bg-[#3B82F6] text-white">
                    {totalUnread} sin leer
                  </Badge>
                )}
                <Dialog open={isNewMessageOpen} onOpenChange={setIsNewMessageOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-[#3B82F6] hover:bg-[#3B82F6]/90 text-white">
                      <Plus className="h-4 w-4 mr-2" />
                      Nuevo mensaje
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Nuevo mensaje</DialogTitle>
                      <DialogDescription>
                        Inicia una nueva conversación con el equipo de MediCare Plus
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                          Departamento
                        </label>
                        <Select
                          value={newConversation.department}
                          onValueChange={(value) =>
                            setNewConversation((prev) => ({ ...prev, department: value }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona un departamento" />
                          </SelectTrigger>
                          <SelectContent>
                            {departments.map((dept) => (
                              <SelectItem key={dept.id} value={dept.id}>
                                <div className="flex items-center gap-2">
                                  <dept.icon className="h-4 w-4" />
                                  {dept.label}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                          Asunto (opcional)
                        </label>
                        <Input
                          placeholder="Ej: Consulta sobre resultados"
                          value={newConversation.subject}
                          onChange={(e) =>
                            setNewConversation((prev) => ({
                              ...prev,
                              subject: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                          Mensaje
                        </label>
                        <Textarea
                          placeholder="Escribe tu mensaje..."
                          rows={4}
                          value={newConversation.message}
                          onChange={(e) =>
                            setNewConversation((prev) => ({
                              ...prev,
                              message: e.target.value,
                            }))
                          }
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setIsNewMessageOpen(false)}
                        className="bg-transparent"
                      >
                        Cancelar
                      </Button>
                      <Button
                        onClick={handleCreateConversation}
                        disabled={!newConversation.department || !newConversation.message}
                        className="bg-[#3B82F6] hover:bg-[#3B82F6]/90 text-white"
                      >
                        Enviar mensaje
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>

          {/* Contenedor principal */}
          <Card className="border-border overflow-hidden">
            <div className="flex h-[600px] md:h-[700px]">
              {/* Lista de conversaciones */}
              <div
                className={`w-full md:w-[380px] border-r border-border flex flex-col ${
                  showMobileChat ? "hidden md:flex" : "flex"
                }`}
              >
                {/* Búsqueda y filtros */}
                <div className="p-4 border-b border-border space-y-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar conversaciones..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    <Button
                      variant={filterCategory === "all" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilterCategory("all")}
                      className={
                        filterCategory === "all"
                          ? "bg-[#3B82F6] text-white"
                          : "bg-transparent"
                      }
                    >
                      <Inbox className="h-3 w-3 mr-1" />
                      Todos
                    </Button>
                    {departments.map((dept) => (
                      <Button
                        key={dept.id}
                        variant={filterCategory === dept.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFilterCategory(dept.id)}
                        className={
                          filterCategory === dept.id
                            ? "bg-[#3B82F6] text-white"
                            : "bg-transparent"
                        }
                      >
                        <dept.icon className="h-3 w-3 mr-1" />
                        {dept.label}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Lista de conversaciones */}
                <ScrollArea className="flex-1">
                  {sortedConversations.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-center p-4">
                      <MessageSquare className="h-12 w-12 text-muted-foreground/50 mb-3" />
                      <p className="text-muted-foreground">No hay conversaciones</p>
                      <p className="text-sm text-muted-foreground/70">
                        Inicia una nueva conversación
                      </p>
                    </div>
                  ) : (
                    <div className="divide-y divide-border">
                      {sortedConversations.map((conv) => (
                        <div
                          key={conv.id}
                          className={`p-4 cursor-pointer transition-colors hover:bg-muted/50 ${
                            selectedConversation?.id === conv.id ? "bg-muted" : ""
                          }`}
                          onClick={() => handleSelectConversation(conv)}
                        >
                          <div className="flex gap-3">
                            <div className="relative">
                              <Avatar className="h-12 w-12">
                                <AvatarImage src={conv.contact.avatar || "/placeholder.svg"} />
                                <AvatarFallback className="bg-[#3B82F6]/10 text-[#3B82F6]">
                                  {conv.contact.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")
                                    .slice(0, 2)}
                                </AvatarFallback>
                              </Avatar>
                              {conv.isOnline && (
                                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-card" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2 min-w-0">
                                  {conv.isPinned && (
                                    <Star className="h-3 w-3 text-[#3B82F6] fill-[#3B82F6] flex-shrink-0" />
                                  )}
                                  <span className="font-medium text-foreground truncate">
                                    {conv.contact.name}
                                  </span>
                                </div>
                                <span className="text-xs text-muted-foreground flex-shrink-0">
                                  {conv.timestamp}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground truncate mt-0.5">
                                {conv.contact.specialty || conv.contact.role}
                              </p>
                              <div className="flex items-center justify-between mt-1">
                                <p className="text-sm text-muted-foreground truncate pr-2">
                                  {conv.lastMessage}
                                </p>
                                {conv.unread > 0 && (
                                  <Badge className="bg-[#3B82F6] text-white h-5 min-w-[20px] flex items-center justify-center">
                                    {conv.unread}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </div>

              {/* Área del chat */}
              <div
                className={`flex-1 flex flex-col ${
                  !showMobileChat ? "hidden md:flex" : "flex"
                }`}
              >
                {selectedConversation ? (
                  <>
                    {/* Header del chat */}
                    <div className="p-4 border-b border-border flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="md:hidden"
                          onClick={() => setShowMobileChat(false)}
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </Button>
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={selectedConversation.contact.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-[#3B82F6]/10 text-[#3B82F6]">
                            {selectedConversation.contact.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-foreground">
                            {selectedConversation.contact.name}
                          </h3>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            {selectedConversation.isOnline ? (
                              <>
                                <span className="h-2 w-2 rounded-full bg-green-500" />
                                En línea
                              </>
                            ) : (
                              <>
                                <Clock className="h-3 w-3" />
                                Desconectado
                              </>
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => togglePin(selectedConversation.id)}
                          title={selectedConversation.isPinned ? "Desfijar" : "Fijar"}
                        >
                          <Star
                            className={`h-4 w-4 ${
                              selectedConversation.isPinned
                                ? "text-[#3B82F6] fill-[#3B82F6]"
                                : ""
                            }`}
                          />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => archiveConversation(selectedConversation.id)}
                          title="Archivar"
                        >
                          <Archive className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Mensajes */}
                    <ScrollArea className="flex-1 p-4">
                      <div className="space-y-4">
                        {selectedConversation.messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${
                              message.isOwn ? "justify-end" : "justify-start"
                            }`}
                          >
                            <div
                              className={`max-w-[80%] md:max-w-[70%] rounded-2xl px-4 py-2 ${
                                message.isOwn
                                  ? "bg-[#3B82F6] text-white rounded-br-md"
                                  : "bg-muted text-foreground rounded-bl-md"
                              }`}
                            >
                              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                              <div
                                className={`flex items-center justify-end gap-1 mt-1 ${
                                  message.isOwn ? "text-white/70" : "text-muted-foreground"
                                }`}
                              >
                                <span className="text-xs">{message.timestamp}</span>
                                {message.isOwn && (
                                  <>
                                    {message.status === "read" ? (
                                      <CheckCheck className="h-3 w-3" />
                                    ) : message.status === "delivered" ? (
                                      <CheckCheck className="h-3 w-3 opacity-50" />
                                    ) : (
                                      <Check className="h-3 w-3 opacity-50" />
                                    )}
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>

                    {/* Input de mensaje */}
                    <div className="p-4 border-t border-border">
                      <div className="flex items-end gap-2">
                        <Button variant="ghost" size="icon" className="flex-shrink-0">
                          <Paperclip className="h-5 w-5 text-muted-foreground" />
                        </Button>
                        <Textarea
                          placeholder="Escribe un mensaje..."
                          className="min-h-[44px] max-h-32 resize-none"
                          rows={1}
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault();
                              handleSendMessage();
                            }
                          }}
                        />
                        <Button
                          size="icon"
                          onClick={handleSendMessage}
                          disabled={!newMessage.trim()}
                          className="bg-[#3B82F6] hover:bg-[#3B82F6]/90 text-white flex-shrink-0"
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2 text-center">
                        Presiona Enter para enviar, Shift + Enter para nueva línea
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                    <div className="w-20 h-20 rounded-full bg-[#3B82F6]/10 flex items-center justify-center mb-4">
                      <MessageSquare className="h-10 w-10 text-[#3B82F6]" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Selecciona una conversación
                    </h3>
                    <p className="text-muted-foreground max-w-sm">
                      Elige una conversación de la lista o inicia una nueva para comunicarte con
                      tu equipo médico
                    </p>
                    <Button
                      className="mt-6 bg-[#3B82F6] hover:bg-[#3B82F6]/90 text-white"
                      onClick={() => setIsNewMessageOpen(true)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Nuevo mensaje
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Información adicional */}
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#3B82F6]/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-[#3B82F6]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Horario de atención</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Lunes a Viernes: 8:00 - 20:00
                      <br />
                      Sábados: 9:00 - 14:00
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#3B82F6]/10 flex items-center justify-center flex-shrink-0">
                    <Bell className="h-6 w-6 text-[#3B82F6]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Tiempo de respuesta</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Respuesta promedio en menos de 2 horas durante horario de atención
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#3B82F6]/10 flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="h-6 w-6 text-[#3B82F6]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Emergencias</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Para emergencias médicas llame al{" "}
                      <span className="font-medium text-[#3B82F6]">123</span> o acuda a urgencias
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
