import { FileText, Calendar, Mail } from "lucide-react";
import Footer from "../components/Footer"
import Header from "../components/Header"

export default function TerminosPage() {
  return (
    <div className="min-h-screen bg-[#EAF2FE] pt-20">

      {/* Header */}
      <Header/>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#3B82F6] to-[#60A6FA] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-6">
            <FileText className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Términos y Condiciones
          </h1>
          <p className="text-white/90 text-lg max-w-2xl mx-auto">
            Lea detenidamente los siguientes términos y condiciones antes de
            utilizar nuestros servicios médicos.
          </p>
          <div className="flex items-center justify-center gap-2 mt-6 text-white/80 text-sm">
            <Calendar className="h-4 w-4" />
            <span>Última actualización: Enero 2026</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg border border-[#d1e3f8] overflow-hidden">
          <div className="p-6 sm:p-10 space-y-8">
            {/* Section 1 */}
            <section>
              <h2 className="text-xl font-semibold text-[#2C3E50] mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-[#EAF2FE] text-[#3B82F6] rounded-lg flex items-center justify-center text-sm font-bold">
                  1
                </span>
                Aceptación de los Términos
              </h2>
              <p className="text-[#5a7a9a] leading-relaxed">
                Al acceder y utilizar los servicios de nuestra clínica, usted
                acepta estar sujeto a estos términos y condiciones, todas las
                leyes y regulaciones aplicables, y acepta que es responsable del
                cumplimiento de las leyes locales aplicables. Si no está de
                acuerdo con alguno de estos términos, tiene prohibido usar o
                acceder a nuestros servicios.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-xl font-semibold text-[#2C3E50] mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-[#EAF2FE] text-[#3B82F6] rounded-lg flex items-center justify-center text-sm font-bold">
                  2
                </span>
                Servicios Médicos
              </h2>
              <p className="text-[#5a7a9a] leading-relaxed mb-4">
                Nuestra clínica ofrece servicios de atención médica general y
                especializada. Los servicios incluyen, pero no se limitan a:
              </p>
              <ul className="space-y-2 text-[#5a7a9a]">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-[#3B82F6] rounded-full mt-2 flex-shrink-0" />
                  <span>Consultas médicas presenciales y telemedicina</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-[#3B82F6] rounded-full mt-2 flex-shrink-0" />
                  <span>Diagnósticos y tratamientos especializados</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-[#3B82F6] rounded-full mt-2 flex-shrink-0" />
                  <span>Exámenes de laboratorio y estudios de imagen</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-[#3B82F6] rounded-full mt-2 flex-shrink-0" />
                  <span>Programas de prevención y seguimiento de salud</span>
                </li>
              </ul>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-xl font-semibold text-[#2C3E50] mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-[#EAF2FE] text-[#3B82F6] rounded-lg flex items-center justify-center text-sm font-bold">
                  3
                </span>
                Privacidad y Confidencialidad
              </h2>
              <p className="text-[#5a7a9a] leading-relaxed">
                Nos comprometemos a proteger la privacidad de su información
                médica de acuerdo con las leyes de protección de datos
                aplicables. Toda la información personal y médica proporcionada
                será tratada con estricta confidencialidad y solo será
                compartida con terceros cuando sea estrictamente necesario para
                su atención médica o cuando la ley lo requiera.
              </p>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-xl font-semibold text-[#2C3E50] mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-[#EAF2FE] text-[#3B82F6] rounded-lg flex items-center justify-center text-sm font-bold">
                  4
                </span>
                Responsabilidades del Paciente
              </h2>
              <p className="text-[#5a7a9a] leading-relaxed mb-4">
                Como paciente de nuestra clínica, usted se compromete a:
              </p>
              <ul className="space-y-2 text-[#5a7a9a]">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-[#60A6FA] rounded-full mt-2 flex-shrink-0" />
                  <span>
                    Proporcionar información veraz y completa sobre su historial
                    médico
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-[#60A6FA] rounded-full mt-2 flex-shrink-0" />
                  <span>
                    Seguir las indicaciones médicas y tratamientos prescritos
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-[#60A6FA] rounded-full mt-2 flex-shrink-0" />
                  <span>
                    Asistir puntualmente a las citas programadas o cancelar con
                    anticipación
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-[#60A6FA] rounded-full mt-2 flex-shrink-0" />
                  <span>
                    Realizar los pagos correspondientes por los servicios
                    recibidos
                  </span>
                </li>
              </ul>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-xl font-semibold text-[#2C3E50] mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-[#EAF2FE] text-[#3B82F6] rounded-lg flex items-center justify-center text-sm font-bold">
                  5
                </span>
                Política de Citas y Cancelaciones
              </h2>
              <p className="text-[#5a7a9a] leading-relaxed">
                Las citas deben ser canceladas o reprogramadas con al menos 24
                horas de anticipación. Las cancelaciones tardías o las
                inasistencias sin previo aviso pueden estar sujetas a cargos
                adicionales. Nos reservamos el derecho de reprogramar citas
                debido a emergencias o circunstancias imprevistas.
              </p>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-xl font-semibold text-[#2C3E50] mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-[#EAF2FE] text-[#3B82F6] rounded-lg flex items-center justify-center text-sm font-bold">
                  6
                </span>
                Limitación de Responsabilidad
              </h2>
              <p className="text-[#5a7a9a] leading-relaxed">
                La clínica no será responsable por daños indirectos,
                incidentales, especiales o consecuentes que resulten del uso de
                nuestros servicios. Nuestra responsabilidad total no excederá el
                monto pagado por los servicios específicos que dieron lugar a la
                reclamación.
              </p>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-xl font-semibold text-[#2C3E50] mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-[#EAF2FE] text-[#3B82F6] rounded-lg flex items-center justify-center text-sm font-bold">
                  7
                </span>
                Modificaciones a los Términos
              </h2>
              <p className="text-[#5a7a9a] leading-relaxed">
                Nos reservamos el derecho de modificar estos términos y
                condiciones en cualquier momento. Las modificaciones entrarán en
                vigor inmediatamente después de su publicación en nuestro sitio
                web. El uso continuado de nuestros servicios después de dichas
                modificaciones constituye su aceptación de los nuevos términos.
              </p>
            </section>

            {/* Contact Box */}
            <section className="bg-gradient-to-br from-[#EAF2FE] to-white rounded-xl p-6 border border-[#d1e3f8]">
              <h2 className="text-xl font-semibold text-[#2C3E50] mb-4">
                ¿Tiene preguntas?
              </h2>
              <p className="text-[#5a7a9a] mb-4">
                Si tiene alguna pregunta sobre estos términos y condiciones, no
                dude en contactarnos.
              </p>
              <div className="flex items-center gap-3 text-[#3B82F6]">
                <Mail className="h-5 w-5" />
                <a
                  href="mailto:legal@clinica.com"
                  className="font-medium hover:underline"
                >
                  legal@clinicavictorio.com
                </a>
              </div>
            </section>
          </div>
        </div>
      </main>
      {/* Footer */}
      <Footer/>
    </div>
  );
}
