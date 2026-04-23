import Footer from "./Footer";
import Header from "./Header";

export default function PrivacyNotice() {
  return (
    <section className="min-h-screen ">
      <Header />
      
      {/* Decoración de fondo */}
      <div className="absolute  bg-blue-100 rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-0  bg-blue-200 rounded-full blur-3xl opacity-30" />

      <div className="relative max-w-5xl mx-auto">
        
        {/* Card principal */}
        <div className="bg-white/80 backdrop-blur rounded-3xl mt-20 shadow-2xl p-10 sm:p-14">

          {/* Header */}
          <div className="mb-10">
            <span className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-600 text-sm font-medium">
              Información Legal
            </span>

            <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-slate-800">
              Aviso de Privacidad
            </h2>

            <div className="mt-4 h-1 w-20 bg-blue-600 rounded-full" />
          </div>

          {/* Contenido */}
          <div className="space-y-6 text-slate-700 mb-10 leading-relaxed text-lg">
            <p>
              En <strong>Clínica Victorio</strong> estamos comprometidos con la
              protección de los datos personales de nuestros pacientes, médicos y
              usuarios, garantizando su seguridad y confidencialidad.
            </p>

            <p>
              La información recopilada será utilizada únicamente para fines
              médicos, administrativos y de contacto, conforme a la legislación
              vigente en materia de protección de datos personales.
            </p>

            <p>
              Los datos personales no serán compartidos con terceros sin
              autorización previa del titular, excepto en los casos exigidos por
              disposiciones legales o autoridades competentes.
            </p>

            <p>
              Para ejercer sus derechos de acceso, rectificación, cancelación u
              oposición al tratamiento de sus datos personales, puede contactarnos
              a través de nuestros medios oficiales.
            </p>
          </div>

          {/* Footer visual */}
          <div className="mt-12 pt-6 border-t mb-10 border-slate-200 text-sm text-slate-500">
            Última actualización: {new Date().getFullYear()}
          </div>

        </div>
      </div>

      <Footer />
    </section>
  )
}
