import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useNavigate } from "react-router-dom";

export default function FAQ() {
  const navigate = useNavigate();
  
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-slate-50 via-white to-blue-50">
      <Header />

      {/* BLOBS AZULES DIFUMINADOS */}
      <div className="absolute  bg-blue-300 rounded-full blur-[140px] opacity-30" />
      <div className="absolute  bg-blue-400 rounded-full blur-[160px] opacity-25" />
      <div className="absolute bottom-0  bg-sky-300 rounded-full blur-[140px] opacity-25" />

      <div className="relative max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mt-30 mb-20">
          <span className="inline-block px-6 py-2 rounded-full bg-blue-100 text-blue-600 text-sm font-semibold shadow-sm">
            Soporte y Ayuda
          </span>

          <h2 className="mt-6 text-3xl sm:text-4xl font-extrabold text-slate-800">
            Preguntas Frecuentes
          </h2>

          <div className="mx-auto mt-5 h-1 w-24 bg-linear-to-r from-blue-400 to-blue-600 rounded-full" />

          <p className="mt-6 text-lg text-slate-600">
            Aquí resolvemos las dudas más comunes sobre nuestros servicios,
            citas médicas y atención.
          </p>
        </div>

        {/* FAQ LIST */}
        <div className="space-y-6">
          {[
            {
              q: "¿Cómo puedo agendar una cita?",
              a: "Puedes agendar tu cita desde nuestro sitio web, por teléfono o directamente a través de WhatsApp.",
            },
            {
              q: "¿Atienden sin cita previa?",
              a: "Recomendamos agendar una cita para brindarte una mejor atención, aunque en algunos casos podemos atender urgencias.",
            },
            {
              q: "¿Qué especialidades médicas ofrecen?",
              a: "Contamos con médicos generales y diversas especialidades, atendidas por profesionales certificados.",
            },
            {
              q: "¿Cuáles son sus horarios de atención?",
              a: "Nuestro horario de atención es de lunes a sábado, en horarios matutinos y vespertinos.",
            },
            {
              q: "¿Puedo cancelar o modificar mi cita?",
              a: "Sí, puedes modificar o cancelar tu cita comunicándote con anticipación para reorganizar tu atención.",
            },
            {
              q: "¿Atienden a niños y adultos mayores?",
              a: "Sí, brindamos atención médica tanto a niños como a adultos mayores con un enfoque integral.",
            },
            {
              q: "¿Aceptan seguros médicos?",
              a: "Algunos seguros médicos son aceptados. Te recomendamos contactarnos para confirmar cobertura.",
            },
            {
              q: "¿Qué medidas de higiene manejan?",
              a: "Seguimos estrictos protocolos de higiene y sanitización para garantizar la seguridad de nuestros pacientes.",
            },
          ].map((item) => (
            <div
              key={item.q}
              className="group bg-white/85 backdrop-blur-xl border border-white/40 rounded-2xl shadow-md hover:shadow-2xl transition p-6 sm:p-8"
            >
              <h3 className="text-lg sm:text-xl font-semibold text-slate-800 mb-3 flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 group-hover:scale-125 transition" />
                {item.q}
              </h3>

              <p className="text-slate-600 leading-relaxed">
                {item.a}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-24 text-center mb-20">
          <h3 className="text-2xl font-bold text-slate-800 mb-4">
            ¿Aún tienes dudas?
          </h3>
          <p className="text-slate-600 mb-8">
            Nuestro equipo está listo para ayudarte.
          </p>

          <button onClick={() => navigate("/contacto")} className="bg-linear-to-r from-blue-500 to-blue-700 text-white px-12 py-4 rounded-full font-semibold hover:scale-105 transition shadow-xl">
            Contáctanos
          </button>
        </div>

      </div>

      <Footer />
    </section>
  )
}
