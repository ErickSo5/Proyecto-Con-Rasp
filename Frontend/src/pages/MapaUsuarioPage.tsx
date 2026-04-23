import { useState } from "react";
import {
  Home,
  Users,
  Phone,
  Calendar,
  Map as MapIcon,
  // FileText,
  // Building,
  CheckCircle,
  ChevronRight,
} from "lucide-react";
import Footer from "../components/Footer"
import Header from "../components/Header"

interface SiteNode {
  id: string;
  label: string;
  icon: React.ElementType;
  href: string;
  available: boolean;
  children?: SiteNode[];
}

const siteStructure: SiteNode[] = [
  { id: "inicio", label: "Inicio (Landing Page)", icon: Home, href: "/", available: true },
  {
    id: "nosotros",
    label: "Nosotros / Acerca de",
    icon: Users,
    href: "/nosotros",
    available: true,
    // children: [
    //   { id: "historia", label: "Historia y visión", icon: FileText, href: "/nosotros", available: true },
    //   { id: "equipo", label: "Equipo médico", icon: Users, href: "/nosotros", available: true },
    //   { id: "instalaciones", label: "Instalaciones", icon: Building, href: "/nosotros", available: true },
    // ],
  },
  { id: "agenda", label: "Agenda de citas", icon: Calendar, href: "/cliente/cita", available: true },
  { id: "contacto", label: "Contacto", icon: Phone, href: "/contacto", available: true },
];

function SiteNodeCard({ node }: { node: SiteNode }) {
  const [open] = useState(false);
  const Icon = node.icon;
  const hasChildren = !!node.children?.length;

  const handleClick = () => {
    // if (hasChildren) {
    //   setOpen((prev) => !prev);
    //   return       window.location.href = node.href;
    // }

    if (node.available) {
      window.location.href = node.href;
    }
  };

  return (
    <div className="mb-4">
      {/* Nodo principal */}
      <div
        onClick={handleClick}
        className={`
          flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition
          ${node.available
            ? "bg-white hover:bg-blue-50 border-gray-200 hover:shadow-sm"
            : "bg-gray-100 border-gray-200 opacity-70"}
        `}
      >
        <div
          className={`
            w-10 h-10 rounded-lg flex items-center justify-center
            ${node.available ? "bg-blue-100 text-blue-500" : "bg-gray-200 text-gray-400"}
          `}
        >
          <Icon className="w-5 h-5" />
        </div>

        <div className="flex-1">
          <h3 className="font-medium text-gray-800">{node.label}</h3>
          <p className="text-xs text-gray-500">
            {node.available ? "Disponible" : "Próximamente"}
          </p>
        </div>

        {node.available && !hasChildren && (
          <span className="flex items-center gap-1 text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
            <CheckCircle className="w-3 h-3" />
            Activo
          </span>
        )}

        {hasChildren && (
          <ChevronRight
            className={`
              w-5 h-5 text-gray-400 transition-transform
              ${open ? "rotate-90" : ""}
            `}
          />
        )}
      </div>

      {/* Subnodos */}
      {hasChildren && open && (
        <div className="mt-2 ml-8 space-y-2">
          {node.children!.map((child) => (
            <div
              key={child.id}
              className="
                flex items-center gap-3 p-3 rounded-lg
                border border-gray-200 bg-gray-50
              "
            >
              <child.icon className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">{child.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function MapaSitioPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      
      <Header/>
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-400 to-blue-500 py-16 text-center text-white">
        <MapIcon className="w-10 h-10 mx-auto mb-4" />
        <h1 className="text-4xl font-bold mb-4">Mapa del Sitio</h1>
        <p className="max-w-2xl mx-auto text-white/90">
          Navegue fácilmente por todas las secciones del portal.
        </p>
      </section>

      {/* Content */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
          <Home className="w-5 h-5 text-blue-500" />
          Navegación principal
        </h2>

        {siteStructure.map((node) => (
          <SiteNodeCard key={node.id} node={node} />
        ))}
      </section>

      <Footer/>
    </div>
  );
}
