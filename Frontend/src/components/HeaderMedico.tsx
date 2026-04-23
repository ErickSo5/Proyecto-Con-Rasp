import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Stethoscope,
  CalendarDays,
  FileText,
  UserCircle,
  LogOut,
  ChevronDown,
} from "lucide-react";

export default function MedicoHeader() {
  const [openMenu, setOpenMenu] = useState(false);
  const [openExtras, setOpenExtras] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO / IDENTIDAD */}
        <Link to="/medico" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-[#3B82F6] flex items-center justify-center">
            <Stethoscope className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-lg text-slate-800">
            Clínica Victorio
          </span>
        </Link>

        {/* NAV DESKTOP */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-700">

          <Link to="/medico" className="hover:text-[#3B82F6]">
            Inicio
          </Link>

          <Link to="/medico/agenda" className="hover:text-[#3B82F6] flex items-center gap-1">
            <CalendarDays className="w-4 h-4" />
            Agenda
          </Link>

          <Link to="/medico/citas" className="hover:text-[#3B82F6] flex items-center gap-1">
            <FileText className="w-4 h-4" />
            Citas
          </Link>

          {/* DROPDOWN */}
          <div className="relative">
            <button
              onClick={() => setOpenExtras(!openExtras)}
              className="hover:text-blue-600 transition flex items-center gap-1"
            >
              Más
              <svg
                className={`w-4 h-4 transition-transform ${
                  openExtras ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {openExtras && (
              <div className="absolute right-0 mt-3 w-56 rounded-2xl bg-white shadow-xl border overflow-hidden">
                <Link
                  to="/medico/ayuda"
                  onClick={() => setOpenExtras(false)}
                  className="block px-5 py-3 text-sm hover:bg-blue-50 transition"
                >
                  Ayuda
                </Link>

                <Link
                  to="/medico/mapa"
                  onClick={() => setOpenExtras(false)}
                  className="block px-5 py-3 text-sm hover:bg-blue-50 transition"
                >
                  Mapa de navegación
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* PERFIL */}
        <div className="relative">
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="flex items-center gap-2 hover:bg-slate-100 px-3 py-2 rounded-lg transition"
          >
            <UserCircle className="w-7 h-7 text-slate-600" />
            <span className="hidden sm:block text-sm font-medium">
              Dr. Juan Pérez
            </span>
            <ChevronDown className="w-4 h-4 text-slate-500" />
          </button>

          {openMenu && (
            <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-lg border overflow-hidden">
              <Link
                to="/medico/perfil"
                className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-slate-50"
                onClick={() => setOpenMenu(false)}
              >
                <UserCircle className="w-4 h-4" />
                Perfil Médico
              </Link>

              <button
                className="w-full flex items-center gap-2 px-4 py-3 text-sm hover:bg-red-50 text-red-600"
                onClick={() => {
                  setOpenMenu(false);
                  localStorage.removeItem("auth_token");
                  localStorage.removeItem("auth_role");
                  window.location.assign("/login");
                }}
              >
                <LogOut className="w-4 h-4" />
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
