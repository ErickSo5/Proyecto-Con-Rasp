import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="relative bg-slate-900 text-slate-200 pt-20 pb-10 overflow-hidden">

      {/* Luces decorativas */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 -right-40 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* CONTENIDO PRINCIPAL */}
        <div className="grid gap-14 sm:grid-cols-2 lg:grid-cols-4 pb-14 border-b border-white/10">

          {/* MARCA */}
          <div>
            <h3 className="text-2xl font-extrabold text-white mb-4">
              Clínica Victorio
            </h3>

            <p className="text-slate-400 leading-relaxed mb-6">
              Atención médica profesional, humana y confiable, respaldada por
              especialistas certificados y tecnología moderna.
            </p>

            {/* REDES SOCIALES */}
            <div className="flex gap-4">
              {[
                { label: "Facebook", href: "#" },
                { label: "Instagram", href: "#" },
                { label: "WhatsApp", href: "#" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-blue-500 hover:text-white transition"
                >
                  <span className="text-sm font-semibold">
                    {social.label.charAt(0)}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* SERVICIOS */}
          <div>
            <h4 className="font-semibold text-white mb-5">
              Servicios
            </h4>
            <ul className="space-y-3 text-slate-400">
              <li className="hover:text-white transition">Consulta general</li>
              <li className="hover:text-white transition">Especialidades médicas</li>
              <li className="hover:text-white transition">Cirugías</li>
              <li className="hover:text-white transition">Atención preventiva</li>
            </ul>
          </div>

          {/* EMPRESA */}
          <div>
            <h4 className="font-semibold text-white mb-5">
              Empresa
            </h4>
            <ul className="space-y-3 text-slate-400">
              <li>
                <Link to="/nosotros" className="hover:text-white transition">
                  Sobre nosotros
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="hover:text-white transition">
                  Contacto
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition">
                  Preguntas frecuentes
                </Link>
              </li>
            </ul>
          </div>

          {/* LEGAL */}
          <div>
            <h4 className="font-semibold text-white mb-5">
              Legal
            </h4>
            <ul className="space-y-3 text-slate-400">
              <li>
                <Link to="/privacidad" className="hover:text-white transition">
                  Aviso de privacidad
                </Link>
              </li>
              <li>
                <Link to="/terminos" className="hover:text-white transition">
                  Términos y condiciones
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="pt-10 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-500 text-sm">
          <p>
            © {new Date().getFullYear()} Clínica Victorio. Todos los derechos reservados.
          </p>

          <p className="text-center">
            Hecho con ❤️ para cuidar tu salud
          </p>
        </div>

      </div>
    </footer>
  )
}
