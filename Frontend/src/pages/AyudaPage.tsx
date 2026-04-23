import React, { useState } from "react";
import {
  HelpCircle,
  Phone,
  Mail,
  ChevronDown,
  Calendar,
  CreditCard,
  User,
  Shield,
} from "lucide-react";
import Footer from "../components/Footer"
import Header from "../components/Header"

const faqs = [
  {
    categoria: "Citas y Agenda",
    icon: Calendar,
    preguntas: [
      {
        pregunta: "¿Cómo puedo agendar una cita médica?",
        respuesta:
          "Puede agendar su cita a través de nuestra plataforma en línea accediendo a la sección 'Agenda Médica', llamando a nuestro número de atención al cliente, o visitando directamente nuestra clínica. Le recomendamos agendar con al menos 24 horas de anticipación.",
      },
      {
        pregunta: "¿Puedo cancelar o reprogramar mi cita?",
        respuesta:
          "Sí, puede cancelar o reprogramar su cita hasta 4 horas antes de la hora programada sin ningún cargo. Para hacerlo, ingrese a su cuenta, vaya a 'Mis Citas' y seleccione la opción correspondiente.",
      },
      {
        pregunta: "¿Qué debo hacer si llego tarde a mi cita?",
        respuesta:
          "Le recomendamos llegar 15 minutos antes de su cita. Si tiene un retraso menor a 10 minutos, comuníquese con la clínica. Retrasos mayores pueden resultar en la reprogramación de su cita.",
      },
    ],
  },
  {
    categoria: "Cuenta y Acceso",
    icon: User,
    preguntas: [
      {
        pregunta: "¿Cómo creo una cuenta en la plataforma?",
        respuesta:
          "Desde la página de inicio, haga clic en 'Crear Cuenta'. Complete el formulario con su nombre completo, correo electrónico y una contraseña segura. Recibirá un correo de confirmación para activar su cuenta.",
      },
      {
        pregunta: "Olvidé mi contraseña, ¿qué hago?",
        respuesta:
          "En la página de inicio de sesión, haga clic en '¿Olvidó su contraseña?'. Ingrese su correo electrónico y le enviaremos un enlace para restablecer su contraseña. El enlace es válido por 24 horas.",
      },
      {
        pregunta: "¿Cómo actualizo mi información personal?",
        respuesta:
          "Inicie sesión en su cuenta y vaya a 'Mi Perfil'. Desde ahí puede actualizar su información de contacto, dirección y datos médicos relevantes.",
      },
    ],
  },
  {
    categoria: "Pagos y Facturación",
    icon: CreditCard,
    preguntas: [
      {
        pregunta: "¿Qué métodos de pago aceptan?",
        respuesta:
          "Aceptamos tarjetas de crédito y débito (Visa, MasterCard, American Express), transferencias bancarias, y efectivo en nuestras instalaciones. También trabajamos con las principales aseguradoras.",
      },
      {
        pregunta: "¿Cómo obtengo mi factura?",
        respuesta:
          "Las facturas se generan automáticamente y se envían a su correo electrónico después de cada consulta. También puede descargarlas desde la sección 'Historial de Pagos' en su cuenta.",
      },
    ],
  },
  {
    categoria: "Privacidad y Seguridad",
    icon: Shield,
    preguntas: [
      {
        pregunta: "¿Cómo protegen mi información médica?",
        respuesta:
          "Toda su información está protegida con encriptación de nivel bancario. Cumplimos con las regulaciones de protección de datos de salud y solo el personal autorizado tiene acceso a su historial médico.",
      },
      {
        pregunta: "¿Puedo solicitar la eliminación de mis datos?",
        respuesta:
          "Sí, puede solicitar la eliminación de sus datos personales contactando a nuestro equipo de soporte. Tenga en cuenta que algunos datos médicos deben conservarse por requerimientos legales.",
      },
    ],
  },
];

