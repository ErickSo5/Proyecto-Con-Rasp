import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  FileText,
  HelpCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import MedicoHeader from "./HeaderMedico";

const navigation = [
  {
    title: "Inicio",
    description: "Resumen del día y citas próximas",
    icon: LayoutDashboard,
    href: "/medico",
  },
  {
    title: "Agenda",
    description: "Calendario y citas programadas",
    icon: CalendarDays,
    href: "/medico/agenda",
  },
  {
    title: "Citas",
    description: "Administración de las citas",
    icon: FileText,
    href: "/medico/citas",
  },
  {
    title: "Ayuda",
    description: "Preguntas frecuentes y soporte",
    icon: HelpCircle,
    href: "/medico/ayuda",
  },
];

export default function MedicoNavigationMap() {
  return (
    <section className="py-16 bg-[#F8FAFC]">
      <MedicoHeader />
      <div className="container mx-auto mt-20 px-4">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">
            Panel Médico
          </h2>
          <p className="text-slate-600">
            Accede rápidamente a las funciones principales
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.title} to={item.href}>
                <Card className="group h-full border border-slate-200 hover:border-[#3B82F6] hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 rounded-xl bg-[#EAF2FE] flex items-center justify-center mb-4 group-hover:bg-[#3B82F6] transition">
                      <Icon className="w-7 h-7 text-[#3B82F6] group-hover:text-white transition" />
                    </div>

                    <h3 className="text-lg font-semibold text-slate-800 mb-1 group-hover:text-[#3B82F6]">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-600">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
