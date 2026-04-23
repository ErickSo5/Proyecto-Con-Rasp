import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-linear-to-br from-blue-800 via-blue-600 to-blue-400 text-white"
    >
      {/* BLOBS / LUCES */}
      <div className="absolute -top-52 -right-52 w-136 h-136 bg-white/20 rounded-full blur-[140px]" />
      <div className="absolute bottom-0 -left-52 w-lg h-128 bg-blue-300/40 rounded-full blur-[140px]" />
      <div className="absolute top-1/3 left-1/3 w-[24rem] h-96 bg-sky-300/30 rounded-full blur-[120px]" />

      {/* TEXTURA */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top,white,transparent_65%)]" />

      <div className="relative max-w-7xl mx-auto px-6 py-36 lg:py-40 grid lg:grid-cols-2 gap-20 items-center">

        {/* TEXTO */}
        <div className="text-center lg:text-left">

          <span className="inline-flex items-center gap-3 mb-8 px-6 py-2 rounded-full bg-white/20 text-sm font-semibold tracking-wide backdrop-blur">
            Clínica Victorio
            <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
          </span>

          <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold leading-tight mb-10">
            Cuidamos tu salud <br className="hidden md:block" />
            con <span className="text-blue-100">excelencia médica</span>
          </h1>

          <p className="max-w-xl mx-auto lg:mx-0 text-lg text-blue-100 mb-12 leading-relaxed">
            Atención médica profesional, especialistas certificados y
            tecnología de vanguardia en un entorno humano y confiable.
          </p>

          {/* BOTONES */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start mb-14">
            <button onClick={() => navigate("/cliente/cita")} className="bg-white text-blue-700 px-12 py-4 rounded-full font-semibold shadow-xl hover:shadow-2xl hover:scale-[1.03] transition">
              Agendar cita
            </button>

            <button onClick={() => navigate("/cliente/servicios")} className="border border-white/70 px-12 py-4 rounded-full font-semibold hover:bg-white/10 transition">
              Conocer servicios
            </button>
          </div>

          {/* STATS */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-12">
            {[
              { value: "10+", label: "Años de experiencia" },
              { value: "5,000+", label: "Pacientes atendidos" },
              { value: "24/7", label: "Urgencias" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-extrabold text-white">
                  {stat.value}
                </p>
                <p className="text-sm text-blue-100">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* TARJETA */}
        <div className="hidden lg:flex justify-center">
          <div className="relative bg-white/95 backdrop-blur text-slate-800 rounded-3xl shadow-2xl p-12 max-w-sm w-full">

            {/* BADGE */}
            <div className="absolute -top-5 right-8 bg-green-500 text-white text-xs font-semibold px-4 py-1 rounded-full shadow-md">
              Abierto ahora
            </div>

            <h3 className="text-xl font-bold mb-8 text-blue-600">
              Horario de atención
            </h3>

            <ul className="space-y-5 text-sm">
              <li className="flex justify-between">
                <span>Lunes a Viernes</span>
                <span className="font-semibold">7:00 – 21:00</span>
              </li>
              <li className="flex justify-between">
                <span>Sábados</span>
                <span className="font-semibold">8:00 – 14:00</span>
              </li>
              <li className="flex justify-between text-red-600 font-semibold">
                <span>Urgencias</span>
                <span>24 horas</span>
              </li>
            </ul>

            <div className="my-8 h-px bg-slate-200" />

            <p className="text-sm text-slate-600 leading-relaxed">
              Atención médica inmediata con personal capacitado y tecnología moderna.
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
