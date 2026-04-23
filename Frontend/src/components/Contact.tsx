import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

export default function Contact() {
  const navigate = useNavigate();
  
  return (
    <section
      id="contacto"
      className="py-20 lg:py-0 bg-linear-to-b from-blue-50 to-white mt-40"
    >
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-blue-600 font-medium">Contáctanos</span>
          <h3 className="mt-2 text-4xl sm:text-5xl font-bold text-slate-800">
            Estamos para ayudarte
          </h3>
          <p className="mt-6 text-lg text-slate-600">
            Ponte en contacto con nosotros para agendar tu cita o resolver
            cualquier duda sobre nuestros servicios.
          </p>
        </div>

        {/* CONTENIDO */}
        <div className="grid lg:grid-cols-5 gap-10">

          {/* INFO */}
          <div className="lg:col-span-2 space-y-6">

            {/* Dirección */}
            <div className="bg-white rounded-3xl p-6 shadow-md flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s6-5.686 6-10a6 6 0 10-12 0c0 4.314 6 10 6 10z" />
                  <circle cx="12" cy="11" r="2.5" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-slate-800">Dirección</h4>
                <p className="text-slate-700 mt-1">Av. Salud 123, CDMX</p>
                <p className="text-sm text-slate-500">Centro Médico</p>
              </div>
            </div>

            {/* Horarios */}
            <div className="bg-white rounded-3xl p-6 shadow-md flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="9" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 3" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-slate-800">Horarios</h4>
                <p className="text-slate-700 mt-1">Lunes a Viernes: 9:00 – 18:00</p>
                <p className="text-sm text-slate-500">Sábados: 9:00 – 14:00</p>
              </div>
            </div>

            {/* Teléfono */}
            <div className="bg-white rounded-3xl p-6 shadow-md flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2 5a2 2 0 012-2h3l2 5-2 1a11 11 0 005 5l1-2 5 2v3a2 2 0 01-2 2A18 18 0 012 5z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-slate-800">Teléfono</h4>
                <p className="text-slate-700 mt-1">(55) 1234 5678</p>
                <p className="text-sm text-slate-500">Atención directa</p>
              </div>
            </div>

          </div>

          {/* FORM */}
          <div className="lg:col-span-3 bg-white rounded-3xl shadow-md p-8">
            <h4 className="text-2xl font-semibold text-slate-800 mb-6">
              Envíanos un mensaje
            </h4>

            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Nombre completo"
                  className="w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  className="w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <textarea
                rows={4}
                placeholder="¿En qué podemos ayudarte?"
                className="w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              />

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
              >
                Enviar mensaje
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M22 2L11 13" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              </button>
            </form>
          </div>
        </div>

        {/* BOTONES RÁPIDOS */}
        <div className="mt-20 mb-20 flex flex-col sm:flex-row justify-center gap-6">

          {/* WhatsApp */}
          <a
            href="https://wa.me/5215512345678"
            target="_blank"
            className="flex items-center justify-center gap-3 px-8 py-3 rounded-full bg-green-600 text-white font-medium hover:bg-green-600 transition"
          >
            <svg className="w-5 h-5" viewBox="0 0 32 32" fill="currentColor">
              <path d="M19.11 17.52c-.28-.14-1.64-.81-1.9-.9-.25-.09-.44-.14-.62.14-.18.28-.71.9-.87 1.09-.16.18-.32.21-.6.07-.28-.14-1.17-.43-2.23-1.38-.82-.73-1.38-1.63-1.54-1.9-.16-.28-.02-.43.12-.57.12-.12.28-.32.42-.48.14-.16.18-.28.28-.46.09-.18.05-.35-.02-.49-.07-.14-.62-1.5-.85-2.05-.22-.53-.45-.46-.62-.46-.16 0-.35-.02-.53-.02-.18 0-.49.07-.75.35-.26.28-.99.97-.99 2.36s1.01 2.74 1.15 2.93c.14.18 1.99 3.04 4.83 4.26.68.29 1.21.46 1.62.59.68.22 1.3.19 1.79.12.55-.08 1.64-.67 1.87-1.32.23-.65.23-1.21.16-1.32-.07-.11-.25-.18-.53-.32z"/>
            </svg>
            WhatsApp
          </a>

          {/* Llamar */}
          <a
            href="tel:5512345678"
            className="flex items-center justify-center gap-3 px-8 py-3 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
          >
            Llamar
          </a>

          {/* Agendar */}
          <button onClick={() => navigate("/cliente/cita")} className="px-8 py-3 rounded-full bg-slate-800 text-white font-medium hover:bg-slate-900 transition">
            Agendar cita
          </button>

        </div>
      </div>

      <Footer />
    </section>
  )
}