export default function AyudaPage() {
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    asunto: "",
    mensaje: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitSuccess(true);
    setFormData({ nombre: "", email: "", asunto: "", mensaje: "" });
    setTimeout(() => setSubmitSuccess(false), 4000);
  };

  return (
    <div className="min-h-screen bg-[#EAF2FE] pt-20">
      {/* HEADER */}
      <Header/>

      {/* HERO */}
      <section className="bg-gradient-to-br from-[#3B82F6] to-[#60A6FA] py-16 text-center text-white">
        <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <HelpCircle className="w-10 h-10" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Centro de Ayuda</h1>
        <p className="max-w-2xl mx-auto text-lg text-white/90">
          Estamos aquí para asistirle. Encuentre respuestas a las preguntas más
          frecuentes o contáctenos directamente.
        </p>
      </section>

    {/* QUICK CONTACT */}
    <section className="max-w-7xl mx-auto px-6 -mt-12 grid md:grid-cols-2 gap-6">
    
    {/* TELÉFONO */}
    <div className="relative bg-white rounded-2xl shadow-lg p-6 border border-[#d1e3f8] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

        <div className="w-14 h-14 bg-[#EAF2FE] rounded-2xl flex items-center justify-center mb-5">
        <Phone className="w-7 h-7 text-[#3B82F6]" />
        </div>

        <h3 className="font-semibold text-[#2C3E50] text-lg mb-2">
        Atención Telefónica
        </h3>

        <p className="text-[#5a7a9a] text-sm mb-4 leading-relaxed">
        Nuestro equipo está disponible para resolver dudas médicas,
        información sobre citas y orientación general.
        </p>

        <div className="space-y-1 text-sm text-[#5a7a9a] mb-4">
        <p><span className="font-medium text-[#2C3E50]">Horario:</span> Lun - Vie</p>
        <p>8:00 AM – 6:00 PM</p>
        <p className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Tiempo de espera promedio: 2-5 min
        </p>
        </div>

        <a
        href="tel:+525512345678"
        className="inline-block w-full text-center bg-gradient-to-r from-[#3B82F6] to-[#60A6FA] text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
        >
        +52 55 1234 5678
        </a>
    </div>

    {/* EMAIL */}
    <div className="relative bg-white rounded-2xl shadow-lg p-6 border border-[#d1e3f8] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

        <div className="w-14 h-14 bg-[#EAF2FE] rounded-2xl flex items-center justify-center mb-5">
        <Mail className="w-7 h-7 text-[#3B82F6]" />
        </div>

        <h3 className="font-semibold text-[#2C3E50] text-lg mb-2">
        Soporte por Correo
        </h3>

        <p className="text-[#5a7a9a] text-sm mb-4 leading-relaxed">
        Envíenos su consulta detallada y nuestro equipo le responderá
        con información clara y personalizada.
        </p>

        <div className="space-y-1 text-sm text-[#5a7a9a] mb-4">
        <p><span className="font-medium text-[#2C3E50]">Tiempo estimado:</span></p>
        <p>Menos de 24 horas</p>
        <p>Incluya su número de paciente si aplica</p>
        </div>

        <a
        href="mailto:soporte@clinica.com"
        className="inline-block w-full text-center border-2 border-[#3B82F6] text-[#3B82F6] py-3 rounded-xl font-semibold hover:bg-[#3B82F6] hover:text-white transition"
        >
        soporte@clinica.com
        </a>
    </div>

    {/* CHAT */}
    {/* <div className="relative bg-white rounded-2xl shadow-lg p-6 border border-[#d1e3f8] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
        
        <span className="absolute top-4 right-4 text-xs bg-purple-100 text-purple-600 px-3 py-1 rounded-full font-medium">
        En línea
        </span>

        <div className="w-14 h-14 bg-[#EAF2FE] rounded-2xl flex items-center justify-center mb-5">
        <MessageCircle className="w-7 h-7 text-[#3B82F6]" />
        </div>

        <h3 className="font-semibold text-[#2C3E50] text-lg mb-2">
        Chat en Vivo
        </h3>

        <p className="text-[#5a7a9a] text-sm mb-4 leading-relaxed">
        Converse directamente con nuestro equipo de atención en tiempo
        real para resolver dudas inmediatas.
        </p>

        <div className="space-y-1 text-sm text-[#5a7a9a] mb-4">
        <p><span className="font-medium text-[#2C3E50]">Horario:</span></p>
        <p>Lun - Vie | 9:00 AM – 5:00 PM</p>
        <p className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Conexión inmediata
        </p>
        </div>

        <button
        type="button"
        className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
        >
        Iniciar Chat
        </button>
    </div> */}

    </section>

      {/* FAQ */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-8">
        {faqs.map((categoria) => {
          const Icon = categoria.icon;
          return (
            <div
              key={categoria.categoria}
              className="bg-white rounded-xl shadow-lg border border-[#d1e3f8]"
            >
              <div className="bg-gradient-to-r from-[#3B82F6] to-[#60A6FA] px-6 py-4 flex gap-3 text-white">
                <Icon className="w-5 h-5" />
                <h3 className="font-semibold">{categoria.categoria}</h3>
              </div>

              {categoria.preguntas.map((faq, index) => {
                const id = categoria.categoria + index;
                const isOpen = openFaq === id;
                return (
                  <div key={id} className="border-t">
                    <button
                      onClick={() => toggleFaq(id)}
                      className="w-full px-6 py-4 flex justify-between text-left hover:bg-[#EAF2FE]/50"
                    >
                      {faq.pregunta}
                      <ChevronDown
                        className={`transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <p className="px-6 pb-4 text-sm text-[#5a7a9a]">
                        {faq.respuesta}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </section>

      {/* FORMULARIO + INFO */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12">
          <form onSubmit={handleSubmit} className="space-y-5">
            <h2 className="text-3xl font-bold text-[#2C3E50]">
              Envíenos un Mensaje
            </h2>

            {submitSuccess && (
              <div className="p-4 bg-green-100 border rounded">
                Mensaje enviado correctamente.
              </div>
            )}

            <input
              placeholder="Nombre"
              className="w-full border p-3 rounded-lg"
              value={formData.nombre}
              onChange={(e) =>
                setFormData({ ...formData, nombre: e.target.value })
              }
              required
            />
            <input
              type="email"
              placeholder="Correo"
              className="w-full border p-3 rounded-lg"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
            <input
              placeholder="Asunto"
              className="w-full border p-3 rounded-lg"
              value={formData.asunto}
              onChange={(e) =>
                setFormData({ ...formData, asunto: e.target.value })
              }
              required
            />
            <textarea
              rows={5}
              placeholder="Mensaje"
              className="w-full border p-3 rounded-lg"
              value={formData.mensaje}
              onChange={(e) =>
                setFormData({ ...formData, mensaje: e.target.value })
              }
              required
            />
            <button className="w-full bg-gradient-to-r from-[#3B82F6] to-[#60A6FA] text-white py-3 rounded-xl font-semibold hover:opacity-90 transition">
              {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
            </button>
          </form>

          <div>
            <h2 className="text-3xl font-bold text-[#2C3E50] mb-6">
              Información de Contacto
            </h2>
            <p className="text-[#5a7a9a]">
              Av. Principal #123, Ciudad de México.
              <br />
              Tel: +52 55 1234 5678
              <br />
              soporte@clinica.com
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer/>
    </div>
  );
}
