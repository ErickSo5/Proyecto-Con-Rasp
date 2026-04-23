import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/auth/useAuth";

export default function Header() {
  const [openExtras, setOpenExtras] = useState(false);
  const { isAuthenticated, loading } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_role");
    window.location.assign("/");
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur ">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg">CV</span>
          </div>
          <span className="text-xl font-bold text-slate-800">
            Clínica Victorio
          </span>
        </Link>

        {/* NAV */}
        <nav className="hidden md:flex items-center gap-8 font-medium text-slate-700">

          <Link to="/" className="hover:text-blue-600 transition">
            Inicio
          </Link>

          <Link to="/cliente/servicios" className="hover:text-blue-600 transition">
            Servicios
          </Link>

          <Link to="/blog" className="hover:text-blue-600 transition">
            Blog/Noticias
          </Link>

          <Link to="/nosotros" className="hover:text-blue-600 transition">
            Nosotros
          </Link>

          <Link to="/contacto" className="hover:text-blue-600 transition">
            Contacto
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
                  to="/terminos"
                  onClick={() => setOpenExtras(false)}
                  className="block px-5 py-3 text-sm hover:bg-blue-50 transition"
                >
                  Términos y condiciones
                </Link>

                <Link
                  to="/privacidad"
                  onClick={() => setOpenExtras(false)}
                  className="block px-5 py-3 text-sm hover:bg-blue-50 transition"
                >
                  Aviso de privacidad
                </Link>

                <Link
                  to="/faq"
                  onClick={() => setOpenExtras(false)}
                  className="block px-5 py-3 text-sm hover:bg-blue-50 transition"
                >
                  Preguntas frecuentes
                </Link>

                <Link
                  to="/mensajes"
                  onClick={() => setOpenExtras(false)}
                  className="block px-5 py-3 text-sm hover:bg-blue-50 transition"
                >
                  Buzón de mensajes
                </Link>

                <Link
                  to="/mapausuario"
                  onClick={() => setOpenExtras(false)}
                  className="block px-5 py-3 text-sm hover:bg-blue-50 transition"
                >
                  Mapa de navegación
                </Link>
                <Link
                  to="/cambiar-password"
                  onClick={() => setOpenExtras(false)}
                  className="block px-5 py-3 text-sm hover:bg-blue-50 transition"
                >
                  Cambiar contraseña
                </Link>
              </div>
            )}
          </div>

          {/* BOTÓN INICIAR SESIÓN / CERRAR SESIÓN */}
          {loading ? null : isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="px-5 py-2 rounded-full border border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition"
            >
              Cerrar sesión
            </button>
          ) : (
            <Link
              to="/login"
              className="px-5 py-2 rounded-full border border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition"
            >
              Iniciar sesión
            </Link>
          )}

          {/* CTA */}
          <Link
            to="/cliente/cita"
            className="px-5 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Agendar cita
          </Link>
        </nav>
      </div>
    </header>
  );
}
