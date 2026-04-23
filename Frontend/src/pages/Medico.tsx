import { Link } from "react-router-dom";
import {
  Stethoscope,
  CalendarDays,
  Users,
  ClipboardList,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
// import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import MedicoHeader from "@/components/HeaderMedico";

export default function LandingMedico() {
  return (
    <div className="min-h-screen bg-background">
      <MedicoHeader />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#2C3E50] via-[#3B82F6] to-[#60A6FA] pt-32 pb-24 text-white">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
            <Stethoscope className="w-10 h-10 text-white" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Plataforma Médica Clínica Victorio
          </h1>

          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-10">
            Una plataforma diseñada para facilitar la gestión médica:
            citas, pacientes, consultas e historial clínico en un solo lugar,
            de forma segura y eficiente.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-white text-[#3B82F6] hover:bg-white/90"
            >
              <Link to="/medico/mapa">
                Acceder al Panel Médico
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 bg-transparent"
            >
              <Link to="/medico/ayuda">
                Soporte Técnico
              </Link>
            </Button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* BENEFICIOS */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-4">
              Todo lo que necesitas para tu práctica médica
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              La plataforma médica de Clínica Victorio está diseñada
              para optimizar tu tiempo y mejorar la atención al paciente.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <CalendarDays className="w-10 h-10 text-[#3B82F6] mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">
                  Agenda Inteligente
                </h3>
                <p className="text-sm text-muted-foreground">
                  Visualiza y gestiona tus citas diarias, semanales y futuras
                  desde un solo calendario.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Users className="w-10 h-10 text-[#3B82F6] mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">
                  Gestión de Pacientes
                </h3>
                <p className="text-sm text-muted-foreground">
                  Accede a la información clínica y datos de contacto de
                  tus pacientes de forma rápida.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <ClipboardList className="w-10 h-10 text-[#3B82F6] mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">
                  Consultas Médicas
                </h3>
                <p className="text-sm text-muted-foreground">
                  Registra diagnósticos, tratamientos e indicaciones
                  con historial clínico centralizado.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* SEGURIDAD */}
      <section className="bg-card py-20">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <ShieldCheck className="w-14 h-14 text-[#3B82F6] mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">
            Seguridad y confidencialidad
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Cumplimos con los principios de confidencialidad médica,
            garantizando la protección de los datos clínicos y la privacidad
            de los pacientes.
          </p>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Comienza a gestionar tu práctica médica hoy
        </h2>
        <p className="text-muted-foreground mb-8">
          Accede al panel médico y administra tus consultas de manera eficiente.
        </p>
        <Button
          asChild
          size="lg"
          className="bg-[#3B82F6] hover:bg-[#3B82F6]/90 text-white"
        >
          <Link to="/medico/mapa">
            Entrar al Panel Médico
          </Link>
        </Button>
      </section>

      <Footer />
    </div>
  );
}
