import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

export default function About() {
  const navigate = useNavigate();

  return (
    <section
      id="nosotros"
      className="relative py-28 lg:py-0 overflow-hidden bg-linear-to-b from-slate-50 via-white to-blue-50"
    >
      <Header />
      {/* BLOBS AZULES DIFUMINADOS */}
      <div className="absolute -top-52 -left-52 w-136 h-136 bg-blue-300 rounded-full blur-[140px] opacity-30" />
      <div className="absolute top-1/3 -right-52 w-xl h-144 bg-blue-400 rounded-full blur-[160px] opacity-25" />
      <div className="absolute bottom-0 left-1/3 w-120 h-120 bg-sky-300 rounded-full blur-[140px] opacity-25" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-28 mt-40">
          <span className="inline-block px-6 py-2 rounded-full bg-blue-100 text-blue-600 font-semibold text-sm shadow-sm">
            Sobre Nosotros
          </span>

          <h2 className="mt-6 text-4xl sm:text-5xl font-extrabold text-slate-800">
            Clínica Victorio
          </h2>

          <div className="mx-auto mt-6 h-1 w-28 bg-linear-to-r from-blue-400 to-blue-600 rounded-full" />

          <p className="mt-8 text-lg text-slate-600 leading-relaxed">
            Somos una clínica comprometida con la atención médica integral,
            combinando experiencia profesional, tecnología moderna y un trato
            humano.
          </p>
        </div>

        {/* INSTALACIONES */}
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-36">
          {/* IMÁGENES */}
          <div className="grid grid-cols-2 gap-6">
            {[
              "/images/instalaciones1.png",
              "/images/instalaciones2.png",
              "/images/instalaciones3.png",
            ].map((img, index) => (
              <div
                key={index}
                className={`relative rounded-3xl overflow-hidden shadow-xl ${
                  index === 2 ? "col-span-2 h-60" : "h-52"
                }`}
              >
                <img
                  src={img}
                  alt="Instalaciones"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-blue-900/40 to-transparent" />
              </div>
            ))}
          </div>

          {/* TEXTO */}
          <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/40">
            <h3 className="text-3xl font-bold text-slate-800 mb-6">
              Instalaciones de primer nivel
            </h3>

            <p className="text-slate-600 mb-10 leading-relaxed">
              Diseñadas para ofrecer seguridad, confort y eficiencia médica,
              cumpliendo con los más altos estándares de calidad.
            </p>

            <div className="grid sm:grid-cols-2 gap-5">
              {[
                "Consultorios equipados",
                "Áreas de espera cómodas",
                "Equipamiento moderno",
                "Protocolos de higiene",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 bg-slate-50 rounded-xl px-5 py-4 shadow-sm hover:shadow-md transition"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  <span className="text-slate-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="grid sm:grid-cols-3 gap-10 text-center mb-36">
          {[
            { value: "10+", label: "Años de experiencia" },
            { value: "5,000+", label: "Pacientes atendidos" },
            { value: "25+", label: "Especialistas" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white/90 backdrop-blur rounded-3xl p-10 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition"
            >
              <p className="text-4xl font-extrabold bg-linear-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
                {stat.value}
              </p>
              <p className="mt-3 text-slate-600 font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* EQUIPO MÉDICO */}
        <div className="mb-36">
          <h3 className="text-3xl font-bold text-center text-slate-800 mb-16">
            Nuestro equipo médico
          </h3>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                name: "Dr. Juan Pérez",
                role: "Médico General",
                img: "/images/doctor1.png",
              },
              {
                name: "Dra. Ana López",
                role: "Especialista",
                img: "/images/doctor2.png",
              },
              {
                name: "Dr. Carlos Ruiz",
                role: "Cirujano",
                img: "/images/doctor3.png",
              },
            ].map((doctor) => (
              <div
                key={doctor.name}
                className="relative bg-white/90 backdrop-blur rounded-3xl shadow-xl hover:-translate-y-3 hover:shadow-2xl transition-all p-12 text-center"
              >
                <div className="absolute inset-x-0 -top-14 flex justify-center">
                  <img
                    src={doctor.img}
                    alt={doctor.name}
                    className="h-28 w-28 rounded-full object-cover ring-4 ring-blue-200 shadow-lg"
                  />
                </div>

                <div className="mt-20">
                  <h4 className="text-lg font-semibold text-slate-800">
                    {doctor.name}
                  </h4>
                  <p className="text-slate-500">{doctor.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* HISTORIA / MISIÓN / VISIÓN */}
        <div className="grid md:grid-cols-3 gap-12 mb-28">
          {[
            {
              title: "Historia",
              text:
                "Nacimos con el objetivo de ofrecer atención médica accesible y confiable.",
            },
            {
              title: "Misión",
              text:
                "Cuidar la salud de nuestros pacientes con ética, calidad y humanidad.",
            },
            {
              title: "Visión",
              text:
                "Ser una clínica referente por innovación y excelencia médica.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white/90 backdrop-blur p-12 rounded-3xl shadow-xl hover:shadow-2xl transition"
            >
              <h4 className="text-xl font-bold mb-4 text-blue-600">
                {item.title}
              </h4>
              <p className="text-slate-600 leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mb-20">
          <h3 className="text-3xl font-bold text-slate-800 mb-6">
            Tu salud está en buenas manos
          </h3>
          <p className="text-slate-600 mb-10">
            Agenda tu cita y conoce la atención que mereces.
          </p>

          <button onClick={() => navigate("/cliente/cita")} className="bg-linear-to-r from-blue-500 to-blue-700 text-white px-12 py-4 rounded-full font-semibold hover:scale-105 transition shadow-xl">
            Agendar cita
          </button>
        </div>

      </div>
      
      <Footer />
    </section>
  )
}
