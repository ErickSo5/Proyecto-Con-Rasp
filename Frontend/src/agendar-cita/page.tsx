import React, { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { Calendar as CalendarIcon, Clock, User, Stethoscope, CheckCircle2, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

type Especialidad = {
  id: string;
  nombre: string;
};

type Medico = {
  id: number;
  nombre: string;
  especialidad: string;
  especialidadSlug?: string;
  slug?: string;
};

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export default function AgendarCitaPage() {
  const [step, setStep] = useState(1)
  const [especialidades, setEspecialidades] = useState<Especialidad[]>([])
  const [doctores, setDoctores] = useState<Medico[]>([])
  const [horariosDisponibles, setHorariosDisponibles] = useState<string[]>([])
  const [loadingHorarios, setLoadingHorarios] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [especialidad, setEspecialidad] = useState("")
  const [doctor, setDoctor] = useState("")
  const [fecha, setFecha] = useState<Date | undefined>(undefined)
  const [hora, setHora] = useState("")
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    telefono: "",
    motivo: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    const controller = new AbortController()

    const loadCatalogos = async () => {
      try {
        const [espRes, medRes] = await Promise.all([
          fetch(`${API_URL}/api/especialidades`, { signal: controller.signal }),
          fetch(`${API_URL}/api/medicos`, { signal: controller.signal }),
        ])

        if (espRes.ok) {
          const data = await espRes.json()
          setEspecialidades((data?.data ?? []) as Especialidad[])
        }

        if (medRes.ok) {
          const data = await medRes.json()
          setDoctores((data?.data ?? []) as Medico[])
        }
      } catch (error) {
        // Si falla, dejamos listas vacias y el UI lo mostrara
        console.error(error)
      }
    }

    void loadCatalogos()

    return () => controller.abort()
  }, [])

  useEffect(() => {
    if (!doctor || !fecha) {
      setHorariosDisponibles([])
      return
    }

    const controller = new AbortController()
    const fetchHorarios = async () => {
      try {
        setLoadingHorarios(true)
        const dateString = fecha.toISOString().split("T")[0]
        const response = await fetch(
          `${API_URL}/api/medicos/${doctor}/horarios?fecha=${dateString}`,
          { signal: controller.signal }
        )
        if (!response.ok) {
          setHorariosDisponibles([])
          return
        }
        const data = await response.json()
        setHorariosDisponibles(data?.data?.disponibles ?? [])
      } catch (error) {
        console.error(error)
        setHorariosDisponibles([])
      } finally {
        setLoadingHorarios(false)
      }
    }

    void fetchHorarios()

    return () => controller.abort()
  }, [doctor, fecha])

  const doctoresDisponibles = useMemo(() => {
    if (!especialidad) return []
    return doctores.filter((doc) => {
      if (doc.especialidadSlug) {
        return doc.especialidadSlug === especialidad
      }
      return doc.especialidad === especialidad
    })
  }, [doctores, especialidad])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const canProceedStep1 = especialidad && doctor
  const canProceedStep2 = fecha && hora
  const canSubmit = formData.nombre && formData.apellidos && formData.email && formData.telefono

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)

    const token = localStorage.getItem("auth_token")
    if (!token) {
      setSubmitError("Debes iniciar sesion para agendar una cita.")
      return
    }

    if (!fecha) {
      setSubmitError("Selecciona una fecha valida.")
      return
    }

    try {
      const payload = {
        medicoId: Number(doctor),
        fecha: fecha.toISOString().split("T")[0],
        hora,
        motivo: formData.motivo,
        nombre: formData.nombre,
        apellidos: formData.apellidos,
        email: formData.email,
        telefono: formData.telefono,
      }

      const response = await fetch(`${API_URL}/api/citas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json().catch(() => ({}))
      if (!response.ok) {
        throw new Error(data?.message ?? "No se pudo agendar la cita.")
      }

      setIsSubmitted(true)
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "No se pudo agendar la cita."
      setSubmitError(message)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">

        <main className="max-w-2xl mx-auto px-4 py-16 sm:py-24">
          <Card className="border-0 shadow-xl">
            <CardContent className="pt-12 pb-12 text-center">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-4">
                Cita Agendada Exitosamente
              </h1>
              <p className="text-muted-foreground mb-8">
                Hemos enviado un correo de confirmacion a <strong>{formData.email}</strong> con todos los detalles de tu cita.
              </p>
              
              <div className="bg-muted rounded-lg p-6 text-left mb-8">
                <h3 className="font-semibold text-foreground mb-4">Resumen de tu cita</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Especialidad:</span>
                    <span className="font-medium text-foreground">
                      {especialidades.find(e => e.id === especialidad)?.nombre}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Doctor:</span>
                    <span className="font-medium text-foreground">
                      {doctoresDisponibles.find(d => d.id === Number(doctor))?.nombre}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Fecha:</span>
                    <span className="font-medium text-foreground">
                      {fecha?.toLocaleDateString("es-ES", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Hora:</span>
                    <span className="font-medium text-foreground">{hora}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/5 bg-transparent">
                  <Link to="/">Volver al Inicio</Link>
                </Button>
                <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Link to="/agendar-cita">Agendar Otra Cita</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-40">
        {/* Titulo */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Agenda tu Cita
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Completa los siguientes pasos para reservar tu cita con nuestros especialistas
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-10">
          <div className="flex items-center gap-2 sm:gap-4">
            {[
              { num: 1, label: "Especialidad", icon: Stethoscope },
              { num: 2, label: "Fecha y Hora", icon: CalendarIcon },
              { num: 3, label: "Tus Datos", icon: User },
            ].map((s, index) => (
              <div key={s.num} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-colors ${
                      step >= s.num
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <s.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <span className={`text-xs sm:text-sm mt-2 font-medium ${
                    step >= s.num ? "text-primary" : "text-muted-foreground"
                  }`}>
                    {s.label}
                  </span>
                </div>
                {index < 2 && (
                  <div className={`w-12 sm:w-20 h-1 mx-2 sm:mx-4 rounded-full mb-6 ${
                    step > s.num ? "bg-primary" : "bg-muted"
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Especialidad y Doctor */}
        {step === 1 && (
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-foreground">Selecciona Especialidad y Doctor</CardTitle>
              <CardDescription>Elige la especialidad medica y el profesional que deseas consultar</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="especialidad" className="text-foreground">Especialidad</Label>
                <Select value={especialidad} onValueChange={(value) => {
                  setEspecialidad(value)
                  setDoctor("")
                  setHora("")
                  setHorariosDisponibles([])
                }}>
                  <SelectTrigger className="w-full h-12 bg-card text-foreground">
                    <SelectValue placeholder="Selecciona una especialidad" />
                  </SelectTrigger>
                  <SelectContent className="bg-card">
                    {especialidades.map((esp) => (
                      <SelectItem key={esp.id} value={esp.id} className="text-foreground">
                        {esp.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {especialidad && (
                <div className="space-y-2">
                  <Label htmlFor="doctor" className="text-foreground">Doctor</Label>
                <Select value={doctor} onValueChange={(value) => {
                  setDoctor(value)
                  setHora("")
                }}>
                    <SelectTrigger className="w-full h-12 bg-card text-foreground">
                      <SelectValue placeholder="Selecciona un doctor" />
                    </SelectTrigger>
                    <SelectContent className="bg-card">
                      {doctoresDisponibles.map((doc) => (
                        <SelectItem key={doc.id} value={String(doc.id)} className="text-foreground">
                          {doc.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="pt-4">
                <Button
                  onClick={() => setStep(2)}
                  disabled={!canProceedStep1}
                  className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Continuar
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Fecha y Hora */}
        {step === 2 && (
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-foreground">Selecciona Fecha y Hora</CardTitle>
              <CardDescription>Elige el dia y horario que mejor se adapte a tu disponibilidad</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                {/* Calendario */}
                <div>
                  <Label className="text-foreground mb-4 block">Fecha de la cita</Label>
                  <div className="border border-border rounded-lg p-4 bg-card">
                    <Calendar
                      mode="single"
                      selected={fecha}
                      onSelect={(value) => {
                        setFecha(value)
                        setHora("")
                      }}
                      disabled={(date) => {
                        const today = new Date()
                        today.setHours(0, 0, 0, 0)
                        const day = date.getDay()
                        return date < today || day === 0 || day === 6
                      }}
                      className="mx-auto"
                    />
                  </div>
                </div>

                {/* Horarios */}
                <div>
                  <Label className="text-foreground mb-4 block">Horario disponible</Label>
                  {!fecha ? (
                    <div className="h-full flex items-center justify-center text-muted-foreground bg-muted rounded-lg p-8">
                      <p className="text-center">Selecciona primero una fecha para ver los horarios disponibles</p>
                    </div>
                  ) : loadingHorarios ? (
                    <div className="h-full flex items-center justify-center text-muted-foreground bg-muted rounded-lg p-8">
                      <p className="text-center">Cargando horarios disponibles...</p>
                    </div>
                  ) : horariosDisponibles.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-muted-foreground bg-muted rounded-lg p-8">
                      <p className="text-center">No hay horarios disponibles para este dia</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 gap-2">
                      {horariosDisponibles.map((h) => (
                        <button
                          key={h}
                          onClick={() => setHora(h)}
                          className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                            hora === h
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-card text-foreground border-border hover:border-primary hover:text-primary"
                          }`}
                        >
                          <Clock className="w-4 h-4 mx-auto mb-1" />
                          {h}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-4 pt-8">
                <Button
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="flex-1 h-12 border-border text-foreground hover:bg-muted"
                >
                  Atras
                </Button>
                <Button
                  onClick={() => setStep(3)}
                  disabled={!canProceedStep2}
                  className="flex-1 h-12 bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Continuar
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Datos personales */}
        {step === 3 && (
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-foreground">Tus Datos Personales</CardTitle>
              <CardDescription>Completa tu informacion para confirmar la cita</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {submitError ? (
                  <div className="rounded-md bg-red-50 px-4 py-2 text-sm text-red-700">
                    {submitError}
                  </div>
                ) : null}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nombre" className="text-foreground">Nombre</Label>
                    <Input
                      id="nombre"
                      name="nombre"
                      placeholder="Tu nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      className="h-12 bg-card text-foreground border-border"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="apellidos" className="text-foreground">Apellidos</Label>
                    <Input
                      id="apellidos"
                      name="apellidos"
                      placeholder="Tus apellidos"
                      value={formData.apellidos}
                      onChange={handleInputChange}
                      className="h-12 bg-card text-foreground border-border"
                      required
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">Correo Electronico</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="tu@email.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="h-12 pl-10 bg-card text-foreground border-border"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefono" className="text-foreground">Telefono</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="telefono"
                        name="telefono"
                        type="tel"
                        placeholder="+34 600 000 000"
                        value={formData.telefono}
                        onChange={handleInputChange}
                        className="h-12 pl-10 bg-card text-foreground border-border"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="motivo" className="text-foreground">Motivo de la consulta (opcional)</Label>
                  <Textarea
                    id="motivo"
                    name="motivo"
                    placeholder="Describe brevemente el motivo de tu consulta..."
                    value={formData.motivo}
                    onChange={handleInputChange}
                    className="min-h-24 bg-card text-foreground border-border resize-none"
                  />
                </div>

                {/* Resumen de la cita */}
                <div className="bg-muted rounded-lg p-4">
                  <h4 className="font-semibold text-foreground mb-3">Resumen de tu cita</h4>
                  <div className="grid sm:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Stethoscope className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">Especialidad:</span>
                      <span className="font-medium text-foreground">
                        {especialidades.find(e => e.id === especialidad)?.nombre}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">Doctor:</span>
                      <span className="font-medium text-foreground">
                        {doctoresDisponibles.find(d => d.id === Number(doctor))?.nombre}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">Fecha:</span>
                      <span className="font-medium text-foreground">
                        {fecha?.toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">Hora:</span>
                      <span className="font-medium text-foreground">{hora}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(2)}
                    className="flex-1 h-12 border-border text-foreground hover:bg-muted"
                  >
                    Atras
                  </Button>
                  <Button
                    type="submit"
                    disabled={!canSubmit}
                    className="flex-1 h-12 bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    Confirmar Cita
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Info adicional */}
        <div className="mt-8 grid sm:grid-cols-3 gap-4">
          {[
            { icon: Phone, title: "Asistencia", desc: "+52 919 123 456" },
            { icon: Clock, title: "Horario", desc: "Lun - Vie: 9:00 - 20:00" },
            { icon: Mail, title: "Email", desc: "citas@clinicavictorio.com" },
          ].map((item) => (
            <div key={item.title} className="bg-card rounded-lg p-4 flex items-center gap-3 border border-border">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{item.title}</p>
                <p className="font-medium text-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
